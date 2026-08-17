from pydantic import BaseModel
from typing import List, Optional

class BoundingBox(BaseModel):
    x_min: float
    y_min: float
    x_max: float
    y_max: float

class DiseaseResult(BaseModel):
    class_id: int
    disease_name: str
    confidence: float
    severity: str
    bbox: BoundingBox

class DetectionRequest(BaseModel):
    image_url: str

class DetectionResponse(BaseModel):
    detections: List[DiseaseResult]
    gradcam_url: Optional[str] = None
    inference_time_ms: float
