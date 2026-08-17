from pydantic import BaseModel
from typing import Dict, List, Optional
from datetime import datetime

class NDVIResult(BaseModel):
    farm_id: str
    date: datetime
    mean_ndvi: float
    min_ndvi: float
    max_ndvi: float
    std_dev: float
    s3_url: str

class VegetationIndices(BaseModel):
    ndvi: float
    evi: float
    ndwi: float
    ndmi: float

class SatelliteAnalysis(BaseModel):
    farm_id: str
    date: datetime
    indices: VegetationIndices
    anomalies: List[str]

class FloodAlert(BaseModel):
    farm_id: str
    severity: str
    affected_area_ha: float

class DroughtRisk(BaseModel):
    farm_id: str
    risk_level: str
    recommendation: str
