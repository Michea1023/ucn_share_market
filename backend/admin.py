from django.contrib import admin
from .models import Account,ShareAccount, Share

# Register your models here.
admin.site.register(Account)
admin.site.register(ShareAccount)
admin.site.register(Share)