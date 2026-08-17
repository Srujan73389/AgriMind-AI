from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def get_notifications():
    return []

@router.post("/{id}/read")
async def mark_read(id: str):
    return {"status": "success"}
