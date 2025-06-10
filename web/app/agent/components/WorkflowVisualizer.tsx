/*
Plan for rendering workflow.json into Mermaid diagram:

1. Load or receive `plan` data containing `nodes` and `edges`.✅
   - Later: fetch or import `workflow.json` from the API or local hook.

2. Extract `nodes` array:✅
   - Each node has a unique `name` and `description`.
   - Map to Mermaid syntax: `id["label"]` where id = sanitized `name` and label = `name` or `description`.

3. Extract `edges` array:✅
   - Each edge has `source` and `target` node names.
   - Map to Mermaid arrows: `sourceId --> targetId`.

4. Build Mermaid definition string:✅
   - Start with `flowchart TD` header.
   - Append all node definitions.
   - Append all edge definitions.

5. Render diagram: ✅
   - Initialize Mermaid (auto-render on load).
   - Inject `<div class="mermaid">` block with definition.
   - Call `mermaid.contentLoaded()` to transform to SVG.

todo:todo
7. Hook into API:
   - Replace static import with hook `useAgentApi` to get plan data.
   - Trigger re-render on plan update.
*/

"use client";
import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';
import workflow from '../hooks/workflow.json';
import type { AgentPlan } from '../types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function WorkflowVisualizer({ plan }: { plan: AgentPlan | null }) {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = chartRef.current;
    if (!container) return;

    // Step 1: render all nodes from workflow.json
    const nodes = (workflow.nodes || []);
    // Header for left-to-right flow
    const header = 'flowchart TD';
    // Map each node to Mermaid syntax
    const defs = nodes.map(n => {
      const id = n.name.replace(/[^A-Za-z0-9]/g, '_');
      const label = n.name;
      return `${id}["${label}"]`;
    });
    // Step 2: include edges
    const edges = (workflow.edges || []);
    const edgeDefs = edges.map(e => {
      const src = e.source.replace(/[^A-Za-z0-9]/g, '_');
      const tgt = e.target.replace(/[^A-Za-z0-9]/g, '_');
      return `${src} --> ${tgt}`;
    });
    // Combine header, node definitions, and edge definitions
    const definition = [header, ...defs, ...edgeDefs].join('\n');

    // Initialize mermaid with auto-render enabled
    mermaid.initialize({ startOnLoad: true });
    // Insert the diagram block
    container.innerHTML = `<div class="mermaid">${definition}</div>`;
    // Trigger rendering of any Mermaid blocks in the container
    mermaid.contentLoaded();
  }, []);

  return (
    <div className="w-1/2 p-4 overflow-auto" style={{ minHeight: '100%' }}>
      <div ref={chartRef} />
    </div>
  );
}
