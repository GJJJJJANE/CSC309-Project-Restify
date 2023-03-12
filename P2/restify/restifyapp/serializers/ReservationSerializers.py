from rest_framework.serializers import ModelSerializer
from ..models import User, Property, Reservation

class ReservationSerializer(ModelSerializer):
    class Meta:
        model = Reservation
        fields = ['id', 'guest', 'property','state','start','end']

