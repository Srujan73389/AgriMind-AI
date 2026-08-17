import mlflow
from ultralytics import YOLO
import json

def evaluate_model(model_path: str, data_config: str):
    model = YOLO(model_path)
    
    metrics = model.val(data=data_config)
    
    mlflow.set_tracking_uri("http://localhost:5000")
    mlflow.set_experiment("AgriMind_Disease_Detection_Eval")
    
    with mlflow.start_run():
        mlflow.log_metric("mAP50-95", metrics.box.map)
        mlflow.log_metric("mAP50", metrics.box.map50)
        mlflow.log_metric("precision", metrics.box.mp)
        mlflow.log_metric("recall", metrics.box.mr)
        
        # Save detailed report
        report = {
            "mAP50-95": metrics.box.map,
            "mAP50": metrics.box.map50,
            "precision": metrics.box.mp,
            "recall": metrics.box.mr,
            "class_metrics": metrics.box.maps.tolist()
        }
        
        with open("eval_report.json", "w") as f:
            json.dump(report, f, indent=4)
            
        mlflow.log_artifact("eval_report.json")
        print("Evaluation complete. Metrics logged to MLflow.")

if __name__ == "__main__":
    evaluate_model("agrimind_runs/yolov11_plant_disease/weights/best.pt", "yolo_config.yaml")
