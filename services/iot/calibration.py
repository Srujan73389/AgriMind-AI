from typing import Dict, Tuple

# In-memory storage for calibration coefficients per device and sensor type
# Format: { "device_id": { "sensor_type": (offset, scale) } }
CALIBRATION_DB: Dict[str, Dict[str, Tuple[float, float]]] = {}

def perform_2_point_calibration(device_id: str, sensor_type: str, raw1: float, ref1: float, raw2: float, ref2: float):
    if raw1 == raw2:
        raise ValueError("Raw values must be different for 2-point calibration")
    
    scale = (ref2 - ref1) / (raw2 - raw1)
    offset = ref1 - (raw1 * scale)
    
    if device_id not in CALIBRATION_DB:
        CALIBRATION_DB[device_id] = {}
    CALIBRATION_DB[device_id][sensor_type] = (offset, scale)
    return offset, scale

def apply_calibration(device_id: str, sensor_type: str, raw_value: float) -> float:
    if device_id in CALIBRATION_DB and sensor_type in CALIBRATION_DB[device_id]:
        offset, scale = CALIBRATION_DB[device_id][sensor_type]
        return (raw_value * scale) + offset
    return raw_value
