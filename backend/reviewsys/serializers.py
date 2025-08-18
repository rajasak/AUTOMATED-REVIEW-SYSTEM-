from rest_framework import serializers
from .models import Review

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['id','review_text','predicted_rating','created_at']
        read_only_fields=['created_at']
