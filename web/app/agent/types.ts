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

// New types for TaskPlanningOutput format
export interface Parameter {
  class_name: string;
  name: string;
  type: string;
  description: string;
  required: boolean;
}

export interface SubTask {
  class_name: string;
  name: string;
  description: string;
  inputs: Parameter[];
  outputs: Parameter[];
  reason: string;
  agents: unknown;
  action_graph: unknown;
  status: string;
}

export interface TaskPlanningOutput {
  class_name: string;
  sub_tasks: SubTask[];
}
