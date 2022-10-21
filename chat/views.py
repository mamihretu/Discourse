from django.contrib.auth import get_user_model
from rest_framework import permissions, status
from rest_framework.response import Response
from django.http import JsonResponse

from chat.models import Chat, Contact
from chat.utils import get_user_contact
# from .serializers import ChatSerializer

UserModel = get_user_model()


def user(request):
	print(request.user.username)
	response = {'username': request.user.username}
	return JsonResponse(response, status=status.HTTP_200_OK)




