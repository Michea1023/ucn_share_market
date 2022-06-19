import os
from django.contrib.auth import authenticate, login
from django.shortcuts import render, redirect
from django.contrib import messages
from rest_framework import generics, status
from .settings import *
from .serializers import *
from rest_framework.views import APIView
from rest_framework.response import Response
from bolsa.consultas import ConsultasAPI
import json

def share_account_code(share: str, account: str) -> str:
    return str(share)+str(account)



# Create your views here.
class RegisterView(APIView):
    serializer_class = RegisterSerializer

    def post(self, request, format=None):
        data = request.POST
        rut = data.get('rut')
        password = data.get('password')
        password2 = data.get('password2')
        email = data.get('email')
        full_name = data.get('full_name')
        career = data.get('career')
        staff = data.get('staff')
        if password == password2:
            if Account.objects.filter(rut=rut).exists():
                return Response({
                    "exception": "Rut already used"
                }, status=status.HTTP_406_NOT_ACCEPTABLE)
            elif Account.objects.filter(email=email).exists():
                return Response({
                    "exception": "Email already used"
                }, status=status.HTTP_406_NOT_ACCEPTABLE)
            else:
                if (staff):
                    user = Account.objects.create_staffuser(rut, email, full_name, password=password)
                else:
                    user = Account.objects.create_user(rut, email, full_name, career=career, password=password)
                share = Share.objects.filter(code='CLP')[0]
                account_share = ShareAccount(
                    account=user,
                    share=share,
                    code=lambda rut: share_account_code('CLP', rut),
                    amount=MAXIMUM_INIT_VALUE
                )
                account_share.save()
                response = {
                    'rut': rut,
                    'email': email,
                    'full_name': full_name,
                    'career': user.career
                        if career is not None and career != '' else None,
                    'staff': staff if staff else None,
                    'active': True,
                    'share': {
                        account_share.share.code: account_share.amount
                    } if not staff else None
                }
                return Response(response, status=status.HTTP_201_CREATED)



class LoginView(APIView):
    serializer_class = LoginSerializer

    def post(self, request, format=None):
        rut = request.POST.get('rut')
        password = request.POST.get('password')
        user = authenticate(request, rut=rut, password=password)
        if user is not None:
            account = Account.objects.filter(rut=rut)[0]
            if account.active:
                account_share = ShareAccount.objects.filter(account=account).values_list('share', 'amount')
                response = {
                    'rut': account.rut,
                    'email': account.email,
                    'full_name': account.full_name,
                    'career': account.career
                    if account.career is not None and account.career != '' else None,
                    'staff': account.staff if account.staff else None,
                    'active': True,
                    'share': {
                        {
                            "code": Share.objects.get(id=share).code,
                            "amount": amount
                        } for share, amount in account_share
                    } if not account.staff else None
                }

                return Response(response, status=status.HTTP_200_OK)
            else:
                return Response({
                    "exception": "User is blocked"
                }, status=status.HTTP_406_NOT_ACCEPTABLE)
        else:
            return Response({"exception": "User not registered"}, status=status.HTTP_404_NOT_FOUND)


class SellView(APIView):
    serializer_class = SellSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        print(serializer)
        if serializer.is_valid():
            share   = serializer.data.get('share')
            account = serializer.data.get('account')
            amount  = serializer.data.get('amount')
            vigency = serializer.data.get('vigency')
            wtshare = serializer.data.get('waiting_share')
            wtamnt  = serializer.data.get('waiting_amount')
            response = {
                'share': share,
                'amount': amount,
                'waiting_share': wtshare,
                'waiting_amount': wtamnt
            }
            return Response(response, status=status.HTTP_200_OK)

class BlockView(APIView):
    serializer_class = BlockSerializer

    def post(self, request, format=None):
        rut     = request.POST.get('rut')
        block   = request.POST.get('block')
        account = Account.objects.filter(rut=rut)[0]
        account.active = not block
        return Response({
            "response": "blocked"
        }, status=status.HTTP_200_OK)




"""
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

"""
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
"""

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
"""