from fastapi import APIRouter, UploadFile, File
from app.services.intelligence_service import intelligence
import os
import uuid

router = APIRouter()

@router.post("/process")
async def process_interaction(file: UploadFile = File(...)):
    # 1. Save audio to temporary file for processing in Vercel's writable /tmp directory
    temp_filename = f"/tmp/temp_{uuid.uuid4()}.wav"
    with open(temp_filename, "wb") as buffer:
        content = await file.read()
        buffer.write(content)
    
    try:
        # 2. Detect Language (Auto-Detection)
        detected_lang = intelligence.detect_language(content)
        
        # 3. REAL Transcription using Groq Whisper
        transcript = intelligence.transcribe_audio(temp_filename)
        
        # 4. Generate AI Reply in the detected language using Llama-3
        reply = intelligence.generate_reply(transcript, language=detected_lang)
        
        return {
            "detected_language": detected_lang,
            "transcript": transcript,
            "ai_reply": reply,
            "status": "success"
        }
    finally:
        # Clean up temp file
        if os.path.exists(temp_filename):
            os.remove(temp_filename)
