from fastapi import APIRouter
from typing import List, Optional, Dict, Any
from ..schemas.farm import FarmCreate, FarmResponse, FieldCreate, DashboardResponse

router = APIRouter()

FARMS_STORE = [
    {
        "id": "f-1",
        "user_id": "srujan-m",
        "name": "Paddy & Ragi Plot A1",
        "location_lat": 13.722,
        "location_lng": 75.981,
        "area_acres": 6.2,
        "crop": "Pusa Basmati & Ragi Inter-Crop",
        "village": "Gadihalli",
        "taluk": "Ajjampura",
        "district": "Chikkamagaluru",
        "khata_no": "Khata No. 421/B",
        "survey_no": "Survey #88/A"
    },
    {
        "id": "f-2",
        "user_id": "srujan-m",
        "name": "Groundnut Plot B2",
        "location_lat": 13.715,
        "location_lng": 75.990,
        "area_acres": 3.0,
        "crop": "TMV-2 Groundnut",
        "village": "Gadihalli",
        "taluk": "Ajjampura",
        "district": "Chikkamagaluru",
        "khata_no": "Khata No. 421/B",
        "survey_no": "Survey #88/B"
    },
    {
        "id": "f-3",
        "user_id": "srujan-m",
        "name": "Arecanut Estate C3",
        "location_lat": 13.730,
        "location_lng": 75.975,
        "area_acres": 4.5,
        "crop": "South Kanara Arecanut",
        "village": "Tarikere",
        "taluk": "Tarikere",
        "district": "Chikkamagaluru",
        "khata_no": "Khata No. 312/C",
        "survey_no": "Survey #104"
    }
]

@router.get("/", response_model=List[Dict[str, Any]])
async def list_farms():
    return FARMS_STORE

@router.post("/", response_model=FarmResponse)
async def create_farm(farm: FarmCreate):
    new_farm = {
        "id": f"f-{len(FARMS_STORE) + 1}",
        "user_id": "srujan-m",
        "name": farm.name,
        "location_lat": farm.location_lat,
        "location_lng": farm.location_lng
    }
    FARMS_STORE.append(new_farm)
    return FarmResponse(**new_farm)

@router.get("/{id}", response_model=Dict[str, Any])
async def get_farm(id: str):
    for f in FARMS_STORE:
        if f["id"] == id:
            return f
    return FARMS_STORE[0]

@router.get("/dashboard/summary", response_model=DashboardResponse)
async def dashboard():
    return DashboardResponse(total_farms=len(FARMS_STORE), active_alerts=3)

@router.post("/{id}/fields")
async def add_field(id: str, field: FieldCreate):
    return {"id": f"field-{id}", "farm_id": id, **field.model_dump()}
