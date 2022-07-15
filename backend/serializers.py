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

class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model   = Account
        fields  = ('rut', 'full_name', 'career')

class TransactionSerializer(serializers.ModelSerializer):
    share_buy   = serializers.CharField(max_length=15)
    share_sell  = serializers.CharField(max_length=15)
    rut         = serializers.CharField(max_length=15)
    class Meta:
        model   = Transaction
        fields  = ('rut', 'price', 'amount', 'type_order', 'vigency', 'share_buy', 'share_sell')

class BlockSerializer(serializers.ModelSerializer):
    block   = serializers.BooleanField() #Blockear == True, Desbloquear == False

    class Meta:
        model   = Account
        fields  = ('rut', 'block')

class TransTableSerializer(serializers.ModelSerializer):
    class Meta:
        model   = TransactionTable
        fields  = ('id', 'share_buy', 'share_sell', 'market_val')

class ShareSerializer(serializers.ModelSerializer):
    class Meta:
        model = Share
        fields = ('code', 'name')

class ShareAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShareAccount
        fields = ('id', 'account', 'share', 'code', 'amount')

class TransSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ('account', 'price', 'amount', 'trans_table',  'type_order', 'vigency', 'active')

class SettingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Settings
        fields = ('name', 'value')