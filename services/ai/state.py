from typing import TypedDict, List, Dict, Any, Optional
from langgraph.graph.message import AnyMessage, add_messages
from typing import Annotated

class FarmAgentState(TypedDict):
    messages: Annotated[List[AnyMessage], add_messages]
    session_id: str
    user_id: str
    farm_id: str
    farm_context: Dict[str, Any]
    tool_call_plan: List[Dict[str, Any]]
    tool_results: List[Dict[str, Any]]
    reflection_critique: Optional[str]
    verification_passed: bool
    human_approval_required: bool
    human_approval_received: bool
    reasoning_trace: List[str]
    final_response: str
    confidence_score: float
    language: str
