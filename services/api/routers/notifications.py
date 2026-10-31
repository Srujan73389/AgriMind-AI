from fastapi import APIRouter
from typing import List, Dict, Any
from datetime import datetime

router = APIRouter()

NOTIFICATIONS = [
    {
        "id": "notif-1",
        "type": "mandi",
        "title": "APMC Mandi Price Alert",
        "message": "Arecanut (Adike) up +₹1,200/qtl at Chikkamagaluru APMC (₹48,500/qtl). AI advice: HOLD produce for higher returns.",
        "severity": "info",
        "created_at": "2026-10-31T06:00:00Z",
        "read": False
    },
    {
        "id": "notif-2",
        "type": "iot",
        "title": "Soil Moisture Warning",
        "message": "Gadihalli Plot A1 moisture dropped to 35.5%. Smart irrigation pump recommended.",
        "severity": "warning",
        "created_at": "2026-10-31T05:30:00Z",
        "read": False
    },
    {
        "id": "notif-3",
        "type": "disease",
        "title": "Monsoon Spore Alert",
        "message": "High humidity forecast in 48 hours in Ajjampura Tq. Pre-monsoon prophylactic spray suggested.",
        "severity": "warning",
        "created_at": "2026-10-30T14:15:00Z",
        "read": False
    }
]

@router.get("/")
async def get_notifications():
    return NOTIFICATIONS

@router.post("/{id}/read")
async def mark_read(id: str):
    for n in NOTIFICATIONS:
        if n["id"] == id:
            n["read"] = True
            return {"status": "success", "id": id, "read": True}
    return {"status": "not_found", "id": id}

@router.post("/mark-all-read")
async def mark_all_read():
    for n in NOTIFICATIONS:
        n["read"] = True
    return {"status": "success", "updated_count": len(NOTIFICATIONS)}
