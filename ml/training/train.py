import os
import mlflow
from ultralytics import YOLO

def train_model():
    mlflow.set_tracking_uri("http://localhost:5000")
    mlflow.set_experiment("AgriMind_Disease_Detection")
    
    with mlflow.start_run():
        model = YOLO('yolov11n.pt')  # Start with nano model for faster training
        
        results = model.train(
            data='yolo_config.yaml',
            epochs=100,
            imgsz=640,
            batch=32,
            patience=20, # Early stopping
            project='agrimind_runs',
            name='yolov11_plant_disease',
            device='0', # Use GPU if available
            exist_ok=True
        )
        
        # Log metrics to mlflow
        mlflow.log_param("epochs", 100)
        mlflow.log_param("batch_size", 32)
        mlflow.log_param("img_size", 640)
        
        # Log best model artifact
        best_model_path = "agrimind_runs/yolov11_plant_disease/weights/best.pt"
        if os.path.exists(best_model_path):
            mlflow.log_artifact(best_model_path, "models")
            print(f"Training complete. Best model saved to {best_model_path}")
            # Here we would upload to S3 using boto3
            
if __name__ == "__main__":
    train_model()
