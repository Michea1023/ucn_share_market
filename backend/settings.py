import json

class SETTING(float):
    def __init__(self, value):
        self.value = value

    def __get__(self, instance, owner):
        return self.value

    def __set__(self, instance, value):
        self.value = value


def read():
    json_data = open('../ucn_share_market/backend/setting.json')
    out = json.load(json_data)
    json_data.close()
    return out

data_settings = read()

MAXIMUM_VALUE_TRANSFERENCE = SETTING(data_settings["maximum_value_transfer"])
MAXIMUM_INIT_VALUE = SETTING(data_settings["maximum_init_value"])
VARIABLE_COMMISSION = SETTING(data_settings["variable_commission"])
FIXED_COMMISSION = SETTING(data_settings["fixed_commission"])