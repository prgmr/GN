from django.conf import settings
from django.contrib.auth import get_user_model
from django.core.mail import send_mail
from django.http import HttpResponse
from django.template.loader import render_to_string
from django.views.generic import View
from rest_framework import permissions, status
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer, TokenRefreshSerializer
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from user.models import UserBalance, UserCall
from .paginators import CustomPagination
from .permissions import IsConfirmedUser
from .serializers import UserSerializer, UserBalanceSerializer, UserCallSerializer

User = get_user_model()


class UserRegisterView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format='json'):
        email = request.data.get('email')
        password = request.data.get('password')
        last_name = request.data.get('last_name')
        first_name = request.data.get('first_name')

        if User.objects.filter(email__iexact=email).exists():
            return Response('User already exists', status=status.HTTP_409_CONFLICT)

        try:
            user = User.objects.create(
                email=email,
                last_name=last_name,
                first_name=first_name,
                is_active=True,
                is_confirmed=False,
            )
            user.set_password(password)
            user.save()

            params = {'user': user}
            send_mail(
                subject='Confirm registration',
                message=render_to_string('mail/user_confirm_registration.txt', params),
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[email],
            )
            return Response('Check your mailbox', status=status.HTTP_200_OK)
        except Exception as e:
            return Response(str(e), status=status.HTTP_403_FORBIDDEN)


class UserRegisterConfirmView(View):
    def get(self, request, token):
        user = User.objects.filter(token=token).first()
        if user is not None:
            user.is_confirmed = True
            user.save()
            return HttpResponse('OK', status=status.HTTP_200_OK)
        return HttpResponse('NOT FOUND TOKEN', status=status.HTTP_404_NOT_FOUND)


class UserLoginView(TokenObtainPairView):
    permission_classes = (IsConfirmedUser,)
    serializer_class = TokenObtainPairSerializer


class UserLoginRefreshView(TokenRefreshView):
    permission_classes = (IsConfirmedUser,)
    serializer_class = TokenRefreshSerializer


class UserProfileView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        user = request.user
        serializer = UserSerializer(user, many=False)
        return Response(data=serializer.data, status=status.HTTP_200_OK)

    def put(self, request):
        user = request.user
        data = request.data
        serializer = UserSerializer(instance=user, data=data, partial=True)

        if serializer.is_valid(raise_exception=True):
            user = serializer.save()

        return Response({f'{user} updated'}, status=status.HTTP_200_OK)


class UserBalanceView(ListAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = UserBalanceSerializer
    pagination_class = CustomPagination

    def get_queryset(self):
        user = self.request.user
        return UserBalance.objects.filter(user=user).order_by('id')


class UserCallView(ListAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = UserCallSerializer
    pagination_class = CustomPagination

    def get_queryset(self):
        user = self.request.user
        return UserCall.objects.filter(user=user).order_by('id')
