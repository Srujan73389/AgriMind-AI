from fastapi import FastAPI
from datetime import datetime
from .schemas import NDVIResult, VegetationIndices, SatelliteAnalysis
from .processing import process_field_ndvi
from .analysis import anomaly_detection

app = FastAPI(title="AgriMind Satellite Processing Service")

@app.get("/farms/{farm_id}/ndvi", response_model=NDVIResult)
def get_ndvi(farm_id: str):
    stats = process_field_ndvi("dummy_path", {})
    return NDVIResult(
        farm_id=farm_id,
        date=datetime.utcnow(),
        mean_ndvi=stats["mean_ndvi"],
        min_ndvi=stats["min_ndvi"],
        max_ndvi=stats["max_ndvi"],
        std_dev=stats["std_dev"],
        s3_url="s3://bucket/dummy.tif"
    )

@app.get("/farms/{farm_id}/indices", response_model=VegetationIndices)
def get_indices(farm_id: str):
    return VegetationIndices(ndvi=0.65, evi=0.45, ndwi=0.1, ndmi=0.2)

@app.post("/farms/{farm_id}/analyze", response_model=SatelliteAnalysis)
def analyze_farm(farm_id: str):
    anomalies = anomaly_detection(None)
    return SatelliteAnalysis(
        farm_id=farm_id,
        date=datetime.utcnow(),
        indices=VegetationIndices(ndvi=0.65, evi=0.45, ndwi=0.1, ndmi=0.2),
        anomalies=anomalies
    )
