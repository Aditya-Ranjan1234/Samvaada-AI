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
        "model": "llama-3.1-8b-instant",
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
    # Seeding 3 professional simulations as requested
    return [
        {
            "call_id": "#SV-8842", 
            "timestamp": "May 06, 2024 · 10:22", 
            "language": "KN", 
            "intent": "Road Repair", 
            "status": "Verified",
            "summary": "Citizen reported hazardous pothole in Jayanagar 4th Main. High public safety risk.",
            "transcript": [{"s": "CITIZEN", "t": "ನಮಸ್ಕಾರ, ಜಯನಗರ 4ನೇ ಮುಖ್ಯ ರಸ್ತೆಯಲ್ಲಿ ದೊಡ್ಡ ಗುಂಡಿ ಇದೆ."}, {"s": "AI", "t": "Understood. Recording a priority road repair complaint for Jayanagar."}]
        },
        {
            "call_id": "#SV-8843", 
            "timestamp": "May 06, 2024 · 11:10", 
            "language": "EN", 
            "intent": "Water Leakage", 
            "status": "Verified",
            "summary": "Major pipe burst on Richmond Road. BWSSB team notified for emergency repair.",
            "transcript": [{"s": "CITIZEN", "t": "There is a massive water leak on Richmond Road near the signal."}, {"s": "AI", "t": "I have flagged this as an emergency for the BWSSB team. Dispatching now."}]
        },
        {
            "call_id": "#SV-8844", 
            "timestamp": "May 06, 2024 · 12:05", 
            "language": "HI", 
            "intent": "Electricity", 
            "status": "Pending",
            "summary": "Transformer spark reported in Indiranagar Sector 2. Fire hazard warning issued.",
            "transcript": [{"s": "CITIZEN", "t": "नमस्ते, यहां ट्रांसफार्मर से चिंगारी निकल रही है।"}, {"s": "AI", "t": "Please stay away from the area. Notifying BESCOM emergency team immediately."}]
        }
    ]
