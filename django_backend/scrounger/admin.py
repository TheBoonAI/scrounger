from django.contrib import admin
from django.contrib.auth.models import User, Group
from django.contrib.auth.admin import UserAdmin


# Unregister the default User & Group Admin pages
admin.site.unregister(User)
admin.site.unregister(Group)


@admin.register(User)
class ScroungerUserAdmin(UserAdmin):
    list_display = ('username', 'first_name', 'last_name', 'is_active', 'is_staff')



