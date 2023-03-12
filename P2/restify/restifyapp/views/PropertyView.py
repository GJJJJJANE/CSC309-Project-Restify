from ..models import Property, User #, Availability
from ..serializers import PropertySerializer#, PropertyAvailabilitySerializer
from django.core.exceptions import ValidationError, PermissionDenied
from rest_framework import status, generics, mixins
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.pagination import PageNumberPagination



class ListingPagination(PageNumberPagination):
    page_size = 6

class IsOwner(IsAuthenticated):
    def has_object_permission(self, request, view, obj):
        if request.user != obj.owner:
            raise PermissionDenied("You don't have permission")
        return True


#list all property for the host
#endpoint: Listing_all/

class All_host_listing(generics.ListAPIView):

    serializer_class = PropertySerializer
    permission_classes = [IsAuthenticated]
    pagination_class = ListingPagination


    def get_queryset(self):
        host = self.request.user
        return Property.objects.filter(owner=host)
    


#search property results by guests
#endpoint: SearchResult/

class SearchProperty(generics.ListAPIView):

    serializer_class = PropertySerializer
    pagination_class = ListingPagination


    def get_queryset(self):
        queryset = Property.objects.all()

        available_date = self.request.query_params.get('available_date',None)
        num_guest = self.request.query_params.get('num_guest',None)
        num_bedroom = self.request.query_params.get('num_bedroom',None)
        num_bathroom = self.request.query_params.get('num_bathroom',None)

        order_by = self.request.query_params.get('order_by',None)

        if available_date is not None:
            queryset = queryset.filter(start_date =available_date)
        if num_guest is not None:
            queryset = queryset.filter(num_guest =num_guest)
        if num_bedroom is not None:
            queryset = queryset.filter(num_bedroom =num_bedroom)
        if num_bathroom is not None:
            queryset = queryset.filter(num_bathroom =num_bathroom)
        
        if order_by is not None:
            if order_by == 'time':
                queryset = queryset.order_by('modified')
            elif order_by == 'price':
                queryset = queryset.order_by('price')

        return queryset



# create property
# endpoint: Create/
class CreateProperty(generics.CreateAPIView):

    serializer_class = PropertySerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
        return Response(serializer.data)
        


#edit property<id>
#endpoint: property/<int:id>/edit

class EditProperty(generics.RetrieveUpdateAPIView):

    serializer_class = PropertySerializer
    permission_classes = [IsOwner]


    def get_object(self):
        user = self.request.user
        property_id = self.kwargs['id']
        property = Property.objects.get(id=property_id, owner=user)
        return property
    
    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    


#property<id> detail
#endpoint: property/<int:id>/detail

class DetailProperty(generics.RetrieveUpdateAPIView):

    serializer_class = PropertySerializer
    queryset = Property.objects.all()
    lookup_field = 'id'



#property<id> delete
#endpoint: property/<int:id>/delete

class DeleteProperty(generics.DestroyAPIView):

    serializer_class = PropertySerializer
    queryset = Property.objects.all()
    lookup_field = 'id'
    permission_classes = [IsOwner]
