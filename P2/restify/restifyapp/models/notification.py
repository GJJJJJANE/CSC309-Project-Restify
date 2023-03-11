# import djangos
from django.db import models

from .user import User
from .reservation import Reservation


class Notification(models.Model):

    content = models.TextField()
    target = models.ForeignKey(User,on_delete=models.CASCADE)
    time = models.DateTimeField() 

    class Meta:
        ordering = ['time']