from apscheduler.schedulers.background import BackgroundScheduler
from datetime import datetime
from .models import Transaction, Share, TransactionTable, ShareAccount
from .services import ConsultasAPI
from .views import operate_trans, cancel_transaction

def bubble_sort(arr1,precio1):
    n = len(arr1)
    for i in range(n - 1):
        for j in range(n - i - 1):
            if arr1[j] > arr1[j + 1]:
                arr1[j],arr1[j + 1] = arr1[j+1], arr1[j]
                precio1[j],precio1[j + 1] = precio1[j+1], precio1[j]
    return

def get_transaction_API():
    # cargar la api key desde las variables de entorno del sistma
    api_key = '0F2A8BD687B242A29B785285FACC0ED6'  # os.environ['API_BS']
    # Creación de la instancia que manipulara las solicitudes a la API
    con_bs = ConsultasAPI(token=api_key)
    resp = con_bs.get_puntas_rv()

    name = []
    precio_venta = []
    for sub in resp:
        name.append(sub.get("instrumento"))
        precio_venta.append(sub.get("precioVenta"))

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
    today = datetime.now()
    operative_trans = Transaction.objects.filter(active=True)
    for i in range(operative_trans.count()):
        if datetime.strptime(operative_trans[i].vigency, "%Y-%m-%dT%H:%M:%SZ") < today:
            cancel_transaction(operative_trans[i])

def update_transtable():
    name, precio_venta, inbalance = get_transaction_API()
    for j in range(len(name)):
        queryset = Share.objects.filter(code=name[j])
        if not queryset.exists():
            share1 = Share.objects.create(code=name[j], name=name[j])
            share1.save()

    for i in range(len(name)):
        queryset = TransactionTable.objects.filter(share_buy='CLP', share_sell=name[i])
        if not queryset.exists():
            active = True if precio_venta[i] == 0 else False
            trans_table = TransactionTable.objects.create(share_buy='CLP', share_sell=name[i], market_val=precio_venta[i],
                                                          diary_rent=inbalance[i], active=active)
            trans_table.save()
        else:
            tt = queryset[0]
            tt.market_val = precio_venta[i]
            tt.diary_rent = inbalance[i]
            if precio_venta[i] == 0:
                tt.active = False
            else:
                tt.active = True

            tt.save(update_fields=['market_val', 'diary_rent', "active"])

def generate_false_data():
    api_key = '0F2A8BD687B242A29B785285FACC0ED6'
    con_bs = ConsultasAPI(token=api_key)
    resp1 = con_bs.get_transacciones_rv()
    for sub1 in resp1:
        price = sub1.get("price")
        amount = sub1.get("quantity")
        active = sub1.get("action") == 'I'
        start_date = datetime.strptime(sub1.get("timeStamp")[:-1], '%Y%m%d%H%M%S%f')
        total = sub1.get("amount")
        share_code = sub1.get("instrument")
        share = Share.objects.get(code=share_code)
        table_trans = TransactionTable.objects.get(share_buy="CLP", share_sell=share_code)
        transaccion = Transaction(share=share, active=active, price=price, amount=amount, start_date=start_date,
                                  total=total, trans_table=table_trans, type_order='S', fixed_com=0, variabl_com=0)
        transaccion.save()
        operate_trans(transaccion, 'S')
    return

def delete_trash_data():
    Transaction.objects.filter(account_id=None).delete()


def start():
    scheduler = BackgroundScheduler()
    scheduler.add_job(canceler, 'interval', hours=6)
    scheduler.add_job(delete_trash_data, 'interval', days=3)
    scheduler.add_job(generate_false_data, 'interval', days=1)
    scheduler.add_job(update_transtable, 'interval', days=1)
    scheduler.start()
