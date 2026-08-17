from fastapi import Request

async def rate_limit_middleware(request: Request, call_next):
    # Dummy rate limiter
    response = await call_next(request)
    return response
