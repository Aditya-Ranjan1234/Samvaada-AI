import sys
import os
from pathlib import Path

backend_dir = Path(__file__).parent.parent
sys.path.insert(0, str(backend_dir))

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import calls, asr, nlu, tts, users
from app.websocket import manager
from app.database import init_db
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="Samvaada AI API",
    description="Backend API for Samvaada AI Helpline System",
    version="1.0.0"
)

# Safe Database Initialization
try:
    init_db()
    logger.info("Database initialized successfully.")
except Exception as e:
    logger.error(f"Database initialization failed: {e}")
    logger.info("Continuing in Demo Mode...")

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
app.include_router(tts.router, prefix="/api/v1/tts", tags=["TTS"])
app.include_router(users.router, prefix="/api/v1/users", tags=["Users"])
app.include_router(manager.router, prefix="/ws", tags=["WebSocket"])

@app.get("/health")
async def health_check():
    return {"status": "ok", "service": "samvaada-ai-backend", "mode": "resilient"}
