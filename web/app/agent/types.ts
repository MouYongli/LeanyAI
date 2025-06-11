// types for Agent components
export interface AgentMessage {
  id: string;
  from: 'user' | 'agent';
  text: string;
}

export interface AgentNode {
  /** Unique node name */
  name: string;
  /** Optional description of the node */
  description?: string;
}

export interface AgentEdge {
  /** Source node name */
  source: string;
  /** Target node name */
  target: string;
}

export interface AgentPlan {
  /** List of plan nodes */
  nodes: AgentNode[];
  /** List of plan edges */
  edges: AgentEdge[];
}
