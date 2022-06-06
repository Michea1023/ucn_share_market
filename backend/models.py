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

ORDER_CHOICES = (
    ('B', 'comprador'),
    ('S', 'vendedor'),
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


class Order(models.Model):
    is_active = models.BooleanField(default=True)
    start_date = models.DateTimeField(auto_now_add=True)
    end_date = models.DateTimeField(default=None)


class OrderAccount(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    share = models.ForeignKey(Share, on_delete=models.CASCADE)
    account = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True)
    amount = models.FloatField()
    type_order = models.CharField(choices=ORDER_CHOICES, max_length=2, null=False)


class ShareAccount(models.Model):
    account = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    share = models.ForeignKey(Share, on_delete=models.CASCADE)
    code = models.CharField(max_length=45, unique=True)
    amount = models.FloatField(default=0)
