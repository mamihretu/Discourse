



import json
from channels.generic.websocket import AsyncWebsocketConsumer


class ChatRoomConsumer(AsyncWebsocketConsumer):
	async def connect(self):
		"""add channel to group when user goes to room on browser"""
		self.room_name = self.scope['url_route']['kwargs']['room_name']
		self.group_name = f'chat_{self.room_name}'

		await self.channel_layer.group_add(
			self.group_name,
			self.channel_name
			)

		await self.accept() 

	async def tester_message(self, event):
		"""beginning point for channels when message
		   is received internally. Message is sent to browser
		   """

		test_text = event['test_text']
		await self.send(text_data = json.dumps({'test_text': test_text}))

	    		



	async def disconnect(self, close_code):
		"""remove channel from group"""
		await self.channel_layer.group_discard(
			self.group_name,
			self.channel_name
			)  


	async def receive(self, text_data):
		text_data_json = json.loads(text_data)
		message = text_data_json['message']
		username = text_data_json['username']



		# Send messaga to all channels added to current
		# group, message is sent internally within server
		# when each channel receives message it will send
		# it to its corresponding browser via websocket using
		# function specified by 'type'		        
		await self.channel_layer.group_send(
		    self.group_name,
		    {
		        'type': 'chatroom_message',
		        'message': message,
		        'username': username,
		    }
		)

	async def chatroom_message(self, event):
		"""Send message to browser via websocket"""
		message = event['message']
		username = event['username']

		await self.send(text_data=json.dumps({
		    'message': message,
		    'username': username,
		}))
