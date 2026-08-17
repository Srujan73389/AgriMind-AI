from pydantic import BaseModel, Field
from typing import List, Dict, Any, Optional

class AgentResponse(BaseModel):
    response: str
    confidence: float
    reasoning: List[str]

class ReasoningTrace(BaseModel):
    steps: List[str]

class ToolCallPlan(BaseModel):
    plan: List[Dict[str, Any]]

class ReflectionOutput(BaseModel):
    approved: bool
    critique: str
    revised_response: str

class VerificationOutput(BaseModel):
    passed: bool
    confidence_score: float
    hallucination_detected: bool
    feedback: str
