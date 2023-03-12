from ..models import ReplyThread, User, Reservation
from ..serializers import ReservationSerializer
from django.core.exceptions import ValidationError
from rest_framework import status, generics, mixins
from rest_framework.response import Response


# list of reservation, where user view as host
# /reservations/hostview
class HostReservation(generics.ListAPIView):
    serializer_class = ReservationSerializer

    def get_queryset(self):
        return Reservation.objects.filter()
    
    



# list of reservation, where user view as guest
# reservations/guestview
