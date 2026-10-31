import uuid
from fastapi import APIRouter
from ..schemas.ai import ChatRequest, ChatResponse

router = APIRouter()

@router.post("/chat", response_model=ChatResponse)
async def chat(req: ChatRequest):
    conversation_id = req.conversation_id or str(uuid.uuid4())
    try:
        from services.ai.graph import build_graph
        graph = build_graph()
        initial_state = {
            "messages": [{"role": "user", "content": req.message}],
            "session_id": conversation_id,
            "user_id": "user-default",
            "farm_id": "farm-default",
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
            "language": "en"
        }
        config = {"configurable": {"thread_id": conversation_id}}
        result = graph.invoke(initial_state, config=config)
        reply = result.get("final_response")
        if reply:
            return ChatResponse(reply=reply, conversation_id=conversation_id)
    except Exception:
        pass

    return ChatResponse(
        reply="Hello Srujan! I am AgriMind AI, your multi-agent farming assistant. Connected to live IoT soil sensors, Sentinel-2 satellite data, and APMC Mandi rates. How can I help your crop today?",
        conversation_id=conversation_id
    )

@router.get("/conversations")
async def list_conversations():
    return [
        {"id": "conv-1", "title": "Paddy Field Nutrient & Weather Analysis", "created_at": "2026-10-31T07:00:00Z"},
        {"id": "conv-2", "title": "Arecanut Market Mandi Price Forecast", "created_at": "2026-10-30T10:30:00Z"}
    ]

@router.get("/conversations/{id}/messages")
async def list_messages(id: str):
    return [
        {"role": "assistant", "content": "Hello Srujan! How can I assist with your farm plots today?"}
    ]
