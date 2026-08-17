import pytest
from unittest.mock import patch

@pytest.mark.asyncio
async def test_marketplace_listing(async_client, test_user_factory):
    await test_user_factory(email="market@example.com")
    res = await async_client.post("/auth/login", data={"username": "market@example.com", "password": "Password123!"})
    token = res.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}
    
    # Create listing
    res = await async_client.post("/marketplace/listings", json={
        "title": "Organic Wheat",
        "quantity_kg": 1000,
        "price_per_kg": 30.5
    }, headers=headers)
    assert res.status_code == 201
    listing_id = res.json()["id"]
    
    # Browse listings
    res = await async_client.get("/marketplace/listings")
    assert res.status_code == 200
    assert len(res.json()) >= 1

@pytest.mark.asyncio
async def test_create_order_mock_payment(async_client, test_user_factory):
    await test_user_factory(email="buyer@example.com")
    res = await async_client.post("/auth/login", data={"username": "buyer@example.com", "password": "Password123!"})
    token = res.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}
    
    with patch("agrimind.payments.razorpay_client.order.create") as mock_create:
        mock_create.return_value = {"id": "order_mock123", "amount": 3050000, "currency": "INR"}
        
        res = await async_client.post("/marketplace/orders", json={
            "listing_id": 1,
            "quantity_kg": 100
        }, headers=headers)
        
        assert res.status_code == 201
        data = res.json()
        assert data["payment_order_id"] == "order_mock123"
        assert data["status"] == "pending"
