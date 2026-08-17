import cv2
import numpy as np
import uuid
from .storage import upload_file_to_s3

def generate_gradcam(image: np.ndarray, model_path: str) -> str:
    # Placeholder for actual Grad-CAM logic with YOLO
    # which requires hooking into the PyTorch model layers.
    # We generate a dummy heatmap overlay for demonstration.
    heatmap = cv2.applyColorMap(
        np.uint8(255 * np.random.rand(image.shape[0], image.shape[1])), 
        cv2.COLORMAP_JET
    )
    overlay = cv2.addWeighted(image, 0.5, heatmap, 0.5, 0)
    
    _, buffer = cv2.imencode('.jpg', overlay)
    file_name = f"gradcam/{uuid.uuid4()}.jpg"
    
    url = upload_file_to_s3(buffer.tobytes(), file_name, "image/jpeg")
    return url
