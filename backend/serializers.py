from rest_framework import serializers
from .models import *

class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ('user', 'mail', 'type_account', 'name', 'last_name', 'career', 'is_blocked')


class ShareSerializer(serializers.ModelSerializer):
    class Meta:
        model = Share
        fields = ('code', 'name')

"""
class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ('id', 'is_active', 'datetime', 'share_selled', 'share_buyed', 'account_seller', 'account_buyer', 'share_sell_amount', 'share_buy_amount')
"""

class ShareAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShareAccount
        fields = ('id', 'account', 'share', 'amount')
