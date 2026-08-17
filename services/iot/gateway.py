import asyncio
import json
from aiomqtt import Client, MqttError
from .config import settings
from .schemas.sensor import SensorPayload
from .calibration import apply_calibration
from .device_manager import update_heartbeat
from .alerts import check_thresholds

async def handle_message(topic, payload):
    try:
        data = json.loads(payload.decode())
        topic_parts = str(topic).split('/')
        # Topic format: agrimind/{farm_id}/{device_id}/sensors
        
        if len(topic_parts) >= 4 and topic_parts[3] == "sensors":
            farm_id = topic_parts[1]
            device_id = topic_parts[2]
            
            sensor_payload = SensorPayload(**data)
            update_heartbeat(device_id, sensor_payload.battery_level)
            
            for reading in sensor_payload.readings:
                calibrated_val = apply_calibration(device_id, reading.sensor_type, reading.value)
                reading.value = calibrated_val
                
                check_thresholds(farm_id, device_id, reading)
                
                # Write to TimescaleDB (Simulated)
                print(f"DB Write: {device_id} {reading.sensor_type} = {reading.value}")
                
            # Publish to Redis Pub/Sub (Simulated)
            print(f"Redis Publish: {farm_id} stream -> {sensor_payload.json()}")
            
    except Exception as e:
        print(f"Error processing MQTT message: {e}")

async def run_mqtt_gateway():
    while True:
        try:
            async with Client(
                hostname=settings.MQTT_HOST,
                port=settings.MQTT_PORT,
                username=settings.MQTT_USER,
                password=settings.MQTT_PASSWORD
            ) as client:
                print("Connected to MQTT Broker")
                await client.subscribe("agrimind/+/+/+")
                
                async for message in client.messages:
                    asyncio.create_task(handle_message(message.topic, message.payload))
                    
        except MqttError as error:
            print(f"MQTT Error: {error}. Reconnecting in 5s...")
            await asyncio.sleep(5)
