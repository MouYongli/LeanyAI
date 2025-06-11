backend is tested and all done, it accepts a message then give plan back.
now we are using the chatpanel of agent tab(page.tsx).

✅ FULLY IMPLEMENTED: Send message flow with state management

Flow:
1. User types message and clicks send
2. Frontend sends POST to /agent/plan with message
3. Backend generates plan using EvoAgentX with user's message as goal
4. Backend stores latest plan in global variable _latest_plan
5. Frontend automatically calls GET /agent/ to get updated workflow
6. WorkflowVisualizer displays the new plan as Mermaid diagram

Technical implementation:
- ✅ useAgentApi.ts: sendMessage() makes real API calls to POST /agent/plan
- ✅ ChatPanel.tsx: loading states prevent multiple submissions
- ✅ page.tsx: handleSend() auto-updates workflow diagram after message sent
- ✅ WorkflowVisualizer.tsx: shows loading indicator during updates

Backend changes:
- ✅ main.py: added POST /agent/plan endpoint with Pydantic MessageRequest model
- ✅ agent_service.py: added global _latest_plan variable for state management
- ✅ agent_service.py: generate_plan() now stores latest plan globally
- ✅ agent_service.py: added get_latest_plan() function
- ✅ main.py: GET /agent/ now returns latest user plan instead of default

TESTED: ✅ Both endpoints working correctly
- POST /agent/plan accepts {"message": "Build a weather app"} 
- GET /agent/ returns the weather app plan (not default plan)


implement  send message
- use the chatpanel to show the message
- use the chatpanel to send the message to the agent
    - like onClick={handleLoadPlan} on page with the button
- use the chatpanel to show the reply message from the agent
- update workflowvisualizer to show the plan after the agent replies