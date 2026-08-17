import pytest
from unittest.mock import patch
import io

@pytest.mark.asyncio
async def test_upload_image_disease_detection(async_client, test_user_factory):
    await test_user_factory(email="vision@example.com")
    res = await async_client.post("/auth/login", data={"username": "vision@example.com", "password": "Password123!"})
    token = res.json()["access_token"]
    
    # Create fake image
    fake_image = io.BytesIO(b"fake_image_data")
    fake_image.name = "leaf.jpg"
    
    # Mock YOLO prediction
    with patch("agrimind.vision.yolo_model.predict") as mock_predict:
        mock_predict.return_value = {
            "disease": "Leaf Blight",
            "confidence": 0.95,
            "bounding_boxes": []
        }
        
        res = await async_client.post(
            "/vision/detect",
            files={"file": ("leaf.jpg", fake_image, "image/jpeg")},
            data={"crop_type": "tomato"},
            headers={"Authorization": f"Bearer {token}"}
        )
        
        assert res.status_code == 200
        data = res.json()
        assert data["disease"] == "Leaf Blight"
        assert data["confidence"] == 0.95
