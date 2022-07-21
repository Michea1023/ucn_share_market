from datetime import datetime
from itertools import cycle
from django.contrib.auth import authenticate, login, logout
from rest_framework import generics, status
from .serializers import *
from rest_framework.views import APIView
from rest_framework.response import Response


def response(response: str):
    return {"response": response}

def exception(exception: str):
    return {"exception": exception}

def verify_rut(rut: str):
    rut = rut.upper();
    rut = rut.replace("-", "")
    rut = rut.replace(".", "")
    aux = rut[:-1]
    dv = rut[-1:]

    revertido = map(int, reversed(str(aux)))
    factors = cycle(range(2, 8))
    s = sum(d * f for d, f in zip(revertido, factors))
    res = (-s) % 11

    if str(res) == dv:
        return True
    elif dv == "K" and res == 10:
        return True
    else:
        return False

def cleaner_rut(rut: str):
    rut = rut.upper();
    rut = rut.replace("-", "")
    rut = rut.replace(".", "")
    return rut

def transfer(transaction, share_id, amount):
    transaction.active = False
    transaction.used_amount = transaction.amount
    if transaction.account_id is not None:
        account_share = ShareAccount.objects.filter(account_id=transaction.account_id, share_id=share_id)
        if account_share.count() > 0:
            account_share = account_share[0]
            account_share.amount += amount
            account_share.save(update_fields=['amount'])
        else:
            account_share = ShareAccount(account_id=transaction.account_id, share_id=share_id, amount=amount)
            account_share.save()
    transaction.save(update_fields=['active', 'used_amount'])

def make_transaction(buyer, seller, type_order):
    # añadir a la cartera
    if (buyer.price > seller.price):
        if (buyer.amount - buyer.used_amount) < (seller.amount - seller.used_amount):
            seller.used_amount = (buyer.amount - buyer.used_amount) + seller.used_amount
            seller.save(update_fields=['used_amount'])
            transfer(buyer, seller.share_id, buyer.amount)
        elif (buyer.amount - buyer.used_amount) < (seller.amount - seller.used_amount):
            buyer.used_amount = (seller.amount - seller.used_amount) + buyer.used_amount
            buyer.save(update_fields=['used_amount'])
            transfer(seller, buyer.share_id, seller.price - seller.fixed_com - seller.variabl_com)
        else:
            transfer(buyer, seller.share_id, buyer.amount)
            transfer(seller, buyer.share_id, seller.price - seller.fixed_com - seller.variabl_com)
        trans_table = TransactionTable.objects.get(id=buyer.trans_table_id)
        trans_table.market_val = buyer.price if type_order == 'B' else seller.price
        trans_table.save(update_fields=['market_val'])
        return True
    else:
        return False

def operate_trans(transaction, type_order):
    filtered_trans = Transaction.objects.filter(active=True, trans_table=transaction.trans_table,
                                                type_order='B' if type_order == 'S' else 'S').order_by(
        'price' if type_order == 'S' else '-price').exclude(account_id=transaction.account_id)
    if filtered_trans.count():
        if type_order == 'B':
            buyer = transaction
            seller = filtered_trans[0]
        else:
            buyer = filtered_trans[0]
            seller = transaction
        i = 0
        max = filtered_trans.count()
        while True:
            if make_transaction(buyer, seller, type_order):
                if type_order == 'B' and not buyer.active:
                    break
                elif type_order == 'S' and not seller.active:
                    break
                i += 1
                if i > max: break
                if type_order == 'B':
                    seller = filtered_trans[i]
                else:
                    buyer = filtered_trans[i]
            else:
                break

def cancel_transaction(transaction):
    share_account = ShareAccount.objects.get(account_id=transaction.account_id, share_id=transaction.share_id)
    if transaction.type_order == "B":
        share_account.amount += transaction.total + transaction.variabl_com + transaction.fixed_com
    else:
        share_account.amount += transaction.amount
    share_account.save(update_fields=['amount'])
    transaction.delete()


# get_transaction_API(name,precio_venta,name1)
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
        if password == password2 and verify_rut(rut):
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


class LogOutView(APIView):
    def get(self, request):
        user = request.user
        if user.is_authenticated:
            logout(request)
            return Response(response("NICE"), status=status.HTTP_200_OK)
        else:
            return Response(exception("User not authenticated"), status=status.HTTP_404_NOT_FOUND)


class LoginView(APIView):
    serializer_class = LoginSerializer

    def post(self, request, format=None):
        # data = json.loads(request.body.decode('utf-8'))
        data = request.data
        rut = cleaner_rut(data.get('rut'))
        password = data.get('password')
        user = authenticate(request, rut=rut, password=password)
        if user is not None:
            account = Account.objects.filter(rut=rut)[0]
            if account.active:
                login(request, user)
                account_share = ShareAccount.objects.filter(account=account).values_list('share', 'amount')
                shares = []
                if not account.staff:
                    for share, amount in account_share:
                        code = Share.objects.get(id=share).code
                        if code != 'CLP':
                            trans = TransactionTable.objects.get(share_buy="CLP", share_sell=code)
                            price = amount * trans.market_val
                        else:
                            price = amount
                        share = (code, amount, price)
                        shares.append(share)
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
                            "code": share,
                            "amount": round(amount, 2),
                            "price": round(price, 2)
                        } for share, amount, price in shares
                    ] if not account.staff else None
                }
                return Response(response, status=status.HTTP_200_OK)
            else:
                return Response(exception("user is blocked"), status=status.HTTP_406_NOT_ACCEPTABLE)
        else:
            return Response(exception("user not registered"), status=status.HTTP_404_NOT_FOUND)

    def get(self, request, format=None):
        account = request.user
        if account.is_authenticated:
            account_share = ShareAccount.objects.filter(account=account).values_list('share', 'amount')
            shares = []
            if not account.staff:
                for share, amount in account_share:
                    code = Share.objects.get(id=share).code
                    if code != 'CLP':
                        trans = TransactionTable.objects.get(share_buy="CLP", share_sell=code)
                        price = amount * trans.market_val
                    else:
                        price = amount
                    share = (code, amount, price)
                    shares.append(share)
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
                        "code": share,
                        "amount": round(amount, 2),
                        "price": round(price, 2)
                    } for share, amount, price in shares
                ] if not account.staff else None
            }
            return Response(response, status=status.HTTP_200_OK)
        else:
            return Response(exception("User not authenticated"), status=status.HTTP_404_NOT_FOUND)


class UpdateUserView(APIView):
    def post(self, request, format=None):
        data = request.data
        rut = cleaner_rut(data.get("rut"))
        account = Account.objects.filter(rut=rut)
        if account.exists():
            account = account[0]
            password = data.get("password1")
            password2 = data.get("password2")
            if password == password2:
                account.set_password(password)
                account.save()
                return Response(response("NICE"))
            else:
                return Response(exception("the passwords are not the same"))
        else:
            return Response(exception("user not registered"), status=status.HTTP_404_NOT_FOUND)


class TransactionView(APIView):
    serializer_class = TransactionSerializer

    def post(self, request, format=None):
        # Falta Hacer la transaccion
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            bought = serializer.data.get('share_buy')
            selled = serializer.data.get('share_sell')
            rut = cleaner_rut(serializer.data.get('rut'))
            price = serializer.data.get('price')
            amount = serializer.data.get('amount')
            type_order = serializer.data.get('type_order')
            vigency = serializer.data.get('vigency')
            account = Account.objects.filter(rut=rut)
            if account.exists():
                account = account[0]
                share_buy = Share.objects.filter(code=bought)
                share_sell = Share.objects.filter(code=selled)
                if share_buy.exists() and share_sell.exists():
                    query_table = TransactionTable.objects.filter(share_buy=bought, share_sell=selled, active=True)
                    if query_table.exists():
                        if type_order == "B":
                            share = share_buy[0]
                        else:
                            share = share_sell[0]

                        share_account = ShareAccount.objects.filter(account=account, share=share)
                        total = amount * price

                        if share_account.exists():
                            share_account = share_account[0]
                            if total < Settings.objects.get(name="maximum_value_transfer").value:
                                today = datetime.now()
                                if datetime.strptime(vigency, "%Y-%m-%dT%H:%M:%SZ") > today:
                                    if type_order == 'B' and share_account.amount > total:
                                        share_account.amount -= (total + Settings.objects.get(
                                            name='fixed_commission').value + Settings.objects.get(
                                            name='variable_commission').value)
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
                                        fixed_com=Settings.objects.get(name="fixed_commission").value,
                                        variabl_com=total * Settings.objects.get(name="variable_commission").value,
                                        type_order=type_order,
                                        vigency=vigency
                                    )
                                    transaction.save()
                                    operate_trans(transaction, type_order)
                                    return Response(response("NICE"), status=status.HTTP_201_CREATED)
                                else:
                                    return Response(exception("solo se puede dar vigencia a dias posteriores a este"),
                                                    status=status.HTTP_400_BAD_REQUEST)
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

    def get(self, request, event_id=None, format=None):
        user = request.user
        if user.is_authenticated:
            queryset = Transaction.objects.filter(account=user)
            out = {
                "active": [],
                "inactive": []
            }
            for i in range(queryset.count()):
                data = TransSerializer(queryset[i]).data
                data["account"] = user.rut
                transtable = TransactionTable.objects.get(id=data["trans_table"])
                data["badge"] = transtable.share_buy
                data["share"] = transtable.share_sell
                data["market_val"] = transtable.market_val
                del data["trans_table"]
                if data.get("active"):
                    out.get("active").append(data)
                else:
                    out.get("inactive").append(data)
            return Response(out, status=status.HTTP_200_OK)
        else:
            return Response(exception("you aren't an administrator"), status=status.HTTP_405_METHOD_NOT_ALLOWED)

    def delete(self, request, event_id=None, format=None):
        user = request.user
        if user.is_authenticated:
            transaction = Transaction.objects.filter(id=event_id, active=True)
            if transaction.exists():
                cancel_transaction(transaction[0])
            return Response(response("delete: " + event_id))


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

    # put
    def post(self, request):
        user = request.user
        if user.is_authenticated and user.staff:
            rut = request.data.get('rut')
            block = request.data.get('block')
            account = Account.objects.get(rut=rut)
            account.active = not block
            account.save(update_fields=['active'])
            return Response(response("blocked" if block else "unblocked"), status=status.HTTP_200_OK)
        else:
            return Response(exception("you aren't an administrator"), status=status.HTTP_405_METHOD_NOT_ALLOWED)


class ShareView(APIView):
    queryset = Share.objects.all()
    serializer_class = ShareSerializer

    def get(self, request, format=None):
        out = []
        for i in range(self.queryset.count()):
            data = self.serializer_class(self.queryset[i]).data
            transtable = TransactionTable.objects.filter(share_sell=data.get("code"))
            if transtable.exists():
                if transtable[0].active:
                    out.append(data)
        return Response(out, status=status.HTTP_200_OK)

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


class TransTableView(APIView):
    serializer_class = TransTableSerializer
    queryset = TransactionTable.objects.exclude(active=False)

    def post(self, request, format=None):
        # Modificar
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

    def get(self, request, format=None):
        out = []
        for i in range(self.queryset.count()):
            data = self.serializer_class(self.queryset[i]).data
            data['name'] = str(self.queryset[i])
            del data['share_buy'], data['share_sell']
            out.append(data)
        return Response(out, status=status.HTTP_200_OK)


class SettingView(APIView):
    lookup_url_kwarg = 'query'

    # put
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
        # (request = ('query'))
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
            elif query == 'com':  # commission
                return Response({
                    'variable_commission': data.get(name="variable_commission").value,
                    'fixed_commission': data.get(name="fixed_commission").value
                }, status=status.HTTP_200_OK)
            elif query == 'mvt':  # maximum value transference
                return Response({"maximum_value_transfer": data.get(name="maximum_value_transfer").value},
                                status=status.HTTP_200_OK)
            elif query == 'miv':  # maximum init value
                return Response({"maximum_init_value": data.get(name="maximum_init_value").value},
                                status=status.HTTP_200_OK)
            else:
                return Response(exception("invalid query code"), status=status.HTTP_404_NOT_FOUND)
        return Response(exception('query parameter not found in request'), status=status.HTTP_400_BAD_REQUEST)



