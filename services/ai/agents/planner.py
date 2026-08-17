from langchain_openai import ChatOpenAI
from langchain_core.messages import SystemMessage, HumanMessage
from jinja2 import Environment, FileSystemLoader
import os
from typing import Any
from ..config import settings
from ..state import FarmAgentState
from ..tools import ALL_TOOLS

llm = ChatOpenAI(model="gpt-4o", api_key=settings.OPENAI_API_KEY)
llm_with_tools = llm.bind_tools(ALL_TOOLS)

template_dir = os.path.join(os.path.dirname(__file__), '..', 'prompts')
env = Environment(loader=FileSystemLoader(template_dir))
template = env.get_template('planner.j2')

async def planner_node(state: FarmAgentState) -> dict:
    tools_info = [{"name": t.name, "description": t.description} for t in ALL_TOOLS]
    
    sys_prompt_content = template.render(
        farm_context=state.get("farm_context", {}),
        language=state.get("language", "en"),
        tools=tools_info
    )
    
    messages = [SystemMessage(content=sys_prompt_content)] + state["messages"]
    
    response = await llm_with_tools.ainvoke(messages)
    
    # Extract tool calls or reasoning
    tool_calls = []
    if response.tool_calls:
        tool_calls = response.tool_calls
        
    return {
        "messages": [response],
        "tool_call_plan": tool_calls
    }
