from pydantic import BaseModel, Field
from typing import List, Dict, Any, Optional

class WeatherInput(BaseModel):
    latitude: float
    longitude: float

class WeatherOutput(BaseModel):
    forecast: List[Dict[str, Any]]
    current_humidity: float
    current_rain: float

class DiseaseInput(BaseModel):
    image_url: str

class DiseaseOutput(BaseModel):
    disease_name: str
    confidence: float
    treatment_recommendations: List[str]

class SensorInput(BaseModel):
    farm_id: str
    sensor_type: str

class SensorOutput(BaseModel):
    value: float
    unit: str
    timestamp: str

class NDVIInput(BaseModel):
    farm_id: str
    latitude: float
    longitude: float

class NDVIOutput(BaseModel):
    ndvi_score: float
    health_status: str

class MarketInput(BaseModel):
    commodity: str
    region: str

class MarketOutput(BaseModel):
    price: float
    currency: str
    trend: str
