from langchain_core.tools import tool
from typing import Dict, Any

@tool
def query_ndvi(farm_id: str, latitude: float, longitude: float) -> Dict[str, Any]:
    """Query NDVI (Normalized Difference Vegetation Index) satellite data for crop health."""
    # Mock implementation
    return {
        "ndvi_score": 0.75,
        "health_status": "Healthy",
        "description": "Vegetation is dense and healthy based on recent satellite imagery."
    }
