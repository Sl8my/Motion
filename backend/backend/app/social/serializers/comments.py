from rest_framework import serializers
from rest_framework.fields import SerializerMethodField
from app.social.models.comments import Comment
from app.users.serializers import UserSerializer


class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    is_from_logged_in_user = SerializerMethodField()

    def get_is_from_logged_in_user(self, comment):
        user = self.context['request'].user
        if user == comment.user:
            return True
        return False

    class Meta:
        model = Comment
        fields = '__all__'
