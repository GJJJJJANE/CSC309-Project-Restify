from rest_framework.serializers import ModelSerializer
from ..models import Property #, Availability


#class PropertyAvailabilitySerializer(ModelSerializer):
    #class Meta:
        #model = Availability
        #fields = ['id','property','start','end','price','reservation']


class PropertySerializer(ModelSerializer):
    #availability = PropertyAvailabilitySerializer(many=True)
    class Meta:
        model = Property
        fields = ['id','owner','title','description','photos','location','num_guest','num_bedroom','num_bathroom','room_description','amen_essential','amen_indoor','amen_outdoor','house_rule','safety_rule','cancellation_policy', 'start', 'end', 'price']