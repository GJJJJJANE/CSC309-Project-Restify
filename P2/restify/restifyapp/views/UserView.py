from rest_framework.response import Response
from rest_framework.views import APIView
from ..serializers import UserSerializer, LoginSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from rest_framework import status
from ..models import User
from rest_framework.generics import RetrieveUpdateAPIView, UpdateAPIView
    
class LogoutView(APIView):

    permission_classes = [IsAuthenticated,]
    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            refresh = RefreshToken(token=refresh_token)
            refresh.blacklist()
            return Response('Logged out', status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response('400 BAD REQUEST', status=status.HTTP_400_BAD_REQUEST)
    
class RegisterView(APIView):

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        user = serializer.instance
        return Response({
                        'id' : user.id,
                        'username' : user.username,
                        'email' : user.email,
                        'first_name' : user.first_name,
                        'last_name' : user.last_name,
                        'avatar' : user.avatar,
                        'phone_number' : user.phone_number,
                        }, status=200)

class ProfileView(RetrieveUpdateAPIView):

    permission_classes = [IsAuthenticated,]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user
    
    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    
class PasswordEditView(APIView):
     
    permission_classes = [IsAuthenticated,]
    serializer_class = UserSerializer

    def patch(self, request, *args, **kwargs):
        user = self.request.user
        res = []
        if 'password' not in request.data:
            res.append({'password': 'This field can not be empty'})
        elif 'password_confirm' not in request.data:
            res.append({'password_confirm': 'This field can not be empty'})
        if res != []:
            return Response(res, status=400)
        if request.data['password'] != request.data['password_confirm']:
            res.append({'password': 'Password do not match'})
        if len(request.data['password']) < 8:
            res.append({'password': 'Password too weak'})
        if res != []:
            return Response(res, status=400)
        user.set_password(request.data['password'])
        user.save()
        return Response({f"Successfully Edit Password for {user.username}"}, status=200)    
    
class checkEmailView(APIView):

    def post(self, request):
        try:
            user = User.objects.get(email = request.data['email'])
        except User.DoesNotExist:
            return Response({"true"}, status=200)
        except Exception as e:
            return Response({"bad"}, status=200)
        return Response({"false"}, status=200)
        

