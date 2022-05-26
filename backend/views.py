from django.shortcuts import render
from rest_framework import generics
from .serializers import *

# Create your views here.
class AccountView(generics.CreateAPIView):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer

class ShareView(generics.CreateAPIView):
    queryset = Share.objects.all()
    serializer_class = ShareSerializer