"use client";
import React, { useState, useCallback, useRef } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Node,
  Edge,
  Connection,
  OnNodesChange,
  OnEdgesChange,
  ReactFlowInstance
} from 'reactflow';
import CustomNode from './nodes';
import Toolbar from './Toolbar';
import NodeListPanel from './NodeListPanel';
import 'reactflow/dist/style.css';

const nodeTypes = { custom: CustomNode };
const initialNodes: Node[] = [
  { id: '1', position: { x: 50, y: 50 }, data: { label: 'Custom Node' }, type: 'custom' }
];
const initialEdges: Edge[] = [];

export default function WorkflowPanel() {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);

  // annotate callbacks with proper types
  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );
  const onConnect = useCallback(
    (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
    []
  );
  const addNode = useCallback(() => {
    setNodes((nds) => [
      ...nds,
      {
        id: `${Date.now()}`,
        position: { x: 100, y: 100 },
        data: { label: `Node ${nds.length + 1}` },
        type: 'custom'
      }
    ]);
  }, []);

  // handle drag over
  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  // handle drop to add node
  const onDrop = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    if (!reactFlowWrapper.current || !reactFlowInstance) return;
    const bounds = reactFlowWrapper.current.getBoundingClientRect();
    const type = event.dataTransfer.getData('application/reactflow');
    if (!type) return;
    const position = reactFlowInstance.project({
      x: event.clientX - bounds.left,
      y: event.clientY - bounds.top
    });
    const newNode: Node = {
      id: `${Date.now()}`,
      type,
      position,
      data: { label: `${type} node` }
    };
    setNodes((nds) => nds.concat(newNode));
  }, [reactFlowInstance]);

  return (
    <ReactFlowProvider>
      {/* toolbar for adding nodes */}
      <Toolbar onAddNode={addNode} />
      <div className="flex">
        {/* draggable node list */}
        <NodeListPanel />
        {/* reactflow wrapper with drop handlers */}
        <div
          ref={reactFlowWrapper}
          className="flex-1"
          onDragOver={onDragOver}
          onDrop={onDrop}
          style={{ height: 500, border: '1px solid #ccc' }}
        >
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            onInit={(instance) => setReactFlowInstance(instance)}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
          />
        </div>
      </div>
    </ReactFlowProvider>
  );
}