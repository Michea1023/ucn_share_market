from rest_framework import serializers
from django.contrib.auth.models import User
from .models import *

# Model Serializer
class RegisterSerializer(serializers.ModelSerializer):
    password2   = serializers.CharField(style={'input_type': 'password'}, write_only=True)

    class Meta:
        model   = Account
        fields  = ('rut', 'password', 'password2', 'email', 'full_name', 'career', 'staff', 'timestamp')
        extra_kwargs    = {
            'password': {'write_only': True}
        }

class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model   = Account
        fields  = ('rut', 'password')

class SellSerializer(serializers.ModelSerializer):
    waiting_share   = serializers.CharField(max_length=15)
    waiting_amount  = serializers.FloatField()

    class Meta:
        model   = OrderAccount
        fields  = ('id', 'share', 'account', 'amount', 'vigency', 'waiting_share', 'waiting_amount')

class BlockSerializer(serializers.ModelSerializer):
    block   = serializers.BooleanField() #Blockear == True, Desbloquear == False

    class Meta:
        model   = Account
        fields  = ('rut', 'block')


class ShareSerializer(serializers.ModelSerializer):
    class Meta:
        model = Share
        fields = ('code', 'name')


class ShareAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShareAccount
        fields = ('id', 'account', 'share', 'code', 'amount')


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ('id', 'is_active', 'transfer_date')


class OrderAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderAccount
        fields = ('id', 'order', 'share', 'account', 'amount', 'type_order')
