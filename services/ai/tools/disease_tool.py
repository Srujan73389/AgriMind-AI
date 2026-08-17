from langchain_core.tools import tool
from typing import Dict, Any

@tool
def detect_disease(image_url: str) -> Dict[str, Any]:
    """Detect plant diseases from an image URL using the vision service."""
    # Mock implementation
    return {
        "disease_name": "Leaf Rust",
        "confidence": 0.92,
        "treatment_recommendations": [
            "Apply fungicide containing tebuconazole",
            "Remove and destroy infected leaves",
            "Ensure proper spacing between plants for airflow"
        ]
    }
