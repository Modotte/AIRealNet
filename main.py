from transformers import AutoModelForImageClassification, AutoImageProcessor
from flask import Flask, request, jsonify
import torch 
import requests
from PIL import Image
import os

app = Flask(__name__)

MODEL_DIR = "./models/AIRealNet"

if not os.path.exists(MODEL_DIR):
    model = AutoModelForImageClassification.from_pretrained("XenArcAI/AIRealNet")
    processor = AutoImageProcessor.from_pretrained("XenArcAI/AIRealNet")
    model.save_pretrained(MODEL_DIR)
    processor.save_pretrained(MODEL_DIR)
else:
  
    model = AutoModelForImageClassification.from_pretrained(MODEL_DIR)
    processor = AutoImageProcessor.from_pretrained(MODEL_DIR)

@app.route("/generate", methods=["POST"])
def generate():
    data = request.get_json(force=True)  
    
    # Validate payload
    url = data.get("url")
    if not url or not isinstance(url, str) or not url.startswith("http"):
        return jsonify({
            "error": "Invalid payload. Expected JSON like {'url': 'http://...'}"
        }), 400
    
    image = Image.open(requests.get(url, stream=True).raw)
    inputs = processor(images=image, return_tensors="pt")
    outputs = model(**inputs)
    preds = torch.nn.functional.softmax(outputs.logits, dim=-1)

    labels = model.config.id2label 

    results = [
        {"label": labels[i], "score": float(preds[0][i])}
        for i in range(len(labels))
    ]
    return jsonify({"model": "AIRealNet", "result": results})
             
@app.post("/payload")
def return_payload():
    return {"url": "https://example.com"}

if __name__ == "__main__":
    # Run on port 5000 by default
    app.run(host="0.0.0.0", port=5000)
