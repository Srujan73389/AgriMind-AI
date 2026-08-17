import json
import redis
from typing import List, Dict, Any
from ..config import settings

class ShortTermMemory:
    def __init__(self):
        self.redis_client = redis.from_url(settings.REDIS_URL, decode_responses=True)
        self.window_size = 20

    def load_history(self, session_id: str) -> List[Dict[str, Any]]:
        key = f"session:{session_id}:history"
        raw_history = self.redis_client.lrange(key, 0, -1)
        return [json.loads(item) for item in raw_history]

    def save_history(self, session_id: str, messages: List[Dict[str, Any]]):
        key = f"session:{session_id}:history"
        self.redis_client.delete(key)
        
        # Take last window_size messages
        windowed = messages[-self.window_size:]
        if windowed:
            self.redis_client.rpush(key, *[json.dumps(m) for m in windowed])
        
        self.redis_client.expire(key, 86400) # 24 hours expiry
