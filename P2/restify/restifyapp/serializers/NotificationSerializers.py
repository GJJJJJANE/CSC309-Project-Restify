from rest_framework import serializers
from ..models import Notification
from django.core.validators import RegexValidator, MinLengthValidator

class NotificationSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Notification
        fields=['id', 'title', 'content', 'target', 'if_read']
