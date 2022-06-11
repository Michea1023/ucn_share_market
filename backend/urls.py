from django.urls import path, include
from .views import *

"""{
        'ENGINE': 'django.db.backends.postgresql',
        'NAME':'ucn_share_market',      # NOT FINAL
        'USER':'postgres',
        'PASSWORD': 'ucnsharemarket',   # NOT FINAL
        'HOST':'localhost'
        }
"""

urlpatterns = [
    path('share', ShareView.as_view()),
    path('create-share', CreateShareView.as_view()),
    path('get-share', GetShare.as_view()),
]
