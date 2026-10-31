from fastapi import APIRouter
from typing import Dict, Any, Optional
from services.ai.predictions.yield_model import YieldPredictor
from services.ai.predictions.water_model import WaterModel
from services.ai.predictions.profit_model import ProfitModel
from services.ai.predictions.disease_risk_model import DiseaseRiskModel

router = APIRouter()

yield_predictor = YieldPredictor()
water_model = WaterModel()
profit_model = ProfitModel()
disease_risk_model = DiseaseRiskModel()

@router.post("/yield")
async def predict_yield(payload: Optional[Dict[str, Any]] = None):
    features = payload or {"rainfall_mm": 620, "nitrogen_kg_ha": 120}
    result = yield_predictor.predict(features)
    return {"status": "success", **result}

@router.post("/disease-risk")
async def predict_disease_risk(payload: Optional[Dict[str, Any]] = None):
    weather_data = payload or {"avg_temp_c": 26.5, "avg_humidity_pct": 78.0, "consecutive_wet_days": 3}
    result = disease_risk_model.predict_risk(weather_data)
    return {"status": "success", **result}

@router.post("/water")
async def predict_water(payload: Optional[Dict[str, Any]] = None):
    params = payload or {"temp_c": 28.0, "humidity_pct": 65.0, "wind_speed_ms": 2.5, "solar_rad_mj_m2": 18.0, "crop_kc": 1.1, "effective_rain_mm": 2.0}
    et0 = water_model.calculate_et0(params.get("temp_c", 28.0), params.get("humidity_pct", 65.0), params.get("wind_speed_ms", 2.5), params.get("solar_rad_mj_m2", 18.0))
    schedule = water_model.get_irrigation_schedule(et0, params.get("crop_kc", 1.1), params.get("effective_rain_mm", 2.0))
    return {"status": "success", **schedule}

@router.post("/profit")
async def predict_profit(payload: Optional[Dict[str, Any]] = None):
    params = payload or {"yield_t_ha": 5.2, "area_ha": 2.5, "market_price_per_ton": 320.0, "production_costs_ha": 650.0}
    result = profit_model.calculate_roi(params.get("yield_t_ha", 5.2), params.get("area_ha", 2.5), params.get("market_price_per_ton", 320.0), params.get("production_costs_ha", 650.0))
    return {"status": "success", **result}
