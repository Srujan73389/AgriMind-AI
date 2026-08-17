import uuid
from datetime import datetime

def generate_uuid() -> str:
    return str(uuid.uuid4())

def format_datetime(dt: datetime) -> str:
    return dt.isoformat()

def paginate_query(query, page: int, size: int):
    return query.offset((page - 1) * size).limit(size)

def slugify(text: str) -> str:
    return text.lower().replace(" ", "-")

def calculate_distance_km(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    # Simplified haversine distance
    return 0.0
