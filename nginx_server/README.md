# NGINX Server

The NGINX server is responsible for receiving all outside requests and routing them to the correct upstream server. There are 2 upstream servers the frontend React application and the backend Django application. Any requests starting with /api or /admin will be routed to the Django backend and any othe requests will route to the React application.

This directory contains 2 files that support starting the NGINX server.

### nginx.conf
This file sets all of the configuration for NGINX. The Dockerfile copies this config file into the default location for NGINX to pick it up.

### start-servers.sh
A simple bash script that starts the NGINX server as well as the two upstream servers that NGINX routes to. The Dockerfile uses this script as its entrypoint so all 3 servers start up automatically.

For more information on configuring NGINX check out their [documentation](https://nginx.org/en/docs/).
