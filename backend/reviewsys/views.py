from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Review
from .serializers import ReviewSerializer
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch
import os
import re
from nltk.corpus import words


english_words = set(words.words())

MODEL_PATH = "../final_model"

def contains_real_word(text):
    tokens = re.findall(r"\b\w+\b", text.lower())
    return any(token in english_words for token in tokens)

def is_invalid_input(text):
    text = text.strip()

    if not text:  # Empty
        return True

    if re.fullmatch(r"[^\w\s]+", text):  # Symbols only
        return True

    if re.fullmatch(r"\d+", text):  # Numbers only
        return True

    if not contains_real_word(text):  # Gibberish / no real English word
        return True

    return False

class ReviewPredictionView(APIView):
    def post(self, request):
        review_text = request.data.get('review_text', '').strip()

        # Enhanced validations
        if is_invalid_input(review_text):
            return Response(
                {"error": "Review must contain meaningful English words – not just symbols, numbers, or gibberish."},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            
            tokenizer = AutoTokenizer.from_pretrained(MODEL_PATH, local_files_only=True)
            model = AutoModelForSequenceClassification.from_pretrained(MODEL_PATH, local_files_only=True)
            model.eval()

            inputs = tokenizer(review_text, return_tensors="pt", truncation=True)
            with torch.no_grad():
                outputs = model(**inputs)
                predicted_rating = torch.argmax(outputs.logits, dim=1).item() + 1

            review = Review.objects.create(
                review_text=review_text,
                predicted_rating=predicted_rating
            )   
            print(review_text)
            print(predicted_rating)
            return Response(ReviewSerializer(review).data, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ReviewListAPIView(APIView):
    def get(self, request):
        reviews = Review.objects.all().order_by('-created_at')
        serializer = ReviewSerializer(reviews, many=True)
        return Response(serializer.data)


class RecentReviewsAPIView(APIView):
    def get(self, request):
        recent_reviews = Review.objects.all().order_by('-created_at')[:3]
        serializer = ReviewSerializer(recent_reviews, many=True)
        return Response(serializer.data)
