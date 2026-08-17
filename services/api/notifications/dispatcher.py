def send_notification(user_id: str, message: str, channels: list):
    """
    Multichannel dispatcher for SMS, WhatsApp, Push, Email.
    """
    for channel in channels:
        print(f"Sending via {channel} to {user_id}: {message}")
