#!/usr/bin/env bash
# Simple script that handles the startup of the servers. The first argument is the
# hostname of the postgres instance to wait for.

# Do any needed database migrations.
cd /applications/scrounger/django_backend
python3 ./manage.py migrate --no-input

# Start django server.
gunicorn -c python:gunicornconfig scrounger.wsgi &

# Start node server.
cd /applications/scrounger/react_frontend
npm start &

# Start nginx gateway server
nginx -g "daemon off;"
