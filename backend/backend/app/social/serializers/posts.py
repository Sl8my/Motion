from rest_framework import serializers
from app.social.models.posts import Post
from app.users.serializers import UserSerializer
from app.social.serializers.images import ImageSerializer


class SharedPostSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Post
        fields = '__all__'


class PostSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    images = ImageSerializer(many=True, required=False)
    logged_in_user_liked = serializers.SerializerMethodField()
    is_from_logged_in_user = serializers.SerializerMethodField()
    amount_of_likes = serializers.SerializerMethodField()
    shared = SharedPostSerializer(required=False)

    def get_logged_in_user_liked(self, post):
        user = self.context['request'].user
        if post in user.liked_posts.all():
            return True
        return False

    def get_is_from_logged_in_user(self, post):
        user = self.context['request'].user
        if user == post.user:
            return True
        return False

    @staticmethod
    def get_amount_of_likes(post):
        return post.liked_by.all().count()

    class Meta:
        model = Post
        fields = '__all__'

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        post = super().create(validated_data=validated_data)
        return post