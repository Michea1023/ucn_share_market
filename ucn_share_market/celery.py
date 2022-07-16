from __future__ import absolute_import, unicode_literals
import os
from celery import Celery
from celery.schedules import crontab


os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ucn_share_market.settings')

app = Celery('ucn_share_market')

app.config_from_object('django.conf:settings', namespace='CELERY')

app.conf.schedule_beat = {
    'every-15-seconds': {
        "task": 'backend.tasks.printer',
        "schedule": 15,
    }
}

app.autodiscover_tasks()

@app.task(bind=True)
def debug_task(self):
    print(f'Request: {self.request!r}')