from django.contrib.auth import get_user_model
from django.db.models import Q
from rest_framework.generics import CreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from app.social.models import Friend
from app.social.permissions import ObjNotLoggedInUser, FriendRequestDoesNotExist, IsPendingToAllowUpdate
from app.social.serializers.friends import FriendSerializer
from app.users.serializers import UserSerializer

User = get_user_model()


class CreateFriendRequest(CreateAPIView):
    """
    post:
    Create a new pending friend request.
    """
    queryset = User.objects.all()
    serializer_class = FriendSerializer
    lookup_url_kwarg = 'user_id'
    permission_classes = [IsAuthenticated, ObjNotLoggedInUser, FriendRequestDoesNotExist]

    def create(self, request, *args, **kwargs):
        receiver = self.get_object()
        requester = request.user
        friendship = Friend(requester=requester, receiver=receiver)
        friendship.save()
        return Response(self.get_serializer(instance=friendship).data)


class RetrieveUpdateDestroyFriendRequest(RetrieveUpdateDestroyAPIView):
    """
    get:
    Retrieve a friend request
    patch:
    Update the status of a friend request
    delete:
    Delete a friend request.
    Only allowed if logged-in user is part of the friendship, as specified in IsPendingToAllowUpdate
    """
    queryset = Friend.objects.all()
    serializer_class = FriendSerializer
    lookup_url_kwarg = 'friend_request_id'
    permission_classes = [IsAuthenticated, IsPendingToAllowUpdate]


class ListFriends(ListAPIView):
    """
    get:
    List all of logged-in users accepted friends.
    """
    serializer_class = UserSerializer
    queryset = User.objects.all()

    def filter_queryset(self, queryset):
        return self.request.user.friends


class ListFriendRequests(ListAPIView):
    """
    get:
    List all friend requests in which the logged-in user is involved.
    """
    serializer_class = FriendSerializer
    queryset = Friend.objects.all()

    def filter_queryset(self, queryset):
        requests = Friend.objects.filter(
            Q(receiver=self.request.user) | Q(requester=self.request.user)
        ).distinct()
        if "status" in self.request.query_params.keys():
            status = self.request.query_params["status"]
            return requests.filter(status=status)
        return requests
