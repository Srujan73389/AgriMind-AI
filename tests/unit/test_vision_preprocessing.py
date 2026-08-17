import pytest
import numpy as np
from PIL import Image
from io import BytesIO
from agrimind.vision import preprocess_image, resize_image, normalize_tensor

@pytest.fixture
def synthetic_image():
    # Create a 300x300 green square
    arr = np.zeros((300, 300, 3), dtype=np.uint8)
    arr[:, :, 1] = 255  # Green channel
    img = Image.fromarray(arr)
    return img

def test_resize_image(synthetic_image):
    resized = resize_image(synthetic_image, target_size=(224, 224))
    assert resized.size == (224, 224)
    
def test_normalize_tensor(synthetic_image):
    resized = resize_image(synthetic_image, target_size=(224, 224))
    tensor = normalize_tensor(resized)
    assert tensor.shape == (1, 3, 224, 224)
    assert tensor.max() <= 1.0
    assert tensor.min() >= 0.0

def test_preprocess_image(synthetic_image):
    byte_io = BytesIO()
    synthetic_image.save(byte_io, 'JPEG')
    byte_io.seek(0)
    
    tensor = preprocess_image(byte_io.read())
    assert tensor.shape == (1, 3, 224, 224)
