from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch

# Path to your local model
model_path = "./AUTOMATED-REVIEW-SYSTEM-/model_A"

# Load tokenizer and model
tokenizer = AutoTokenizer.from_pretrained(model_path)
model = AutoModelForSequenceClassification.from_pretrained(model_path)

# Test input
text = "bad product"

# Tokenize
inputs = tokenizer(text, return_tensors="pt")

# Run inference
with torch.no_grad():
    outputs = model(**inputs)
    predictions = torch.nn.functional.softmax(outputs.logits, dim=-1)

# Print predictions
print(predictions)
print("Predicted star rating:", torch.argmax(predictions) + 1)  # +1 because stars are usually 1-5
