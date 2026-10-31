"""
Vercel deployment entrypoint for AgriMind AI unified FastAPI service.
"""
from services.api.main import app

__all__ = ["app"]
