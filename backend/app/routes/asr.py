import os
import requests
from fastapi import APIRouter, UploadFile, File
from app.config import settings

router = APIRouter()

# Hugging Face API Configuration
HF_API_URL = "https://api-inference.huggingface.co/models/openai/whisper-tiny"
HF_TOKEN = os.getenv("HF_TOKEN") # Add this to your Vercel Environment Variables

@router.post("/transcribe")
async def transcribe_audio(file: UploadFile = File(...)):
    # Check if we should use local or cloud models
    if os.getenv("VERCEL"):
        # CLOUD MODE: Call Hugging Face API
        headers = {"Authorization": f"Bearer {HF_TOKEN}"}
        audio_data = await file.read()
        response = requests.post(HF_API_URL, headers=headers, data=audio_data)
        return response.json()
    else:
        # LOCAL MODE: Use local Whisper
        import whisper
        model_path = "ml-models/asr/tiny.pt"
        model = whisper.load_model("tiny", download_root="ml-models/asr")
        # Save temp file and transcribe...
        return {"text": "Local transcription simulated"}
