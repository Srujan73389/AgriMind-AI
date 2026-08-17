import math
from typing import Dict, Any

class WaterModel:
    def calculate_et0(self, temp_c: float, humidity_pct: float, wind_speed_ms: float, solar_rad_mj_m2: float) -> float:
        """Calculate reference evapotranspiration (ET0) using simplified Penman-Monteith."""
        # Simplified PM equation for mock implementation
        # Real implementation would use full FAO-56 Penman-Monteith equation
        
        # Vapor pressure deficit
        es = 0.6108 * math.exp((17.27 * temp_c) / (temp_c + 237.3))
        ea = es * (humidity_pct / 100.0)
        vpd = es - ea
        
        # Radiation term (simplified)
        rad_term = 0.408 * solar_rad_mj_m2 * 0.5
        
        # Aero term (simplified)
        aero_term = (900 / (temp_c + 273)) * wind_speed_ms * vpd * 0.5
        
        et0 = rad_term + aero_term
        return max(0.1, round(et0, 2))
        
    def get_irrigation_schedule(self, et0: float, crop_kc: float, effective_rain_mm: float) -> Dict[str, Any]:
        etc = et0 * crop_kc
        water_deficit = max(0, etc - effective_rain_mm)
        
        return {
            "et0_mm_day": et0,
            "crop_et_mm_day": round(etc, 2),
            "water_deficit_mm": round(water_deficit, 2),
            "recommended_irrigation_mm": round(water_deficit * 1.2, 2) # Adding 20% for efficiency losses
        }
