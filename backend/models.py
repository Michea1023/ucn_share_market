from django.db import models
from django.conf import settings
from django.contrib.auth.models import (
    AbstractBaseUser, BaseUserManager
)

# CARRERAS POSIBLES
CAREER_CHOICES = (
    ('ICCI', "Ingenieria Civil en Informatica"),
    ('ICI', "Ingenieria Civil Industrial"),
)

# TIPOS DE TRANSACCIONES POSIBLES
ORDER_CHOICES = (
    ('B', 'Compra'),
    ('S', 'Venta'),
)

# Create your models here.
class AccountManager(BaseUserManager):
    def create_user(self, rut, email, full_name, career=None, password=None, is_staff=False, is_admin=False, is_active=True):
        """
        Funcion que crea al usuario
        :param rut: str
        :param email: str
        :param full_name: str
        :param career: str
        :param password: str
        :param is_staff: bool
        :param is_admin: bool
        :param is_active: bool
        :return: Account
        """
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
        """
        Funcion que crea al usuario staff
        :param rut: str
        :param email: str
        :param full_name: str
        :param career: str
        :param password: str
        :return: Account
        """
        user = self.create_user(rut, email, full_name, password=password, is_staff=True)
        return user

    def create_superuser(self, rut, email=None, full_name=None, password=None):
        """
        :param rut: str
        :param email: str
        :param full_name: str
        :param password: str
        :return: Account
        """
        user = self.create_user(rut, email, full_name, password=password, is_staff=True, is_admin=True)
        return user


class Account(AbstractBaseUser):
    """

    """
    rut         = models.CharField(max_length=15, unique=True, null=True)
    email       = models.EmailField(max_length=255, null=True)
    active      = models.BooleanField(default=True)
    staff       = models.BooleanField(default=False)                                    # staff user == admin
    admin       = models.BooleanField(default=False)                                    # superuser
    full_name   = models.CharField(max_length=255, null=True)
    career      = models.CharField(choices=CAREER_CHOICES, max_length=5, null=True)     # Revisar CAREER_CHOICES
    timestamp   = models.DateTimeField(auto_now_add=True, null=True)                    # LO USA DJANGO NO NOSOTROS

    # ESTO LO USA DJANGO
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
    """
    Contiene la lista de acciones en la plataforma
    """
    code        = models.CharField(max_length=15, null=False, unique=True)
    name        = models.TextField(null=True)

    def __str__(self):
        """
        Formato como se muestra la Share
        :return:
        """
        return self.code


class TransactionTable(models.Model):
    """
    Contiene la lista de relaciones entre acciones,
    ESTO SE HIZO CON TAL DE IMPLEMENTAR EN UN FUTURO LAS CRIPTOMONEDAS
    """
    share_buy   = models.CharField(max_length=15)   # share_used_to_buy
    share_sell  = models.CharField(max_length=15)   # share_used_to_sell
    market_val  = models.FloatField(null=True)      # 1 share_sell = X share_buy
    diary_rent  = models.FloatField(null=True)      # rentabilidad diaria
    annual_rent = models.FloatField(null=True)      # rentabilidad anual, ACTUALMENTE ESTA VACIA
    active      = models.BooleanField(default=True)

    def __str__(self):
        """
        Formato en que se muestra la TransactionTable
        :return:
        """
        return f"{self.share_sell}/{self.share_buy}"


class Transaction(models.Model):
    """
    Contiene la lista de Transacciones, tanto activas como inactivas
    """
    share   = models.ForeignKey(Share, on_delete=models.CASCADE, null=True)                     # Es la accion que contiene el usuario, no la que quiere
    account = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True)
    trans_table = models.ForeignKey(TransactionTable, on_delete=models.CASCADE, null=True)      # La relacion que necesita el usuario
    active = models.BooleanField(default=True)                                                  # SI SE CANCELA UNA TRANSACCION SE DEBE ELIMINAR
    price   = models.FloatField()
    amount  = models.FloatField()
    used_amount = models.FloatField(default=0)                                                  # Se utiliza para comprobar las acciones que fueron ..
                                                                                                # vendidas o compradas por los usuarios
    total   = models.FloatField()                                                               # price * amount
    fixed_com   = models.FloatField(null=True)
    variabl_com = models.FloatField(null=True)                                                  # Comision variable en CLP
    type_order  = models.CharField(choices=ORDER_CHOICES, max_length=2, null=False)             # Tipo de Orden revisar ORDER_CHOICES
    start_date  = models.DateTimeField(auto_now_add=True)                                       # Fecha actual de creacion
    vigency     = models.DateTimeField(default=None, null=True)                                 # Vigencia, la da el usuario
    end_date    = models.DateTimeField(default=None, null=True)                                 # NO SE USA XD

    def get_commission(self):
        return self.fixed_com + self.variabl_com


class ShareAccount(models.Model):
    """
    Contiene las carteras de los usuarios, esta contiene el monto total que tiene un usuario por cada accion
    """
    account     = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    share       = models.ForeignKey(Share, on_delete=models.CASCADE)
    amount      = models.FloatField(default=0)


class Settings(models.Model):
    """
    Contiene la lista de configuraciones
    """
    name    = models.CharField(max_length=40, unique=True)
    value   = models.FloatField()