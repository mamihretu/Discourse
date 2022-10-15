from django.contrib.auth import get_user_model
from rest_framework import permissions

from chat.models import Chat, Contact
from chat.utils import get_user_contact
# from .serializers import ChatSerializer

User = get_user_model()


