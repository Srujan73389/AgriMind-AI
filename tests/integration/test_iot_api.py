import pytest
from fastapi.testclient import TestClient
from agrimind.main import app

@pytest.mark.asyncio
async def test_device_registration(async_client, test_user_factory):
    await test_user_factory(email="iot@example.com")
    res = await async_client.post("/auth/login", data={"username": "iot@example.com", "password": "Password123!"})
    token = res.json()["access_token"]
    
    res = await async_client.post("/iot/devices", json={
        "device_id": "sensor-001",
        "type": "soil_moisture",
        "farm_id": 1
    }, headers={"Authorization": f"Bearer {token}"})
    
    assert res.status_code == 201
    assert res.json()["status"] == "registered"

def test_websocket_sensor_streaming():
    client = TestClient(app)
    # Using TestClient for websocket since AsyncClient websocket support varies
    with client.websocket_connect("/ws/iot/sensor-001") as websocket:
        # Send mock sensor data
        websocket.send_json({"moisture": 45.2, "temperature": 25.5})
        # Expect an ack or processed response
        data = websocket.receive_json()
        assert data["status"] == "received"
        assert data["device_id"] == "sensor-001"

@pytest.mark.asyncio
async def test_calibration(async_client, test_user_factory):
    await test_user_factory(email="calib@example.com")
    res = await async_client.post("/auth/login", data={"username": "calib@example.com", "password": "Password123!"})
    token = res.json()["access_token"]
    
    res = await async_client.post("/iot/devices/sensor-001/calibrate", json={
        "points": [{"raw": 100, "true": 10.0}, {"raw": 900, "true": 90.0}]
    }, headers={"Authorization": f"Bearer {token}"})
    
    assert res.status_code == 200
    assert res.json()["calibrated"] == True
