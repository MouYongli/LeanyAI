"use client";
import React, { useState, FormEvent, useRef, useEffect } from 'react';
import type { AgentMessage } from '../types';

interface ChatPanelProps {
  messages: AgentMessage[];
  onSend: (text: string) => void;
}

export default function ChatPanel({ messages, onSend }: ChatPanelProps) {
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSend(input.trim());
      setInput('');
    }
  };

  return (
    <div className="w-1/2 border-r p-4 flex flex-col">
      <div className="flex-grow overflow-auto mb-4">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`my-2 p-2 rounded ${msg.from === 'user' ? 'bg-blue-100 text-right' : 'bg-gray-100 text-left'}`}
          >
            {msg.text}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <form onSubmit={handleSubmit} className="flex">
        <input
          className="flex-grow border rounded-l px-2 py-1"
          type="text"
          value={input}
          placeholder="Type a message..."
          onChange={e => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 rounded-r"
        >
          Send
        </button>
      </form>
    </div>
  );
}
