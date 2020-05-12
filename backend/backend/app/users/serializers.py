from django.contrib.auth import get_user_model
from django.db.models import Q
from rest_framework import serializers
from app.social.models import Post, Friend
from app.social.serializers.keywords import KeywordSerializer

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    logged_in_user_is_following = serializers.SerializerMethodField()
    logged_in_user_is_friends = serializers.SerializerMethodField()
    logged_in_user_is_rejected = serializers.SerializerMethodField()
    logged_in_user_received_fr = serializers.SerializerMethodField()
    logged_in_user_sent_fr = serializers.SerializerMethodField()
    amount_of_posts = serializers.SerializerMethodField()
    amount_of_likes = serializers.SerializerMethodField()
    amount_of_friends = serializers.SerializerMethodField()
    amount_of_followers = serializers.SerializerMethodField()
    amount_following = serializers.SerializerMethodField()
    things_user_likes = KeywordSerializer(many=True)

    def get_logged_in_user_is_following(self, user):
        return user in self.context['request'].user.followees.all()

    def get_logged_in_user_is_friends(self, user):
        return user in self.context['request'].user.friends

    def get_logged_in_user_is_rejected(self, user):
        return user in self.context['request'].user.friend_requests_sent_rejected

    def get_logged_in_user_received_fr(self, user):
        return user in self.context['request'].user.friend_requests_received

    def get_logged_in_user_sent_fr(self, user):
        return user in self.context['request'].user.friend_requests_sent

    def get_amount_of_posts(self, user):
        return Post.objects.filter(user=user).count()

    def get_amount_of_likes(self, user):
        return user.liked_posts.count()

    def get_amount_of_friends(self, user):
        return Friend.objects.filter(Q(status='A', requester=user.id) | Q(status='A', receiver=user.id)).count()

    def get_amount_of_followers(self, user):
        return User.objects.filter(followees=user).count()

    def get_amount_following(self, user):
        return user.followees.count()

    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'last_name', 'username', 'avatar', 'banner', 'location', 'about_me',
                  'things_user_likes', 'logged_in_user_is_following', 'logged_in_user_is_friends',
                  'logged_in_user_is_rejected', 'logged_in_user_received_fr', 'logged_in_user_sent_fr',
                  'amount_of_posts', 'logged_in_user_is_friends', 'amount_of_posts', 'amount_of_likes',
                  'amount_of_friends', 'amount_of_followers', 'amount_following', 'things_user_likes']
        read_only_fields = ['email']
