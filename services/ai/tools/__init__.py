from .weather import get_weather
from .market import get_market_price
from .memory_tool import retrieve_memory
from .sensor_tool import query_sensor_data
from .satellite_tool import query_ndvi
from .disease_tool import detect_disease
from .notification_tool import send_notification

ALL_TOOLS = [
    get_weather,
    get_market_price,
    retrieve_memory,
    query_sensor_data,
    query_ndvi,
    detect_disease,
    send_notification
]
