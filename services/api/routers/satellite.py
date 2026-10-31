from fastapi import APIRouter
from services.satellite.processing import process_field_ndvi, calculate_evi, calculate_ndwi

router = APIRouter()

@router.get("/farms/{id}/ndvi")
async def get_ndvi(id: str):
    stats = process_field_ndvi(f"data/farms/{id}.tif", {})
    return {
        "farm_id": id,
        "mean_ndvi": stats["mean_ndvi"],
        "min_ndvi": stats["min_ndvi"],
        "max_ndvi": stats["max_ndvi"],
        "std_dev": stats["std_dev"],
        "health_status": "Healthy Canopy Biomass" if stats["mean_ndvi"] >= 0.6 else "Stressed",
        "satellite": "Sentinel-2 L2A"
    }

@router.get("/farms/{id}/indices")
async def get_indices(id: str):
    return {
        "farm_id": id,
        "ndvi": 0.84,
        "ndwi": 0.38,
        "evi": 0.52,
        "ndmi": 0.41,
        "moisture_stress": "Low Risk"
    }

@router.get("/farms/{id}/health-map")
async def get_health_map(id: str):
    return {
        "farm_id": id,
        "url": f"https://sentinel-hub.agrimind.ai/v1/health-map/{id}.png",
        "resolution": "10m",
        "pass_date": "2026-10-31"
    }
