# Django Backend

The Scrounger backend is a Django application responsible for hosting the api used by the
frontend application and the admin site used to manage users. They can be found at `/api` 
and `/admin` respectively. Use these links for more information about [Django](https://docs.djangoproject.com/en/3.1/) 
and the [Django Admin Site](https://docs.djangoproject.com/en/3.1/ref/contrib/admin/).  

## Backend API Development Setup

### Prerequisites
This guide assumes you have the following already installed on your computer:

- [Python 3.7](https://www.python.org/downloads/release/python-379/)
- [Pipenv](https://pypi.org/project/pipenv/)

### Dependency Installation
We use Pipenv to handle package management for this project. Pipenv will create 
a "virtual environment" for the project and make sure all the requisite dependencies for
this project are installed there, rather than in your global python interpreter. To 
install the required dependencies and activate the environment for you shell, run:

1. In a terminal, from the `/scrounger/django_backend`  directory, run:
    - `pipenv install`
    - `pipenv shell`

#### Pipenv - General Usage
- `pipenv -h` to display available commands.
- `pipenv install $package` to install the given `$package`
- `pipenv shell` to convert your current terminal shell to one using this project's virtual 
environment.

### Configuring the API Key
Scrounger is designed to utilize the Boon AI backend, but to do so you need to use a Boon AI
API Key. This can be obtained from your project in the Console web UI, in the API Keys
section. Create an API Key with the `Assets Read` permission and copy the key. You can use 
this [guide](https://docs.boonai.app/boonsdk/working-with-api-keys) to help you. 

#### Use your API Key
In your pipenv shell run `export BOON_API_KEY='<Your_Api_Key>'` to set an environment 
variable. Use this shell for running the Django runserver in subsequent steps.

Most modern IDEs can be configured to automatically create shells using the correct pipenv
with preset environment variables. We suggest a configuration like this to increase efficiency. 

### Start Backend Runserver
Django provides a simple webserver for development called the runserver. Starting the 
runserver will allow you to hit the backend api on `localhost:8000` or similar 
(depending on the options you give). Note, you'll need a Boon AI API Key configured in your
`settings.py` configuration file, or you'll need to set it as an environment variable in
your shell.
(see the "Configuring the API Key" section for details).

1. If this is the first time you're running the runserver, or if the runserver mentions
"unapplied migrations" on startup, be sure to run:
    - `./manage.py migrate`

1. To start the runserver, run:
    - `./manage.py runserver`
    
- Note: The `manage.py` helper script lives inside the `django_backend`
directory.

### Exploring the Code
While there are some boilerplate files included in here that are necessary for Django
to operate, there are a few files that you'll likely want to take a look at first.

#### scrounger/views.py
Functions for all of the endpoints that the frontend interacts with. It contains
the simple login/logout authentication endpoints, the asset search endpoint, as well
as endpoints for serving thumbnails and videos.

#### scrounger/urls.py
Configures the routing paths to the endpoint functions contained in `views.py`. This 
is where to go when looking for available endpoints or creating new ones.

#### scrounger/settings.py
Configuration settings for running the backend. Many of them are
standard Django settings that do not need to be changed. There is a section
for "General Application Configuration" near the bottom that contains Scrounger specific
settings that can be modified or extended.
