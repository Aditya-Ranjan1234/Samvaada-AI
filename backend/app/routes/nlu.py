from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class ExtractRequest(BaseModel):
    text: str

@router.post("/extract")
async def extract_nlu(request: ExtractRequest):
    # Mock NLU extraction
    return {
        "intent": "complaint",
        "entities": {
            "issue": "neeru bandilla"
        },
        "confidence": 0.88
    }
