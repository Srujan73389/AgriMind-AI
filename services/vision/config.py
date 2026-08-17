from pydantic import BaseSettings

class Settings(BaseSettings):
    YOLO_MODEL_PATH: str = "models/yolov11_disease.pt"
    CONFIDENCE_THRESHOLD: float = 0.5
    S3_BUCKET: str = "agrimind-vision-assets"
    AWS_REGION: str = "us-east-1"
    AWS_ACCESS_KEY_ID: str = ""
    AWS_SECRET_ACCESS_KEY: str = ""

    class Config:
        env_file = ".env"

settings = Settings()
