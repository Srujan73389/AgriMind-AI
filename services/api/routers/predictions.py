from fastapi import APIRouter
from typing import Dict, Any, Optional
from services.ai.predictions.yield_model import YieldPredictor
from services.ai.predictions.water_model import WaterModel
from services.ai.predictions.profit_model import ProfitCalculator
from services.ai.predictions.disease_risk_model import DiseaseRiskPredictor

router = APIRouter()

yield_predictor = YieldPredictor()
water_model = WaterModel()
profit_calculator = ProfitCalculator()
disease_risk_predictor = DiseaseRiskPredictor()

@router.post("/yield")
async def predict_yield(payload: Optional[Dict[str, Any]] = None):
    features = payload or {"rainfall_mm": 620, "nitrogen_kg_ha": 120}
    result = yield_predictor.predict(features)
    return {"status": "success", **result}

@router.post("/disease-risk")
async def predict_disease_risk(payload: Optional[Dict[str, Any]] = None):
    weather_data = payload or {"avg_temperature": 26.5, "avg_humidity": 78.0}
    sensor_data = {"leaf_wetness_hours": 6}
    result = disease_risk_predictor.predict_risk(weather_data, sensor_data)
    return {"status": "success", **result}

@router.post("/water")
async def predict_water(payload: Optional[Dict[str, Any]] = None):
    params = payload or {"temp_c": 28.0, "humidity_pct": 65.0, "wind_speed_ms": 2.5, "solar_rad_mj_m2": 18.0, "crop_kc": 1.1, "effective_rain_mm": 2.0}
    et0 = water_model.calculate_et0(
        float(params.get("temp_c", 28.0)),
        float(params.get("humidity_pct", 65.0)),
        float(params.get("wind_speed_ms", 2.5)),
        float(params.get("solar_rad_mj_m2", 18.0))
    )
    schedule = water_model.get_irrigation_schedule(et0, float(params.get("crop_kc", 1.1)), float(params.get("effective_rain_mm", 2.0)))
    return {"status": "success", **schedule}

@router.post("/profit")
async def predict_profit(payload: Optional[Dict[str, Any]] = None):
    params = payload or {"predicted_yield_t_ha": 5.2, "market_price_per_t": 320.0, "variable_costs_per_ha": 400.0, "fixed_costs_per_ha": 250.0}
    result = profit_calculator.calculate(
        float(params.get("predicted_yield_t_ha", 5.2)),
        float(params.get("market_price_per_t", 320.0)),
        float(params.get("variable_costs_per_ha", 400.0)),
        float(params.get("fixed_costs_per_ha", 250.0))
    )
    return {"status": "success", **result}
