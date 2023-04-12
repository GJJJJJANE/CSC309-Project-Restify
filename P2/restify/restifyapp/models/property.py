# import djangos
from django.db import models
from multiselectfield import MultiSelectField

from .user import User


ESSENTIAL = (('wi', 'Wifi'),
             ('hw', 'Hot Water'),
             ('ai', 'Air Conditioning'),)

INDOOR = (('tv', 'TV'),
          ('pw', 'Personal Workspace'),
          ('li', 'Light'),)

OUTDOOR = (('pa', 'Parking Space'),
           ('bb', 'BBQ Grill'),
           ('ba', 'Backyard'))


class Property(models.Model):

    # FIELDS
    # id is the primary key
    owner = models.ForeignKey(User,on_delete=models.CASCADE)
    title = models.CharField(max_length=120)
    description = models.TextField()
    #photos = models.ImageField(upload_to='property_images')
    photos = models.URLField()

    location = models.TextField()
    num_guest = models.PositiveIntegerField()
    num_bedroom = models.PositiveIntegerField()
    num_bathroom = models.PositiveIntegerField()
    room_description = models.TextField()

    # multiplechoice field is hard to test in backend, so we simply use char in P2
    #amen_essential = models.CharField(max_length=50, choices=ESSENTIAL)
    #amen_indoor = models.CharField(max_length=50, choices=INDOOR)
    #amen_outdoor = models.CharField(max_length=50, choices=OUTDOOR)

    amen_essential = models.CharField(max_length=50)
    amen_indoor = models.CharField(max_length=50)
    amen_outdoor = models.CharField(max_length=50)


    house_rule = models.TextField()
    safety_rule = models.TextField()
    cancellation_policy = models.TextField()

    start_date = models.DateField()
    end_date = models.DateField()
    price = models.PositiveIntegerField()

    modified = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['modified']


#class Amenities(models.Model):

    # Amenity types

    #AMENITY_CHOICES = [
        #('wi', 'Wifi'),
        #('hw', 'Hot Water'),
        #('ai', 'Air Conditioning'),
        #('tv', 'TV'),
        #('pw', 'Personal Workspace'),
        #('li', 'Light'),
        #('pa', 'Parking Space'),
        #('bb', 'BBQ Grill'),
        #('ba', 'Backyard')
    #]

    #property = models.ForeignKey(Property,on_delete=models.CASCADE)
    #amenity = models.CharField(choices=AMENITY_CHOICES)


#class Availability(models.Model):

    #property = models.ForeignKey(Property,on_delete=models.CASCADE)
    #start = models.DateField()
    #end = models.DateField()
    #price = models.PositiveIntegerField()
    #reservation = models.ForeignKey('Reservation',on_delete=models.CASCADE, null=True)