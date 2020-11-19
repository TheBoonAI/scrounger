"""scrounger URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from scrounger import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/login', views.login_view, name='login'),
    path('api/v1/logout', views.logout_view, name='logout'),
    path('api/v1/me', views.me_view, name='me'),
    path('api/v1/assets', views.search_view, name='search'),
    path('api/v1/assets/<str:asset_id>/thumbnail_file', views.asset_thumbnail_proxy_view, name='thumbnail'),
    path('api/v1/assets/<str:asset_id>/highres_file', views.asset_highres_proxy_view, name='highres')
]
