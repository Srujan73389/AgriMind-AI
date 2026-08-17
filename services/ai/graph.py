from langgraph.graph import StateGraph, END
from .state import FarmAgentState
from .agents.planner import planner_node
from .agents.reflection import reflection_node
from .agents.verification import verification_node
from langgraph.prebuilt import ToolNode
from .tools import ALL_TOOLS

def should_use_tools(state: FarmAgentState):
    last_message = state["messages"][-1]
    if last_message.tool_calls:
        return "tools"
    return "reflection"

def should_ask_human(state: FarmAgentState):
    if state.get("human_approval_required") and not state.get("human_approval_received"):
        return "human_approval"
    return END

def human_approval_node(state: FarmAgentState):
    # In a real system, this would pause execution and wait for a human.
    # We mock this for now.
    return {"human_approval_received": True}

def build_graph():
    workflow = StateGraph(FarmAgentState)
    
    workflow.add_node("planner", planner_node)
    
    tool_node = ToolNode(ALL_TOOLS)
    workflow.add_node("tools", tool_node)
    
    workflow.add_node("reflection", reflection_node)
    workflow.add_node("verification", verification_node)
    workflow.add_node("human_approval", human_approval_node)
    
    workflow.set_entry_point("planner")
    
    workflow.add_conditional_edges(
        "planner",
        should_use_tools,
        {"tools": "tools", "reflection": "reflection"}
    )
    
    workflow.add_edge("tools", "planner")
    workflow.add_edge("reflection", "verification")
    
    workflow.add_conditional_edges(
        "verification",
        should_ask_human,
        {"human_approval": "human_approval", END: END}
    )
    
    workflow.add_edge("human_approval", END)
    
    return workflow.compile()
