from fastapi import APIRouter
from ..schemas.auth import RegisterRequest, LoginRequest, LoginResponse, TokenPair, RefreshRequest

router = APIRouter()

@router.post("/register")
async def register(req: RegisterRequest):
    return {"message": "User registered"}

@router.post("/login", response_model=LoginResponse)
async def login(req: LoginRequest):
    return LoginResponse(user_id="123", tokens=TokenPair(access_token="acc", refresh_token="ref"))

@router.post("/refresh")
async def refresh(req: RefreshRequest):
    return {"access_token": "new_acc"}

@router.post("/logout")
async def logout():
    return {"message": "Logged out"}

@router.get("/me")
async def me():
    return {"id": "123", "email": "test@test.com"}

@router.get("/google")
async def google_auth():
    return {"url": "https://accounts.google.com/o/oauth2/v2/auth"}
