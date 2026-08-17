from langchain_openai import ChatOpenAI
from langchain_core.messages import SystemMessage, HumanMessage
from jinja2 import Environment, FileSystemLoader
import os
from ..config import settings
from ..state import FarmAgentState
from ..schemas.agent import ReflectionOutput
from typing import Dict, Any

llm = ChatOpenAI(model="gpt-4o-mini", api_key=settings.OPENAI_API_KEY)
structured_llm = llm.with_structured_output(ReflectionOutput)

template_dir = os.path.join(os.path.dirname(__file__), '..', 'prompts')
env = Environment(loader=FileSystemLoader(template_dir))
template = env.get_template('reflection.j2')

async def reflection_node(state: FarmAgentState) -> dict:
    last_message = state["messages"][-1].content
    user_query = state["messages"][0].content if state["messages"] else ""
    
    prompt = template.render(
        query=user_query,
        farm_context=state.get("farm_context", {}),
        proposed_response=last_message
    )
    
    result = await structured_llm.ainvoke([HumanMessage(content=prompt)])
    
    return {
        "reflection_critique": result.critique,
        "human_approval_required": not result.approved,
        "final_response": result.revised_response if not result.approved else last_message
    }
