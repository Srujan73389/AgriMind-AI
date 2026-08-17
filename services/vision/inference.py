import time
import cv2
import numpy as np
from ultralytics import YOLO
from typing import List, Tuple
from .config import settings
from .schemas import DiseaseResult, BoundingBox

DISEASE_MAP = {
    0: "Apple Scab",
    1: "Apple Black Rot",
    2: "Apple Cedar Rust",
    3: "Apple Healthy",
    4: "Corn Cercospora Leaf Spot",
    5: "Corn Common Rust",
    6: "Corn Northern Leaf Blight",
    7: "Corn Healthy",
    # ... assuming 38 classes, adding a few placeholders for brevity
    37: "Tomato Healthy"
}

class DiseaseDetector:
    def __init__(self):
        self.model = YOLO(settings.YOLO_MODEL_PATH)
    
    def calculate_severity(self, bbox: BoundingBox, image_shape: Tuple[int, int]) -> str:
        box_area = (bbox.x_max - bbox.x_min) * (bbox.y_max - bbox.y_min)
        img_area = image_shape[0] * image_shape[1]
        ratio = box_area / img_area
        if ratio < 0.1:
            return "Low"
        elif ratio < 0.3:
            return "Medium"
        return "High"

    def detect(self, image: np.ndarray) -> Tuple[List[DiseaseResult], float]:
        start_time = time.time()
        results = self.model.predict(image, conf=settings.CONFIDENCE_THRESHOLD)
        inference_time = (time.time() - start_time) * 1000
        
        detections = []
        if not results or not len(results[0].boxes):
            return detections, inference_time
            
        for box in results[0].boxes:
            cls_id = int(box.cls.item())
            conf = float(box.conf.item())
            xyxy = box.xyxy[0].cpu().numpy()
            
            bbox = BoundingBox(
                x_min=xyxy[0], y_min=xyxy[1], x_max=xyxy[2], y_max=xyxy[3]
            )
            disease_name = DISEASE_MAP.get(cls_id, f"Unknown_{cls_id}")
            severity = self.calculate_severity(bbox, image.shape[:2])
            
            detections.append(DiseaseResult(
                class_id=cls_id,
                disease_name=disease_name,
                confidence=conf,
                severity=severity,
                bbox=bbox
            ))
            
        return detections, inference_time
