import os
from django.shortcuts import render
from django.contrib.auth.models import User, auth
from django.contrib import messages
from rest_framework import generics, status
from .serializers import *
from rest_framework.views import APIView
from rest_framework.response import Response
from bolsa.consultas import ConsultasAPI
import json

# Create your views here.
class AccountView(generics.ListAPIView):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer

class ShareView(generics.CreateAPIView):
    queryset = Share.objects.all()
    serializer_class = ShareSerializer

    def get(self, request, format=None):
        out = {}
        for i in range(self.queryset.count()):
            data = self.serializer_class(self.queryset[i]).data
            print(data)
            out[data['code']] = data
        return Response(out, status=status.HTTP_200_OK)

class CreateShareView(APIView):
    serializer_class = ShareSerializer
    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            code = serializer.data.get('code')
            name = serializer.data.get('name')
            queryset = Share.objects.filter(code=code)
            if not queryset.exists():
                share = Share(code=code, name=name)
                share.save()
            else:
                share = queryset[0]
                share.name = name
                share.save(update_fields=['name'])

            return Response(ShareSerializer(share).data, status=status.HTTP_200_OK)


class UserRegisterView(APIView):
    serializer_class = AccountSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        print(serializer.data)


class GetShare(APIView):
    serializer_class = ShareSerializer
    lookup_url_kwarg = 'code'

    def get(self, request, format=None):
        code = request.GET.get(self.lookup_url_kwarg)
        if code != None:
            share = Share.objects.filter(code=code)
            if len(share) > 0:
                data = ShareSerializer(share[0]).data
                return Response(data, status=status.HTTP_200_OK)
            return Response({'Room Not Found': 'Invalid Room Code'}, status=status.HTTP_404_NOT_FOUND)
        return Response({'Bad Request': 'Code parameter not found in request'}, status=status.HTTP_400_BAD_REQUEST)


class ExternalApi(APIView):
    # cargar la api key desde las variables de entorno del sistma
    api_key = 'CC50A4DF46274CE79682FEA8A1A5B0F3'  #os.environ['API_BS']

    # Creación de la instancia que manipulara las solicitudes a la API
    con_bs = ConsultasAPI(token=api_key)

    resp = con_bs.get_transacciones_rv()
    print(resp)



