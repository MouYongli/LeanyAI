"use client";
import { useState } from 'react';
import type { AgentMessage, AgentPlan, TaskPlanningOutput } from '../types';
// API endpoint for workflow plan
const API_URL = process.env.NEXT_PUBLIC_AGENT_API_URL ?? 'http://127.0.0.1:8000/agent/';

export function useAgentApi() {
  const [messages, setMessages] = useState<AgentMessage[]>([]);

  async function sendMessage(text: string): Promise<AgentMessage[]> {
    // Add user message immediately
    const newMsg: AgentMessage = { id: Date.now().toString(), from: 'user', text };
    const workingMsg: AgentMessage = { 
      id: (Date.now() + 1).toString(), 
      from: 'agent', 
      text: "I'm working on it..." 
    };
    
    const updated = [...messages, newMsg, workingMsg];
    setMessages(updated);

    try {
      // Send message to backend API
      const response = await fetch(`${API_URL}plan`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      });
      
      if (!response.ok) throw new Error('Failed to send message');
      
      // Backend processes and updates plan
      const result = await response.text();
      
      // Replace working message with completion
      const completedMsg: AgentMessage = {
        id: workingMsg.id,
        from: 'agent',
        text: 'Plan updated! Check the workflow diagram.'
      };
      
      const finalMessages = [...messages, newMsg, completedMsg];
      setMessages(finalMessages);
      return finalMessages;
      
    } catch (error) {
      console.error('Error sending message:', error);
      // Handle error case
      const errorMsg: AgentMessage = {
        id: workingMsg.id,
        from: 'agent', 
        text: 'Sorry, something went wrong. Please try again.'
      };
      const errorMessages = [...messages, newMsg, errorMsg];
      setMessages(errorMessages);
      return errorMessages;
    }
  }

  async function getPlan(): Promise<AgentPlan> {
    // Fetch full workflow plan from backend API
    const res = await fetch(API_URL);
    console.log('useAgentApi.getPlan response:', res);
    const data: TaskPlanningOutput = await res.json();
    console.log('useAgentApi.getPlan data:', data);
    
    // Convert TaskPlanningOutput format to AgentPlan format
    const nodes = data.sub_tasks?.map(task => ({
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
    
    // Return in AgentPlan format for compatibility
    return {
      nodes,
      edges,
    };
  }

  /**
   * Builds a Mermaid definition string from a plan.
   */
  function buildDefinition(plan: AgentPlan): string {
    // use Mermaid flowchart keyword for directional charts
    // use Mermaid flowchart keyword for directional flowcharts
    const header = 'flowchart TD';
    const defs = plan.nodes.map(n => {
      const id = n.name.replace(/[^A-Za-z0-9]/g, '_');
      // use simple name as label to avoid syntax errors
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

  /**
   * Returns the Mermaid definition for the current workflow.
   */
  async function getDefinition(): Promise<string> {
    const plan = await getPlan();
    return buildDefinition(plan);
  }

  return { sendMessage, getPlan, getDefinition };
}
