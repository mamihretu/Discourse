from django.urls import path, re_path
from . import views


app_name = 'chat'

urlpatterns = [
	path('setup', views.Setup.as_view())
]
