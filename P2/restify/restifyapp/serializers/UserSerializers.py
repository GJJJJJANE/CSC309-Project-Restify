from rest_framework import serializers
from ..models import User
from django.core.validators import RegexValidator, MinLengthValidator

class LoginSerializer(serializers.Serializer):

    username = serializers.CharField(max_length=100, required=True)
    password = serializers.CharField(max_length=16, 
                                     validators=[MinLengthValidator(8, message='Password should be 8-16 long')], 
                                     required=True)
    password_confirm = serializers.CharField(max_length=100, required=True)
    email = serializers.EmailField(max_length=100, required=True)
    first_name = serializers.CharField(max_length=100, required=True)
    last_name = serializers.CharField(max_length=100, required=True)
    avatar = serializers.URLField(required=True)
    phone_number = serializers.CharField(max_length=10,
                                    validators=[RegexValidator(regex='[0-9]{10}$', message='Please Enter a Valid Phone Number', code='nomatch')], 
                                    required=True)

    def create(self, validated_data):
        res = []
        if validated_data['password'] != validated_data['password_confirm']:
            res.append({'password': 'Passwords do not match'})
        if len(validated_data['password']) < 8:
            res.append({'password': 'Passwords too weak'})
        try:
            user = User.objects.get(email=validated_data['email'])
        except User.DoesNotExist:
            user = User.objects.create(email=validated_data['email'],
                                    username=validated_data['username'],
                                    avatar=validated_data['avatar'],
                                    phone_number=validated_data['phone_number'],
                                    first_name=validated_data['first_name'],
                                    last_name=validated_data['last_name'],
                                         )
            user.set_password(validated_data['password'])
            user.save()
            return user
        res.append(({'email': 'Email already been used'}))
        raise serializers.ValidationError(res)
    
class UserSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = User
        fields=['id', 'email', 'username', 'first_name', 'last_name', 'avatar', 'phone_number']

class PasswordSerializer(serializers.Serializer):

    password = serializers.CharField(max_length=16, 
                                     validators=[MinLengthValidator(8, message='Password should be 8-16 long')], 
                                     required=True)
    password_confirm = serializers.CharField(max_length=100, required=True)
