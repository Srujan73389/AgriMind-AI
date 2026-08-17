from langchain_core.tools import tool
from typing import Dict, Any

@tool
def get_market_price(commodity: str, region: str) -> Dict[str, Any]:
    """Get current market prices for a specific commodity in a given region."""
    # Mock data structure matching real API
    mock_db = {
        "wheat": {"price": 250.50, "currency": "USD/ton", "trend": "up"},
        "corn": {"price": 180.20, "currency": "USD/ton", "trend": "down"},
        "soybeans": {"price": 520.00, "currency": "USD/ton", "trend": "stable"}
    }
    
    commodity = commodity.lower()
    if commodity in mock_db:
        return mock_db[commodity]
    else:
        return {"price": 100.0, "currency": "USD/ton", "trend": "unknown"}
