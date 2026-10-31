from fastapi import APIRouter, WebSocket
from typing import List
from datetime import datetime
from ..schemas.iot import SensorReading

router = APIRouter()

@router.websocket("/farms/{id}/sensors/ws")
async def sensor_websocket(websocket: WebSocket, id: str):
    await websocket.accept()
    await websocket.send_json({
        "farm_id": id,
        "status": "connected",
        "telemetry": {
            "moisture": 68.0,
            "pH": 6.8,
            "nitrogen_kg_ha": 42.0,
            "temperature_c": 27.5
        }
    })

@router.get("/farms/{id}/sensors/history", response_model=List[SensorReading])
async def sensor_history(id: str):
    now = datetime.utcnow()
    return [
        SensorReading(id="sensor-1", farm_id=id, sensor_type="soil_moisture", value=35.5, unit="%", recorded_at=now),
        SensorReading(id="sensor-2", farm_id=id, sensor_type="temperature", value=24.0, unit="C", recorded_at=now),
        SensorReading(id="sensor-3", farm_id=id, sensor_type="ph", value=6.8, unit="pH", recorded_at=now),
    ]
