from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class SensorReading(BaseModel):
    sensor_type: str
    value: float
    unit: str

class SensorPayload(BaseModel):
    device_id: str
    timestamp: datetime
    readings: List[SensorReading]
    battery_level: Optional[float] = None

class SensorTimeSeries(BaseModel):
    device_id: str
    sensor_type: str
    timestamp: datetime
    value: float

class AlertThreshold(BaseModel):
    farm_id: str
    sensor_type: str
    min_value: Optional[float] = None
    max_value: Optional[float] = None
    priority: str = "P2"
