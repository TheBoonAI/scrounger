import json
import base64
from functools import wraps

import boonsdk
from django.conf import settings
from django.contrib.auth import authenticate, logout, login
from django.core.files.temp import NamedTemporaryFile
from django.http import JsonResponse, Http404, StreamingHttpResponse
from django.utils.cache import patch_response_headers, patch_cache_control
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_GET, require_POST

app = boonsdk.BoonApp(apikey=settings.BOONAI_API_KEY, server=settings.BOONAI_API_URL)


def authentication_required(view_func):
    """Decorator for enforcing authentication on views.

    This decorator will return a 401 HTTP status and a blank body if the user is
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
        username: Username of the person attempting to log in.
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
    """Paginated view for searching for specific assets using a querystring.

    View that accepts a search string and returns matching assets. This view supports
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
    _from = request.GET.get('from')
    size = request.GET.get('size')
    if _from:
        search['from'] = _from
    if size:
        search['size'] = size

    # Check for a query param with a text search. An Elasticsearch simple query string
    # block is created and added to a list of query blocks that will be added to the search
    # later. More info on the simple query string can be found here
    # https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-simple-query-string-query.html.
    text_search = request.GET.get('text_search')
    if text_search:
        must_queries.append({
            'simple_query_string': {
                'query': text_search
            }
        })

    # Check for a query param describing a similarity search. This will be a list of asset ids
    # the user is trying to find similar assets for. The query for finding similar assets is
    # complex and uses proprietary Boon AI Elasticsearch plugins so there is a convenient object
    # that will create this query. This object accepts a list of similarity hashes. Similarity
    # hashes for all of the assets are gathered and passed to the SimilarityQuery object.
    # The SimilarityQuery is then added to the list of query blocks.
    similarity_search = request.GET.get('similarity_search')
    if similarity_search:
        simhashes = []
        for asset_id in similarity_search.split(','):
            simhash = app.assets.get_asset(asset_id).get_attr('analysis.boonai-image-similarity.simhash')
            simhashes.append(simhash)
        sim_query = boonsdk.SimilarityQuery(simhashes)
        must_queries.append(sim_query)

    # Check for a query param containing uploaded assets for similarity search.
    uploaded_assets_json = request.GET.get('uploaded_assets')
    if uploaded_assets_json:
        images = []
        uploaded_assets = json.loads(uploaded_assets_json)
        for uploaded_asset in uploaded_assets:
            image_format, image_base64 = uploaded_asset.split(';base64,')
            image_extension = image_format.split('/')[-1]
            image_decoded = base64.urlsafe_b64decode(image_base64 + '===')
            image_file = NamedTemporaryFile(suffix=image_extension, delete=True)
            image_file.write(image_decoded)
            image_file.flush()
            images.append(image_file.name)
        if images:
            must_queries.append(app.assets.get_sim_query(images, min_score=0.6))

    # Filter by file type.
    media_type = request.GET.getlist('media_type')
    if media_type:
        filter = [{
            'terms': {
                "media.type": media_type
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

    # Use the search function to send the Elasticsearch search query to the Boon AI server and
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

    # Stream the file response from Boon AI.
    return _stream_with_cache_control(thumbnail)


@require_GET
@authentication_required
def asset_highres_proxy_view(request, asset_id):
    """View that returns the high resolution proxy of the given asset.

    Path Args:
        asset_id (uuid): UUID of the asset to retrieve a high res file for.

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

    # Stream the file response from Boon AI.
    return _stream_with_cache_control(proxy)


def _stream_with_cache_control(_file):
    """Streams the given file in a response.

    Helper method to centralize the action of streaming a file from Boon AI and setting
    appropriate cache-control headers on the response.

    Args:
        _file (boonsdk.entity.asset.StoredFile): The File to stream.

    Returns:
        (StreamingHttpResponse): Streaming response with the file and cache control
            headers set.

    """
    response = StreamingHttpResponse(app.assets.stream_file(_file, chunk_size=2*1000*1000),
                                     content_type=_file.mimetype)
    patch_response_headers(response, cache_timeout=86400)
    patch_cache_control(response, private=True)
    return response
