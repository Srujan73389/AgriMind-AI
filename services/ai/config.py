from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    OPENAI_API_KEY: str = "sk-mock"
    QDRANT_HOST: str = "localhost"
    QDRANT_PORT: int = 6333
    REDIS_URL: str = "redis://localhost:6379"
    WEATHER_API_URL: str = "https://api.open-meteo.com/v1/forecast"
    MARKET_DATA_API_URL: str = "http://localhost:8000/market"
    IOT_SERVICE_URL: str = "http://localhost:8000/iot"
    VISION_SERVICE_URL: str = "http://localhost:8000/vision"
    NOTIFICATION_SERVICE_URL: str = "http://localhost:8000/notifications"

    class Config:
        env_file = ".env"

settings = Settings()
