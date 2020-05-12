from rest_framework import serializers
from app.social.models import Keyword


class KeywordSerializer(serializers.ModelSerializer):
    def to_representation(self, value):
        return value.keyword

    class Meta:
        model = Keyword
        fields = ['keyword']
