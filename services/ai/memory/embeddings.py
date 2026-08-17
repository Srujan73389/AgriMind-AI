from openai import AsyncOpenAI
from ..config import settings
import asyncio
from typing import List

client = AsyncOpenAI(api_key=settings.OPENAI_API_KEY)
embedding_cache = {}

async def get_embedding(text: str) -> List[float]:
    if text in embedding_cache:
        return embedding_cache[text]
        
    response = await client.embeddings.create(
        input=text,
        model="text-embedding-3-large"
    )
    vector = response.data[0].embedding
    embedding_cache[text] = vector
    return vector

async def get_embeddings_batch(texts: List[str]) -> List[List[float]]:
    uncached = []
    uncached_indices = []
    
    results = [None] * len(texts)
    
    for i, text in enumerate(texts):
        if text in embedding_cache:
            results[i] = embedding_cache[text]
        else:
            uncached.append(text)
            uncached_indices.append(i)
            
    if uncached:
        response = await client.embeddings.create(
            input=uncached,
            model="text-embedding-3-large"
        )
        
        for i, data in enumerate(response.data):
            vector = data.embedding
            text = uncached[i]
            embedding_cache[text] = vector
            results[uncached_indices[i]] = vector
            
    return results
