from qdrant_client import QdrantClient
from qdrant_client.models import PointStruct, VectorParams, Distance
from typing import List, Dict, Any
import uuid
from .embeddings import get_embedding
from ..config import settings

class LongTermMemory:
    def __init__(self):
        self.client = QdrantClient(host=settings.QDRANT_HOST, port=settings.QDRANT_PORT)
        self.collection_name = "agrimind_memory"
        self._ensure_collection()

    def _ensure_collection(self):
        collections = self.client.get_collections().collections
        if not any(c.name == self.collection_name for c in collections):
            self.client.create_collection(
                collection_name=self.collection_name,
                vectors_config=VectorParams(size=3072, distance=Distance.COSINE)
            )

    async def store_memory(self, farm_id: str, content: str, metadata: Dict[str, Any] = None):
        vector = await get_embedding(content)
        point_id = str(uuid.uuid4())
        payload = {"farm_id": farm_id, "content": content}
        if metadata:
            payload.update(metadata)
            
        self.client.upsert(
            collection_name=self.collection_name,
            points=[PointStruct(id=point_id, vector=vector, payload=payload)]
        )
        return point_id

    async def retrieve_memory(self, farm_id: str, query: str, limit: int = 5) -> List[Dict[str, Any]]:
        vector = await get_embedding(query)
        results = self.client.search(
            collection_name=self.collection_name,
            query_vector=vector,
            query_filter={
                "must": [
                    {"key": "farm_id", "match": {"value": farm_id}}
                ]
            },
            limit=limit
        )
        return [hit.payload for hit in results]

    def delete_memory(self, point_id: str):
        self.client.delete(
            collection_name=self.collection_name,
            points_selector=[point_id]
        )
