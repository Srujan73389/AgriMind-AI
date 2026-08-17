from fastapi import APIRouter, WebSocket, WebSocketDisconnect
import json
import asyncio
from typing import List

router = APIRouter()

class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def broadcast(self, message: str):
        for connection in self.active_connections:
            await connection.send_text(message)

manager = ConnectionManager()

# This would ideally subscribe to Redis Pub/Sub for actual real-time distribution
@router.websocket("/farms/{farm_id}/sensors")
async def websocket_endpoint(websocket: WebSocket, farm_id: str):
    await manager.connect(websocket)
    try:
        while True:
            # Keep alive / simple echo for now
            data = await websocket.receive_text()
            await websocket.send_text(f"Message text was: {data}")
    except WebSocketDisconnect:
        manager.disconnect(websocket)
