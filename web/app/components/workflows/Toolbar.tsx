"use client";
import React from 'react';

interface ToolbarProps {
  onAddNode: () => void;
}

export default function Toolbar({ onAddNode }: ToolbarProps) {
  return (
    <div className="mb-2">
      <button
        onClick={onAddNode}
        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Add Node
      </button>
    </div>
  );
}
