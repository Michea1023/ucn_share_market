from django.db import models
from django.conf import settings

ACCOUNT_CHOICES = (
    ('A', 'admin'),
    ('N', "normal"),
)

CAREER_CHOICES = (
    ('ICCI', "Ingenieria Civil en Informatica"),
    ('ICI', "Ingenieria Civil Industrial"),
)

# Create your models here.
class Account(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, primary_key=True)
    mail = models.CharField(max_length=30, null=True, unique=True)
    type_account = models.CharField(choices=ACCOUNT_CHOICES, max_length=1, null=True)
    name = models.TextField(null=True)
    last_name = models.TextField(null=True)
    career = models.CharField(choices=CAREER_CHOICES, max_length=5, null=True)
    is_blocked = models.BooleanField(default=False)


class Share(models.Model):
    code = models.CharField(max_length=15, null=False, unique=True, primary_key=True)
    name = models.TextField(null=True)

"""
class Order(models.Model):
    is_active = models.BooleanField(default=True)
    date_time = models.DateTimeField(auto_now_add=True)
    share_selled = models.ForeignKey(Share, on_delete=models.CASCADE)
    share_buyed = models.ForeignKey(Share, on_delete=models.CASCADE)
    account_seller = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True)
    account_buyer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True)
    share_sell_amount = models.FloatField()
    share_buy_amount = models.FloatField()
"""

class ShareAccount(models.Model):
    account = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    share = models.ForeignKey(Share, on_delete=models.CASCADE)
    amount = models.FloatField(default=0)
