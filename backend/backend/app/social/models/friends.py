from django.db import models
from django_extensions.db.models import TimeStampedModel
from django.conf import settings


class Friend(TimeStampedModel):
    requester = models.ForeignKey(
        verbose_name='social user profile',
        to=settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='requests_sent'
    )
    receiver = models.ForeignKey(
        verbose_name='social user profile',
        to=settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='requests_received'
    )
    status = models.CharField(
        verbose_name='status',
        max_length=1,
        choices=(
            ('P', 'Pending'),
            ('A', 'Accepted'),
            ('R', 'Rejected')
        ),
        default='P'
    )

    class Meta:
        unique_together = ['requester', 'receiver']

    def __str__(self):
        return f'{self.requester.username}, {self.receiver.username}, {self.status}'
