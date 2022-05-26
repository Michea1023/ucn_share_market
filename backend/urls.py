from django.urls import path, include
from .views import *

urlpatterns = [
    path('shares', ShareView.as_view())
]
