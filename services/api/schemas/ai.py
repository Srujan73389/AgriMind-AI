from pydantic import BaseModel
from typing import List, Optional

class ChatRequest(BaseModel):
    message: str
    conversation_id: Optional[str] = None

class ChatResponse(BaseModel):
    reply: str
    conversation_id: str

class DiseaseDetectionRequest(BaseModel):
    image_url: str

class DiseaseDetectionResponse(BaseModel):
    disease: str
    confidence: float
    recommendation: str

class ReasoningTrace(BaseModel):
    steps: List[str]
