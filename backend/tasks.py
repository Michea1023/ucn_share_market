from apscheduler.schedulers.background import BackgroundScheduler
from datetime import datetime
from .models import Transaction, Share, TransactionTable, ShareAccount
from .services import ConsultasAPI
from .views import operate_trans, cancel_transaction

def bubble_sort(arr1,precio1):
    """
    Ordenamiento Burbuja
    :param arr1:
    :param precio1:
    :return:
    """
    n = len(arr1)
    for i in range(n - 1):
        for j in range(n - i - 1):
            if arr1[j] > arr1[j + 1]:
                arr1[j],arr1[j + 1] = arr1[j+1], arr1[j]
                precio1[j],precio1[j + 1] = precio1[j+1], precio1[j]
    return

def get_transaction_API():
    """
    Obtiene los datos de la API
    :return:
    """
    # cargar la api key desde las variables de entorno del sistma
    api_key = 'CC50A4DF46274CE79682FEA8A1A5B0F3'  # os.environ['API_BS']
    # Creación de la instancia que manipulara las solicitudes a la API
    con_bs = ConsultasAPI(token=api_key)
    resp = con_bs.get_puntas_rv()

    # Obtiene las acciones
    name = []
    precio_venta = []
    for sub in resp:
        name.append(sub.get("instrumento"))
        precio_venta.append(sub.get("precioVenta"))

    # Obtiene la variacion diaria
    resp2 = con_bs.get_instrumentos_rv()
    instruments = []
    imbalance = []
    for sub2 in resp2:
        instruments.append(sub2.get("instruments"))
        imbalance.append(sub2.get("imbalance"))

    bubble_sort(instruments,imbalance)

    return name,precio_venta,imbalance

# peridic task
def canceler():
    """
    Cancela las transacciones que estan caducadas
    :return:
    """
    today = datetime.now()
    operative_trans = Transaction.objects.filter(active=True)
    for i in range(operative_trans.count()):
        if datetime.strptime(operative_trans[i].vigency, "%Y-%m-%dT%H:%M:%SZ") < today:
            cancel_transaction(operative_trans[i])

def update_transtable():
    """
    Actualiza las acciones y las relaciones entre acciones que vienen desde la API de la bolsa de santiago
    :return:
    """
    name, precio_venta, inbalance = get_transaction_API()
    # Crea las acciones que no se encuentran en la base de datos
    for j in range(len(name)):
        queryset = Share.objects.filter(code=name[j])
        if not queryset.exists():
            share1 = Share.objects.create(code=name[j], name=name[j])
            share1.save()

    # Actualiza las relaciones entre acciones
    for i in range(len(name)):
        # Comprueba si la relacion entre la accion i y la CLP existe
        queryset = TransactionTable.objects.filter(share_buy='CLP', share_sell=name[i])
        if not queryset.exists():
            active = True if precio_venta[i] == 0 else False # Comprueba si la accion esta activa
            trans_table = TransactionTable.objects.create(share_buy='CLP', share_sell=name[i], market_val=precio_venta[i],
                                                          diary_rent=inbalance[i], active=active)
            trans_table.save()
        else:
            tt = queryset[0]
            tt.market_val = precio_venta[i]
            tt.diary_rent = inbalance[i]
            if precio_venta[i] == 0: # Comprueba si la accion esta activa
                tt.active = False
            else:
                tt.active = True
            tt.save(update_fields=['market_val', 'diary_rent', "active"])

def generate_false_data():
    """
    Genera datos falsos obtenidos de la API de la bolsa de Santiago
    :return:
    """
    # Consulta a la API
    api_key = 'CC50A4DF46274CE79682FEA8A1A5B0F3'
    con_bs = ConsultasAPI(token=api_key)
    resp1 = con_bs.get_transacciones_rv()

    # recorre la lista de transacciones de la API
    for sub1 in resp1:
        price = sub1.get("price")
        amount = sub1.get("quantity")
        active = sub1.get("action") == 'I'
        start_date = datetime.strptime(sub1.get("timeStamp")[:-1], '%Y%m%d%H%M%S%f')
        total = sub1.get("amount")
        share_code = sub1.get("instrument")
        share = Share.objects.get(code=share_code)
        # Crea la transaccion
        table_trans = TransactionTable.objects.get(share_buy="CLP", share_sell=share_code)
        transaccion = Transaction(share=share, active=active, price=price, amount=amount, start_date=start_date,
                                  total=total, trans_table=table_trans, type_order='S', fixed_com=0, variabl_com=0)
        transaccion.save()
        # Opera la transaccion
        operate_trans(transaccion, 'S')
    return

def delete_trash_data():
    """
    Elimina las transferencias que no tienen usuario
    :return:
    """
    Transaction.objects.filter(account_id=None).delete()

def start():
    """
    Realiza las tareas con cierto intervalo
    :return:
    """
    scheduler = BackgroundScheduler()
    scheduler.add_job(canceler, 'interval', hours=6)
    scheduler.add_job(update_transtable, 'interval', days=1)
    scheduler.add_job(delete_trash_data, 'interval', days=3)
    scheduler.add_job(generate_false_data, 'interval', days=1)
    scheduler.start()
