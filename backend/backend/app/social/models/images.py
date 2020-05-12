from django.db import models

from app.social.models import Post


class Image(models.Model):
    post = models.ForeignKey(
        verbose_name='post',
        to=Post,
        on_delete=models.CASCADE,
        related_name='images',
    )
    image = models.ImageField(
        verbose_name='image',
        upload_to='',
    )

    def __str__(self):
        return f"{self.id}: image from post {self.post.id}"
