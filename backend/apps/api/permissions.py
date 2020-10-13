from rest_framework import permissions
from django.contrib.auth import get_user_model

User = get_user_model()


class IsConfirmedUser(permissions.BasePermission):

    def has_permission(self, request, view):
        email = request.data.get('email')
        if email is not None:
            return User.objects.filter(is_active=True, is_confirmed=True, email=email).exists()
        return False
