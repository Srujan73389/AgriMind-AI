from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware

from .routers import (
    auth, farms, ai, vision, iot, satellite, 
    marketplace, community, reports, notifications, predictions
)

app = FastAPI(title="AgriMind AI API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# API router mounted under /api to reconcile with public Vercel rewrites (/api/*)
api_router = APIRouter(prefix="/api")
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(farms.router, prefix="/farms", tags=["farms"])
api_router.include_router(ai.router, prefix="/ai", tags=["ai"])
api_router.include_router(vision.router, prefix="/vision", tags=["vision"])
api_router.include_router(iot.router, prefix="/iot", tags=["iot"])
api_router.include_router(satellite.router, prefix="/satellite", tags=["satellite"])
api_router.include_router(marketplace.router, prefix="/marketplace", tags=["marketplace"])
api_router.include_router(community.router, prefix="/community", tags=["community"])
api_router.include_router(reports.router, prefix="/reports", tags=["reports"])
api_router.include_router(notifications.router, prefix="/notifications", tags=["notifications"])
api_router.include_router(predictions.router, prefix="/predictions", tags=["predictions"])

@api_router.get("/health")
async def api_health_check():
    return {"status": "healthy"}

app.include_router(api_router)

# Also mount routers at root to support direct internal service calls without /api
app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(farms.router, prefix="/farms", tags=["farms"])
app.include_router(ai.router, prefix="/ai", tags=["ai"])
app.include_router(vision.router, prefix="/vision", tags=["vision"])
app.include_router(iot.router, prefix="/iot", tags=["iot"])
app.include_router(satellite.router, prefix="/satellite", tags=["satellite"])
app.include_router(marketplace.router, prefix="/marketplace", tags=["marketplace"])
app.include_router(community.router, prefix="/community", tags=["community"])
app.include_router(reports.router, prefix="/reports", tags=["reports"])
app.include_router(notifications.router, prefix="/notifications", tags=["notifications"])
app.include_router(predictions.router, prefix="/predictions", tags=["predictions"])

@app.get("/health")
async def health_check():
    return {"status": "healthy"}
