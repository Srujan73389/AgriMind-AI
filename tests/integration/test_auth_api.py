import pytest

@pytest.mark.asyncio
async def test_register_and_login(async_client):
    # Register
    res = await async_client.post("/auth/register", json={
        "email": "auth@example.com",
        "password": "StrongPassword1!"
    })
    assert res.status_code == 201
    
    # Login
    res = await async_client.post("/auth/login", data={
        "username": "auth@example.com",
        "password": "StrongPassword1!"
    })
    assert res.status_code == 200
    token = res.json()["access_token"]
    
    # Get Profile
    res = await async_client.get("/auth/me", headers={"Authorization": f"Bearer {token}"})
    assert res.status_code == 200
    assert res.json()["email"] == "auth@example.com"

@pytest.mark.asyncio
async def test_refresh_token(async_client, test_user_factory):
    await test_user_factory(email="refresh@example.com")
    res = await async_client.post("/auth/login", data={
        "username": "refresh@example.com",
        "password": "Password123!"
    })
    refresh_token = res.json()["refresh_token"]
    
    res = await async_client.post("/auth/refresh", json={"refresh_token": refresh_token})
    assert res.status_code == 200
    assert "access_token" in res.json()

@pytest.mark.asyncio
async def test_logout(async_client, test_user_factory):
    await test_user_factory(email="logout@example.com")
    res = await async_client.post("/auth/login", data={
        "username": "logout@example.com",
        "password": "Password123!"
    })
    token = res.json()["access_token"]
    
    res = await async_client.post("/auth/logout", headers={"Authorization": f"Bearer {token}"})
    assert res.status_code == 200
    
    # Token should be invalidated
    res = await async_client.get("/auth/me", headers={"Authorization": f"Bearer {token}"})
    assert res.status_code == 401
