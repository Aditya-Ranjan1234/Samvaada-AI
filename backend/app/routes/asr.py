from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class ProcessRequest(BaseModel):
    audio_base64: str

@router.post("/process")
async def process_asr(request: ProcessRequest):
    # Mock ASR processing
    return {
        "transcript": "Namaskara, namma eariyadalli neeru bandilla.",
        "confidence": 0.95,
        "language": "kn"
    }
