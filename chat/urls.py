from django.urls import path, re_path
from . import views


app_name = 'chat'

urlpatterns = [
	path('setup1', views.username),
	path('setup2', views.Setup.as_view())
]