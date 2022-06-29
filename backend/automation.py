from celery import Celery
from celery.schedules import crontab
from .settings import *


def write(data):
    json_data = open('../ucn_share_market/backend/setting.json', 'w')
    data["maximum_value_transfer"]= MAXIMUM_VALUE_TRANSFERENCE
    data["maximum_init_value"] = MAXIMUM_INIT_VALUE
    data["variable_commission"] = VARIABLE_COMMISSION
    data["fixed_commission"] = FIXED_COMMISSION
    json.dump(data,json_data)
    print(data)
    json_data.close()

