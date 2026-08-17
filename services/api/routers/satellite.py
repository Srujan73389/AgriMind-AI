from fastapi import APIRouter

router = APIRouter()

@router.get("/farms/{id}/ndvi")
async def get_ndvi(id: str):
    return {"ndvi_score": 0.8}

@router.get("/farms/{id}/health-map")
async def get_health_map(id: str):
    return {"url": "https://map.url"}
