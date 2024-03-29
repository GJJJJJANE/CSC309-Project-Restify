# import djangos
from django.db import models

from .user import User
from .reservation import Reservation


class Notification(models.Model):

    title = models.TextField(default='', null=False)
    content = models.TextField(null=False)
    target = models.ForeignKey(User,on_delete=models.CASCADE, null=False)
    if_read = models.BooleanField(default=False)
    time = models.DateTimeField(auto_now_add=True) 

    class Meta:
        ordering = ['time']