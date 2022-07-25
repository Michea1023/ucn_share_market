from datetime import datetime
from itertools import cycle
from django.contrib.auth import authenticate, login, logout
from rest_framework import generics, status
from .serializers import *
from rest_framework.views import APIView
from rest_framework.response import Response


def response(response: str):
    """
    retorna un diccionario con la respuesta ingresada
    :param response: str
    :return: dict
    """
    return {"response": response}

def exception(exception: str):
    """
    retorna un diccionario con la excepcion ingresada
    :param exception: str
    :return: dict
    """
    return {"exception": exception}

def verify_rut(rut: str):
    """
    retorna verdaderos si el rut ingresado es correcto
    :param rut: str
    :return: bool
    """
    # Se eliminan los caracteres innecesarios
    rut = rut.upper();
    rut = rut.replace("-", "")
    rut = rut.replace(".", "")
    aux = rut[:-1]
    dv = rut[-1:]

    # Se verifica el rut
    revertido = map(int, reversed(str(aux)))
    factors = cycle(range(2, 8))
    s = sum(d * f for d, f in zip(revertido, factors))
    res = (-s) % 11

    # se retorna si el rut es correcto
    if str(res) == dv:
        return True
    elif dv == "K" and res == 10:
        return True
    else:
        return False

def cleaner_rut(rut: str):
    """
    Limpia el rut ingresado
    :param rut: str
    :return: str
    """
    rut = rut.upper();
    rut = rut.replace("-", "")
    rut = rut.replace(".", "")
    return rut

def transfer(transaction, share_id, amount):
    """
    Realiza la transaccion
    :param transaction: Transaction
    :param share_id: str
    :param amount: float
    :return: None
    """
    transaction.active = False
    transaction.used_amount = transaction.amount
    # Actualiza la cartera del usuario si es que existe
    if transaction.account_id is not None:
        account_share = ShareAccount.objects.filter(account_id=transaction.account_id, share_id=share_id)
        # Comprueba si existe la cartera del usuario para cierta accion
        if account_share.count() > 0:
            account_share = account_share[0]
            account_share.amount += amount
            account_share.save(update_fields=['amount'])
        else:
            account_share = ShareAccount(account_id=transaction.account_id, share_id=share_id, amount=amount)
            account_share.save()
    transaction.save(update_fields=['active', 'used_amount'])

def make_transaction(buyer, seller, type_order):
    """
    retorna si se puede realizar la operacion para este buyer y seller
    :param buyer: Transaction
    :param seller: Transaction
    :param type_order: str
    :return: bool
    """
    # Comprueba si se puede realizar la operacion
    if (buyer.price >= seller.price):
        # Comprueba que tipo de caso es
        if (buyer.amount - buyer.used_amount) < (seller.amount - seller.used_amount):
            # Entra aqui si la transaccion de compra tiene menos acciones disponibles que la transaccion de venta
            seller.used_amount = (buyer.amount - buyer.used_amount) + seller.used_amount
            seller.save(update_fields=['used_amount'])
            transfer(buyer, seller.share_id, buyer.amount)
        elif (buyer.amount - buyer.used_amount) < (seller.amount - seller.used_amount):
            # Entra aqui si la transaccion de compra tiene mas acciones disponibles que la transaccion de venta
            buyer.used_amount = (seller.amount - seller.used_amount) + buyer.used_amount
            buyer.save(update_fields=['used_amount'])
            transfer(seller, buyer.share_id, seller.price - seller.fixed_com - seller.variabl_com)
        else:
            # Entra aqui la transaccion de compra tiene la misma acciones disponibles que la transaccion de venta
            transfer(buyer, seller.share_id, buyer.amount)
            transfer(seller, buyer.share_id, seller.price - seller.fixed_com - seller.variabl_com)
        # Actualiza el valor de mercado
        trans_table = TransactionTable.objects.get(id=buyer.trans_table_id)
        trans_table.market_val = buyer.price if type_order == 'B' else seller.price
        trans_table.save(update_fields=['market_val'])
        return True
    else:
        return False

def operate_trans(transaction, type_order):
    """
    Verifica si existe una trasaccion para realizar la operacion necesaria para transaction
    :param transaction: Transaction
    :param type_order: str
    :return: None
    """
    # Consulta a la base de datos si existen transacciones posibles y activas
    # La consulta esta ordenada segun el tipo de operacion
    # si la operacion es venta se ordena de menor a mayor
    # si la operacion es venta se ordena de mayor a menor
    filtered_trans = Transaction.objects.filter(active=True, trans_table=transaction.trans_table,
                                                type_order='B' if type_order == 'S' else 'S').order_by(
        'price' if type_order == 'S' else '-price').exclude(account_id=transaction.account_id)
    if filtered_trans.exists():
        # Ordena las variables
        if type_order == 'B':
            buyer = transaction
            seller = filtered_trans[0]
        else:
            buyer = filtered_trans[0]
            seller = transaction
        i = 0
        max = filtered_trans.count()
        # recorre la tabla de transacciones
        while True:
            # comprueba si se puede realizar la transaccion, en el caso contrario detiene el recorrido
            if make_transaction(buyer, seller, type_order):
                # compureba si la transaccion que realiza la transferencia sigue activa
                # sino se detiene
                if type_order == 'B' and not buyer.active:
                    break
                elif type_order == 'S' and not seller.active:
                    break
                i += 1
                # Comprueba si llego al limite
                if i > max: break
                # Ordena las variables
                if type_order == 'B':
                    seller = filtered_trans[i]
                else:
                    buyer = filtered_trans[i]
            else:
                break

def cancel_transaction(transaction):
    """
    cancela transaction y la elimina de la base de datos
    :param transaction: Transaction
    :return: None
    """
    # Actualiza la cartera del usuario
    share_account = ShareAccount.objects.get(account_id=transaction.account_id, share_id=transaction.share_id)
    if transaction.type_order == "B":
        share_account.amount += transaction.total + transaction.variabl_com + transaction.fixed_com
    else:
        share_account.amount += transaction.amount
    share_account.save(update_fields=['amount'])
    # Elimina la transaccion
    transaction.delete()


# Create your views here.
class RegisterView(APIView):
    """
    Administra las peticiones de que se dirigen a /api/share
    """
    serializer_class = RegisterSerializer

    def post(self, request, format=None):
        """
        Registra al usuario
        :param request: peticion
        :param format:
        :return: Response
        """
        # Obtiene los datos que necesita de la peticion
        # data = json.loads(request.body.decode('utf-8'))
        data = request.data
        rut = data.get('rut')
        password = data.get('password')
        password2 = data.get('password2')
        email = data.get('email')
        full_name = data.get('full_name')
        career = data.get('career')
        staff = data.get('staff')
        # Comprueba si el rut es legal y si la contraseña 1 es igual a la 2
        if password == password2 and verify_rut(rut):
            # Comprueba si existe el rut o el email
            if Account.objects.filter(rut=rut).exists():
                return Response(exception("rut already used"), status=status.HTTP_406_NOT_ACCEPTABLE)
            elif Account.objects.filter(email=email).exists():
                return Response(exception("email already used"), status=status.HTTP_406_NOT_ACCEPTABLE)
            else:
                # Comprueba si es staff==administrador
                if (staff):
                    user = Account.objects.create_staffuser(rut, email, full_name, password=password)
                else:
                    user = Account.objects.create_user(rut, email, full_name, career=career, password=password)
                # Se logea en Django
                login(request, user)
                # Crea una cuenta con el maximo inicial de CLP
                share = Share.objects.filter(code='CLP')[0]
                account_share = ShareAccount(
                    account=user,
                    share=share,
                    amount=Settings.objects.get(name="maximum_init_value").value
                )
                account_share.save()
                # Realiza la respuesta
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
    """
    Administra las peticiones de que se dirigen a /api/logout
    """
    def get(self, request):
        """
        Desloguea al usuario
        :param request: peticion
        :return: Response
        """
        # Obtiene el usuario
        user = request.user
        # Comprueba si esta logueado
        if user.is_authenticated:
            # Desloguea al usuario
            logout(request)
            return Response(response("NICE"), status=status.HTTP_200_OK)
        else:
            return Response(exception("User not authenticated"), status=status.HTTP_404_NOT_FOUND)


class LoginView(APIView):
    """
    Administra las peticiones de que se dirigen a /api/login
    """
    serializer_class = LoginSerializer

    def post(self, request, format=None):
        """
        Loguea al usuario
        :param request: peticion
        :param format:
        :return: Response
        """
        # Obtiene los datos que necesita de la peticion
        # data = json.loads(request.body.decode('utf-8'))
        data = request.data
        rut = cleaner_rut(data.get('rut'))
        password = data.get('password')
        user = authenticate(request, rut=rut, password=password)
        # Autentica al usuario
        if user is not None:
            # Comprueba si el usuario esta activa
            account = Account.objects.filter(rut=rut)[0]
            if account.active:
                # Loguea al usuario
                login(request, user)
                # Obtiene la lista de carteras que tiene el usuario
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
                # Realiza la respuesta
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
        """
        POR SI EL FRONTEND REQUIERE LA INFO DEL USUARIO
        :param request: peticion
        :param format:
        :return: Response
        """
        account = request.user
        # Comprueba si el usario esta logueado
        if account.is_authenticated:
            # Obtiene la lista de carteras que tiene el usuario
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

            # Realiza la respuesta
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
    """
    Administra las peticiones de que se dirigen a /api/change-password
    """
    def post(self, request, format=None):
        """
        Cambia la contraseña para el usuario
        :param request: peticion
        :param format:
        :return: Response
        """
        #Obtiene los datos necesarios
        data = request.data
        rut = cleaner_rut(data.get("rut"))
        account = Account.objects.filter(rut=rut)
        # Comprueba si el usuario existe
        if account.exists():
            # Realiza el cambio de contraseña
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
    """
    Administra las peticiones de que se dirigen a /api/transaction
    Administra las peticiones de que se dirigen a /api/transaction/<event_id>
    """
    serializer_class = TransactionSerializer

    def post(self, request, event_id=None, format=None):
        """
        Ingresa la transaccion a la base de datos
        :param request: peticion
        :param event_id: event_id -> integer
        :param format:
        :return: Response
        """
        serializer = self.serializer_class(data=request.data)
        # Comprueba si los datos son validos
        if serializer.is_valid():
            # Obtiene los datos que necesita de la peticion
            bought = serializer.data.get('share_buy')
            selled = serializer.data.get('share_sell')
            rut = cleaner_rut(serializer.data.get('rut'))
            price = serializer.data.get('price')
            amount = serializer.data.get('amount')
            type_order = serializer.data.get('type_order')
            vigency = serializer.data.get('vigency')
            account = Account.objects.filter(rut=rut)
            # Comprueba si existe la cuenta
            if account.exists():
                account = account[0]
                # Consulta sobre datos necesarios y compruba si existen
                share_buy = Share.objects.filter(code=bought) # share_used_to_buy
                share_sell = Share.objects.filter(code=selled) # share_used_to_sell
                if share_buy.exists() and share_sell.exists():
                    # Consulta si existe la relacion entre share_sell y share_buy
                    query_table = TransactionTable.objects.filter(share_buy=bought, share_sell=selled, active=True)
                    if query_table.exists():
                        # Ordena variables
                        if type_order == "B":
                            share = share_buy[0]
                        else:
                            share = share_sell[0]
                        # Obtiene la cartera con la accion share y comprueba si existe
                        share_account = ShareAccount.objects.filter(account=account, share=share)
                        total = amount * price
                        if share_account.exists():
                            share_account = share_account[0]
                            # Verifica si el total es menor que el valor maximo de transferencia
                            if total < Settings.objects.get(name="maximum_value_transfer").value:
                                # Verifica si vigencia es valida
                                today = datetime.now()
                                if datetime.strptime(vigency, "%Y-%m-%dT%H:%M:%SZ") > today:
                                    # Verifica y Actualiza la cuenta del usuario que contiene share
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
                                    # Crea la transaccion
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
                                    # Revisa si se puede operar la transaccion
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
        """
        Obtiene la lista de transacciones activas e inactivas del usuario
        :param request: peticion
        :param event_id: event_id -> integer
        :param format:
        :return: Response
        """
        # Verifica si el usuario esta autenticado
        user = request.user
        if user.is_authenticated:
            # Consulta las transferencias del usuario user
            queryset = Transaction.objects.filter(account=user)
            out = {
                "active": [],
                "inactive": []
            }
            for i in range(queryset.count()):
                # Ordena los datos para devolver
                data = TransSerializer(queryset[i]).data
                data["account"] = user.rut
                transtable = TransactionTable.objects.get(id=data["trans_table"])
                data["badge"] = transtable.share_buy
                data["share"] = transtable.share_sell
                data["market_val"] = transtable.market_val
                del data["trans_table"]
                # Verifica si esta activa y la añade a la lista correspondiente
                if data.get("active"):
                    out.get("active").append(data)
                else:
                    out.get("inactive").append(data)
            return Response(out, status=status.HTTP_200_OK)
        else:
            return Response(exception("you aren't an administrator"), status=status.HTTP_405_METHOD_NOT_ALLOWED)

    def delete(self, request, event_id=None, format=None):
        """
        Cancela la transferencia con el id=event_id
        :param request: peticion
        :param event_id: event_id -> integer
        :param format:
        :return: Response
        """
        # Comprueba si el usuario esta autenticado
        user = request.user
        if user.is_authenticated:
            # Comprueba si existe la transaccion
            transaction = Transaction.objects.filter(id=event_id, active=True)
            if transaction.exists():
                cancel_transaction(transaction[0]) # Cancela la transaccion
            return Response(response("delete: " + event_id))


class ControlUsersView(APIView):
    """
    Administra las peticiones de que se dirigen a /api/control-users
    """
    serializer_class = BlockSerializer
    queryset = Account.objects.filter(staff=False)

    def get(self, request):
        """
        Obtiene la lista de usuarios
        :param request: peticion
        :return: Response
        """
        # Comprueba si el usuario es staff == administrador
        user = request.user
        if user.is_authenticated and user.staff:
            # Añade la lista de usuarios para realizar la respuesta
            out = []
            for i in range(self.queryset.count()):
                data = AccountSerializer(self.queryset[i]).data
                out.append(data)
            return Response(out, status=status.HTTP_200_OK)
        else:
            return Response(exception("you aren't an administrator"), status=status.HTTP_405_METHOD_NOT_ALLOWED)

    # put
    def post(self, request):
        """
        Bloquea al usuario
        :param request: peticion
        :return: Response
        """
        # Comprueba si el usuario es staff == administrador
        user = request.user
        if user.is_authenticated and user.staff:
            # Bloquea al usuario
            rut = request.data.get('rut')
            block = request.data.get('block')
            account = Account.objects.get(rut=rut)
            account.active = not block
            account.save(update_fields=['active'])
            return Response(response("blocked" if block else "unblocked"), status=status.HTTP_200_OK)
        else:
            return Response(exception("you aren't an administrator"), status=status.HTTP_405_METHOD_NOT_ALLOWED)


class ShareView(APIView):
    """
    Administra las peticiones de que se dirigen a /api/share
    """
    queryset = Share.objects.all()
    serializer_class = ShareSerializer

    def get(self, request, format=None):
        """
        Obtiene la lista de acciones activas
        :param request: peticion
        :param format:
        :return: Response
        """
        # Añade la lista de acciones para responder
        out = []
        for i in range(self.queryset.count()):
            data = self.serializer_class(self.queryset[i]).data
            # Comprueba si la relacion <share> esta activa con alguna otra
            transtable = TransactionTable.objects.filter(share_sell=data.get("code"), active=True)
            if transtable.exists():
                out.append(data)
        return Response(out, status=status.HTTP_200_OK)


class TransTableView(APIView):
    """
    Administra las peticiones de que se dirigen a /api/transaction-table
    """
    serializer_class = TransTableSerializer
    queryset = TransactionTable.objects.exclude(active=False)

    def get(self, request, format=None):
        """
        Retorna la lista de relaciones entre acciones
        :param request:
        :param format:
        :return:
        """
        # Añade a la lista de relaciones entre acciones para poder responder
        out = []
        for i in range(self.queryset.count()):
            data = self.serializer_class(self.queryset[i]).data
            data['name'] = str(self.queryset[i])
            del data['share_buy'], data['share_sell']
            out.append(data)
        return Response(out, status=status.HTTP_200_OK)


class SettingView(APIView):
    """
    Administra las peticiones de que se dirigen a /api/setting
    Administra las peticiones de que se dirigen a /api/setting/query?query=<Consulta>
    """
    lookup_url_kwarg = 'query'

    # put
    def post(self, request, format=None):
        """
        Actualiza las configuraciones de la plataforma
        :param request:
        :param format:
        :return:
        """
        # Comprueba si el usuario es staff == administrador
        user = request.user
        if user.is_authenticated and user.staff:
            # Optiene los datos
            data = request.data
            settings = Settings.objects.all()

            # Actualiza la comision variable
            if data.get("variable_commission") is not None:
                var_commission = settings.get(name="variable_commission")
                var_commission.value = data.get("variable_commission")
                var_commission.save(update_fields=['value'])

            # Actualiza la comision fija
            if data.get("fixed_commission") is not None:
                fixed_commission = settings.get(name="fixed_commission")
                fixed_commission.value = data.get("fixed_commission")
                fixed_commission.save(update_fields=['value'])

            # Actualiza el valor inicial maximo
            if data.get("maximum_init_value") is not None:
                maximum_init_value = settings.get(name="maximum_init_value")
                maximum_init_value.value = data.get("maximum_init_value")
                maximum_init_value.save(update_fields=['value'])

            # Actualiza el valor maximo de transferencia
            if data.get("maximum_value_transfer") is not None:
                maximum_value_transfer = settings.get(name="maximum_value_transfer")
                maximum_value_transfer.value = data.get("maximum_value_transfer")
                maximum_value_transfer.save(update_fields=['value'])
            return Response(data, status=status.HTTP_200_OK)

        else:
            return Response(exception("you aren't an administrator"), status=status.HTTP_405_METHOD_NOT_ALLOWED)

    def get(self, request, format=None):
        """
        Obtiene las configuraciones segun el tipo de consulta
        :param request:
        :param format:
        :return:
        """
        # (request = ('query'))'
        # Obtiene la consulta
        query = request.GET.get(self.lookup_url_kwarg)
        if query != None:
            # Comprueba que tipo de consulta es
            data = Settings.objects.all()
            # Consulta Total
            if query == 'all':
                return Response({
                    "maximum_value_transfer": data.get(name="maximum_value_transfer").value,
                    "maximum_init_value": data.get(name="maximum_init_value").value,
                    "variable_commission": data.get(name="variable_commission").value,
                    "fixed_commission": data.get(name="fixed_commission").value
                }, status=status.HTTP_200_OK)
            # Consulta de Comissiones
            elif query == 'com':
                return Response({
                    'variable_commission': data.get(name="variable_commission").value,
                    'fixed_commission': data.get(name="fixed_commission").value
                }, status=status.HTTP_200_OK)
            # Consulta del valor maximo de transferencia
            elif query == 'mvt':  # maximum value transference
                return Response({"maximum_value_transfer": data.get(name="maximum_value_transfer").value},
                                status=status.HTTP_200_OK)
            # Consulta del maximo valor inicial
            elif query == 'miv':
                return Response({"maximum_init_value": data.get(name="maximum_init_value").value},
                                status=status.HTTP_200_OK)
            else:
                return Response(exception("invalid query code"), status=status.HTTP_404_NOT_FOUND)
        return Response(exception('query parameter not found in request'), status=status.HTTP_400_BAD_REQUEST)



