
from rest_framework.serializers import ModelSerializer
from ..models import GuestComment, PropertyComment, ReplyThread

class GuestCommentSerializer(ModelSerializer):
    class Meta:
        model = GuestComment
        fields = ['id','target','score','content','modified']
        read_only_fields = ('target',)

class PropertyCommentSerializer(ModelSerializer):
    class Meta:
        model = PropertyComment
        fields = ['id','target','score','content','modified']
        read_only_fields = ('target',)

class ReplySerializer(ModelSerializer):
    class Meta:
        model = ReplyThread
        fields = ['id','target','host_response','user_response','modified']
        read_only_fields = ('target',)
