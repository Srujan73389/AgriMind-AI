from pydantic import BaseModel
from typing import List

class FieldBase(BaseModel):
    name: str

class FieldCreate(FieldBase):
    pass

class FieldResponse(FieldBase):
    id: str
    farm_id: str
    class Config:
        from_attributes = True

class FarmBase(BaseModel):
    name: str
    location_lat: float
    location_lng: float

class FarmCreate(FarmBase):
    pass

class FarmUpdate(FarmBase):
    pass

class FarmResponse(FarmBase):
    id: str
    user_id: str
    fields: List[FieldResponse] = []
    class Config:
        from_attributes = True

class DashboardResponse(BaseModel):
    total_farms: int
    active_alerts: int
