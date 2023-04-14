from rest_framework.serializers import ModelSerializer,ValidationError
from ..models import User, Property, Reservation

class ReservationSerializer(ModelSerializer):
    class Meta:
        model = Reservation
        fields = ['id', 'guest', 'property','state','start','end','active']
        read_only_fields = ('property','guest','state','active')

    def validate(self, data):
        target_properties=Property.objects.filter(id=self.context.get("property_id"))
        if not target_properties.exists():
            raise ValidationError('No such property')
        
        target_property = target_properties[0]
        if not (data['start'] > target_property.start_date and \
                data['end'] < target_property.end_date):
            raise ValidationError('Property not available')

        if not data.get('start') < data.get('end'):
            raise ValidationError('Duration is not valid')
        
        return data


class ActionSerializer(ModelSerializer):
    class Meta:
        model = Reservation
        fields = ['id','state','active']
        read_only_fields = ('active',)

    def validate(self, data):
        # cancel request
        if self.context.get("action") == 'cancel':
            if data['state'] != Reservation.PENDING_CANCEL:
                raise ValidationError('Can only request cancel in this status')
            
        # pending confirm
        if self.context.get("action") == 'pending_confirm':
            reservation = Reservation.objects.filter(id=self.context.get("reservation_id"),
                                            state=Reservation.PENDING)
            if not reservation.exists():
                raise ValidationError('current reservation is not pending!')
            if not (data['state'] == Reservation.APPROVED or \
                data['state'] == Reservation.DENIED):
                raise ValidationError('Can only approve or deny')
        
        # cancel confirm
        if self.context.get("action") == 'cancel_confirm':
            queryset=Reservation.objects.filter(id=self.context.get("reservation_id"),
                                            state=Reservation.PENDING_CANCEL)
            if not queryset.exists():
                raise ValidationError('Guest did not request cancellation')
            if data['state'] != Reservation.APPROVED and \
                data['state'] != Reservation.CANCELED:
                raise ValidationError('Can only approve or deny cancellation')
            
        # terminate
        if self.context.get("action") == 'terminate':
            queryset=Reservation.objects.filter(id=self.context.get("reservation_id"))
            if not queryset.exists():
                raise ValidationError('reservation does not exist')
            if data['state'] != Reservation.TERMINATED:
                raise ValidationError('Can only terminate here')

        if not self.instance.active:
            raise ValidationError('The order is no longer active.')
        return data