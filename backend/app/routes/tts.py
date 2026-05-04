import os
import requests
from fastapi import APIRouter, Response
from pydantic import BaseModel

router = APIRouter()

class TTSRequest(BaseModel):
    text: str
    language: str # 'kn' or 'en'

# HF Model Mapping for Bharat Languages
TTS_MODELS = {
    "kn": "facebook/mms-tts-kan",
    "en": "facebook/mms-tts-eng",
    "hi": "facebook/mms-tts-hin"
}

@router.post("/synthesize")
async def synthesize_speech(request: TTSRequest):
    model_id = TTS_MODELS.get(request.language, "facebook/mms-tts-eng")
    api_url = f"https://api-inference.huggingface.co/models/{model_id}"
    
    headers = {"Authorization": f"Bearer {os.getenv('HF_TOKEN')}"}
    
    response = requests.post(api_url, headers=headers, json={"inputs": request.text})
    
    if response.status_code == 200:
        return Response(content=response.content, media_type="audio/wav")
    else:
        return {"error": "TTS synthesis failed", "details": response.text}
