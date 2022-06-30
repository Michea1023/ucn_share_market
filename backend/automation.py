#from celery import Celery
#from celery.schedules import crontab
from rest_framework import status
from rest_framework.response import Response
from .models import *

"""
def auto_transaction():
    queryset = TransactionTable.objects.all().extra(where={"account <> NULL"})
    return Response(queryset, status=status.HTTP_200_OK)
"""