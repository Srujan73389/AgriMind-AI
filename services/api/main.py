from fastapi import FastAPI
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
