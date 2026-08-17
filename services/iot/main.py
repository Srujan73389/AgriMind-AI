from fastapi import FastAPI
import asyncio
from .streaming import router as streaming_router
from .gateway import run_mqtt_gateway
from .device_manager import register_device, get_device_status, check_offline_devices
from .schemas.device import DeviceRegister

app = FastAPI(title="AgriMind IoT Gateway")

app.include_router(streaming_router)

@app.on_event("startup")
async def startup_event():
    asyncio.create_task(run_mqtt_gateway())

@app.post("/devices/register")
def register(payload: DeviceRegister):
    return register_device(payload)

@app.get("/devices/{device_id}/status")
def status(device_id: str):
    return get_device_status(device_id)

@app.post("/calibration")
def calibrate():
    # Calibration endpoint logic
    return {"status": "calibration updated"}
