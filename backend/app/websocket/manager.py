from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from typing import Dict
import asyncio
import json

router = APIRouter()

class ConnectionManager:
    def __init__(self):
        self.active_connections: Dict[str, WebSocket] = {}

    async def connect(self, websocket: WebSocket, call_id: str):
        await websocket.accept()
        self.active_connections[call_id] = websocket

    def disconnect(self, call_id: str):
        if call_id in self.active_connections:
            del self.active_connections[call_id]

    async def send_personal_message(self, message: str, call_id: str):
        if call_id in self.active_connections:
            await self.active_connections[call_id].send_text(message)

manager = ConnectionManager()

@router.websocket("/call/{call_id}")
async def websocket_endpoint(websocket: WebSocket, call_id: str):
    await manager.connect(websocket, call_id)
    try:
        while True:
            # Receive audio frames (mocking text data for simplicity in this stub)
            data = await websocket.receive_text()
            
            # Mock ASR + NLU + Verification loop response
            response = {
                "type": "verification",
                "text": "Neevu Bangalore nalli neeru supply bagge dhooru needuttiddira, sariya?"
            }
            await manager.send_personal_message(json.dumps(response), call_id)
            
    except WebSocketDisconnect:
        manager.disconnect(call_id)
