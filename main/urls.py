from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('', include('frontend.urls')),
    path('admin/', admin.site.urls),
    path('api/', include('chat.urls')),
    path('rest-auth/', include('dj_rest_auth.urls')),
    path('rest-auth/registration/', include('dj_rest_auth.registration.urls'))
]
