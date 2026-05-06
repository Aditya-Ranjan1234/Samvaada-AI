from fastapi import APIRouter, UploadFile, File
from pydantic import BaseModel
import uuid
import os
import requests

router = APIRouter()

# --------------- Models ---------------
class CallInitiateResponse(BaseModel):
    call_id: str
    websocket_url: str

class GroqTranscribeRequest(BaseModel):
    text: str          # already transcribed text from browser Web Speech API
    language: str = "en"

# --------------- Groq Helper ---------------
GROQ_API_KEY = os.getenv("GROQ_API_KEY", "")
GROQ_URL     = "https://api.groq.com/openai/v1/chat/completions"

def groq_reply(user_text: str, language: str = "English") -> str:
    if not GROQ_API_KEY:
        return "Groq API key not configured. Please add GROQ_API_KEY to environment variables."
    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json",
    }
    system_prompt = (
        f"You are a professional government helpline agent for the Karnataka 1092 helpline. "
        f"A citizen just spoke to you. Reply empathetically and concisely in {language}. "
        f"Keep the response under 60 words. Identify their issue and confirm next steps."
    )
    payload = {
        "model": "llama3-8b-8192",
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user",   "content": user_text},
        ],
        "temperature": 0.7,
        "max_tokens": 150,
    }
    response = requests.post(GROQ_URL, headers=headers, json=payload, timeout=15)
    if response.status_code == 200:
        return response.json()["choices"][0]["message"]["content"]
    return f"Error from Groq: {response.text}"

# --------------- Routes ---------------
@router.post("/initiate", response_model=CallInitiateResponse)
async def initiate_call():
    call_id = str(uuid.uuid4())
    websocket_url = f"ws://localhost:8000/ws/call/{call_id}"
    return CallInitiateResponse(call_id=call_id, websocket_url=websocket_url)

@router.get("/{call_id}/context")
async def get_call_context(call_id: str):
    return {
        "call_id": call_id,
        "status": "ACTIVE",
        "verified": True,
        "sentiment": {"emotion": "neutral", "urgency_level": "LOW"},
        "nlu": {"intent": "complaint", "entities": {}},
        "transcript": []
    }

@router.post("/simulate")
async def simulate_call(req: GroqTranscribeRequest):
    lang_map = {"kn": "Kannada", "hi": "Hindi", "en": "English"}
    language = lang_map.get(req.language, "English")
    reply = groq_reply(req.text, language)
    return {
        "call_id": str(uuid.uuid4()),
        "citizen_text": req.text,
        "detected_language": language,
        "ai_reply": reply,
        "status": "success",
    }

@router.get("/")
async def get_all_calls():
    # Returns a list of real/simulated call history for the history page
    return [
        {"call_id": "#SV-8842", "timestamp": "2023-10-24 14:22", "language": "KN", "intent": "Road Repair", "status": "Verified"},
        {"call_id": "#SV-8843", "timestamp": "2023-10-24 15:10", "language": "EN", "intent": "Water Leakage", "status": "Verified"},
        {"call_id": "#SV-8844", "timestamp": "2023-10-24 16:05", "language": "HI", "intent": "Electricity", "status": "Pending"}
    ]
