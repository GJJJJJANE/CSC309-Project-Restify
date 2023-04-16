# Comment system.
# There are 3 comment models

from django.db import models

# import other models
from .user import User
from .reservation import Reservation


# the comment to a guest. handout did not specify many restrictions here...
class GuestComment(models.Model):

    # FIELDS
    # id set to default
    target = models.ForeignKey(User,on_delete=models.CASCADE)
    score = models.PositiveIntegerField()
    content = models.TextField()
    modified = models.DateTimeField(auto_now_add=True)
    host = models.PositiveIntegerField()  # host id

    class Meta:
        ordering = ['modified']


# the comment to a property, must be related to a completed reservation and there can
# be only one comment.
class PropertyComment(models.Model):
        
    target = models.OneToOneField(Reservation, 
                                  on_delete=models.CASCADE,
                                  related_name='comment_of') 
    # reservation will have an attribute called 'comment_of', raise RelatedObjectDoesNotExist if DNE
    content = models.TextField()
    score = models.PositiveIntegerField()
    modified = models.DateTimeField(auto_now_add=True)
    guest = models.PositiveIntegerField()  # guest id

    class Meta:
        ordering = ['modified']

# the reply thread to a property comment. Host can respond once, then the guest 
# can respond once.
class ReplyThread(models.Model):
    
    target = models.OneToOneField(PropertyComment, 
                                  on_delete=models.CASCADE,
                                  related_name='reply_of')
    host_response = models.TextField(null=True, blank=True, default='')
    user_response = models.TextField(null=True, blank=True, default='')
    modified = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['modified']