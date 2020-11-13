# Scrounger Backend

The Scrounger backend is built us a simple Django project to help introduce making 
simple calls to retrieve and query for assets. 

## Backend API Development Setup

### Prerequisites

This guide assumes you have the following already installed on your computer:

- [Python 3.7](https://www.python.org/downloads/release/python-379/)
- [Pipenv](https://pypi.org/project/pipenv/)

### Dependency Installation

We use Pipenv to handle package management for this project. Pipenv will create 
a "virtual environment" for the project and make sure all the requisite dependencies for
this project are installed there, rather than in your global python interpreter. To 
install the required dependencies:

1. In a terminal, from the `/scrounger`  parent directory, run:
    - `pipenv install`

#### Pipenv - General Usage

- `pipenv -h` to display available commands.
- `pipenv install $package` to install the given `$package`
- `pipenv shell` to convert your current terminal shell to one using this project's virtual 
environment.

### Start Backend Runserver

Django provides a simple webserver for development called the runserver. Starting the 
runserver will allow you to hit the backend api on `localhost:8000` or similar 
(depending on the options you give).

1. If this is the first time you're running the runserver, or if the runserver mentions
"unapplied migrations" on startup, be sure to run:
    - `./manage.py migrate`

1. To start the runserver, run:
    - `./manage.py runserver`
    
- Note: The `manage.py` helper script lives inside the `scrounger/api`
directory.


### Exploring the Code

While there are some boilerplate files included in here that are necessary for Django
to operate, there are a few files that you'll likely want to take a look at first.

#### scrounger/views.py

This file contains all the endpoints that the frontend interacts with. It contains
the simple login/logout authentication endpoints, the asset search endpoint, as well
as endpoints for serving thumbnails and videos.

#### scrounger/settings.py

This file contains configuration settings for running the backend. Many of them are
standard Django settings that do not need to be changed. There is a section
for "General Application Configuration" near the bottom that contains Scrounger specific
settings that can be modified or extended.
