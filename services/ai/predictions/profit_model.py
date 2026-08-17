from typing import Dict, Any

class ProfitCalculator:
    def calculate(self, 
                  predicted_yield_t_ha: float, 
                  market_price_per_t: float, 
                  variable_costs_per_ha: float, 
                  fixed_costs_per_ha: float) -> Dict[str, float]:
        """Calculate financial metrics."""
        
        total_revenue = predicted_yield_t_ha * market_price_per_t
        total_costs = variable_costs_per_ha + fixed_costs_per_ha
        expected_profit = total_revenue - total_costs
        
        breakeven_yield = total_costs / market_price_per_t if market_price_per_t > 0 else 0
        breakeven_price = total_costs / predicted_yield_t_ha if predicted_yield_t_ha > 0 else 0
        
        roi_pct = (expected_profit / total_costs) * 100 if total_costs > 0 else 0
        
        return {
            "total_revenue": round(total_revenue, 2),
            "total_costs": round(total_costs, 2),
            "expected_profit": round(expected_profit, 2),
            "breakeven_yield_t_ha": round(breakeven_yield, 2),
            "breakeven_price_per_t": round(breakeven_price, 2),
            "roi_pct": round(roi_pct, 2)
        }
