# import djangos
from django.db import models

from .user import User
from .reservation import Reservation


class Property(models.Model):

    # FIELDS
    # id is the primary key
    owner = models.ForeignKey(User,on_delete=models.CASCADE)
    title = models.CharField()
    description = models.TextField()
    photos = models.ImageField(upload_to='Photos')
    location = models.TextField()
    num_guest = models.PositiveIntegerField()
    num_bedroom = models.PositiveIntegerField()
    num_bathroom = models.PositiveIntegerField()
    room_description = models.TextField()
    house_rule = models.TextField()
    safety_rule = models.TextField()
    cancellation_policy = models.TextField()

    modified = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['modified']


class Amenities(models.Model):

    # Amenity types

    AMENITY_CHOICES = [
        ('wi', 'Wifi'),
        ('hw', 'Hot Water'),
        ('ai', 'Air Conditioning'),
        ('tv', 'TV'),
        ('pw', 'Personal Workspace'),
        ('li', 'Light'),
        ('pa', 'Parking Space'),
        ('bb', 'BBQ Grill'),
        ('ba', 'Backyard')
    ]

    property = models.ForeignKey(Property,on_delete=models.CASCADE)
    amenity = models.CharField(choices=AMENITY_CHOICES)


class Availability(models.Model):

    property = models.ForeignKey(Property,on_delete=models.CASCADE)
    start = models.DateField()
    end = models.DateField()
    price = models.PositiveIntegerField()
    reservation = models.ForeignKey(Reservation,on_delete=models.CASCADE, null=True)