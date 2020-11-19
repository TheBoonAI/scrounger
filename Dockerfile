FROM nginx:mainline
RUN apt-get -y update && apt-get -y upgrade && apt-get -y install python3 python3-pip npm libsm6 libxrender-dev libxext6

# Copy the React frontend app files into the container, install dependencies and build it.
COPY react_frontend /applications/scrounger/react_frontend
WORKDIR /applications/scrounger/react_frontend
ARG CI_COMMIT_SHA
RUN npm install -g npm@latest
RUN npm cache verify
RUN npm ci && CI_COMMIT_SHA=$CI_COMMIT_SHA npm run build

# Install Python dependencies and copy the Django backend application files into the container.
COPY django_backend/Pipfile /applications/scrounger/Pipfile
COPY django_backend/Pipfile.lock /applications/scrounger/Pipfile.lock
WORKDIR /applications/scrounger
ENV PYTHONPATH /applications/scrounger/api:$PATH
RUN pip3 install --upgrade pip \
    && pip3 install pipenv \
    && pipenv install --system --deploy
COPY django_backend /applications/scrounger/django_backend

# Run the Django collect static command. This will bundle of the static files required for
# Django admin pages.
WORKDIR /applications/scrounger/django_backend
RUN python3 ./manage.py collectstatic --no-input

# Copy the Nginx configuration file into the default location.
COPY nginx_server/nginx.conf /etc/nginx/conf.d/default.conf

# Set the entrypoint to run a script that will run the frontend and backend application
# servers. The main nginx server that is exposed to outside world runs on container
# startup as a background service.
COPY nginx_server/start-servers.sh /applications/scrounger/start-servers.sh
WORKDIR /
ENTRYPOINT ["sh", "/applications/scrounger/start-servers.sh"]
