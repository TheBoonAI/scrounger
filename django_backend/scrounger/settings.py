"""
Django settings for scrounger project.

Generated by 'django-admin startproject' using Django 3.1.2.

For more information on this file, see
https://docs.djangoproject.com/en/3.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.1/ref/settings/
"""
import json
import os
import re

from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.environ.get('SECRET_KEY', 'nnb4iz@t!(+^#vg5dl4@n7z^ux2ub8yxq0wjj1!dcbmr-4tjhy')

# SECURITY WARNING: don't run with debug turned on in production!
if os.environ.get('DEBUG') == 'true':
    DEBUG = True
else:
    DEBUG = False

ALLOWED_HOSTS = ['*']


# Application definition

INSTALLED_APPS = [
    'scrounger',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'scrounger.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'scrounger.wsgi.application'


# Database
# If a different database is desired to be used, this will need to be replaced with
# the appropriate configuration
# https://docs.djangoproject.com/en/3.1/ref/settings/#databases

digital_ocean_db_url = os.environ.get('DATABASE_URL')
if os.environ.get('DB_BACKEND') == 'postgres' or digital_ocean_db_url:

    # When deploying as a Digital Ocean app the DATABASE_URL environment variable is
    # automatically added when a database is created. This string has all of the
    # information needed to set up the database connection. The info is extracted using
    # a grouped regex.
    if digital_ocean_db_url:
        regex = re.compile(r'^postgresql:\/\/(?P<username>.+):(?P<password>.+)@(?P<host>.+):(?P<port>[0-9]+)\/(?P<db_name>.+)[?].+$')
        match = regex.match(digital_ocean_db_url)
        connection_info = match.groupdict()

    else:
        connection_info = {'username': os.environ.get('PG_DB_USER', 'scrounger'),
                           'password': os.environ['PG_DB_PASSWORD'],
                           'host': os.environ.get('PG_DB_HOST', '127.0.0.1'),
                           'port': os.environ.get('PG_DB_PORT', '5432'),
                           'db_name': os.environ.get('PG_DB_NAME', 'scrounger')}
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql',
            'NAME': connection_info['db_name'],
            'USER': connection_info['username'],
            'PASSWORD': connection_info['password'],
            'HOST': connection_info['host'],
            'PORT': connection_info['port']
        }
    }
else:
    DATABASE_PATH = os.environ.get('DATABASE_PATH', os.path.join(BASE_DIR, 'scrounger/sqlite/db.sqlite3'))
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': DATABASE_PATH,
        }
    }


# Password validation
# https://docs.djangoproject.com/en/3.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/3.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.1/howto/static-files/

STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'scrounger/static')


# General Application Configuration
ZMLP_API_URL = os.environ.get('ZMLP_API_URL', 'https://api.zvi.zorroa.com')
ZMLP_API_KEY = json.loads(os.environ.get('ZMLP_API_KEY', '{}'))

SUPERUSER_EMAIL = os.environ.get('SUPERUSER_EMAIL', 'admin@example.com')
SUPERUSER_PASSWORD = os.environ.get('SUPERUSER_PASSWORD', 'admin')
SUPERUSER_FIRST_NAME = os.environ.get('SUPERUSER_FIRST_NAME', 'Admin')
SUPERUSER_LAST_NAME = os.environ.get('SUPERUSER_LAST_NAME', 'Adminson')

# Logging Settings
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
        },
    },
    'loggers': {
        'django': {
            'handlers': ['console'],
            'level': os.getenv('DJANGO_LOG_LEVEL', 'INFO'),
        },
    },
}
