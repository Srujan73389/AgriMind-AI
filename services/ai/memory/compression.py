from typing import List, Dict, Any
from langchain_core.messages import SystemMessage, HumanMessage, AIMessage
from langchain_openai import ChatOpenAI
from ..config import settings

llm = ChatOpenAI(model="gpt-4o-mini", api_key=settings.OPENAI_API_KEY)

async def compress_conversation(messages: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    if len(messages) <= 20:
        return messages
        
    old_messages = messages[:-10]
    recent_messages = messages[-10:]
    
    formatted_old = "\n".join([f"{m.get('role', 'user')}: {m.get('content', '')}" for m in old_messages])
    
    prompt = f"Summarize the following conversation concisely:\n{formatted_old}"
    
    response = await llm.ainvoke([HumanMessage(content=prompt)])
    
    summary_msg = {"role": "system", "content": f"Previous conversation summary: {response.content}"}
    
    return [summary_msg] + recent_messages
