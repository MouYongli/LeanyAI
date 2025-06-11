1. json from agent：
        {
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



    

