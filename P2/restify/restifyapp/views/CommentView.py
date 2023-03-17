from ..models import GuestComment, PropertyComment, ReplyThread, User, Reservation, Property
from ..serializers import GuestCommentSerializer, PropertyCommentSerializer, ReplySerializer 
from django.core.exceptions import ValidationError,PermissionDenied
from rest_framework import status, generics, mixins
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.pagination import PageNumberPagination


class ListingPagination(PageNumberPagination):
    page_size = 6
    
# comment view - guest
# endpoint: comments/<guest_id>/Guestview
class ListGuestComment(generics.ListCreateAPIView):
    
    serializer_class = GuestCommentSerializer
    pagination_class = ListingPagination

    def get_queryset(self, *args, **kwargs):
        return GuestComment.objects.filter(
            target=User.objects.filter(id=self.kwargs['guest_id'])[0])

# comment view - property
# endpoint: comments/<property_id>/Propertyview
class ListPropertyComment(generics.ListCreateAPIView):
    
    serializer_class = PropertyCommentSerializer
    pagination_class = ListingPagination

    def get_queryset(self, *args, **kwargs):
        targets=Property.objects.filter(id=self.kwargs['property_id'])
        target_reservations=Reservation.objects.filter(property=targets[0])
        if not targets.exists():
            return Response("Property Not Found", status=404)
        return PropertyComment.objects.filter(target__in=target_reservations)
    
# create comment - guest
# endpoint: comments/<guest_id>/writeGuestComment
class WriteGuestComment(generics.CreateAPIView):

    serializer_class = GuestCommentSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        try:
            serializer.save(target=User.objects.filter(id=self.kwargs['guest_id'])[0])
        except:
            raise ValidationError('illegal user')
        
# create comment - property
# endpoint: comments/<reservation_id>/writePropertyComment
class WritePropertyComment(generics.CreateAPIView):

    serializer_class = PropertyCommentSerializer
    permission_classes = [IsAuthenticated]
    
    def perform_create(self, serializer):

        target_reservation = Reservation.objects.filter(id=self.kwargs['reservation_id'])
        if not target_reservation.exists():
            raise ValidationError('No such reservation')

        queryset = PropertyComment.objects.filter(target=target_reservation[0])
        
        if queryset.exists():
            raise ValidationError('Comment to this order already exists')
        if target_reservation[0].state != Reservation.COMPLETED and \
            target_reservation[0].state != Reservation.TERMINATED:
            raise ValidationError('Order not completed yet')
        if target_reservation[0].guest != self.request.user:
            raise ValidationError('Not your reservation')
        
        serializer.save(target=target_reservation[0])
        return Response(serializer.data)

# create a reply, done by host
# endpoint: comments/<comment_id>/reply/create
class ReplyCreate(generics.CreateAPIView):
    
    serializer_class = ReplySerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        target_comment=PropertyComment.objects.filter(id=self.kwargs['comment_id'])
        target_reservation = Reservation.objects.filter(comment_of=target_comment[0])
        if self.request.user != target_reservation.property.owner:
            raise ValidationError("You can't reply to this thread")
        serializer.save(target=target_comment)
        return Response(serializer.data)

# update and view replies detail for a property comment, done by user
# endpoint: comments/<comment_id>/reply
class ReplyDetail(generics.RetrieveUpdateAPIView):
    
    serializer_class = ReplySerializer
    permission_classes = [IsAuthenticated]
    lookup_url_kwarg = 'comment_id'

    def get_queryset(self, *args, **kwargs):
        target_comment=PropertyComment.objects.filter(id=self.kwargs['comment_id'])[0]
        return ReplyThread.objects.filter(target=target_comment)

    # def get(self, request, *args, **kwargs):
    #     return self.retrieve(request, *args, **kwargs)

    def perform_update(self, serializer):
        target_reservation = Reservation.objects.filter(
            comment_of=PropertyComment.objects.filter(id=self.kwargs['comment_id'])[0])[0]
        if self.request.user != target_reservation.guest:
            raise ValidationError("You can't reply to this thread")
        serializer.save()
        return Response(serializer.data)