from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage
from jinja2 import Environment, FileSystemLoader
import os
from ..config import settings
from ..state import FarmAgentState
from ..schemas.agent import VerificationOutput

llm = ChatOpenAI(model="gpt-4o-mini", api_key=settings.OPENAI_API_KEY)
structured_llm = llm.with_structured_output(VerificationOutput)

template_dir = os.path.join(os.path.dirname(__file__), '..', 'prompts')
env = Environment(loader=FileSystemLoader(template_dir))
template = env.get_template('verification.j2')

async def verification_node(state: FarmAgentState) -> dict:
    response = state.get("final_response") or state["messages"][-1].content
    
    prompt = template.render(
        tool_results=state.get("tool_results", []),
        response=response
    )
    
    result = await structured_llm.ainvoke([HumanMessage(content=prompt)])
    
    return {
        "verification_passed": result.passed,
        "confidence_score": result.confidence_score
    }
