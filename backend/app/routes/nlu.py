from fastapi import APIRouter, UploadFile, File
from app.services.intelligence_service import intelligence
import os

router = APIRouter()

@router.post("/process")
async def process_interaction(file: File = UploadFile(...)):
    # 1. Read audio data
    audio_data = await file.read()
    
    # 2. Detect Language (Auto-Detection)
    detected_lang = intelligence.detect_language(audio_data)
    
    # 3. Simulate Transcription (In a full loop, this would call ASR)
    # For now, we return the intelligence analysis
    transcript = "ನನಗೆ ಕುಡಿಯುವ ನೀರಿನ ಸಮಸ್ಯೆ ಇದೆ" # Simulated transcript for demo
    
    # 4. Generate AI Reply in the detected language
    reply = intelligence.generate_reply(transcript, language=detected_lang)
    
    return {
        "detected_language": detected_lang,
        "transcript": transcript,
        "ai_reply": reply,
        "status": "success"
    }
