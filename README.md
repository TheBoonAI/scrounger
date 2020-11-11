# Scrounger


## Backend API Setup

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

Django provides a simple webserver for development. Starting the runserver will allow
you to hit the backend api on `localhost:8000` or similar (depending on the options you 
give).

1. If this is the first time you're running the runserver, or if the runserver mentions
"unapplied migrations" on startup, be sure to run:
    - `./manage.py migrate`

1. To start the runserver, run:
    - `./manage.py runserver`
    
- Note: The `manage.py` helper script lives inside the `scrounger/api`
directory.

### Running the tests

We use the built-in Django test runner for running all of our tests. Running the tests 
for the backend is as simple as:

1. `cd` into the `scrounger/api` directory
1. Run: `./manage.py test`

## Build the Docker Container

The Scrounger application can be built as a standalone Docker Container. This is a helpful
list of Docker commands you can use to build an image, run the image, and manage the
resulting container. If doing continuous development, it may be wise to create aliases for
these commands in your shell profile.

### Build

- From the root of the Scrounger directory, tagging the image as "scrounger", run:
    - `docker build . -t scrounger` 
    
### Run

- To run the resulting image as a container, run:
    - `docker run -p 80:80 scrounger`
    
- Run the container, mounting a local directory location to store a permananent
  copy of the db, to prevent data loss if the db goes down:
    - `docker run -p 80:80 -e DATABASE_PATH=/applications/db/db.sqlite3 --mount type=bind,source=/data/scrounger_db,destination=/applications/db scrounger`
    - Note that the `DATABASE_PATH` env variable refers to the location of the db
    *inside* the container's mounted location. 
    
### Manage

- To attach to a shell in the running container, run:
    - ```docker exec -it `docker ps | egrep scrounger | awk '{print $NF}'` /bin/bash```
    
- To kill the running Scrounger container, run:
    - ```docker kill `docker ps | egrep scrounger | awk '{print $1}'` ```
    
## ENVIRONMENT VARIABLES

Environment variables can be used to control the execution of Scrounger. Below is a table
of the available environment variables that can be used.

| Env Variable Name | Description | Possible Values |
| :---------------- | :---------- | :-------------- |
| DEBUG             | Run the backend server in debug mode. | true/false |
| DATABASE_PATH     | Full path to a full SQLite3 database file to use. | varies |

