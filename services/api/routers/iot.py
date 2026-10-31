from fastapi import APIRouter, WebSocket
from typing import List
from datetime import datetime
from ..schemas.iot import SensorReading
from services.ai.tools.sensor_tool import query_sensor_data

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
    moisture = query_sensor_data.invoke({"farm_id": id, "sensor_type": "soil_moisture"})
    temp = query_sensor_data.invoke({"farm_id": id, "sensor_type": "temperature"})
    ph = query_sensor_data.invoke({"farm_id": id, "sensor_type": "ph"})
    now = datetime.utcnow()
    return [
        SensorReading(id="sensor-1", farm_id=id, sensor_type="soil_moisture", value=float(moisture["value"]), unit=str(moisture["unit"]), recorded_at=now),
        SensorReading(id="sensor-2", farm_id=id, sensor_type="temperature", value=float(temp["value"]), unit=str(temp["unit"]), recorded_at=now),
        SensorReading(id="sensor-3", farm_id=id, sensor_type="ph", value=float(ph["value"]), unit=str(ph["unit"]), recorded_at=now),
    ]
