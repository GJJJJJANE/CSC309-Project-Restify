from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator, MinLengthValidator

class User(AbstractUser):

    username = models.CharField(max_length=100, null=False)
    email = models.EmailField(max_length=100, unique=True, null=False)
    password = models.CharField(max_length=16, validators=[MinLengthValidator(8, 'Password is too short')], null=False)
    first_name = models.CharField(max_length=100, null=False)
    last_name = models.CharField(max_length=100, null=False)
    avatar = models.URLField(null=False)
    phone_number = models.CharField(max_length=10,
                                    validators=[RegexValidator(regex='[0-9]{10}$', message='Please Enter a Valid Phone Number', code='nomatch')], 
                                    null=False)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['id', 'username', 'password', 'first_name', 'last_name', 'avatar', 'phone_number']