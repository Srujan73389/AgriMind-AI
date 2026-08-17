import httpx
from langchain_core.tools import tool
from typing import Dict, Any

@tool
def get_weather(latitude: float, longitude: float) -> Dict[str, Any]:
    """Get 7-day weather forecast, humidity, and rain for a given location."""
    url = f"https://api.open-meteo.com/v1/forecast?latitude={latitude}&longitude={longitude}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&current=relative_humidity_2m,precipitation&timezone=auto"
    
    with httpx.Client() as client:
        response = client.get(url)
        if response.status_code != 200:
            return {"error": "Failed to fetch weather data"}
            
        data = response.json()
        
        daily = data.get("daily", {})
        current = data.get("current", {})
        
        forecast = []
        if daily:
            times = daily.get("time", [])
            max_temps = daily.get("temperature_2m_max", [])
            min_temps = daily.get("temperature_2m_min", [])
            precip = daily.get("precipitation_sum", [])
            
            for i in range(len(times)):
                forecast.append({
                    "date": times[i],
                    "max_temp": max_temps[i],
                    "min_temp": min_temps[i],
                    "precipitation": precip[i]
                })
                
        return {
            "forecast": forecast,
            "current_humidity": current.get("relative_humidity_2m", 0.0),
            "current_rain": current.get("precipitation", 0.0)
        }
