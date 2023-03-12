from ..models import ReplyThread, User, Reservation
from ..serializers import ReservationSerializer, ActionSerializer
from django.core.exceptions import ValidationError, PermissionDenied
from rest_framework import status, generics, mixins
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated


class IsOwner(IsAuthenticated):
    def has_object_permission(self, request, view, obj):
        if request.user != obj.property.owner:
            raise PermissionDenied("You don't have permission")
        return True
    
class IsGuest(IsAuthenticated):
    def has_object_permission(self, request, view, obj):
        if request.user != obj.guest:
            raise PermissionDenied("You don't have permission")
        return True

# list of reservation, where user view as host
# reservations/hostview/
class HostReservation(generics.ListAPIView):
    serializer_class = ReservationSerializer
    permission_classes = [IsAuthenticated]
    # filter_backends = [DjangoFilterBackend]
    filterset_fields = ['state']

    def get_queryset(self):
        return Reservation.objects.filter(property_in=self.request.user.property_set)

# list of reservation, where user view as guest
# reservations/guestview/
class GuestReservation(generics.ListAPIView):
    serializer_class = ReservationSerializer
    permission_classes = [IsAuthenticated]
    filterset_fields = ['state']

    def get_queryset(self):
        return Reservation.objects.filter(guest=self.request.user)

# Reserve as guest
# reservation/reserve/
class ReservationCreate(generics.CreateAPIView):
    serializer_class = ReservationSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(guest=self.request.user, state=Reservation.PENDING)
        return Response(serializer.data)

# request cancel as guest
# reservation/<int:reservation_id>/cancel/request/
class ReservationCancel(generics.CreateAPIView):
    serializer_class = ActionSerializer
    permission_classes = [IsGuest]

    def get_queryset(self):
        queryset = Reservation.objects.filter(id=self.kwargs['reservation_id'])
        return queryset
    
    def perform_update(self, serializer):
        if not serializer.data['active']:
            raise ValidationError('The order is no longer active.')
        
        if serializer.data['state'] != Reservation.PENDING_CANCEL:
            raise ValidationError('Can only request cancel in this status')
        serializer.save(state=Reservation.PENDING_CANCEL)
        
# Confirm pending as host
# reservations/<int:reservation_id>/pending/action/
class PendingAction(generics.RetrieveUpdateAPIView):
    
    serializer_class = ActionSerializer
    permission_classes = [IsOwner]

    def get_queryset(self):
        queryset=Reservation.objects.filter(id=self.kwargs['reservation_id'],
                                            state=Reservation.PENDING)
        if not queryset.exists():
            raise ValidationError('current reservation is not pending!')
        return queryset
    
    def perform_update(self, serializer):
        if not serializer.data['active']:
            raise ValidationError('The order is no longer active.')
        
        if serializer.data['state'] != Reservation.APPROVED | serializer.data['state'] != Reservation.DENIED:
            raise ValidationError('Can only approve or deny')
        
        if serializer.data['state'] == Reservation.APPROVED:
            serializer.save(state=Reservation.APPROVED)
            
        if serializer.data['state'] == Reservation.DENIED:
            serializer.save(state=Reservation.DENIED,
                            active=False)
        return Response(serializer.data)

# Confirm cancellation as host
# reservations/<int:reservation_id>/cancel/action/
class CancellationAction(generics.RetrieveUpdateAPIView):
    
    serializer_class = ActionSerializer
    permission_classes = [IsOwner]

    def get_queryset(self):
        queryset=Reservation.objects.filter(id=self.kwargs['reservation_id'],
                                            state=Reservation.PENDING_CANCEL)
        if not queryset.exists():
            raise ValidationError('Guest did not request cancellation')
        return queryset

    def perform_update(self, serializer):
        if not serializer.data['active']:
            raise ValidationError('The order is no longer active.')

        if serializer.data['state'] != Reservation.APPROVED | serializer.data['state'] != Reservation.CANCELED:
            raise ValidationError('Can only approve or deny cancellation')
        
        if serializer.data['state'] == Reservation.APPROVED: # cancellation denied.
            serializer.save(state=Reservation.APPROVED)
            
        if serializer.data['state'] == Reservation.CANCELED: # cancellation approved
            serializer.save(state=Reservation.CANCELED,
                            active=False)
            
        return Response(serializer.data)
        
        
# Terminate as host
# reservations/<reservation_id>/terminate/
class Terminate(generics.RetrieveUpdateAPIView):
    
    serializer_class = ActionSerializer
    permission_classes = [IsOwner]

    def get_queryset(self):
        queryset=Reservation.objects.filter(id=self.kwargs['reservation_id'])
        if not queryset.exists():
            raise ValidationError('reservation does not exist')
        return queryset

    def perform_update(self, serializer):
        if not serializer.data['active']:
            raise ValidationError('The order is no longer active.')
        serializer.save(state=Reservation.TERMINATED,
                        active=False)
        
        return Response(serializer.data)
        

# complete and expire - should this be automatic?
        

        
        




    




    
