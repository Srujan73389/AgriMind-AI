import pytest
from agrimind.predictions import yield_model, water_model, profit_model

def test_yield_model_wheat():
    inputs = {
        "crop": "wheat",
        "soil_nitrogen": 50,
        "rainfall_mm": 300,
        "temperature_c": 25
    }
    prediction = yield_model.predict(inputs)
    assert prediction["expected_yield_tonnes_per_ha"] > 2.0
    assert prediction["expected_yield_tonnes_per_ha"] < 6.0
    assert "confidence" in prediction

def test_water_model_rice():
    inputs = {
        "crop": "rice",
        "stage": "tillering",
        "soil_moisture": 30,
        "evapotranspiration": 5.5
    }
    prediction = water_model.predict(inputs)
    assert prediction["water_required_liters_per_day"] > 0
    assert prediction["water_required_liters_per_day"] > 5000

def test_profit_model():
    inputs = {
        "expected_yield": 4.5,
        "market_price": 2000,
        "input_costs": 3000
    }
    prediction = profit_model.predict(inputs)
    assert prediction["net_profit"] == (4.5 * 2000) - 3000
    assert prediction["roi_percentage"] == ((4.5 * 2000 - 3000) / 3000) * 100
