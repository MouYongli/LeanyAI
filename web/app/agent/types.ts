// types for Agent components
export interface AgentMessage {
  id: string;
  from: 'user' | 'agent';
  text: string;
}

export interface AgentPlan {
  steps: string[];
}
