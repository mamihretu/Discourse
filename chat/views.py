from django.contrib.auth import get_user_model
from rest_framework import permissions, status
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView,ListAPIView,RetrieveAPIView,DestroyAPIView,UpdateAPIView,ListCreateAPIView
from .models import Chat, Message
from .serializers import ChatSerializer, MessageSerializer

UserModel = get_user_model()


class Setup(ListAPIView):
	queryset = Chat.objects.all()
	serializer_class = ChatSerializer






