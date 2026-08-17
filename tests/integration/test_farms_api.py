import pytest

@pytest.mark.asyncio
async def test_create_and_list_farms(async_client, test_user_factory):
    user = await test_user_factory()
    res = await async_client.post("/auth/login", data={"username": "test@example.com", "password": "Password123!"})
    token = res.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}
    
    # Create farm
    res = await async_client.post("/farms", json={
        "name": "Integration Farm",
        "location": {"lat": 15.0, "lng": 75.0},
        "size_hectares": 10.5
    }, headers=headers)
    assert res.status_code == 201
    farm_id = res.json()["id"]
    
    # List farms
    res = await async_client.get("/farms", headers=headers)
    assert res.status_code == 200
    assert len(res.json()) >= 1
    assert res.json()[0]["name"] == "Integration Farm"

@pytest.mark.asyncio
async def test_farm_dashboard_and_update(async_client, test_user_factory, test_farm_factory):
    user = await test_user_factory(email="dash@example.com")
    res = await async_client.post("/auth/login", data={"username": "dash@example.com", "password": "Password123!"})
    token = res.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}
    
    farm = await test_farm_factory(token, name="Dash Farm")
    farm_id = farm["id"]
    
    # Add field
    res = await async_client.post(f"/farms/{farm_id}/fields", json={
        "name": "Field 1",
        "crop": "Wheat"
    }, headers=headers)
    assert res.status_code == 201
    
    # Update farm
    res = await async_client.put(f"/farms/{farm_id}", json={
        "name": "Updated Dash Farm"
    }, headers=headers)
    assert res.status_code == 200
    
    # Get dashboard
    res = await async_client.get(f"/farms/{farm_id}/dashboard", headers=headers)
    assert res.status_code == 200
    data = res.json()
    assert data["farm"]["name"] == "Updated Dash Farm"
    assert len(data["fields"]) == 1
