from pydantic import BaseSettings

class Settings(BaseSettings):
    MQTT_HOST: str = "mqtt.agrimind.ai"
    MQTT_PORT: int = 8883
    MQTT_USER: str = "admin"
    MQTT_PASSWORD: str = "secret"
    DATABASE_URL: str = "postgresql+asyncpg://user:pass@localhost:5432/iot"
    REDIS_URL: str = "redis://localhost:6379/0"
    
    class Config:
        env_file = ".env"

settings = Settings()
