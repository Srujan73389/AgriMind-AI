import pytest
from agrimind.farm import validate_farm_data, calculate_farm_area, validate_coordinates

def test_validate_coordinates_valid():
    assert validate_coordinates(28.6139, 77.2090) is True  # New Delhi
    assert validate_coordinates(0, 0) is True

def test_validate_coordinates_invalid():
    with pytest.raises(ValueError):
        validate_coordinates(91, 0)
    with pytest.raises(ValueError):
        validate_coordinates(-91, 0)
    with pytest.raises(ValueError):
        validate_coordinates(0, 181)
    with pytest.raises(ValueError):
        validate_coordinates(0, -181)

def test_calculate_farm_area():
    # A simple square farm
    polygon = [
        (0.0, 0.0),
        (0.0, 0.001),
        (0.001, 0.001),
        (0.001, 0.0)
    ]
    area = calculate_farm_area(polygon)
    assert area > 0
    assert isinstance(area, float)

def test_validate_farm_data_valid():
    data = {
        "name": "My Farm",
        "location": {"lat": 28.6139, "lng": 77.2090},
        "size_hectares": 5.5
    }
    assert validate_farm_data(data) is True

def test_validate_farm_data_invalid():
    data = {
        "name": "",
        "location": {"lat": 28.6139, "lng": 77.2090},
        "size_hectares": -1
    }
    with pytest.raises(ValueError):
        validate_farm_data(data)
