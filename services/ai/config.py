import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    OPENAI_API_KEY: str = "sk-mock"
    QDRANT_HOST: str = "localhost"
    QDRANT_PORT: int = 6333
    REDIS_URL: str = "redis://localhost:6379"
    WEATHER_API_URL: str = "https://api.open-meteo.com/v1/forecast"
    
    API_URL: str = os.getenv("API_URL", "http://localhost:8000")
    MARKET_DATA_API_URL: str = f"{os.getenv('API_URL', 'http://localhost:8000').rstrip('/')}/market"
    IOT_SERVICE_URL: str = f"{os.getenv('IOT_SERVICE_URL', os.getenv('API_URL', 'http://localhost:8000')).rstrip('/')}/iot"
    VISION_SERVICE_URL: str = f"{os.getenv('VISION_SERVICE_URL', os.getenv('API_URL', 'http://localhost:8000')).rstrip('/')}/vision"
    NOTIFICATION_SERVICE_URL: str = f"{os.getenv('NOTIFICATION_SERVICE_URL', os.getenv('API_URL', 'http://localhost:8000')).rstrip('/')}/notifications"

    class Config:
        env_file = ".env"

settings = Settings()
