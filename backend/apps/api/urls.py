from django.urls import path

from .views import UserRegisterView, UserRegisterConfirmView, UserLoginView, UserLoginRefreshView, UserProfileView, \
    UserBalanceView, UserCallView

urlpatterns = [
    path('user/register/', UserRegisterView.as_view(), name="create_user"),
    path('user/register/confirm/<str:token>', UserRegisterConfirmView.as_view(), name="confirm_user"),
    path('user/login/', UserLoginView.as_view(), name='token_create'),
    path('user/login/refresh/', UserLoginRefreshView.as_view(), name='token_refresh'),

    path('user/profile/', UserProfileView.as_view(), name='user_profile'),
    path('user/balance/', UserBalanceView.as_view(), name='user_balance'),
    path('user/call/', UserCallView.as_view(), name='user_call'),

]
