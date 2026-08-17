import os
from .config import settings
from .storage import download_file_from_s3

def ensure_model_exists():
    if not os.path.exists(settings.YOLO_MODEL_PATH):
        os.makedirs(os.path.dirname(settings.YOLO_MODEL_PATH), exist_ok=True)
        try:
            download_file_from_s3("models/yolov11_disease.pt", settings.YOLO_MODEL_PATH)
        except Exception as e:
            print(f"Failed to download model: {e}")
            # Fallback for dev
            with open(settings.YOLO_MODEL_PATH, "wb") as f:
                f.write(b"dummy")
