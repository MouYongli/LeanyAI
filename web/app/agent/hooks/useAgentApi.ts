"use client";
import { useState } from 'react';
import type { AgentMessage, AgentPlan } from '../types';
// API endpoint for workflow plan
const API_URL = process.env.NEXT_PUBLIC_AGENT_API_URL ?? 'http://127.0.0.1:8000/agent/';

export function useAgentApi() {
  const [messages, setMessages] = useState<AgentMessage[]>([]);

  async function sendMessage(text: string): Promise<AgentMessage[]> {
    const newMsg: AgentMessage = { id: Date.now().toString(), from: 'user', text };
    const botReply: AgentMessage = { id: (Date.now() + 1).toString(), from: 'agent', text: 'Mock response' };
    const updated = [...messages, newMsg, botReply];
    setMessages(updated);
    return updated;
  }

  async function getPlan(): Promise<AgentPlan> {
    // Fetch full workflow plan from backend API
    const res = await fetch(API_URL);
    console.log('useAgentApi.getPlan response:', res);
    const data = await res.json();
    console.log('useAgentApi.getPlan data:', data);
    // Return only the nodes and edges as AgentPlan
    return {
      nodes: data.nodes ?? [],
      edges: data.edges ?? [],
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
