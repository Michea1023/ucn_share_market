from django.db import models
from django.conf import settings
from django.contrib.auth.models import (
    AbstractBaseUser, BaseUserManager
)

CAREER_CHOICES = (
    ('ICCI', "Ingenieria Civil en Informatica"),
    ('ICI', "Ingenieria Civil Industrial"),
)

ORDER_CHOICES = (
    ('B', 'Compra'),
    ('S', 'Venta'),
)

# Create your models here.
class AccountManager(BaseUserManager):
    def create_user(self, rut, email, full_name, career=None, password=None, is_staff=False, is_admin=False, is_active=True):
        if not rut:
            raise ValueError("Users must have an rut")
        if not password:
            raise ValueError("Users must have a password")
        user_obj = self.model(
            rut = rut,
        )
        user_obj.email  = self.normalize_email(email)
        user_obj.full_name = full_name
        user_obj.set_password(password)
        user_obj.career = career
        user_obj.staff  = is_staff
        user_obj.admin  = is_admin
        user_obj.active = is_active #Blocked
        user_obj.save(using=self.db)
        return user_obj

    def create_staffuser(self, rut, email, full_name, password=None):
        user = self.create_user(rut, email, full_name, password=password, is_staff=True)
        return user

    def create_superuser(self, rut, email=None, full_name=None, password=None):
        user = self.create_user(rut, email, full_name, password=password, is_staff=True, is_admin=True)
        return user


class Account(AbstractBaseUser):
    rut         = models.CharField(max_length=15, unique=True, null=True)
    email       = models.EmailField(max_length=255, null=True)
    active      = models.BooleanField(default=True)
    staff       = models.BooleanField(default=False) # staff user == admin
    admin       = models.BooleanField(default=False) # superuser
    full_name   = models.CharField(max_length=255, null=True)
    career      = models.CharField(choices=CAREER_CHOICES, max_length=5, null=True)
    timestamp   = models.DateTimeField(auto_now_add=True, null=True)

    USERNAME_FIELD = 'rut'
    REQUIRED_FIELDS = [] # USERNAME_FIELD and password are required by default

    objects = AccountManager()

    def __str__(self):
        return self.rut

    @property
    def is_staff(self):
        return self.staff

    @property
    def is_admin(self):
        return self.admin

    @property
    def is_active(self):
        return self.active

    def has_perm(self, perm, obj=None):
        return self.admin

    def has_module_perms(self, app_label):
        return self.admin


class Share(models.Model):
    code        = models.CharField(max_length=15, null=False, unique=True)
    name        = models.TextField(null=True)

    def __str__(self):
        return self.code


class TransactionTable(models.Model):
    share_buy   = models.CharField(max_length=15)
    share_sell  = models.CharField(max_length=15)
    market_val  = models.FloatField(null=True)

    def __str__(self):
        return f"{self.share_buy} - {self.share_sell}"


class Transaction(models.Model):
    share   = models.ForeignKey(Share, on_delete=models.CASCADE, null=True)
    account = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True)
    trans_table = models.ForeignKey(TransactionTable, on_delete=models.CASCADE, null=True)
    active = models.BooleanField(default=True)
    price   = models.FloatField()
    amount  = models.FloatField()
    total   = models.FloatField() #price * amount
    fixed_com   = models.FloatField(null=True)
    variabl_com = models.FloatField(null=True)
    type_order  = models.CharField(choices=ORDER_CHOICES, max_length=2, null=False)
    start_date  = models.DateTimeField(auto_now_add=True)
    vigency     = models.DateTimeField(default=None, null=True)
    end_date    = models.DateTimeField(default=None, null=True)

    def get_commission(self):
        return self.fixed_com + self.variabl_com


class ShareAccount(models.Model):
    account     = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    share       = models.ForeignKey(Share, on_delete=models.CASCADE)
    code        = models.CharField(max_length=45, unique=True)
    amount      = models.FloatField(default=0)