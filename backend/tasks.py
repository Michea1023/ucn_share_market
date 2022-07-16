from __future__ import absolute_import, unicode_literals
from celery import shared_task
from ucn_share_market.celery import app
from .models import *

@app.task(bind=True)
def printer():
    print("xd")
    return


"""
def auto_transaction():
    queryset = TransactionTable.objects.all().extra(where={"account <> NULL"})
    return Response(queryset, status=status.HTTP_200_OK)
"""