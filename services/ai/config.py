import os
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    model_config = SettingsConfigDict(extra="ignore", env_file=".env", env_file_encoding="utf-8")

    OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY", "sk-mock")
    QDRANT_HOST: str = os.getenv("QDRANT_HOST", "localhost")
    QDRANT_PORT: int = int(os.getenv("QDRANT_PORT", "6333"))
    REDIS_URL: str = os.getenv("REDIS_URL", "redis://localhost:6379")
    WEATHER_API_URL: str = os.getenv("WEATHER_API_URL", "https://api.open-meteo.com/v1/forecast")
    
    API_URL: str = os.getenv("API_URL", "http://localhost:8000")
    MARKET_DATA_API_URL: str = f"{os.getenv('API_URL', 'http://localhost:8000').rstrip('/')}/market"
    IOT_SERVICE_URL: str = f"{os.getenv('IOT_SERVICE_URL', os.getenv('API_URL', 'http://localhost:8000')).rstrip('/')}/iot"
    VISION_SERVICE_URL: str = f"{os.getenv('VISION_SERVICE_URL', os.getenv('API_URL', 'http://localhost:8000')).rstrip('/')}/vision"
    NOTIFICATION_SERVICE_URL: str = f"{os.getenv('NOTIFICATION_SERVICE_URL', os.getenv('API_URL', 'http://localhost:8000')).rstrip('/')}/notifications"

settings = Settings()
