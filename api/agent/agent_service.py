"""
pip install git+https://github.com/EvoAgentX/EvoAgentX.git
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

In this module, we will demonstrate how to use the EvoAgentX library to generate workflows.
we will create a demo to use the EvoAgentX library to generate workflows. When it succeeds, then connect it to the FastAPI application.

we are using uv and .venv to manage the virtual environment and run the application.
1. install EvoAgentX library.
2. test the function "generate_workflow"

from dotenv import load_dotenv  # ensure we can load .env variables
"""

import os
import json
from dotenv import load_dotenv

# Load environment variables
load_dotenv()


def generate_plan() -> dict:
    # """Generate a workflow graph from a goal using EvoAgentX."""
    # wf = WorkFlowGenerator(llm=llm)
    # inter_dir = os.path.join("examples", "output", "intermediate")
    # os.makedirs(inter_dir, exist_ok=True)

    # # Step 1: generate plan
    # plan = wf.generate_plan(goal=goal)
    # return plan
    result = {
                "class_name": "WorkFlowGraph",
                "goal": "Generate html code for the Tetris game that can be played in the browser.",
                "nodes": [
                    {
                        "class_name": "WorkFlowNode",
                        "name": "game_structure_design",
                        "description": "Create an outline of the Tetris game's structure, including the main game area, score display, and control buttons.",
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
                                "name": "html_structure",
                                "type": "string",
                                "description": "The basic HTML structure outlining the game area, score display, and buttons.",
                                "required": True
                            }
                        ],
                        "reason": "This sub-task establishes the foundational layout required for a functional Tetris game in HTML.",
                        "agents": [
                            {
                                "name": "tetris_game_structure_agent",
                                "description": "This agent creates the basic HTML structure for the Tetris game, including the game area, score display, and control buttons based on the user's goal.",
                                "inputs": [
                                    {
                                        "name": "goal",
                                        "type": "string",
                                        "description": "The user's goal in textual format.",
                                        "required": True
                                    }
                                ],
                                "outputs": [
                                    {
                                        "name": "html_structure",
                                        "type": "string",
                                        "description": "The basic HTML structure outlining the game area, score display, and buttons.",
                                        "required": True
                                    }
                                ],
                                "prompt": "### Objective\nCreate the basic HTML structure for a Tetris game, incorporating the main game area, score display, and control buttons based on the user's goal.\n\n### Instructions\n1. Read the user's goal: <input>{goal}</input>\n2. Design the main game area where the Tetris pieces will fall.\n3. Create an element to display the current score.\n4. Include buttons to control the game (e.g., start, pause, reset).\n5. Assemble these elements into a coherent HTML structure that can be utilized in a web environment.\n6. Output the generated HTML structure.\n\n### Output Format\nYour final output should ALWAYS in the following format:\n\n## Thought\nBriefly explain the reasoning process for creating the HTML structure of the Tetris game.\n\n## html_structure\nThe basic HTML structure outlining the game area, score display, and buttons."
                            }
                        ],
                        "status": "pending"
                    },
                    {
                        "class_name": "WorkFlowNode",
                        "name": "style_application",
                        "description": "Add CSS styles to the HTML structure for visual aesthetics and layout to make the game look visually appealing.",
                        "inputs": [
                            {
                                "class_name": "Parameter",
                                "name": "html_structure",
                                "type": "string",
                                "description": "The basic HTML structure of the Tetris game.",
                                "required": True
                            }
                        ],
                        "outputs": [
                            {
                                "class_name": "Parameter",
                                "name": "styled_game",
                                "type": "string",
                                "description": "The styled HTML code that includes CSS for the Tetris game.",
                                "required": True
                            }
                        ],
                        "reason": "Styling is essential for enhancing the user experience and ensuring the game is visually organized and engaging.",
                        "agents": [
                            {
                                "name": "css_style_application_agent",
                                "description": "This agent applies CSS styles to the given HTML structure to create a visually appealing layout for the Tetris game.",
                                "inputs": [
                                    {
                                        "name": "html_structure",
                                        "type": "string",
                                        "description": "The basic HTML structure of the Tetris game.",
                                        "required": True
                                    }
                                ],
                                "outputs": [
                                    {
                                        "name": "styled_game",
                                        "type": "string",
                                        "description": "The styled HTML code that includes CSS for the Tetris game.",
                                        "required": True
                                    }
                                ],
                                "prompt": "### Objective\nEnhance the provided HTML structure by applying CSS styles to create a visually appealing layout for the Tetris game.\n\n### Instructions\n1. Begin with the provided HTML structure: <input>{html_structure}</input>\n2. Analyze the elements in the HTML to decide the appropriate CSS styles that will enhance its appearance.\n3. Write CSS styles that cater to visual aesthetics such as colors, fonts, borders, and spacing.\n4. Integrate the CSS styles into the HTML structure properly.\n5. Ensure the output is a well-formatted HTML document that includes the applied CSS styles.\n\n### Output Format\nYour final output should ALWAYS in the following format:\n\n## Thought\nBriefly explain the reasoning process for achieving the objective.\n\n## styled_game\nThe styled HTML code that includes CSS for the Tetris game."
                            }
                        ],
                        "status": "pending"
                    }
                ],
                "edges": [
                    {
                        "class_name": "WorkFlowEdge",
                        "source": "game_structure_design",
                        "target": "style_application",
                        "priority": 0
                    }
                ],
                "graph": None
            }


    return result