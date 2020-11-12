import json
from functools import wraps

import zmlp
from django.conf import settings
from django.contrib.auth import authenticate, logout, login
from django.contrib.auth.decorators import login_required
from django.core.exceptions import PermissionDenied
from django.http import JsonResponse, Http404, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_GET, require_POST

app = zmlp.ZmlpApp(apikey=settings.ZMLP_API_KEY, server=settings.ZMLP_API_URL)


def authentication_required(view_func):
    """View decorator that will return a 401 HTTP status and a blank body if the user is
    not authenticated.

    """
    @wraps(view_func)
    def wrapped_view(request, *args, **kwargs):
        if not request.user.is_authenticated:
            return JsonResponse({}, status=401)
        return view_func(request, *args, **kwargs)
    return wrapped_view


@require_POST
@csrf_exempt
def login_view(request):
    """Basic log in view to authenticate a User.

    Http Methods: POST

    Body Params:
        username: Username of the person attempting to log in .
        password: Password of the person attempting to log in.

    Sample Response:
    {
        "firstName": "Faky",
        "lastName": "Fakerson",
        "username": "fakeperson",
        "email": "notreal@fake.com"
    }

    """

    # Allow the view to accept json or form data to get the username and password.
    if request.content_type == 'application/json':
        request_body = json.loads(request.body)
    else:
        request_body = request.POST
    username = request_body.get('username', '')
    password = request_body.get('password', '')

    # Attempt to authenticate the user and return a 401 response if the user cannot be authenticated.
    user = authenticate(request, username=username, password=password)
    if user:
        login(request, user)
    else:
        message = 'No active user for the given email/password combination found.'
        return JsonResponse({'detail': message}, status=401)

    # Return a json response with a representation of the user that has been authenticated.
    return JsonResponse({'firstName': user.first_name,
                         'lastName': user.last_name,
                         'username': user.username,
                         'email': user.email})


@require_POST
def logout_view(request):
    """View that logs out the current User.

    Http Methods: POST

    Sample Response:
    {}

    """
    logout(request)
    return JsonResponse({})


@require_GET
@authentication_required
def me_view(request):
    """View that returns information about the currently logged in User.

    Http Methods: GET

    Sample Response:
    {
        "firstName": "Faky",
        "lastName": "Fakerson",
        "username": "fakeperson",
        "email": "notreal@fake.com"
    }

    """
    data = {'firstName': request.user.first_name,
            'lastName': request.user.last_name,
            'username': request.user.username,
            'email': request.user.email}
    return JsonResponse(data)


@require_GET
@authentication_required
def search_view(request):
    """View that accepts a search string and returns matching assets. This view supports
    pagination, text searches and similarity searches. Text searches are simple plain text
    searches that return any asset that has metadata matching the search terms. Similarity
    searches take the ID of one or more assets and return assets that are visually similar.
    The text and similarity searches can be combined. Omitting search params will return
    all assets sorted by the newest first.

    Http Methods: GET

    Query Params:
        from: Index of the first search to start returning results for. To be used with
         the "size" query param for pagination.
        size: Number of search results to return. To be used with the "from" query param
         for pagination.
        text_search: String of search terms to return matching assets for.
        similarity_search: List of asset IDs to return similar assets for.
        media_type: List of media types to filter by. Valid entries are "video", "image",
         and "document".

    Sample Response:
    {
        "assets": [
            {
                "id": "TyqDGfMqAOzpFVBdhzmJML4n7Ceekw9u",
                "name": "DogsAndCats.mp4",
                "path": "gs://my-pets-bucket/videos/DogsAndCats.mp4"
            }
        ],
        "count": 1
    }

    """
    # The "search" variable holds an Elasticsearch query. The empty dictionary is a blank
    # search and will return all assets. The query params passed to this view will be used
    # to update this query before finally being sent to elasticsearch to fetch results.
    search = {}
    must_queries = []
    filter = None

    # Check for query params related to pagination and update the search query accordingly.
    # More info can be found at https://www.elastic.co/guide/en/elasticsearch/reference/current/paginate-search-results.html.
    if request.GET.get('from'):
        search['from'] = request.GET.get('from')
    if request.GET.get('size'):
        search['size'] = request.GET.get('size')

    # Check for a query param with a text search. An Elasticsearch simple query string
    # block is created and added to a list of query blocks that will be added to the search
    # later. More info on the simple query string can be found here
    # https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-simple-query-string-query.html.
    if request.GET.get('text_search'):
        must_queries.append({
            'simple_query_string': {
                'query': request.GET.get('text_search')
            }
        })

    # Check for a query param describing a similarity search. This will be a list of asset ids
    # the user is trying to find similar assets for. The query for finding similar assets is
    # complex and uses proprietary ZMLP Elasticsearch plugins so there is a convenient object
    # that will create this query. This object accepts a list of similarity hashes. Similarity
    # hashes for all of the assets are gathered and passed to the SimilarityQuery object.
    # The SimilarityQuery is then added to the list of query blocks.
    if request.GET.get('similarity_search'):
        simhashes = []
        for asset_id in request.GET.getlist('similarity_search'):
            simhash = app.assets.get_asset(asset_id).get_attr('analysis.zvi-image-similarity.simhash')
            simhashes.append(simhash)
        sim_query = zmlp.SimilarityQuery(simhashes)
        must_queries.append(sim_query)

    # Filter by file type.
    if request.GET.get('media_type'):
        filter = [{
            'terms': {
                "media.type": request.GET.getlist('media_type')
            }
        }]

    # If there are any must-queries or filters created from the query params they are added to the
    # "query" section of the search query. The must queries are added to a "bool" query in a "must" clause.
    # The "must" clause tells Elasticsearch that all queries must be true for an asset to
    # be returned in the search. The media type filter is added to the "filter" clause and will filter
    # out any assets that do not match. The Elasticsearch search query is now complete and ready to be
    # sent to the server. More info on the bool/must/filter syntax can be found at
    # https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-bool-query.html.
    if must_queries or filter:
        bool_clause = {}
        if must_queries:
            bool_clause['must'] = must_queries
        if filter:
            bool_clause['filter'] = filter
        search['query'] = {'bool': bool_clause}

    print(search)

    # Use the search function to send the Elasticsearch search query to the ZMLP server and
    # receive a list of matching assets. The required information for each asset is stored
    # in a dictionary and the list of dictionaries is returned in a json response.
    assets = []
    results = app.assets.search(search=search)
    for asset in results:
        assets.append({'name': asset.get_attr('source.filename'),
                       'path': asset.get_attr('source.path'),
                       'type': asset.get_attr('media.type'),
                       'id': asset.id})
    return JsonResponse({'assets': assets,
                         'count': results.total_size})


@require_GET
@authentication_required
def asset_thumbnail_proxy_view(request, asset_id):
    """View that returns a thumbnail image for the given asset ID.

    Path Args:
        asset_id(uuid): UUID of the asset to retrieve a thumbnail for.

    Http Methods: GET

    Sample Response:
    The response will be an image with mimetype "image/jpeg".

    """
    # Get an asset object from the asset id in the url path.
    asset = app.assets.get_asset(asset_id)

    # Get the StoredFile object for the asset's thumbnail. The argument "0" refers to the
    # index of the available thumbnails. They are in ascending size order so "0" is the
    # smallest size. There are 3 sizes (s, m, l).
    thumbnail = asset.get_thumbnail(0)

    # Download the thumbnail file and return it to the client.
    _file = app.assets.download_file(thumbnail)
    return HttpResponse(_file.read(), content_type=thumbnail.mimetype)


@require_GET
@authentication_required
def asset_highres_proxy_view(request, asset_id):
    """View that returns the high resolution proxy of the given asset.

    Path Args:
        asset_id(uuid): UUID of the asset to retrieve a high res file for.

    Http Methods: GET

    Sample Response:
    The response will be an image with mimetype "image/jpeg" or video with mimetype "video/mp4".

    """
    # Get an asset object from the asset id in the url path.
    asset = app.assets.get_asset(asset_id)

    # Get the list of mp4 proxy files associated with the asset.
    videos = asset.get_files(mimetype="video/mp4", category="proxy")

    # If there are no videos then fall back to getting the "web-proxy" file for the asset.
    # The "web-proxy" file is a high resolution image file representing the asset.
    if videos:
        proxy = videos[0]
    else:
        try:
            proxy = asset.get_files(category='web-proxy')[0]
        except IndexError:
            return Http404(f'There is no web proxy available for asset {asset_id}')

    # Download the file and return it to the client.
    _file = app.assets.download_file(proxy)
    return HttpResponse(_file.read(), content_type=proxy.mimetype)
