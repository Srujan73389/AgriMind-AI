from fastapi import APIRouter
from ..schemas.ai import ChatRequest, ChatResponse

router = APIRouter()

@router.post("/chat", response_model=ChatResponse)
async def chat(req: ChatRequest):
    return ChatResponse(reply="I am an AI assistant.", conversation_id="conv1")

@router.get("/conversations")
async def list_conversations():
    return []

@router.get("/conversations/{id}/messages")
async def list_messages(id: str):
    return []
