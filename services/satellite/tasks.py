# Mock Celery tasks
from .download import search_sentinel_data, download_tile
from .processing import process_field_ndvi

def refresh_ndvi_for_all_farms():
    print("Running weekly NDVI refresh for all farms...")

def process_new_satellite_pass(product_id: str):
    print(f"Processing new satellite pass: {product_id}")
    download_tile(product_id)
    # process_field_ndvi(...)
    send_satellite_alerts()

def send_satellite_alerts():
    print("Checking and dispatching satellite-derived alerts (flood, drought, anomalies)...")
