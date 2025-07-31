"use server";

import type { AgentMessage, SubTask } from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_URL = `${API_BASE_URL}/agent/`;

export interface SendMessageResult {
  messages: AgentMessage[];
  definition: string;
}

/**
 * Send message to backend and get updated workflow plan
 */
export async function sendMessageAction(text: string): Promise<SendMessageResult> {
  // Create user message
  const userMsg: AgentMessage = { 
    id: Date.now().toString(), 
    from: 'user', 
    text 
  };

  try {
    // Send message to backend API
    const response = await fetch(`${API_URL}plan`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text })
    });
    
    if (!response.ok) {
      throw new Error('Failed to send message');
    }
    
    // Backend processes and updates plan
    await response.text();
    
    // Get updated plan and convert to Mermaid definition
    const definition = await getDefinitionAction();
    
    // Create completion message
    const completedMsg: AgentMessage = {
      id: (Date.now() + 1).toString(),
      from: 'agent',
      text: 'Plan updated! Check the workflow diagram.'
    };
    
    return {
      messages: [userMsg, completedMsg],
      definition
    };
    
  } catch (error) {
    console.error('Error sending message:', error);
    
    // Create error message
    const errorMsg: AgentMessage = {
      id: (Date.now() + 1).toString(),
      from: 'agent', 
      text: 'Sorry, something went wrong. Please try again.'
    };
    
    return {
      messages: [userMsg, errorMsg],
      definition: ''
    };
  }
}

/**
 * Get workflow plan and convert to Mermaid definition
 */
export async function getDefinitionAction(): Promise<string> {
  try {
    // Fetch full workflow plan from backend API
    const res = await fetch(API_URL);
    
    if (!res.ok) {
      throw new Error('Failed to fetch plan');
    }
    
    const data = await res.json();
    
    // Convert TaskPlanningOutput format to AgentPlan format
    const nodes = data.sub_tasks?.map((task: SubTask) => ({
      name: task.name,
      description: task.description
    })) ?? [];
    
    // Create sequential edges since sub_tasks are in order
    const edges = [];
    if (data.sub_tasks && data.sub_tasks.length > 1) {
      for (let i = 0; i < data.sub_tasks.length - 1; i++) {
        edges.push({
          source: data.sub_tasks[i].name,
          target: data.sub_tasks[i + 1].name
        });
      }
    }
    
    // Build Mermaid definition
    return buildMermaidDefinition({ nodes, edges });
    
  } catch (error) {
    console.error('Error getting definition:', error);
    return '';
  }
}

/**
 * Builds a Mermaid definition string from a plan
 */
function buildMermaidDefinition(plan: { nodes: Array<{ name: string; description?: string }>; edges: Array<{ source: string; target: string }> }): string {
  const header = 'flowchart TD';
  const defs = plan.nodes.map(n => {
    const id = n.name.replace(/[^A-Za-z0-9]/g, '_');
    const label = n.name;
    return `${id}["${label}"]`;
  });
  const edgeDefs = plan.edges.map(e => {
    const src = e.source.replace(/[^A-Za-z0-9]/g, '_');
    const tgt = e.target.replace(/[^A-Za-z0-9]/g, '_');
    return `${src} --> ${tgt}`;
  });
  return [header, ...defs, ...edgeDefs].join('\n');
} 