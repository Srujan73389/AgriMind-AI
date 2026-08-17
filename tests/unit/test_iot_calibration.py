import pytest
from agrimind.iot import SensorCalibrator

def test_two_point_calibration():
    # Known reference points: (Raw value, True value)
    points = [(100, 10.0), (900, 90.0)]
    calibrator = SensorCalibrator(points=points)
    
    # Test midpoint
    assert calibrator.calibrate(500) == 50.0
    
    # Test endpoints
    assert calibrator.calibrate(100) == 10.0
    assert calibrator.calibrate(900) == 90.0
    
    # Test extrapolation
    assert calibrator.calibrate(0) == 0.0
    assert calibrator.calibrate(1000) == 100.0

def test_calibration_invalid_points():
    # Needs exactly 2 points for 2-point calibration
    points = [(100, 10.0)]
    with pytest.raises(ValueError):
        SensorCalibrator(points=points)
