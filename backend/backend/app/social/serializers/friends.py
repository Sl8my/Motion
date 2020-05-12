from rest_framework import serializers
from app.social.models import Friend
from app.users.serializers import UserSerializer


class FriendSerializer(serializers.ModelSerializer):
    requester = UserSerializer()
    receiver = UserSerializer()

    class Meta:
        model = Friend
        fields = ['id', 'requester', 'receiver', 'status', 'created']
