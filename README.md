# Scrounger

Scrounger is an open-sourced content search application built by [Zorroa](https://zorroa.com), the makers of a GUI-drivevn machine learning integration platform. The app is designed to let its users experience what it’s like to load their media assets and run an ML-powered search within a custom app, in under an hour.
The purpose of the Scrounger application is to:
- Guide developers on the best practices of integrating ML-generated metadata into a proprietary or third party app using the Zorroa Python library.
- Enable business end-users to evaluate the accelerated value Zorroa's search capability can deliver to their organization.
- Serve as a starting point for a media storage and search app that can be extended into a proprietary app to meet unique business needs.

# Deployment
Scrounger consists of a single Docker container that can be configured using environment 
variables. It can be deployed anywhere a container can be run but we have included easy 
instructions for deploying in the two most common scenarios.

### Prerequisites
- Zorroa API Key with "Assets Read" permission - [API Key Instructions](https://zorroa.gitbook.io/zmlp/getting-started/quick-start/python-zvi-client#get-api-key) 

## Cloud Deployment
We suggest using Digital Ocean to get up and running with the 
least amount of friction. The deployment process tasks about 10 minutes and costs less
than $20/month. Full instructions are at the link below.

[Digital Ocean Deployment Instructions](https://zorroa.gitbook.io/scrounger/)

## On-Prem Deployment
The following instructions are intended for an on-prem deployment used for testing and 
evaluation purposes. This is not intended to be a production-grade installation; the 
server will only accept HTTP connections on port 80 and users are tracked in a sqlite 
database.

To start up scrounger run the following commands on a server that has docker installed and
is exposed on your network.

```bash
docker pull zmlp/scrounger
docker run -d -p 80:80 -v /var/lib/scrounger:/applications/scrounger/django_backend/scrounger/sqlite -e ZMLP_API_KEY='<ZMLP_API_KEY>' zmlp/scrounger
```

Scrounger will now be running at http://<hostname_or_ip_address>

# Development

## Architecture

Scrounger is open-sourced under the MIT license and encourage anyone to fork this repo and
use this as a base for building a proprietary web application that leverages Zorroa for 
improving search capabilities of unknown and unstructure data. Below is a description of the
applications architecture and how to get started extending it.




                    +------------------------+
                    |                        |
                    |   NGINX Server         |
                    |                        |
                    +------------------------+
                        |                 |
                        |                 |
                        |                 |
                        v                 v
     +-------------------------+       +---------------------------+
     |                         |       |                           |
     |  React Node Application |       |  Django uWSGI Application |
     |  (Frontend)             |       |  (Backend)                |
     |                         |       |                           |
     +-------------------------+       +---------------------------+
                                                    |
                                                    v
                                         +---------------------+
                                         |                     |
                                         | Relational Database |
                                         |                     |
                                         +---------------------+




Scrounger consists of 3 major components.

### Nginx Server - nginx_server/
Nginx server exposed to the outside world. It is responsible for routing
requests to either the frontend or backend application based on the path. Any request beginning
with `/api` or `/admin` is routed to the Django backend and all other requests are routed to 
the React frontend.

### React Node Application - react_frontend/
Frontend application responsible for rendering
all pages that are sent to the client. It is a React app served by a Next.js server
running on port 3000.

### Django uWSGI Application - django_backend/
Backend application responsible for providing the API
endpoints the frontend uses for fetching data and handling authentication and user administration. 
It is a Django/uWSGI application served by a gunicorn server on port 8080.

## Getting Started.
To get started extending any of these components view the README.md found in each of their 
respective folders for more information.

[nginx_server/](https://github.com/Zorroa/scrounger/tree/main/nginx_server)

[react_frontend/](https://github.com/Zorroa/scrounger/tree/main/react_frontend)

[django_backend/](https://github.com/Zorroa/scrounger/tree/main/django_backend)



