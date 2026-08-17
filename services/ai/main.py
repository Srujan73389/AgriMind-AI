from fastapi import FastAPI
from .graph import build_graph
from pydantic import BaseModel

app = FastAPI(title="AgriMind AI Service")

class ChatRequest(BaseModel):
    user_id: str
    session_id: str
    farm_id: str
    message: str
    language: str = "en"

class ChatResponse(BaseModel):
    response: str
    confidence: float

graph = build_graph()

@app.post("/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    initial_state = {
        "messages": [{"role": "user", "content": request.message}],
        "session_id": request.session_id,
        "user_id": request.user_id,
        "farm_id": request.farm_id,
        "farm_context": {},
        "tool_call_plan": [],
        "tool_results": [],
        "reflection_critique": None,
        "verification_passed": False,
        "human_approval_required": False,
        "human_approval_received": False,
        "reasoning_trace": [],
        "final_response": "",
        "confidence_score": 0.0,
        "language": request.language
    }
    
    config = {"configurable": {"thread_id": request.session_id}}
    
    result = graph.invoke(initial_state, config=config)
    
    return ChatResponse(
        response=result.get("final_response", "Error processing request."),
        confidence=result.get("confidence_score", 0.0)
    )

@app.get("/health")
def health_check():
    return {"status": "healthy"}
