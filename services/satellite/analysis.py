from .schemas import VegetationIndices, FloodAlert, DroughtRisk

def anomaly_detection(ndvi_array):
    # Mock Moran's I or spatial anomaly logic
    return ["Low vigor in North-East quadrant"]

def flood_detection(ndwi_mean: float) -> FloodAlert:
    if ndwi_mean > 0.3:
        return FloodAlert(farm_id="farm_x", severity="High", affected_area_ha=10.5)
    return None

def drought_detection(ndmi_mean: float) -> DroughtRisk:
    if ndmi_mean < -0.1:
        return DroughtRisk(farm_id="farm_x", risk_level="High", recommendation="Initiate emergency irrigation")
    return None

def health_trend_analysis(historical_ndvi: list) -> str:
    if len(historical_ndvi) > 1 and historical_ndvi[-1] < historical_ndvi[-2]:
        return "Declining health detected"
    return "Stable"
