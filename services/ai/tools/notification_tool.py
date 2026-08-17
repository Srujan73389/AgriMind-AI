import httpx
from langchain_core.tools import tool
from typing import Dict, Any
from ..config import settings

@tool
def send_notification(user_id: str, message: str, channel: str = "sms") -> Dict[str, Any]:
    """Send a notification (SMS, email, push) to the user."""
    # Mock implementation
    return {
        "status": "success",
        "message_id": "msg_12345",
        "delivered_to": user_id,
        "channel": channel
    }
