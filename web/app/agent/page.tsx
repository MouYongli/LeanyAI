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

export default function AgentPage() {
  const { 
    messages, 
    definition,
    sendMessage
  } = useAgentApi();
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (text: string) => {
    setIsLoading(true);
    try {
      await sendMessage(text);
      // Definition is automatically updated by the hook
    } catch (error) {
      console.error('Error in handleSend:', error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Send default message to generate a plan
   */
  const handleLoadPlan = async () => {
    await handleSend("开发一个在线聊天应用");
  };

  return (
    <div className="flex h-full overflow-hidden">
      <ChatPanel messages={messages} onSend={handleSend} isLoading={isLoading} />
      
      <div className="w-1/2 flex flex-col">
        <button
          onClick={handleLoadPlan}
          className="m-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          生成聊天应用计划
        </button>
        <WorkflowVisualizer definition={definition} isLoading={isLoading} />
      </div>
    </div>
  );
}
