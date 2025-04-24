"use client";
import React from 'react';
import { NodeProps } from 'reactflow';

export default function CustomNode({ data }: NodeProps) {
  return (
    <div style={{ padding: 8, border: '1px solid #888', borderRadius: 4, background: '#fff' }}>
      {data.label}
    </div>
  );
}