/**
 * Agent Page: 
 * page give handleSend function to ChatPanel component as onSend.
 * 
 * User enters message in ChatPanel → handleSend calls useAgentApi.sendMessage() to backend.
 * 
 * After backend processes message, automatically fetches updated workflow plan and displays it in WorkflowVisualizer.
 */
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
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (text: string) => {
    setIsLoading(true);
    try {
      const updated = await sendMessage(text);
      setMessages(updated);
      // update diagram after sending
      const def = await getDefinition();
      setDefinition(def);
    } catch (error) {
      console.error('Error in handleSend:', error);
    } finally {
      setIsLoading(false);
    }
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
      <ChatPanel messages={messages} onSend={handleSend} isLoading={isLoading} />
      <div className="w-1/2 flex flex-col">
        <button
          onClick={handleLoadPlan}
          className="m-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Load Plan
        </button>
        <WorkflowVisualizer definition={definition} isLoading={isLoading} />
      </div>
    </div>
  );
}
