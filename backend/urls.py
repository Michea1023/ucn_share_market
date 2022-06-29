from django.urls import path, include
from .views import *
#from .services import ExternalApi

urlpatterns = [
    path('share', ShareView.as_view()),
    path('create-share', CreateShareView.as_view()),
    #path('get-share', GetShare.as_view()),
    path('create-user', RegisterView.as_view()),
    path('transaction', TransactionView.as_view()),
    path('login', LoginView.as_view()),
    path('create-table', CreateTransTableView.as_view()),
    path('control-users', ControlUsersView.as_view()),
    path('setting', SettingView.as_view()),
    path('transaction-table', TransTableView.as_view())
    #path('get-share-by-account', ShareAccountView.as_view()),
    #path('services', ExternalApi.as_view()),
]
