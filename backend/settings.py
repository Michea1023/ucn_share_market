import json

def read():
    json_data = open('../ucn_share_market/backend/setting.json')
    out = json.load(json_data)
    json_data.close()
    return out

data = read()

class SETTING(float):
    def __init__(self, value):
        self.value = value
    
    def __get__(self, instance, owner):
        return self.value

    def __set__(self, instance, value):
        self.value = value


MAXIMUM_VALUE_TRANSFERENCE = SETTING(data["maximum_value_transfer"])
MAXIMUM_INIT_VALUE = SETTING(data["maximum_init_value"])
VARIABLE_COMMISSION = SETTING(data["variable_commission"])
FIXED_COMMISSION = SETTING(data["fixed_commission"])