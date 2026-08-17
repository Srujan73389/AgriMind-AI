from fastapi import APIRouter
from ..schemas.farm import FarmCreate, FarmResponse, FieldCreate, DashboardResponse

router = APIRouter()

@router.post("/", response_model=FarmResponse)
async def create_farm(farm: FarmCreate):
    return FarmResponse(id="farm1", user_id="123", **farm.model_dump())

@router.get("/{id}", response_model=FarmResponse)
async def get_farm(id: str):
    return FarmResponse(id=id, user_id="123", name="My Farm", location_lat=0.0, location_lng=0.0)

@router.get("/dashboard/summary", response_model=DashboardResponse)
async def dashboard():
    return DashboardResponse(total_farms=1, active_alerts=0)

@router.post("/{id}/fields")
async def add_field(id: str, field: FieldCreate):
    return {"id": "field1", "farm_id": id, **field.model_dump()}
