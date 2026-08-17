from fastapi import APIRouter, WebSocket
from typing import List
from ..schemas.iot import SensorReading

router = APIRouter()

@router.websocket("/farms/{id}/sensors/ws")
async def sensor_websocket(websocket: WebSocket, id: str):
    await websocket.accept()
    await websocket.send_json({"status": "connected"})

@router.get("/farms/{id}/sensors/history", response_model=List[SensorReading])
async def sensor_history(id: str):
    return []
