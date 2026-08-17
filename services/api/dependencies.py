from fastapi import Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from .database import get_db

async def get_current_user(token: str = "dummy_token"):
    # Dummy implementation for user retrieval
    return {"id": "user-123", "email": "test@agrimind.ai"}

async def get_redis():
    return None

async def check_plan_limit():
    return True

async def get_ws_user(token: str):
    return {"id": "user-123"}
