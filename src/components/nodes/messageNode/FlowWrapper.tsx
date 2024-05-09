import { useEffect, useState } from "react";
import ReactFlow, { ReactFlowProvider, useNodesState, Node } from "reactflow";
import "reactflow/dist/style.css";
import { nodeTypes } from "..";

export default function Flow({ initialNodes }: { initialNodes: Node[] }) {
  const [nodes, setNodes] = useNodesState(initialNodes);
  const [edges] = useState([]);

  useEffect(() => {
    setNodes(initialNodes);
  }, [initialNodes, setNodes]);

  return (
    <ReactFlowProvider>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
      ></ReactFlow>
    </ReactFlowProvider>
  );
}
