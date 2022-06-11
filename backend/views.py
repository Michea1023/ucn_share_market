from django.shortcuts import render
from django.contrib.auth.models import User, auth
from django.contrib import messages
from rest_framework import generics, status
from .serializers import *
from rest_framework.views import APIView
from rest_framework.response import Response

# Create your views here.
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