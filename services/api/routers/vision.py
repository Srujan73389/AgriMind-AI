from fastapi import APIRouter, UploadFile, File
from ..schemas.ai import DiseaseDetectionResponse

router = APIRouter()

@router.post("/detect", response_model=DiseaseDetectionResponse)
async def detect_disease(file: UploadFile = File(...)):
    return DiseaseDetectionResponse(disease="healthy", confidence=0.99, recommendation="Looking good!")

@router.get("/disease-events")
async def get_disease_events():
    return []
