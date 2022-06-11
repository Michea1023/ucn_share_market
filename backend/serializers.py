from rest_framework import serializers
from django.contrib.auth.models import User
from .models import *

# Model Serializer
"""class AccountSerializer(serializers.ModelSerializer):
    type_account = serializers.SerializerMethodField()
    career = serializers.SerializerMethodField()

    class Meta:
        model = Account
        fields = ('user', 'mail', 'type_account', 'name', 'last_name', 'career', 'is_blocked')

    def get_type_account(self, obj):
        return obj.get_type_account_display()

    def get_career(self, obj):
        return obj.get_career_display()
"""

class ShareSerializer(serializers.ModelSerializer):
    class Meta:
        model = Share
        fields = ('code', 'name')


class ShareAccountSerializer(serializers.ModelSerializer):
    share = serializers.SerializerMethodField()

    class Meta:
        model = ShareAccount
        fields = ('id', 'account', 'share', 'code', 'amount')

    def get_share(self, obj):
        return ShareSerializer(obj.item).data

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ('id', 'is_active', 'start_date', 'end_date', 'days_vigency')


class OrderAccountSerializer(serializers.ModelSerializer):
    order = serializers.SerializerMethodField()
    share = serializers.SerializerMethodField()
    type_order = serializers.SerializerMethodField()

    class Meta:
        model = OrderAccount
        fields = ('id', 'order', 'share', 'account', 'amount', 'type_order')

    def get_order(self, obj):
        return OrderSerializer(obj.order).data

    def get_share(self, obj):
        return ShareSerializer(obj.item).data

    def get_type_order(self, obj):
        return obj.get_type_order_display()



# Creators
"""
class CreateAccountSerializer(serializers.ModelSerializer):
    class Meta:
        
    
"""
