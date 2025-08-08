from django.shortcuts import render
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch
import torch.nn.functional as F
import re
from nltk.corpus import words
english_words = set(words.words())
# Load models once when the server starts
tokenizer_A = AutoTokenizer.from_pretrained("./model_A")
model_A = AutoModelForSequenceClassification.from_pretrained("./model_A")
model_A.eval()

tokenizer_B = AutoTokenizer.from_pretrained("./model_B")
model_B = AutoModelForSequenceClassification.from_pretrained("./model_B")
model_B.eval()
def contains_real_word(text):
    tokens = re.findall(r"\b\w+\b", text.lower())
    return any(token in english_words for token in tokens)
def is_invalid_input(text):
    
    text = text.strip()
    
    if not text:
        return True  # empty
    
    if re.fullmatch(r"[^\w\s]+", text):  # only symbols (e.g., !!!)
        return True
    
    if re.fullmatch(r"\d+", text):  # only numbers (e.g., 123)
        return True
    if not contains_real_word(text):  # gibberish
        return True
    return False

def predict_rating(model, tokenizer, text):
    inputs = tokenizer(text, return_tensors="pt", truncation=True, padding=True, max_length=128)
    with torch.no_grad():
        outputs = model(**inputs)
        probs = F.softmax(outputs.logits, dim=1)
        pred_class = torch.argmax(probs, dim=1).item()
    return pred_class + 1  # Convert from 0-based to 1–5 rating

def index(request):
    context = {
        "review": "",
        "prediction_A": None,
        "prediction_B": None,
        "agreement": None,
        "error": None
    }

    if request.method == "POST":
        review = request.POST.get("review", "").strip()

        if is_invalid_input(review):
            context["error"] = "Review must contain meaningful words – not just symbols or numbers."
        else:
            pred_A = predict_rating(model_A, tokenizer_A, review)
            pred_B = predict_rating(model_B, tokenizer_B, review)

            # Debug logs
            print("----- New Prediction -----", flush=True)
            print("Review Text:", review, flush=True)
            print("Model A Prediction:", pred_A, flush=True)
            print("Model B Prediction:", pred_B, flush=True)
            print("Agreement:", pred_A == pred_B, flush=True)

            context.update({
                "review": review,
                "prediction_A": pred_A,
                "prediction_B": pred_B,
                "agreement": pred_A == pred_B
            })

    return render(request, "index.html", context)


