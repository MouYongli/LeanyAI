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
// ...existing imports...
import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

interface Props {
  /** Mermaid definition DSL string to render */
  definition: string | null;
  /** Loading state indicator */
  isLoading?: boolean;
}

/**
 * Renders a Mermaid flowchart from the provided plan.
 */
export default function WorkflowVisualizer({ definition, isLoading = false }: Props) {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = chartRef.current;
    if (!container) return;
    // clear previous content
    container.innerHTML = '';
    if (!definition) return;

    // debug: log the Mermaid DSL before rendering
    console.log('Mermaid definition:', definition);

    // create a mermaid block and set its text safely
    const graphDiv = document.createElement('div');
    graphDiv.className = 'mermaid';
    graphDiv.textContent = definition;

    // append and render only this block
    container.appendChild(graphDiv);
    mermaid.initialize({ startOnLoad: false });
    mermaid.init(undefined, graphDiv);
  }, [definition]);

  return (
    <div className="w-1/2 p-4 overflow-auto" style={{ minHeight: '100%' }} ref={chartRef}>
      {isLoading && (
        <div className="flex items-center justify-center h-32">
          <div className="text-gray-500">Updating workflow...</div>
        </div>
      )}
    </div>
  );
}
