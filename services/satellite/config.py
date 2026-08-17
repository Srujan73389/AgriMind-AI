from pydantic import BaseSettings

class Settings(BaseSettings):
    COPERNICUS_CLIENT_ID: str = "client_id"
    COPERNICUS_CLIENT_SECRET: str = "client_secret"
    S3_BUCKET: str = "agrimind-satellite-data"
    DATABASE_URL: str = "postgresql+asyncpg://user:pass@localhost/sat"
    
    class Config:
        env_file = ".env"

settings = Settings()
