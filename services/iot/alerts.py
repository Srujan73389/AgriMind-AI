from typing import List
from .schemas.sensor import SensorReading, AlertThreshold

# Dummy store for thresholds
THRESHOLDS = [
    AlertThreshold(farm_id="farm_1", sensor_type="soil_moisture", min_value=20.0, priority="P1"),
    AlertThreshold(farm_id="farm_1", sensor_type="temperature", max_value=35.0, priority="P2"),
]

def check_thresholds(farm_id: str, device_id: str, reading: SensorReading):
    for threshold in THRESHOLDS:
        if threshold.farm_id == farm_id and threshold.sensor_type == reading.sensor_type:
            if threshold.min_value is not None and reading.value < threshold.min_value:
                dispatch_alert(farm_id, device_id, reading, threshold, "too low")
            if threshold.max_value is not None and reading.value > threshold.max_value:
                dispatch_alert(farm_id, device_id, reading, threshold, "too high")

def dispatch_alert(farm_id: str, device_id: str, reading: SensorReading, threshold: AlertThreshold, reason: str):
    msg = f"ALERT [{threshold.priority}]: Farm {farm_id} Device {device_id} - {reading.sensor_type} is {reason} ({reading.value} {reading.unit})"
    print(msg)
    # Here you would integrate with SMS, Email, or Push Notification services
