from ..models import ReplyThread, User, Reservation, Property
from ..serializers import ReservationSerializer, ActionSerializer
from django.core.exceptions import ValidationError, PermissionDenied
from django.http import HttpResponse, HttpResponseBadRequest
from django.shortcuts import render, redirect
from django.urls import reverse, reverse_lazy
from rest_framework import status, generics, mixins
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.pagination import PageNumberPagination


class ListingPagination(PageNumberPagination):
    page_size = 6

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
    pagination_class = ListingPagination

    def get_queryset(self):
        state = self.request.query_params.get('state', None)
        target_properties=Property.objects.filter(owner=self.request.user)
        if state == '':
            return Reservation.objects.filter(property__in=target_properties)
        else:
            return Reservation.objects.filter(property__in=target_properties, state=state)

# list of reservation, where user view as guest
# reservations/guestview/
class GuestReservation(generics.ListAPIView):
    serializer_class = ReservationSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = ListingPagination


    def get_queryset(self):
        state = self.request.query_params.get('state', None)
        if state == '':
            return Reservation.objects.filter(guest=self.request.user)
        else:
            return Reservation.objects.filter(guest=self.request.user,
                                          state = state)

# Reserve as guest
# reservations/reserve/<int:property_id>/
class ReservationCreate(generics.CreateAPIView):
    serializer_class = ReservationSerializer
    permission_classes = [IsAuthenticated]

    def get_serializer_context(self):
        """
        Extra context provided to the serializer class.
        """
        return {
            'property_id': self.kwargs['property_id']
        }

    def perform_create(self, serializer):
        target_properties=Property.objects.filter(id=self.kwargs['property_id'])
        # if not target_properties.exists():
        #     raise ValidationError('No such property')
        target_property = target_properties[0]
        # if not (serializer.validated_data['start'] > target_property.start_date and \
        #         serializer.validated_data['end'] < target_property.end_date):
        #     raise ValidationError('Property not available')
        if serializer.is_valid():
            serializer.save(guest=self.request.user,
                            property=target_property,
                            state=Reservation.PENDING)
            return Response(serializer.data)
        return Response(serializer.errors)

# request cancel as guest
# reservations/<int:reservation_id>/cancel/request/
class ReservationCancel(generics.RetrieveUpdateAPIView):
    serializer_class = ActionSerializer
    permission_classes = [IsGuest]
    lookup_url_kwarg = 'reservation_id'

    def get_serializer_context(self):
        """
        Extra context provided to the serializer class.
        """
        return {
            'action': 'cancel'
        }

    def get_queryset(self):
        queryset = Reservation.objects.filter(id=self.kwargs['reservation_id'])
        return queryset
    
    def perform_update(self, serializer):
        # if self.request.data['state'] != Reservation.PENDING_CANCEL:
        #     raise ValidationError('Can only request cancel in this status')
        if serializer.is_valid():
            serializer.save(state=Reservation.PENDING_CANCEL)
            return Response(serializer.data)
        return Response(serializer.errors)
        
# Confirm pending as host
# reservations/<int:reservation_id>/pending/action/
class PendingAction(generics.RetrieveUpdateAPIView):
    
    serializer_class = ActionSerializer
    permission_classes = [IsOwner]
    lookup_url_kwarg = 'reservation_id'

    def get_serializer_context(self):
        """
        Extra context provided to the serializer class.
        """
        return {
            'action': 'pending_confirm',
            'reservation_id': self.kwargs['reservation_id'],
        }

    def get_queryset(self):
        queryset=Reservation.objects.filter(id=self.kwargs['reservation_id'],
                                            state=Reservation.PENDING)
        return queryset
    
    def perform_update(self, serializer):
        if serializer.is_valid():
            if self.request.data['state'] == Reservation.APPROVED:
                serializer.save(state=Reservation.APPROVED,active=True)
                
            if self.request.data['state'] == Reservation.DENIED:
                serializer.save(state=Reservation.DENIED,
                                active=False)
            return Response(serializer.data)
        return Response(serializer.errors)

# Confirm cancellation as host
# reservations/<int:reservation_id>/cancel/action/
class CancellationAction(generics.RetrieveUpdateAPIView):
    
    serializer_class = ActionSerializer
    permission_classes = [IsOwner]
    lookup_url_kwarg = 'reservation_id'

    def get_serializer_context(self):
        """
        Extra context provided to the serializer class.
        """
        return {
            'action': 'cancel_confirm',
            'reservation_id': self.kwargs['reservation_id'],
        }

    def get_queryset(self):
        queryset=Reservation.objects.filter(id=self.kwargs['reservation_id'],
                                            state=Reservation.PENDING_CANCEL)
        return queryset

    def perform_update(self, serializer):
        if serializer.is_valid():
            if self.request.data['state'] == Reservation.APPROVED: # cancellation denied.
                serializer.save(state=Reservation.APPROVED)
                
            if self.request.data['state'] == Reservation.CANCELED: # cancellation approved
                serializer.save(state=Reservation.CANCELED,
                                active=False)
                
            return Response(serializer.data)
        return Response(serializer.errors)
        
        
# Terminate as host
# reservations/<reservation_id>/terminate/
class Terminate(generics.RetrieveUpdateAPIView):
    
    serializer_class = ActionSerializer
    permission_classes = [IsOwner]
    lookup_url_kwarg = 'reservation_id'

    def get_serializer_context(self):
        """
        Extra context provided to the serializer class.
        """
        return {
            'action': 'terminate',
            'reservation_id': self.kwargs['reservation_id'],
        }
    
    def get_queryset(self):
        queryset=Reservation.objects.filter(id=self.kwargs['reservation_id'])
        return queryset

    def perform_update(self, serializer):
        serializer.save(state=Reservation.TERMINATED,
                        active=False)
        return Response(serializer.data)
        
# complete and expire - should this be automatic?
        

        
        




    




    
