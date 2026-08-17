from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class IoTDevice(BaseModel):
    id: str
    farm_id: str
    firmware_version: str
    last_heartbeat: datetime
    is_online: bool
    battery_level: Optional[float]

class DeviceRegister(BaseModel):
    id: str
    farm_id: str
    firmware_version: str

class DeviceUpdate(BaseModel):
    firmware_version: Optional[str] = None
    battery_level: Optional[float] = None

class DeviceStatus(BaseModel):
    id: str
    is_online: bool
    last_heartbeat: datetime
