from django.apps import AppConfig


# Configuracion del Backend
class BackendConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'backend'

    def ready(self):
        from .tasks import start
        start()
