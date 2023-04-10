# import djangos
from django.db import models

# import other models
from .user import User
from .property import Property

class Reservation(models.Model):
    # STATUS
    PENDING = 'pe'
    DENIED = 'de'
    EXPIRED = 'ex'
    APPROVED = 'ap'
    CANCELED = 'ca'
    TERMINATED = 'te'
    COMPLETED = 'co'
    PENDING_CANCEL = 'pc'

    STATUS_CHOICES = [
        ('pe', 'Pending'),
        ('de', 'Denied'),
        ('ex', 'Expired'),
        ('ap', 'Approved'),
        ('ca', 'Canceled'),
        ('te', 'Terminated'),
        ('co', 'Completed'),
        ('pc', 'Waiting for cancellation to be confirmed'),
        (None, 'Reservation status'),
    ]

    # FIELDS
    # id is set to default int pkey
    # Foreign keys
    guest = models.ForeignKey(User, on_delete=models.CASCADE)
    property = models.ForeignKey(Property, on_delete=models.CASCADE) # OR use number id?
    # reservation state
    state = models.CharField(max_length=2, choices=STATUS_CHOICES)
    # reservation duration
    start = models.DateField()
    end = models.DateField()
    active = models.BooleanField(default=True)

    class Meta:
        ordering = ['start']