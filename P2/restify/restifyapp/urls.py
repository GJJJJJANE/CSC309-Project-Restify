from django.urls import path
from . import views

app_name="restifyapp"
urlpatterns = [ 

    # comments
    path('comments/<int:guest_id>/Guestview/', views.ListGuestComment.as_view(), name="guestcomment_list"),
    path('comments/<int:property_id>/Propertyview/', views.ListPropertyComment.as_view(), name="propertycomment_list"),
    path('comments/<int:guest_id>/writeGuestComment/', views.WriteGuestComment.as_view(), name="guestcomment_write"),
    path('comments/<int:reservation_id>/writePropertyComment/', views.WritePropertyComment.as_view(), name="propcomment_write"),
    path('comments/<int:comment_id>/reply/', views.ReplyDetail.as_view(), name="reply"),
]
