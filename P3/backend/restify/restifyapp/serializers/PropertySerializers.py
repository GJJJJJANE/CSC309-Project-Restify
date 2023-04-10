from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from ..models import Property, ESSENTIAL, INDOOR, OUTDOOR


#class PropertyAvailabilitySerializer(ModelSerializer):
    #class Meta:
        #model = Availability
        #fields = ['id','property','start','end','price','reservation']


class PropertySerializer(ModelSerializer):
    #availability = PropertyAvailabilitySerializer(many=True)

    #amen_essential = serializers.MultipleChoiceField(choices=ESSENTIAL)
    #amen_indoor = serializers.MultipleChoiceField(choices=INDOOR)
    #amen_outdoor = serializers.MultipleChoiceField(choices=OUTDOOR)

    class Meta:
        model = Property
        fields = ['id','owner','title','description','photos','location','num_guest','num_bedroom','num_bathroom','room_description','amen_essential','amen_indoor','amen_outdoor','house_rule','safety_rule','cancellation_policy', 'start_date', 'end_date', 'price']
        read_only_fields = ['owner']