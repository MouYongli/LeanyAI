"""
requirements.txt 不要添加 git+https://github.com/EvoAgentX/EvoAgentX.git
而是 pip install git+https://github.com/EvoAgentX/EvoAgentX.git

本模块演示如何安装并使用 EvoAgentX 库来生成工作流。

步骤说明:
1. 使用 pip 安装 EvoAgentX 库:

2. 安装完成后, 导入 EvoAgentX 包。

3. 通过 WorkFlowGenerator 类, 并传入 llm 参数, 实例化工作流生成器:

4. 使用 EvoAgentX 提供的类来生成和管理工作流。

注意:
- 请确保已正确安装 EvoAgentX 及其依赖。
- llm 参数需为已初始化的语言模型实例。

也就是要写好调用的代码，给 fastapi/main 模块提供一个接口来生成工作流。

source .venv/bin/activate
uv run agent/agent_service.py 
"""

import os
import json
from dotenv import load_dotenv
import litellm
from evoagentx.models import LiteLLMConfig, LiteLLM
from evoagentx.workflow import WorkFlowGenerator

# Load environment variables
load_dotenv()

# Global variable to store the latest generated plan
_latest_plan = None


def generate_plan_demo() -> dict:
    """Generate a demo plan in TaskPlanningOutput format matching plan.json structure"""
    result = {
        "class_name": "TaskPlanningOutput",
        "sub_tasks": [
            {
                "class_name": "WorkFlowNode",
                "name": "requirements_analysis",
                "description": "Analyze the user's goal and define the requirements for a browser-based game, including gameplay features, user controls, and expected browser behaviors.",
                "inputs": [
                    {
                        "class_name": "Parameter",
                        "name": "goal",
                        "type": "string",
                        "description": "The user's goal in textual format.",
                        "required": True
                    }
                ],
                "outputs": [
                    {
                        "class_name": "Parameter",
                        "name": "game_requirements",
                        "type": "string",
                        "description": "A detailed outline of the requirements for a browser-based, playable game.",
                        "required": True
                    }
                ],
                "reason": "This step ensures clear understanding of all functional and non-functional requirements before code generation, reducing the risk of missing key features or misunderstandings.",
                "agents": None,
                "action_graph": None,
                "status": "pending"
            },
            {
                "class_name": "WorkFlowNode",
                "name": "game_code_generation",
                "description": "Generate complete HTML (including JavaScript and CSS as needed) for a playable game in the browser, based on the specified requirements.",
                "inputs": [
                    {
                        "class_name": "Parameter",
                        "name": "goal",
                        "type": "string",
                        "description": "The overall user goal including full context and expectations for the game.",
                        "required": True
                    },
                    {
                        "class_name": "Parameter",
                        "name": "game_requirements",
                        "type": "string",
                        "description": "The detailed requirements and features for the game as specified in the previous step.",
                        "required": True
                    }
                ],
                "outputs": [
                    {
                        "class_name": "Parameter",
                        "name": "game_code",
                        "type": "string",
                        "description": "A complete HTML file (including embedded JavaScript and CSS as necessary) for a playable game in the browser.",
                        "required": True
                    }
                ],
                "reason": "This step produces the fully functioning game code, ensuring it meets all previously defined requirements and can be played in any web browser.",
                "agents": None,
                "action_graph": None,
                "status": "pending"
            }
        ]
    }

    return result


def configure_llm() -> LiteLLM:
    """Configure and return LiteLLM instance"""
    # Check for required environment variables
    deployment_name = os.getenv("AZURE_OPENAI_DEPLOYMENT_NAME")
    endpoint = os.getenv("AZURE_OPENAI_ENDPOINT")
    api_key = os.getenv("AZURE_OPENAI_KEY")
    
    if not deployment_name:
        raise ValueError("AZURE_OPENAI_DEPLOYMENT_NAME environment variable is required")
    if not endpoint:
        raise ValueError("AZURE_OPENAI_ENDPOINT environment variable is required")
    if not api_key:
        raise ValueError("AZURE_OPENAI_KEY environment variable is required")
    
    config = LiteLLMConfig(
        model="azure/" + deployment_name,  # Azure model format
        azure_endpoint=endpoint,
        azure_key=api_key,
        api_version=os.getenv("AZURE_OPENAI_API_VERSION", "2024-12-01-preview")
    )
    return LiteLLM(config=config)


def convert_plan_to_dict(plan) -> dict:
    """Convert EvoAgentX plan object to dict format like plan.json"""
    if hasattr(plan, 'to_dict'):
        return plan.to_dict()
    elif hasattr(plan, '__dict__'):
        plan_dict = plan.__dict__.copy()
        # Convert any nested objects to dict format
        for key, value in plan_dict.items():
            if hasattr(value, '__dict__') and not isinstance(value, (str, int, float, bool, list, dict, type(None))):
                try:
                    json.dumps(value)  # Test if serializable
                except (TypeError, ValueError):
                    if hasattr(value, 'to_dict'):
                        plan_dict[key] = value.to_dict()
                    else:
                        plan_dict[key] = str(value)
            elif isinstance(value, list):
                # Handle list of objects
                converted_list = []
                for item in value:
                    if hasattr(item, 'to_dict'):
                        converted_list.append(item.to_dict())
                    elif hasattr(item, '__dict__'):
                        converted_list.append(item.__dict__)
                    else:
                        converted_list.append(item)
                plan_dict[key] = converted_list
        return plan_dict
    else:
        return {"error": "Unable to convert plan to dict", "plan_str": str(plan)}


def generate_plan(goal: str = None) -> dict:
    """Generate a workflow plan using EvoAgentX and return as dict"""
    global _latest_plan
    
    try:
        # Use provided goal or default
        if goal is None:
            # goal = "Generate html code for the flappy bird that can be played in the browser."
            goal = "earn 1000000 us dollars in 10 year ."
        
        # Configure LLM
        llm = configure_llm()
        
        # Generate plan using EvoAgentX
        wf = WorkFlowGenerator(llm=llm)
        plan = wf.generate_plan(goal=goal)
        
        # Convert to dict format
        plan_dict = convert_plan_to_dict(plan)
        
        # Store the latest plan
        _latest_plan = plan_dict
        
        return plan_dict
        
    except Exception as e:
        # If EvoAgentX is not available or there's an error, return demo data
        print(f"Error generating plan with EvoAgentX: {e}")
        print("Falling back to demo plan...")
        plan_dict = generate_plan_demo()
        _latest_plan = plan_dict
        return plan_dict


def get_latest_plan() -> dict:
    """Get the latest generated plan"""
    global _latest_plan
    
    if _latest_plan is None:
        # If no plan has been generated yet, return default plan
        return generate_plan()
    
    return _latest_plan


def test_generate_plan():
    """Test function to verify generate_plan works correctly"""
    print("Testing generate_plan function...")
    
    # Test with default goal
    result = generate_plan()
    
    print(f"Plan generated successfully!")
    print(f"Plan type: {type(result)}")
    print(f"Plan keys: {result.keys() if isinstance(result, dict) else 'Not a dict'}")
    
    # Check if it has the expected structure
    if isinstance(result, dict):
        if "class_name" in result:
            print(f"Class name: {result['class_name']}")
        if "sub_tasks" in result:
            print(f"Number of sub_tasks: {len(result['sub_tasks'])}")
            for i, task in enumerate(result['sub_tasks']):
                if isinstance(task, dict) and 'name' in task:
                    print(f"  Task {i+1}: {task['name']}")
        # Legacy check for old format
        elif "nodes" in result:
            print(f"Number of nodes (legacy): {len(result['nodes'])}")
    
    return result


if __name__ == "__main__":
    # Test the function when run directly
    # litellm._turn_on_debug()
    test_generate_plan()