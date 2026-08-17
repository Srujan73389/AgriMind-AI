from pydantic import BaseModel
from datetime import datetime
from typing import List

class SensorReading(BaseModel):
    device_id: str
    timestamp: datetime
    value: float

class SensorTimeSeries(BaseModel):
    readings: List[SensorReading]

class DeviceStatus(BaseModel):
    device_id: str
    status: str
    battery_level: float

class SensorAlert(BaseModel):
    device_id: str
    alert_type: str
    message: str
