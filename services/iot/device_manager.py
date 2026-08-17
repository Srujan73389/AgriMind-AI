from datetime import datetime, timedelta
from typing import Dict, List
from .schemas.device import IoTDevice, DeviceRegister, DeviceUpdate, DeviceStatus

# Dummy in-memory DB
DEVICES: Dict[str, IoTDevice] = {}

def register_device(payload: DeviceRegister) -> IoTDevice:
    dev = IoTDevice(
        id=payload.id,
        farm_id=payload.farm_id,
        firmware_version=payload.firmware_version,
        last_heartbeat=datetime.utcnow(),
        is_online=True,
        battery_level=None
    )
    DEVICES[payload.id] = dev
    return dev

def update_heartbeat(device_id: str, battery_level: float = None):
    if device_id in DEVICES:
        DEVICES[device_id].last_heartbeat = datetime.utcnow()
        DEVICES[device_id].is_online = True
        if battery_level is not None:
            DEVICES[device_id].battery_level = battery_level

def get_device_status(device_id: str) -> DeviceStatus:
    dev = DEVICES.get(device_id)
    if not dev:
        raise ValueError("Device not found")
    return DeviceStatus(id=dev.id, is_online=dev.is_online, last_heartbeat=dev.last_heartbeat)

def check_offline_devices():
    """Celery task placeholder to check for offline devices"""
    now = datetime.utcnow()
    for dev in DEVICES.values():
        if dev.is_online and (now - dev.last_heartbeat) > timedelta(minutes=5):
            dev.is_online = False
            print(f"Device {dev.id} went offline")
