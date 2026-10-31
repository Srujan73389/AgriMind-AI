from typing import Dict, Any

class YieldPredictor:
    def __init__(self):
        pass
        
    def predict(self, features: Dict[str, Any]) -> Dict[str, float]:
        """Predict crop yield with confidence intervals."""
        base_yield = 5.0 # tons per hectare
        
        # Adjust based on features
        rainfall = features.get('rainfall_mm', 500)
        nitrogen = features.get('nitrogen_kg_ha', 100)
        
        if rainfall < 400:
            base_yield -= 1.0
        elif rainfall > 800:
            base_yield -= 0.5
            
        if nitrogen > 150:
            base_yield += 0.5
            
        return {
            "predicted_yield_t_ha": round(base_yield, 2),
            "lower_bound_95ci": round(base_yield * 0.85, 2),
            "upper_bound_95ci": round(base_yield * 1.15, 2)
        }
