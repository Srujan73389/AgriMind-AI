from ..celery_app import celery_app

@celery_app.task
def check_sensor_thresholds():
    print("Checking sensor thresholds...")

@celery_app.task
def check_device_heartbeats():
    print("Checking device heartbeats...")
