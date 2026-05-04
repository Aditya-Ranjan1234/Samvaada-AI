from fastapi import APIRouter
from pydantic import BaseModel
import uuid

router = APIRouter()

class CallInitiateResponse(BaseModel):
    call_id: str
    websocket_url: str

@router.post("/initiate", response_model=CallInitiateResponse)
async def initiate_call():
    call_id = str(uuid.uuid4())
    websocket_url = f"ws://localhost:8000/ws/call/{call_id}"
    return CallInitiateResponse(call_id=call_id, websocket_url=websocket_url)

@router.get("/{call_id}/context")
async def get_call_context(call_id: str):
    # Mock context data for the agent dashboard
    return {
        "call_id": call_id,
        "status": "ACTIVE",
        "verified": True,
        "sentiment": {
            "emotion": "neutral",
            "urgency_level": "LOW",
            "anger_score": 0.1,
            "distress_score": 0.2
        },
        "nlu": {
            "intent": "complaint",
            "entities": {"location": "Bangalore", "issue": "water supply"}
        },
        "transcript": [
            {"speaker": "CALLER", "text": "Namaskara, namma eariyadalli neeru bandilla."},
            {"speaker": "SYSTEM", "text": "Neevu Bangalore nalli neeru supply bagge dhooru needuttiddira, sariya?"},
            {"speaker": "CALLER", "text": "Houdhu."}
        ]
    }
