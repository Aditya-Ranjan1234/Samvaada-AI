from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import calls, asr, nlu
from app.websocket import manager

app = FastAPI(
    title="Samvaada AI API",
    description="Backend API for Samvaada AI Helpline System",
    version="1.0.0"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(calls.router, prefix="/api/v1/calls", tags=["Calls"])
app.include_router(asr.router, prefix="/api/v1/asr", tags=["ASR"])
app.include_router(nlu.router, prefix="/api/v1/nlu", tags=["NLU"])
app.include_router(manager.router, prefix="/ws", tags=["WebSocket"])

@app.get("/health")
async def health_check():
    return {"status": "ok", "service": "samvaada-ai-backend"}
