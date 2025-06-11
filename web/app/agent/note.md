useAgentApi send request:
http://127.0.0.1:8000/agent/
should return result in string, a mock data already in agent_service.py

useAgentApi accept this string response, then should give this to workflowvisualizer, then render it.
