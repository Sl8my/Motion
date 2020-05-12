from django.contrib import admin

from app.social.models.comments import Comment
from app.social.models.posts import Post
from app.social.models.liked_keywords import Keyword
from app.social.models.friends import Friend
from app.social.models.images import Image

admin.site.register(Comment)
admin.site.register(Post)
admin.site.register(Keyword)
admin.site.register(Friend)
admin.site.register(Image)
