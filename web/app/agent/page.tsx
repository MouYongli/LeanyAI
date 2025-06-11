"use client";
import React, { useState } from 'react';
import ChatPanel from './components/ChatPanel';
import WorkflowVisualizer from './components/WorkflowVisualizer';
import { useAgentApi } from './hooks/useAgentApi';
import type { AgentMessage } from './types';

export default function AgentPage() {
  const { sendMessage, getDefinition } = useAgentApi();
  const [messages, setMessages] = useState<AgentMessage[]>([]);
  const [definition, setDefinition] = useState<string | null>(null);

  const handleSend = async (text: string) => {
    const updated = await sendMessage(text);
    setMessages(updated);
    // update diagram after sending
    const def = await getDefinition();
    setDefinition(def);
  };

  /**
   * Manually load the plan definition from API
   */
  const handleLoadPlan = async () => {
    const def = await getDefinition();
    setDefinition(def);
  };

  return (
    <div className="flex h-full overflow-hidden">
      <ChatPanel messages={messages} onSend={handleSend} />
      <div className="w-1/2 flex flex-col">
        <button
          onClick={handleLoadPlan}
          className="m-4 p-2 bg-blue-500 text-white rounded"
        >
          Load Plan
        </button>
        <WorkflowVisualizer definition={definition} />
      </div>
    </div>
  );
}
