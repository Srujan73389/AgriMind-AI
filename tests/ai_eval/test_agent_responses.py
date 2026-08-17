import pytest
import json
import os
from agrimind.ai.agent import FarmingAgent

def load_golden_cases():
    file_path = os.path.join(os.path.dirname(__file__), 'golden_cases.json')
    with open(file_path, 'r') as f:
        return json.load(f)

@pytest.mark.asyncio
@pytest.mark.parametrize("test_case", load_golden_cases())
async def test_agent_response_quality(test_case):
    agent = FarmingAgent()
    question = test_case["question"]
    
    # Get response from the agent
    response = await agent.process_message(question)
    
    response_text = response.text.lower()
    
    # Check expected topics
    for topic in test_case["expected_topics"]:
        assert topic.lower() in response_text, f"Expected topic '{topic}' missing from response: {response_text}"
        
    # Check tool calls
    if test_case["should_call_tools"]:
        assert len(response.tool_calls) > 0, "Agent failed to call expected tools"
        
    # Check confidence (if your agent returns metadata)
    if "metadata" in response and "confidence" in response.metadata:
        assert response.metadata["confidence"] >= test_case["expected_confidence_above"]
