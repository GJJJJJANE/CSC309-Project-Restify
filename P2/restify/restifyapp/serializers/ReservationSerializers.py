from rest_framework.serializers import ModelSerializer,ValidationError
from ..models import User, Property, Reservation

class ReservationSerializer(ModelSerializer):
    class Meta:
        model = Reservation
        fields = ['id', 'guest', 'property','state','start','end','active']
        read_only_fields = ('property','guest','state','active')

class ActionSerializer(ModelSerializer):
    class Meta:
        model = Reservation
        fields = ['id','state','active']
        read_only_fields = ('active',)

    def validate(self, data):
        if not self.instance.active:
            raise ValidationError('The order is no longer active.')
        return data