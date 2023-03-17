
from rest_framework.serializers import ModelSerializer, ValidationError
from ..models import GuestComment, PropertyComment, ReplyThread, User, Reservation

class GuestCommentSerializer(ModelSerializer):
    class Meta:
        model = GuestComment
        fields = ['id','target','score','content','modified']
        read_only_fields = ('target',)
    
    def validate(self, data):
        if not User.objects.filter(id=self.context.get('guest_id')).exists():
            raise ValidationError('illegal user')
        return data

class PropertyCommentSerializer(ModelSerializer):
    class Meta:
        model = PropertyComment
        fields = ['id','target','score','content','modified']
        read_only_fields = ('target',)
        
    def validate(self, data):
        target_reservation = Reservation.objects.filter(id=self.context.get('reservation_id'))
        if not target_reservation.exists():
            raise ValidationError('No such reservation')
        queryset = PropertyComment.objects.filter(target=target_reservation[0])
        if queryset.exists():
            raise ValidationError('Comment to this order already exists')
        if target_reservation[0].state != Reservation.COMPLETED and \
                target_reservation[0].state != Reservation.TERMINATED:
            raise ValidationError('Order not completed yet')
        if target_reservation[0].guest != self.context.get('guest'):
            raise ValidationError('Not your reservation')
        return data

class ReplySerializer(ModelSerializer):
    class Meta:
        model = ReplyThread
        fields = ['id','target','host_response','user_response','modified']
        read_only_fields = ('target',)

    def validate(self, data):
        if self.context.get('action')=='create':
            target_comment=PropertyComment.objects.filter(id=self.context.get('comment_id'))
            target_reservation = Reservation.objects.filter(comment_of=target_comment[0])[0]
            if not target_comment.exists():
                raise ValidationError("comment does not exist")
            if self.context.get('host')!= target_reservation.property.owner:
                    raise ValidationError("You can't reply to this thread")
            
        if self.context.get('action')=='update':
            target_comment=PropertyComment.objects.filter(id=self.context.get('comment_id'))
            target_reservation = Reservation.objects.filter(
                 comment_of=PropertyComment.objects.filter(id=self.kwargs['comment_id'])[0])[0]
            if not target_comment.exists():
                raise ValidationError("comment does not exist")
            if self.context.get('guest')!= target_reservation.guest:
                    raise ValidationError("You can't reply to this thread")

        return data
