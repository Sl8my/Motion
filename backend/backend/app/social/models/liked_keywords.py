from django.conf import settings
from django.db import models


class Keyword(models.Model):
    user = models.ManyToManyField(
        verbose_name='user',
        to=settings.AUTH_USER_MODEL,
        related_name='things_user_likes',
    )
    keyword = models.CharField(
        verbose_name='keyword',
        max_length=20
    )

    def __str__(self):
        return f"{self.keyword}"
