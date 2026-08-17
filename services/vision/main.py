from fastapi import FastAPI, HTTPException, UploadFile, File
import httpx
from .schemas import DetectionResponse
from .inference import DiseaseDetector
from .preprocessing import decode_image, preprocess_image
from .gradcam import generate_gradcam
from .config import settings
from .model_registry import ensure_model_exists

app = FastAPI(title="AgriMind Vision Service")

detector = None

@app.on_event("startup")
def startup_event():
    global detector
    ensure_model_exists()
    detector = DiseaseDetector()

@app.get("/health")
def health():
    return {"status": "ok"}

@app.get("/model-info")
def model_info():
    return {
        "model_path": settings.YOLO_MODEL_PATH,
        "confidence_threshold": settings.CONFIDENCE_THRESHOLD
    }

@app.post("/detect", response_model=DetectionResponse)
async def detect(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        image = decode_image(contents)
        processed_image = preprocess_image(image)
        
        detections, inference_time = detector.detect(processed_image)
        
        gradcam_url = None
        if detections:
            gradcam_url = generate_gradcam(processed_image, settings.YOLO_MODEL_PATH)
            
        return DetectionResponse(
            detections=detections,
            gradcam_url=gradcam_url,
            inference_time_ms=inference_time
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
