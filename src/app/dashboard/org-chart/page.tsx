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
    Edge
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useBusinessStore } from '@/store/useBusinessStore';
import dagre from 'dagre';
import AgentNode from '@/components/dashboard/org-chart/AgentNode';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Agent } from '@/types';

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
  const { agents, departments, addAgent } = useBusinessStore();
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    if (agents.length === 0) return;

    const initialNodes: Node[] = [];
    const initialEdges: Edge[] = [];

    // CEO
    const ceo = agents.find(a => a.role === 'CEO') || agents[0];
    if (ceo) {
        initialNodes.push({
            id: ceo.id,
            type: 'agent',
            data: { ...ceo, label: ceo.name, isHead: true, morale: 95 },
            position: { x: 0, y: 0 },
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
            position: { x: 0, y: 0 },
        });

        // Link to CEO for now (simple hierarchy)
        // Ideally we check if they report to someone else, but for MVP, everyone reports to CEO
        if (ceo) {
            initialEdges.push({
                id: `e-${ceo.id}-${agent.id}`,
                source: ceo.id,
                target: agent.id,
                type: 'smoothstep',
                animated: true,
                style: { stroke: '#6366f1' },
            });
        }
    });

    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(initialNodes, initialEdges);
    // @ts-ignore
    setNodes(layoutedNodes);
    setEdges(layoutedEdges);
  }, [agents, departments, setNodes, setEdges]);

  const handleHireAgent = () => {
    const newAgentId = `agent-${Date.now()}`;
    const newAgent: Agent = {
        id: newAgentId,
        name: 'New Hire',
        role: 'Intern',
        status: 'idle',
    };
    addAgent(newAgent);
  };

  return (
    <div className="h-[calc(100vh-8rem)] w-full relative border rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-900 shadow-inner">
      <div className="absolute top-4 right-4 z-10 bg-background/80 backdrop-blur-sm p-2 rounded-lg border shadow-sm">
         <h2 className="text-xs font-bold mb-2 uppercase text-muted-foreground">Command Center</h2>
         <Button size="sm" onClick={handleHireAgent} className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            Hire Talent
         </Button>
      </div>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        attributionPosition="bottom-left"
        className="bg-slate-50 dark:bg-slate-900"
      >
        <Background gap={16} size={1} />
        <Controls />
      </ReactFlow>
    </div>
  );
}
