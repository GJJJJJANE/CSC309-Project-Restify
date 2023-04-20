from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from ..models import Property, ESSENTIAL, INDOOR, OUTDOOR, Image
import os
from django.conf import settings


#class PropertyAvailabilitySerializer(ModelSerializer):
    #class Meta:
        #model = Availability
        #fields = ['id','property','start','end','price','reservation']

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = (
            'property_id',
            'photos'
        )


class PropertySerializer(ModelSerializer):
    #availability = PropertyAvailabilitySerializer(many=True)

    #photo1 = ImageSerializer(many=True)
    #photos = serializers.ListField(child=serializers.ImageField())

    class Meta:
        model = Property
        fields = ['id','owner','title','description','photos','photo2','photo3','location','num_guest','num_bedroom','num_bathroom','room_description','amen_essential','amen_indoor','amen_outdoor','house_rule','safety_rule','cancellation_policy', 'start_date', 'end_date', 'price','modified']
        read_only_fields = ['owner']

