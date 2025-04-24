"use client";

import React from 'react';

export default function NodeListPanel() {
  const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside className="w-40 p-2 bg-gray-100 border-r">
      <div
        className="p-2 mb-2 bg-white rounded shadow cursor-grab"
        onDragStart={(event) => onDragStart(event, 'custom')}
        draggable
      >
        Custom Node
      </div>
    </aside>
  );
}
