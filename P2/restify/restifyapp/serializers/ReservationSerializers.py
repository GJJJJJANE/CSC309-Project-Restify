from rest_framework.serializers import ModelSerializer
from ..models import User, Property, Reservation

class ReservationSerializer(ModelSerializer):
    class Meta:
        model = Reservation
        fields = ['id', 'guest', 'property','state','start','end']
        read_only_fields = ('property','guest','state')

class ActionSerializer(ModelSerializer):
    class Meta:
        model = Reservation
        fields = ['id','state','active']