from fastapi import APIRouter
from typing import List, Optional, Dict, Any
from pydantic import BaseModel
import uuid
from datetime import datetime

router = APIRouter()

class PostCreate(BaseModel):
    title: str
    content: str
    author: Optional[str] = "SRUJAN M"
    role: Optional[str] = "Paddy & Ragi Farmer"
    location: Optional[str] = "Gadihalli, Ajjampura Tq, KA"
    tags: Optional[List[str]] = []

COMMUNITY_POSTS = [
    {
        "id": "p-1",
        "author": "Dr. K. M. Shivakumar",
        "role": "Senior Agronomist, KVK Chikkamagaluru",
        "badge": "KVK Scientist",
        "location": "Chikkamagaluru, KA",
        "time": "2 hours ago",
        "title": "Monsoon Alert: Preventive Protocol for Leaf Blast in Paddy",
        "content": "Due to intermittent rains and 88% night humidity in Tarikere and Ajjampura belt, blast spores are in active incubation. Apply prophylactic spray of Tricyclazole 75% WP @ 0.6g/L water immediately.",
        "likes": 48,
        "isLiked": False,
        "tags": ["#PaddyBlast", "#MonsoonAdvisory", "#KVKAdvice"]
    },
    {
        "id": "p-2",
        "author": "SRUJAN M",
        "role": "Farm Owner",
        "badge": "Verified Farmer",
        "location": "Gadihalli Village, KA",
        "time": "5 hours ago",
        "title": "GPU-28 Finger Millet germination success after soil treatment",
        "content": "Recorded 96% germination on Plot A1 after treating seeds with Trichoderma Viride bio-fungicide. Soil moisture currently stable at 68%.",
        "likes": 32,
        "isLiked": True,
        "tags": ["#RagiFarming", "#Organic", "#Gadihalli"]
    }
]

@router.get("/posts")
async def get_posts():
    return COMMUNITY_POSTS

@router.post("/posts")
async def create_post(payload: PostCreate):
    new_post = {
        "id": f"p-{uuid.uuid4().hex[:6]}",
        "author": payload.author or "SRUJAN M",
        "role": payload.role or "Verified Farmer",
        "badge": "Community Member",
        "location": payload.location or "Karnataka",
        "time": "Just now",
        "title": payload.title,
        "content": payload.content,
        "likes": 0,
        "isLiked": False,
        "tags": payload.tags or ["#AgriMind"]
    }
    COMMUNITY_POSTS.insert(0, new_post)
    return new_post

@router.post("/posts/{id}/comments")
async def add_comment(id: str, comment: Dict[str, Any]):
    return {
        "id": f"c-{uuid.uuid4().hex[:6]}",
        "post_id": id,
        "text": comment.get("text", ""),
        "created_at": datetime.utcnow().isoformat()
    }
