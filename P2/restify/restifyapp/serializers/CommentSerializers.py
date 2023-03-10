from rest_framework import ModelSerializer
from models import GuestComment, PropertyComment, ReplyThread

class GuestCommentSerializer(ModelSerializer):
    class Meta:
        model = GuestComment
        fields = ['id','target','score','content']

class PropertyCommentSerializer(ModelSerializer):
    class Meta:
        model = PropertyComment
        fields = ['id','target','score','content']

class ReplySerializer(ModelSerializer):
    class Meta:
        model = ReplyThread
        fields = ['id','target','host_response','user_response']
