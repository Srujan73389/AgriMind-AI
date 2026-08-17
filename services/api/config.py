from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    database_url: str = "postgresql+asyncpg://postgres:postgres@localhost:5432/agrimind"
    redis_url: str = "redis://localhost:6379/0"
    secret_key: str = "supersecretkey"
    jwt_algorithm: str = "HS256"
    access_token_expire_minutes: int = 60

    class Config:
        env_file = ".env.example"

settings = Settings()
