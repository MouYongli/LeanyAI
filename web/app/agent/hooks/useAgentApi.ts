"use client";
import { useState } from 'react';
import type { AgentMessage, AgentPlan } from '../types';

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
      // Return a simple mock plan
      return { steps: ['Step 1: Mock', 'Step 2: Mock'] };
    }

  return { sendMessage, getPlan };
}
