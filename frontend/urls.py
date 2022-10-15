from django.urls import path
from . import views
from django.contrib.auth import views as djangoViews


app_name = 'frontend'

urlpatterns = [
    path('', views.index, name = 'index'),
    path('room/<str:roomID>', views.index),
    path('login', djangoViews.LoginView.as_view(template_name = 'frontend/index.html'), name = 'login'),
    path('logout', djangoViews.LogoutView.as_view(template_name = 'frontend/index.html'), name = 'logout'),
    path('signup', views.signUpView, name = 'signup'),

]
