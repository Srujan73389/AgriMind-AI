import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    database_url: str = os.getenv("DATABASE_URL", "postgresql+asyncpg://postgres:postgres@localhost:5432/agrimind")
    redis_url: str = os.getenv("REDIS_URL", "redis://localhost:6379/0")
    secret_key: str = os.getenv("JWT_SECRET_KEY", "supersecretkey")
    jwt_algorithm: str = os.getenv("JWT_ALGORITHM", "HS256")
    access_token_expire_minutes: int = 60
    
    ai_service_url: str = os.getenv("AI_SERVICE_URL", "http://localhost:8001")
    vision_service_url: str = os.getenv("VISION_SERVICE_URL", "http://localhost:8002")
    iot_service_url: str = os.getenv("IOT_SERVICE_URL", "http://localhost:8003")
    satellite_service_url: str = os.getenv("SATELLITE_SERVICE_URL", "http://localhost:8004")

    class Config:
        env_file = ".env.example"

settings = Settings()
