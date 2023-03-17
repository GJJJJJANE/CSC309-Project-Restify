from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from rest_framework_simplejwt.views import TokenBlacklistView


app_name="restifyapp"
urlpatterns = [ 

    # reservation
    path('reservations/hostview/', views.HostReservation.as_view(), name="host_reservation"),
    path('reservations/guestview/', views.GuestReservation.as_view(), name="guest_reservation"),
    path('reservations/reserve/<int:property_id>/', views.ReservationCreate.as_view(), name="reserve"),
    path('reservations/<int:reservation_id>/cancel/request/', views.ReservationCancel.as_view(), name="cancel_request"),
    path('reservations/<int:reservation_id>/pending/action/', views.PendingAction.as_view(), name="pending_action"),
    path('reservations/<int:reservation_id>/cancel/action/', views.CancellationAction.as_view(), name="cancel_action"),
    path('reservations/<reservation_id>/terminate/', views.Terminate.as_view(), name="terminate"),

    # comments
    path('comments/<int:guest_id>/Guestview/', views.ListGuestComment.as_view(), name="guestcomment_list"),
    path('comments/<int:property_id>/Propertyview/', views.ListPropertyComment.as_view(), name="propertycomment_list"),
    path('comments/<int:guest_id>/writeGuestComment/', views.WriteGuestComment.as_view(), name="guestcomment_write"),
    path('comments/<int:reservation_id>/writePropertyComment/', views.WritePropertyComment.as_view(), name="propcomment_write"),
    path('comments/<int:comment_id>/reply/create/', views.ReplyCreate.as_view(), name="host_reply"),
    path('comments/<int:comment_id>/reply/', views.ReplyDetail.as_view(), name="user_reply"),

    #property
    path('Listing_all/', views.All_host_listing.as_view(), name="all_host_listing"),
    path('SearchResult/', views.SearchProperty.as_view(), name="search_property_result"),
    path('Create/', views.CreateProperty.as_view(), name="create_property"),
    path('property/<int:id>/edit', views.EditProperty.as_view(), name="edit_property"),
    path('property/<int:id>/detail', views.DetailProperty.as_view(), name="property_detail"),
    path('property/<int:id>/delete', views.DeleteProperty.as_view(), name="delete_property"),

    #user
    path('accounts/login/', TokenObtainPairView.as_view(), name='login'),
    path('accounts/login/refresh/', TokenRefreshView.as_view(), name='login_refresh'),
    path('accounts/logout/', views.LogoutView.as_view(), name='logout'),
    path('accounts/register/', views.RegisterView.as_view(), name='register'),
    path('accounts/profile/', views.ProfileView.as_view(), name='profile_view'),
    path('accounts/password/edit/', views.PasswordEditView.as_view(), name='profile_edit'),

    #notification
    path('notifications/all/', views.AllNotifView.as_view(), name='notification_list'),
    path('notifications/read/<int:notif_id>/', views.ReadNotifView.as_view(), name='notification_read'),
    path('notifications/delete/<int:notif_id>/', views.DeleteNotifView.as_view(), name='notification_delete'),
    path('notifications/receive/<int:user_id>/', views.RecieveNotifView.as_view(), name='notification_recieve'),
]
