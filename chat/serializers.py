from rest_framework import serializers
from .models import Chat, Message
from django.contrib.auth import get_user_model

User = get_user_model()


class ContactSerializer(serializers.StringRelatedField):
    def to_internal_value(self, value):
        return value


class MessageSerializer(serializers.ModelSerializer):
	author = serializers.SlugRelatedField(slug_field="username", queryset=User.objects.all())

	class Meta:
		model = Message  
		fields = ['author', 'content', 'timestamp']	  
		      

class ChatSerializer(serializers.ModelSerializer):
	participants = ContactSerializer(many=True)
	messages = MessageSerializer(many=True)

	class Meta:
		model = Chat  
		fields = ['id', 'participants', 'messages']

	