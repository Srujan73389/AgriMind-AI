import os
from qdrant_client import QdrantClient
from qdrant_client.http import models

QDRANT_HOST = os.getenv("QDRANT_HOST", "localhost")
QDRANT_PORT = int(os.getenv("QDRANT_PORT", "6333"))
QDRANT_API_KEY = os.getenv("QDRANT_API_KEY", None)

def setup_qdrant():
    print(f"Connecting to Qdrant at {QDRANT_HOST}:{QDRANT_PORT}...")
    client = QdrantClient(host=QDRANT_HOST, port=QDRANT_PORT, api_key=QDRANT_API_KEY)

    collections = [
        "farm_memory",
        "seasonal_memory",
        "crop_memory"
    ]
    
    vector_size = 3072 # Assuming text-embedding-3-large is used with full size, or 1536 if subset
    # text-embedding-3-large defaults to 3072 dimensions

    for collection_name in collections:
        try:
            client.get_collection(collection_name)
            print(f"Collection '{collection_name}' already exists.")
        except Exception:
            print(f"Creating collection '{collection_name}'...")
            client.create_collection(
                collection_name=collection_name,
                vectors_config=models.VectorParams(
                    size=vector_size,
                    distance=models.Distance.COSINE
                )
            )
            print(f"Collection '{collection_name}' created successfully.")

if __name__ == "__main__":
    setup_qdrant()
