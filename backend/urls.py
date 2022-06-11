from django.urls import path, include
from .views import *

urlpatterns = [
    path('share', ShareView.as_view()),
    path('create-share', CreateShareView.as_view()),
    path('get-share', GetShare.as_view()),
    path('create-user', UserRegisterView.as_view()),
    path('services', ExternalApi.as_view())
]
