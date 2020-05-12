from rest_framework.generics import ListCreateAPIView
from rest_framework.response import Response
from app.social.models.comments import Comment
from app.social.models.posts import Post
from app.social.serializers.comments import CommentSerializer


class ListCreateComment(ListCreateAPIView):
    """
    get:
    List all Comments of a post.
    post:
    Create a new Comment.
    """
    serializer_class = CommentSerializer
    queryset = Post.objects.all()
    lookup_url_kwarg = 'post_id'

    def list(self, request, *args, **kwargs):
        post = self.get_object()
        comments = post.comments
        return Response(self.get_serializer(instance=comments, many=True).data)

    def create(self, request, *args, **kwargs):
        post = self.get_object()
        comment = Comment(user=request.user, post=post, comment=request.data['comment'])
        comment.save()
        return Response(self.get_serializer(instance=comment).data)
