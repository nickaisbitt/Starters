// src/app/dashboard/org-chart/page.tsx
'use client';

import React, { useCallback, useEffect } from 'react';
import ReactFlow, {
    Background,
    Controls,
    useNodesState,
    useEdgesState,
    ConnectionLineType,
    Node,
    Edge,
    NodeDragHandler
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useBusinessStore } from '@/store/useBusinessStore';
import dagre from 'dagre';
import AgentNode from '@/components/dashboard/org-chart/AgentNode';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Agent } from '@/types';
import { toast } from 'sonner';

const nodeTypes = {
  agent: AgentNode,
};

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const getLayoutedElements = (nodes: Node[], edges: Edge[]) => {
  dagreGraph.setGraph({ rankdir: 'TB' });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: 220, height: 150 });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const layoutedNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    return {
        ...node,
        position: {
            x: nodeWithPosition.x - 110, // center offset
            y: nodeWithPosition.y - 75,
        },
        targetPosition: 'top',
        sourcePosition: 'bottom',
    };
  });

  return { nodes: layoutedNodes, edges };
};

export default function OrgChartPage() {
  const { agents, departments, addAgent, nodePositions, updateNodePosition } = useBusinessStore();
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    if (agents.length === 0) return;

    const initialNodes: Node[] = [];
    const initialEdges: Edge[] = [];

    // CEO
    const ceo = agents.find(a => a.role.includes('Chief') || a.role === 'CEO') || agents[0];
    if (ceo) {
        initialNodes.push({
            id: ceo.id,
            type: 'agent',
            data: { ...ceo, label: ceo.name, isHead: true, morale: 95 },
            position: nodePositions[ceo.id] || { x: 0, y: 0 },
            draggable: true
        });
    }

    // Other Agents (Department Heads & Staff)
    agents.forEach(agent => {
        if (agent.id === ceo?.id) return;

        // Find if this agent is a department head
        const dept = departments.find(d => d.headAgentId === agent.id);
        const morale = Math.floor(Math.random() * (100 - 60) + 60);

        initialNodes.push({
            id: agent.id,
            type: 'agent',
            data: { ...agent, label: agent.name, isHead: false, morale },
            position: nodePositions[agent.id] || { x: 0, y: 0 },
            draggable: true
        });

        // Link to CEO for now (simple hierarchy)
        if (ceo) {
            initialEdges.push({
                id: `e-${ceo.id}-${agent.id}`,
                source: ceo.id,
                target: agent.id,
                type: 'smoothstep',
                animated: true,
                style: { stroke: '#000', strokeWidth: 2, strokeDasharray: '5,5' }, // Doodle style edges
            });
        }
    });

    // Only apply dagre layout if we don't have saved positions
    // This logic is tricky: if we have positions for *some* nodes but not all (new hires),
    // we should probably re-layout. For MVP, let's say if we have >0 positions, we trust them.
    // Or we can just apply layout to nodes without positions.

    if (Object.keys(nodePositions).length === 0) {
        const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(initialNodes, initialEdges);
        // @ts-ignore
        setNodes(layoutedNodes);
        setEdges(layoutedEdges);
    } else {
        // Use initial nodes which already have saved positions
        setNodes(initialNodes);
        setEdges(initialEdges);
    }

  }, [agents, departments, setNodes, setEdges]); // Removed nodePositions from dependency to avoid loop

  const handleHireAgent = () => {
    const newAgentId = `agent-${Date.now()}`;
    const newAgent: Agent = {
        id: newAgentId,
        name: 'New Intern',
        role: 'Intern',
        status: 'idle',
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${Math.random()}`
    };
    addAgent(newAgent);
    toast.success("New Intern Hired!", { description: "Their morale is high, for now." });
  };

  const onNodeDragStop: NodeDragHandler = (event, node) => {
      updateNodePosition(node.id, node.position);
  };

  return (
    <div className="h-[calc(100vh-8rem)] w-full relative border-2 border-black rounded-sm overflow-hidden bg-[url('https://www.transparenttextures.com/patterns/notebook.png')] bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
      <div className="absolute top-4 right-4 z-10 p-2 rounded-sm border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rotate-1">
         <h2 className="text-xs font-bold mb-2 uppercase tracking-widest font-architects">HR Dept</h2>
         <Button size="sm" onClick={handleHireAgent} className="w-full text-xs h-8">
            <Plus className="mr-2 h-3 w-3" />
            Recruit ($500)
         </Button>
      </div>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeDragStop={onNodeDragStop}
        nodeTypes={nodeTypes}
        fitView
        attributionPosition="bottom-left"
        className="bg-transparent"
      >
        <Background gap={20} size={1} color="#000" style={{ opacity: 0.1 }} />
        <Controls className="doodle-button" />
      </ReactFlow>
    </div>
  );
}
