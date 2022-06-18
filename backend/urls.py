from django.urls import path, include
from .views import *
from .services import ExternalApi

urlpatterns = [
    #path('share', ShareView.as_view()),
    path('create-share', CreateShareView.as_view()),
    #path('get-share', GetShare.as_view()),
    path('create-user', RegisterView.as_view()),
    path('sell-share', SellView.as_view()),
    path('login', LoginView.as_view()),
    #path('get-share-by-account', ShareAccountView.as_view()),
    path('services', ExternalApi.as_view()),
]
