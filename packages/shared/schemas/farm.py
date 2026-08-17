from pydantic import BaseModel, ConfigDict
from typing import Optional
from datetime import datetime
from uuid import UUID

class FarmCreate(BaseModel):
    name: str
    total_area_ha: float
    soil_type: Optional[str] = None
    location: Optional[str] = None

class FarmResponse(FarmCreate):
    id: UUID
    user_id: UUID
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)
