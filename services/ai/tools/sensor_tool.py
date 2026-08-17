import httpx
from langchain_core.tools import tool
from typing import Dict, Any
from ..config import settings
from datetime import datetime

@tool
def query_sensor_data(farm_id: str, sensor_type: str) -> Dict[str, Any]:
    """Query IoT sensor data (e.g. soil_moisture, temperature) for a farm."""
    # Mock implementation replacing real HTTP call to TimescaleDB IoT service
    # url = f"{settings.IOT_SERVICE_URL}/sensors/{farm_id}/{sensor_type}"
    
    mock_responses = {
        "soil_moisture": {"value": 35.5, "unit": "%", "timestamp": datetime.now().isoformat()},
        "temperature": {"value": 24.0, "unit": "C", "timestamp": datetime.now().isoformat()},
        "ph": {"value": 6.8, "unit": "pH", "timestamp": datetime.now().isoformat()}
    }
    
    sensor_type = sensor_type.lower()
    return mock_responses.get(sensor_type, {"value": 0.0, "unit": "unknown", "timestamp": datetime.now().isoformat()})
