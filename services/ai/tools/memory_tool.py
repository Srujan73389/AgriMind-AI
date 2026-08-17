import asyncio
from langchain_core.tools import tool
from typing import List, Dict, Any
from ..memory.long_term import LongTermMemory

memory = LongTermMemory()

@tool
async def retrieve_memory(farm_id: str, query: str) -> List[Dict[str, Any]]:
    """Retrieve historical memory and context for a specific farm based on a query."""
    results = await memory.retrieve_memory(farm_id=farm_id, query=query, limit=3)
    return results
