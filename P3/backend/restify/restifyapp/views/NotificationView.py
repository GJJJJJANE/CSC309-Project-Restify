from rest_framework.response import Response
from rest_framework.views import APIView
from ..serializers import NotificationSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from rest_framework import status
from ..models import Notification, User
from rest_framework.generics import CreateAPIView, DestroyAPIView, ListAPIView
from rest_framework.pagination import PageNumberPagination


class NotificationPagination(PageNumberPagination):
    page_size = 3

class AllNotifView(ListAPIView):

    permission_classes = [IsAuthenticated,]
    serializer_class = NotificationSerializer
    pagination_class = NotificationPagination

    def get_queryset(self, *args, **kwargs):
        queryset = Notification.objects.filter(target_id=self.request.user.id)
        return queryset

    
class ReadNotifView(APIView):

    permission_classes = [IsAuthenticated,]
    serializer_class = NotificationSerializer

    def patch(self, request, *args, **kwargs):
        try:
            notification = Notification.objects.get(id=kwargs['notif_id'])
            if self.request.user.id != notification.target.id:
                return Response("Notification do not belong to you", status=403)
            notification.if_read = True
            notification.save()
            return Response("Notification is read", status=200)
        except Notification.DoesNotExist:
            return Response("Notification Not Found", status=404)
        # except Exception as e:
        #     return Response("400 Bad Request", status=400)


class DeleteNotifView(APIView):

    permission_classes = [IsAuthenticated,]
    serializer_class = NotificationSerializer

    def delete(self, request, *args, **kwargs):
        try:
            notification = Notification.objects.get(id=kwargs['notif_id'])
            if self.request.user.id != notification.target.id:
                return Response("Notification do not belong to you", status=403)
            notification.delete()
            return Response("Notification is cleared", status=200)
        except Notification.DoesNotExist:
            return Response("Notification Not Found", status=404)
        except Exception as e:
            return Response("400 Bad Request", status=400)


class RecieveNotifView(CreateAPIView):
    
    # There are four type_id of Notifications:
    # 1. new reservation to Host == 1
    # 2. cancellation request to Host == 2
    # 3. approved reservation to Guest == 3
    # 4. cancellation request to Guest == 4

    permission_classes = [IsAuthenticated,]
    serializer_class = NotificationSerializer

    def post(self, request, *args, **kwargs):
        try:
            user = User.objects.get(id=kwargs['user_id'])
            if request.data["type_id"] not in ['1','2','3','4']:
                return Response("Notification type not valid", status=400)
            if request.data["property"] == '' or request.data["start"] == '' or request.data['end'] == '':
                return Response("Notification body should not be empty", status=400)
            if request.data["type_id"] == '1':
                title = f"New reservation"
                description = f"Your {request.data['property']} is reserved from {request.data['start']} to {request.data['end']}."
            elif request.data["type_id"] == '2':
                title = f"Cancellation request"
                description = f"Cancellation is requested on reservation of {request.data['property']} from {request.data['start']} to {request.data['end']}."
            elif request.data["type_id"] == '3':
                title = f"Reservation approved"
                description = f"Reservation of {request.data['property']} from {request.data['start']} to {request.data['end']} is approved."
            elif request.data["type_id"] == '4':
                title = f"Cancellation request"
                description = f"Cancellation is requested on reservation of {request.data['property']} from {request.data['start']} to {request.data['end']}."
        except User.DoesNotExist:
            return Response("Target user can not be found", status=404)
        except Exception as e:
            return Response("Something wrong with the request body", status=400)
        request.data._mutable = True
        request.data["title"] = title
        request.data["content"] = description
        request.data["target"] = user.id
        request.data._mutable = False

        return self.create(request, *args, **kwargs)
