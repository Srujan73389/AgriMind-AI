from fastapi import APIRouter

router = APIRouter()

@router.post("/posts")
async def create_post():
    return {"id": "post1"}

@router.post("/posts/{id}/comments")
async def add_comment(id: str):
    return {"id": "comment1"}
