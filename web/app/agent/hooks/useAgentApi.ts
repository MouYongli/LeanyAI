"use client";
import { useState } from 'react';
import type { AgentMessage } from '../types';
import { sendMessageAction, getDefinitionAction } from '../actions';

export function useAgentApi() {
  const [messages, setMessages] = useState<AgentMessage[]>([]);
  const [definition, setDefinition] = useState<string | null>(null);

  async function sendMessage(text: string): Promise<AgentMessage[]> {
    // Add working message immediately
    const workingMsg: AgentMessage = { 
      id: (Date.now() + 1).toString(), 
      from: 'agent', 
      text: "I'm working on it..." 
    };
    
    const updated = [...messages, workingMsg];
    setMessages(updated);

    try {
      // Call server action
      const result = await sendMessageAction(text);
      
      // Update messages and definition
      setMessages(prev => [...prev.slice(0, -1), ...result.messages]);
      setDefinition(result.definition);
      
      return [...messages, ...result.messages];
      
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Handle error case
      const errorMsg: AgentMessage = {
        id: workingMsg.id,
        from: 'agent', 
        text: 'Sorry, something went wrong. Please try again.'
      };
      
      const errorMessages = [...messages, errorMsg];
      setMessages(errorMessages);
      return errorMessages;
    }
  }

  async function getDefinition(): Promise<string> {
    try {
      const definition = await getDefinitionAction();
      setDefinition(definition);
      return definition;
    } catch (error) {
      console.error('Error getting definition:', error);
      return '';
    }
  }

  return { 
    messages, 
    setMessages, 
    definition, 
    setDefinition,
    sendMessage, 
    getDefinition 
  };
}
