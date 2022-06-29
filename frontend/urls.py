from django.urls import path, include
from .views import *

urlpatterns = [
    path('', index),
    path('login', index),
    path('register', index),
    path('home', index),
    path('buysell/buy', index),
    path('buysell/sell', index),
    path('user', index),
    path('profile', index),
    path('admin', index)
]
