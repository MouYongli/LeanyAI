# Agent Tab Development Plan

This document outlines the steps to build a new “Agent” tab in the application, featuring a chat interface on the left and a workflow visualizer on the right.

## 1. Route & Page Shell
- Create a new page at `/app/agent/page.tsx`.
- Use a client component with a two-column flexbox layout.
  - Left: Chat panel component.
  - Right: Workflow visualizer component.

## 2. Define Types
- Create `types.ts` in `/app/agent/`:
  ```ts
  export interface AgentMessage {
    id: string;
    from: 'user' | 'agent';
    text: string;
  }

  export interface AgentPlan {
    // Define the shape of the plan JSON here
    steps: Array<string>;
  }
  ```

## 3. Mock API Hook (Initial)
- Create `useAgentApi.ts` in `/app/agent/hooks/`.
- Mock implementation for frontend testing:
  ```ts
  import { useState } from 'react';
  import type { AgentMessage, AgentPlan } from '../types';

  export function useAgentApi() {
    const [messages, setMessages] = useState<AgentMessage[]>([]);

    async function sendMessage(text: string): Promise<AgentMessage[]> {
      const newMsg: AgentMessage = { id: Date.now().toString(), from: 'user', text };
      const botReply: AgentMessage = { id: (Date.now()+1).toString(), from: 'agent', text: 'Mock response' };
      const updated = [...messages, newMsg, botReply];
      setMessages(updated);
      return updated;
    }

    async function getPlan(msgs: AgentMessage[]): Promise<AgentPlan> {
      // Return a simple mock plan
      return { steps: ['Step 1: Mock', 'Step 2: Mock'] };
    }

    return { sendMessage, getPlan };
  }
  ```

## 4. ChatPanel Component
- File: `/app/agent/components/ChatPanel.tsx`
- Props: `messages: AgentMessage[]`, `onSend(text: string)`.
- Renders a scrollable list of messages and an input box with send button.

## 5. WorkflowVisualizer Component
- File: `/app/agent/components/WorkflowVisualizer.tsx`
- Props: `plan: AgentPlan | null`.
- Integrate Mermaid or similar to convert plan.steps into a flowchart.

## 6. Page Wiring
- In `/app/agent/page.tsx`:
  - Import `useAgentApi`, `ChatPanel`, `WorkflowVisualizer`, and types.
  - Manage state: `messages` and `plan`.
  - On send: call `sendMessage`, update `messages`; then call `getPlan`, update `plan`.

## 7. Internationalization
- Add keys in `web/i18n/en/common.ts` (and other locales):
  - `agent.title`, `agent.inputPlaceholder`, etc.

## 8. Styling
- Use Tailwind CSS for responsive two-column layout and theming.

## 9. Testing
- Manual QA: Run `pnpm dev`, navigate to `/agent`, test chat and mock plan display.
- Unit tests: Mock `useAgentApi` in component tests.

---

Once the mock flows correctly, replace the hook implementation to call the real FastAPI endpoints.





view workflow.json, use this file to demo a plan then show this in right part, which means see this as an api returned this file, and now we should represent this in right part.

use content of the key 'nodes', 'edges' to draft the plan. (like 'game_structure_design' in nodes)
you have to process the json file and extract nodes and edges, then represent it