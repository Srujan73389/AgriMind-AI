from fastapi import APIRouter
from ..schemas.auth import RegisterRequest, LoginRequest, LoginResponse, TokenPair, RefreshRequest
from ..auth.jwt import create_access_token
import uuid

router = APIRouter()

@router.post("/register")
async def register(req: RegisterRequest):
    return {"message": "User registered successfully", "email": req.email}

@router.post("/login", response_model=LoginResponse)
async def login(req: LoginRequest):
    user_id = "srujan-m"
    access_token = create_access_token({"sub": user_id, "email": req.email, "role": "farmer"})
    refresh_token = create_access_token({"sub": user_id, "type": "refresh"})
    return LoginResponse(
        user_id=user_id,
        tokens=TokenPair(access_token=access_token, refresh_token=refresh_token)
    )

@router.post("/refresh")
async def refresh(req: RefreshRequest):
    new_token = create_access_token({"sub": "srujan-m", "refreshed": True})
    return {"access_token": new_token}

@router.post("/logout")
async def logout():
    return {"message": "Logged out successfully"}

@router.get("/me")
async def me():
    return {
        "id": "srujan-m",
        "name": "SRUJAN M",
        "email": "srujan@agrimind.ai",
        "village": "Gadihalli, Ajjampura Tq, Chikkamagaluru KA",
        "role": "Farm Owner"
    }

@router.get("/google")
async def google_auth():
    return {"url": "https://accounts.google.com/o/oauth2/v2/auth"}
