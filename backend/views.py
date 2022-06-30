import os
from django.contrib.auth import authenticate, login
from django.shortcuts import render, redirect
from django.contrib import messages
from rest_framework import generics, status
from .serializers import *
from rest_framework.views import APIView
from rest_framework.response import Response


def share_account_code(share: str, account: str) -> str:
    return str(share) + str(account)


def response(response: str):
    return {"response": response}


def exception(exception: str):
    return {"exception": exception}


# Create your views here.
class RegisterView(APIView):
    serializer_class = RegisterSerializer

    def post(self, request, format=None):
        # data = json.loads(request.body.decode('utf-8'))
        data = request.data
        rut = data.get('rut')
        password = data.get('password')
        password2 = data.get('password2')
        email = data.get('email')
        full_name = data.get('full_name')
        career = data.get('career')
        staff = data.get('staff')
        if password == password2:
            if Account.objects.filter(rut=rut).exists():
                return Response(exception("rut already used"), status=status.HTTP_406_NOT_ACCEPTABLE)
            elif Account.objects.filter(email=email).exists():
                return Response(exception("email already used"), status=status.HTTP_406_NOT_ACCEPTABLE)
            else:
                if (staff):
                    user = Account.objects.create_staffuser(rut, email, full_name, password=password)
                else:
                    user = Account.objects.create_user(rut, email, full_name, career=career, password=password)
                login(request, user)
                share = Share.objects.filter(code='CLP')[0]
                account_share = ShareAccount(
                    account=user,
                    share=share,
                    code=lambda rut: share_account_code('CLP', rut),
                    amount=Settings.objects.get(name="maximum_init_value").value
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
                    'share': [
                        {
                            'code': account_share.share.code,
                            'amount': account_share.amount
                        }
                    ] if not staff else None
                }
                return Response(response, status=status.HTTP_201_CREATED)


class LoginView(APIView):
    serializer_class = LoginSerializer

    def post(self, request, format=None):
        #data = json.loads(request.body.decode('utf-8'))
        data = request.data
        rut = data.get('rut')
        password = data.get('password')
        user = authenticate(request, rut=rut, password=password)
        if user is not None:
            account = Account.objects.filter(rut=rut)[0]
            if account.active:
                login(request, user)
                account_share = ShareAccount.objects.filter(account=account).values_list('share', 'amount')
                response = {
                    'rut': account.rut,
                    'email': account.email,
                    'full_name': account.full_name,
                    'career': account.career
                    if account.career is not None and account.career != '' else None,
                    'staff': account.staff if account.staff else None,
                    'active': True,
                    'share': [
                        {
                            "code": Share.objects.get(id=share).code,
                            "amount": amount
                        } for share, amount in account_share
                    ] if not account.staff else None
                }
                return Response(response, status=status.HTTP_200_OK)
            else:
                return Response(exception("user is blocked"), status=status.HTTP_406_NOT_ACCEPTABLE)
        else:
            return Response(exception("user not registered"), status=status.HTTP_404_NOT_FOUND)


class TransactionView(APIView):
    serializer_class = TransactionSerializer

    def post(self, request, format=None):
        # Falta Comprobacion de Vigencia :> , Correccion de usuario(Login), añadir comisiones
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            bought = serializer.data.get('share_buy')
            selled = serializer.data.get('share_sell')
            rut = serializer.data.get('rut')
            price = serializer.data.get('price')
            amount = serializer.data.get('amount')
            type_order = serializer.data.get('type_order')
            vigency = serializer.data.get('vigency')
            share_buy = Share.objects.filter(code=bought)
            share_sell = Share.objects.filter(code=selled)
            account = Account.objects.filter(rut=rut)
            if account.exists():
                account = account[0]
                if share_buy.exists() and share_sell.exists():
                    query_table = TransactionTable.objects.filter(share_buy=bought, share_sell=selled)
                    if query_table.exists():
                        if type_order == "B":
                            share = share_buy[0]
                        else:
                            share = share_sell[0]

                        share_account = ShareAccount.objects.filter(account=account, share=share)
                        total = amount * price

                        if share_account.exists():
                            share_account = share_account[0]
                            if total < Settings.objects.get(name="variable_commission").value:
                                if type_order == 'B' and share_account.amount > total:
                                    share_account.amount -= total
                                elif type_order == 'S' and share_account.amount > amount:
                                    share_account.amount -= amount
                                else:
                                    return Response(exception("no cuenta con el saldo disponible",
                                                              status=status.HTTP_400_BAD_REQUEST))
                                share_account.save(update_fields=['amount'])

                                table = query_table[0]

                                transaction = Transaction(
                                    share=share,
                                    account=account,
                                    trans_table=table,
                                    price=price,
                                    amount=amount,
                                    total=total,
                                    fixed_com= Settings.objects.get(name="fixed_commission").value,
                                    variabl_com=total * Settings.objects.get(name="variable_commission").value,
                                    type_order=type_order,
                                    vigency=vigency
                                )
                                transaction.save()
                                return Response(response("NICE"), status=status.HTTP_201_CREATED)
                            else:
                                return Response(exception("no puede transferir tanto"),
                                                status=status.HTTP_400_BAD_REQUEST)
                        else:
                            return Response(exception("no tiene esa moneda/accion"), status=status.HTTP_404_NOT_FOUND)
                    else:
                        return Response(exception("la transaccion es imposible"), status=status.HTTP_400_BAD_REQUEST)
                else:
                    return Response(exception("no existe tal accion"), status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response(exception("No existe este usuario"), status=status.HTTP_404_NOT_FOUND)


class ControlUsersView(APIView):
    serializer_class = BlockSerializer
    queryset = Account.objects.filter(staff=False)

    def get(self, request):
        user = request.user
        if user.is_authenticated and user.staff:
            out = []
            for i in range(self.queryset.count()):
                data = AccountSerializer(self.queryset[i]).data
                out.append(data)
            return Response(out, status=status.HTTP_200_OK)
        else:
            return Response(exception("you aren't an administrator"), status=status.HTTP_405_METHOD_NOT_ALLOWED)

    def post(self, request):
        user = request.user
        if user.is_authenticated and user.staff:
            rut = request.POST.get('rut')
            block = request.POST.get('block')
            account = Account.objects.filter(rut=rut)[0]
            account.active = not block
            account.save(update_fields=['active'])
            return Response(response("blocked" if block else "unblocked"), status=status.HTTP_200_OK)
        else:
            return Response(exception("you aren't an administrator"), status=status.HTTP_405_METHOD_NOT_ALLOWED)


class ShareView(generics.CreateAPIView):
    queryset = Share.objects.all()
    serializer_class = ShareSerializer

    def get(self, request, format=None):
        out = []
        for i in range(self.queryset.count()):
            data = self.serializer_class(self.queryset[i]).data
            out.append(data)
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


class CreateTransTableView(APIView):
    serializer_class = TransTableSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            share_buy = serializer.data.get('share_buy')
            share_sell = serializer.data.get('share_sell')
            market_value = serializer.data.get('market_val')
            queryset = TransactionTable.objects.filter(share_buy=share_buy, share_sell=share_sell)
            qs_shb = Share.objects.filter(code=share_buy)  # queryset_share_buy
            qs_shs = Share.objects.filter(code=share_sell)  # queryset_share_sell
            if not queryset.exists() and qs_shb.exists() and qs_shs.exists():
                trans_table = TransactionTable(share_buy=share_buy, share_sell=share_sell, market_val=market_value)
                trans_table.save()
            elif not qs_shb.exists() or not qs_shb.exists():
                return Response(exception("No existe esa Accion"), status=status.HTTP_400_BAD_REQUEST)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(exception("Envio mal su consulta"), status=status.HTTP_400_BAD_REQUEST)


class TransTableView(APIView):
    serializer_class = TransTableSerializer
    queryset = TransactionTable.objects.all()

    def get(self, request, format=None):
        out = []
        for i in range(self.queryset.count()):
            data = self.serializer_class(self.queryset[i]).data
            out.append(data)
        return Response(out, status=status.HTTP_200_OK)



class SettingView(APIView):
    lookup_url_kwarg = 'query'

    def post(self, request, format=None):
        user = request.user
        if user.is_authenticated and user.staff:
            data = request.data
            settings = Settings.objects.all()

            if data.get("variable_commission") is not None:
                var_commission = settings.get(name="variable_commission")
                var_commission.value = data.get("variable_commission")
                var_commission.save(update_fields=['value'])

            if data.get("fixed_commission") is not None:
                fixed_commission = settings.get(name="fixed_commission")
                fixed_commission.value = data.get("fixed_commission")
                fixed_commission.save(update_fields=['value'])

            if data.get("maximum_init_value") is not None:
                maximum_init_value = settings.get(name="maximum_init_value")
                maximum_init_value.value = data.get("maximum_init_value")
                maximum_init_value.save(update_fields=['value'])
                
            if data.get("maximum_value_transfer") is not None:
                maximum_value_transfer = settings.get(name="maximum_value_transfer")
                maximum_value_transfer.value = data.get("maximum_value_transfer")
                maximum_value_transfer.save(update_fields=['value'])

            return Response(data, status=status.HTTP_200_OK)

        else:
            return Response(exception("you aren't an administrator"), status=status.HTTP_405_METHOD_NOT_ALLOWED)



    def get(self, request, format=None):
        #(request = ('query'))
        query = request.GET.get(self.lookup_url_kwarg)
        if query != None:
            data = Settings.objects.all()
            if query == 'all':
                return Response({
                    "maximum_value_transfer": data.get(name="maximum_value_transfer").value,
                    "maximum_init_value": data.get(name="maximum_init_value").value,
                    "variable_commission": data.get(name="variable_commission").value,
                    "fixed_commission": data.get(name="fixed_commission").value
                }, status=status.HTTP_200_OK)
            elif query == 'com': #commission
                return Response({
                    'variable_commission': data.get(name="variable_commission").value,
                    'fixed_commission': data.get(name="fixed_commission").value
                }, status=status.HTTP_200_OK)
            elif query == 'mvt': #maximum value transference
                return Response({"maximum_value_transfer": data.get(name="maximum_value_transfer").value}, status=status.HTTP_200_OK)
            elif query == 'miv': #maximum init value
                return Response({"maximum_init_value": data.get(name="maximum_init_value").value}, status=status.HTTP_200_OK)
            else:
                return Response(exception("invalid query code"), status=status.HTTP_404_NOT_FOUND)
        return Response(exception('query parameter not found in request'), status=status.HTTP_400_BAD_REQUEST)

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
"""

class QueryView(APIView):
    def get(self, request, format=None):
        queryset = Transaction.objects.filter(active=True).exclude(account=None)
        out = []
        for i in range(queryset.count()):
            data = TransSerializer(queryset[i]).data
            out.append(data)
        return Response(out, status=status.HTTP_200_OK)
