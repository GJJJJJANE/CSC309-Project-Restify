from ..models import GuestComment, PropertyComment, ReplyThread, User, Reservation, Property
from ..serializers import GuestCommentSerializer, PropertyCommentSerializer, ReplySerializer,GuestReplySerializer
from django.core.exceptions import ValidationError,PermissionDenied
from rest_framework import status, generics, mixins
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.pagination import PageNumberPagination


class ListingPagination(PageNumberPagination):
    page_size = 6
    
# comment view - guest
# endpoint: comments/<guest_id>/Guestview
class ListGuestComment(generics.ListAPIView):
    
    serializer_class = GuestCommentSerializer
    pagination_class = ListingPagination

    def get_queryset(self, *args, **kwargs):
        score_filter = self.request.query_params.get('score', '')
        if score_filter == '':
            try:
                queryset = GuestComment.objects.filter(target=User.objects.get(id=self.kwargs['guest_id']))
                return queryset
            except:
                return []
        else:
            try:
                queryset = GuestComment.objects.filter(target=User.objects.get(id=self.kwargs['guest_id']),
                                                       score=score_filter)
                return queryset
            except:
                return []

        
    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            serializer_data = serializer.data
            sorted_serializer_data = sorted(serializer_data, key=lambda x: x['modified'], reverse=True)
            for item in sorted_serializer_data:
                newDict={"host_name": User.objects.get(id=item['host']).get_full_name()}
                item.update(newDict)
            return self.get_paginated_response(sorted_serializer_data)

        serializer = self.get_serializer(queryset, many=True)
        serializer_data = serializer.data
        sorted_serializer_data = sorted(serializer_data, key=lambda x: x['modified'], reverse=True)
        for item in sorted_serializer_data:
                newDict={"host_name": User.objects.get(id=item['host']).get_full_name()}
                item.update(newDict)
        return Response(sorted_serializer_data)
        
# comment view - property
# endpoint: comments/<property_id>/Propertyview
class ListPropertyComment(generics.ListAPIView):
    
    serializer_class = PropertyCommentSerializer
    pagination_class = ListingPagination

    def get_queryset(self, *args, **kwargs):

        score_filter = self.request.query_params.get('score', '')
        if score_filter == '':
            try:
                targets=Property.objects.get(id=self.kwargs['property_id'])
                # if not targets.exists():
                #     return Response("Property Not Found", status=404)
                target_reservations=Reservation.objects.filter(property=targets)
                return PropertyComment.objects.filter(target__in=target_reservations)
            except:
                return []
        else:
            try:
                targets=Property.objects.get(id=self.kwargs['property_id'])
                # if not targets.exists():
                #     return Response("Property Not Found", status=404)
                target_reservations=Reservation.objects.filter(property=targets)
                return PropertyComment.objects.filter(target__in=target_reservations)
            except:
                return []

        
    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            serializer_data = serializer.data
            sorted_serializer_data = sorted(serializer_data, key=lambda x: x['modified'], reverse=True)
            for item in sorted_serializer_data:
                newDict={"guest_name": User.objects.get(id=item['guest']).get_full_name()}
                item.update(newDict)
            return self.get_paginated_response(sorted_serializer_data)

        serializer = self.get_serializer(queryset, many=True)
        serializer_data = serializer.data
        sorted_serializer_data = sorted(serializer_data, key=lambda x: x['modified'], reverse=True)
        return Response(sorted_serializer_data)
    
# create comment - guest
# endpoint: comments/<guest_id>/writeGuestComment
class WriteGuestComment(generics.CreateAPIView):

    serializer_class = GuestCommentSerializer
    permission_classes = [IsAuthenticated]

    def get_serializer_context(self):
        """
        Extra context provided to the serializer class.
        """
        return {
            'guest_id': self.kwargs['guest_id'],
            'host': self.request.user,
        }

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(target=User.objects.filter(id=self.kwargs['guest_id'])[0],)
            return Response(serializer.data)
        return Response(serializer.errors)           

        
# create comment - property
# endpoint: comments/<reservation_id>/writePropertyComment
class WritePropertyComment(generics.CreateAPIView):

    serializer_class = PropertyCommentSerializer
    permission_classes = [IsAuthenticated]

    def get_serializer_context(self):
        """
        Extra context provided to the serializer class.
        """
        return {
            'reservation_id': self.kwargs['reservation_id'],
            'guest': self.request.user,
        }
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            target_reservation = Reservation.objects.filter(id=self.kwargs['reservation_id'])
            serializer.save(target=target_reservation[0])
            return Response(serializer.data)
        return Response(serializer.errors)   

# create a reply, done by host
# endpoint: comments/<comment_id>/reply/create
class ReplyCreate(generics.CreateAPIView):
    
    serializer_class = ReplySerializer
    permission_classes = [IsAuthenticated]

    def get_serializer_context(self):
        """
        Extra context provided to the serializer class.
        """
        return {
            'action':'create',
            'comment_id': self.kwargs['comment_id'],
            'host': self.request.user,
            }
        
    def perform_create(self, serializer):
        if serializer.is_valid():
            target_comment=PropertyComment.objects.filter(id=self.kwargs['comment_id'])
            serializer.save(target=target_comment[0])
            return Response(serializer.data)
        return Response(serializer.errors)   

# update and view replies detail for a property comment, done by user
# endpoint: comments/<comment_id>/reply
class ReplyDetail(generics.RetrieveUpdateAPIView):
    
    serializer_class = GuestReplySerializer
    permission_classes = [IsAuthenticated]
    lookup_url_kwarg = 'comment_id'

    def get_serializer_context(self):
        """
        Extra context provided to the serializer class.
        """
        return {
            'action':'update',
            'comment_id': self.kwargs['comment_id'],
            'guest': self.request.user,
            }

    def get_queryset(self, *args, **kwargs):
        try:
            target_comment=PropertyComment.objects.get(id=self.kwargs['comment_id'])
            return ReplyThread.objects.filter(target=target_comment)
        except:
            return []

    # def get(self, request, *args, **kwargs):
    #     return self.retrieve(request, *args, **kwargs)

    def perform_update(self, serializer):
        if serializer.is_valid():
            # target_reservation = Reservation.objects.filter(
            #     comment_of=PropertyComment.objects.filter(id=self.kwargs['comment_id'])[0])[0]
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors) 