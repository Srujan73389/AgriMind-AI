from fastapi import APIRouter

router = APIRouter()

@router.post("/yield")
async def predict_yield():
    return {"predicted_yield": 1000}

@router.post("/disease-risk")
async def predict_disease_risk():
    return {"risk": "low"}

@router.post("/water")
async def predict_water():
    return {"water_needed_liters": 500}

@router.post("/profit")
async def predict_profit():
    return {"estimated_profit": 2000.0}
