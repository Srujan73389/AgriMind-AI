import pytest
import numpy as np
from agrimind.satellite import calculate_ndvi

def test_ndvi_calculation_normal():
    # NIR > Red
    nir = np.array([[0.8, 0.7], [0.6, 0.9]])
    red = np.array([[0.2, 0.1], [0.3, 0.1]])
    
    ndvi = calculate_ndvi(nir, red)
    
    assert ndvi.shape == (2, 2)
    assert np.isclose(ndvi[0, 0], (0.8 - 0.2) / (0.8 + 0.2))
    assert np.isclose(ndvi[0, 1], (0.7 - 0.1) / (0.7 + 0.1))
    assert (ndvi >= -1.0).all() and (ndvi <= 1.0).all()

def test_ndvi_calculation_zero_division():
    # Handle zero division gracefully
    nir = np.array([0.0])
    red = np.array([0.0])
    
    ndvi = calculate_ndvi(nir, red)
    assert ndvi[0] == 0.0  # Or np.nan depending on implementation, assuming 0.0 here

def test_ndvi_invalid_shapes():
    nir = np.array([0.8, 0.7])
    red = np.array([0.2])
    with pytest.raises(ValueError):
        calculate_ndvi(nir, red)
