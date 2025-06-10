"use client";
import React, { useState, useEffect } from 'react';
import ChatPanel from './components/ChatPanel';
import WorkflowVisualizer from './components/WorkflowVisualizer';
import { useAgentApi } from './hooks/useAgentApi';
import type { AgentMessage, AgentPlan } from './types';

export default function AgentPage() {
  const { sendMessage, getPlan } = useAgentApi();
  const [messages, setMessages] = useState<AgentMessage[]>([]);
  const [plan, setPlan] = useState<AgentPlan | null>(null);

  useEffect(() => {
    getPlan().then(p => setPlan(p));
  }, []);

  const handleSend = async (text: string) => {
    const updated = await sendMessage(text);
    setMessages(updated);
    const p = await getPlan();
    setPlan(p);
  };

  return (
    <div className="flex h-full overflow-hidden">
      <ChatPanel messages={messages} onSend={handleSend} />
      <WorkflowVisualizer plan={plan} />
    </div>
  );
}
