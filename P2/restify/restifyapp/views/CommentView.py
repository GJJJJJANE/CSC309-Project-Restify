from ..models import GuestComment, PropertyComment, ReplyThread, User, Reservation, Property
from ..serializers import GuestCommentSerializer, PropertyCommentSerializer, ReplySerializer 
from django.core.exceptions import ValidationError
from rest_framework import status, generics, mixins
from rest_framework.response import Response

# comment view - guest
# endpoint: comments/<guest_id>/Guestview
class ListGuestComment(generics.ListCreateAPIView):
    
    serializer_class = GuestCommentSerializer

    def get_queryset(self, *args, **kwargs):
        return GuestComment.objects.filter(
            target=User.objects.filter(id=self.kwargs['guest_id']))

# comment view - property
# endpoint: comments/<property_id>/Propertyview
class ListPropertyComment(generics.ListCreateAPIView):
    
    serializer_class = PropertyCommentSerializer

    def get_queryset(self, *args, **kwargs):
        return PropertyComment.objects.filter(
            target=Property.objects.filter(id=self.kwargs['property_id']))
    
# create comment - guest
# endpoint: comments/<guest_id>/writeGuestComment
class WriteGuestComment(generics.CreateAPIView):

    serializer_class = GuestCommentSerializer
    def perform_create(self, serializer):
        try:
            serializer.save(target=User.objects.filter(id=self.kwargs['guest_id']))
        except:
            raise ValidationError('illegal user')
        
# create comment - property
# endpoint: comments/<reservation_id>/writePropertyComment
class WritePropertyComment(generics.CreateAPIView):

    serializer_class = PropertyCommentSerializer
    def perform_create(self, serializer):

        target_reservation = Reservation.objects.filter(id=self.kwargs['reservation_id'])
        queryset = PropertyComment.objects.filter(target=target_reservation)
        
        if queryset.exists():
            raise ValidationError('Comment to this order already exists')
        if target_reservation.state != Reservation.COMPLETED:
            raise ValidationError('Order not completed yet')
        if target_reservation.guest != self.request.user:
            raise ValidationError('Not your reservation')
        
        serializer.save(target=target_reservation)

# update and view replies detail for a property comment
# endpoint: comments/<comment_id>/reply
class ReplyDetail(mixins.RetrieveModelMixin, mixins.UpdateModelMixin,generics.GenericAPIView):
    
    serializer_class = ReplySerializer

    def get_queryset(self, *args, **kwargs):
        target_comment=PropertyComment.objects.filter(id=self.kwargs['comment_id'])
        return ReplyThread.objects.filter(target=target_comment)

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)
