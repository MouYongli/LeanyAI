"use client";
import React from 'react';
import WorkflowPanel from '../components/workflows';

export default function StudioPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Studio</h1>
      <WorkflowPanel />
    </div>
  );
}
