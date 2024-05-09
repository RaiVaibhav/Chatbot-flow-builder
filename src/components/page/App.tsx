import { useCallback, useEffect, useState, MouseEvent as ReactMouseEvent } from "react";
import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  addEdge,
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
  MarkerType,
  updateEdge,
  Edge,
  Connection,
  OnConnect,
  ReactFlowInstance,
  Node,
  useReactFlow,
} from "reactflow";

import "reactflow/dist/style.css";

import { initialNodes, nodeTypes } from "../nodes";
import { initialEdges, edgeTypes } from "../../edges";
import { DEvent } from "../../types";
import NodeSelector from "../nodeSelectors/NodeSelector";
import { Header } from "../header/Header";
import { FLOW_KEY, WHATSAPP } from "../../constants";
import NodeEditor from "../nodeEditors/nodeEditor";
import { Toast } from "../toast/Toast";

function AppWrapper() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance | null>(null);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const { setViewport } = useReactFlow();
  const [toast, setToast] = useState<{ type: string; message: string } | null>(
    null
  );
  const onEdgeUpdate = useCallback(
    (oldEdge: Edge, newConnection: Connection) =>
      setEdges((els) => updateEdge(oldEdge, newConnection, els)),
    [setEdges]
  );
  const onConnect: OnConnect = useCallback(
    (connection) =>
      setEdges((edges) =>
        addEdge(
          {
            ...connection,
            updatable: "target",
            markerEnd: {
              type: MarkerType.ArrowClosed,
            },
          },
          edges
        )
      ),
    [setEdges]
  );

  const onDragOver = useCallback((event: DEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: DEvent<HTMLDivElement>) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");

      if (typeof type === "undefined" || !type) {
        return;
      }

      if (reactFlowInstance) {
        const position = reactFlowInstance.screenToFlowPosition({
          x: event.clientX,
          y: event.clientY,
        });
        const id = Date.now().toString();
        const newNode = {
          id: id,
          type,
          position,
          data: {
            title: "Send Message",
            content: `Text Message`,
            platform: WHATSAPP,
          },
        };
        setNodes((nds) => nds.concat(newNode));
      }
    },
    [reactFlowInstance, setNodes]
  );

  const onExit = () => setSelectedNode(null);

  const handleNodeContentChange = useCallback(
    (c: { [key: string]: string }) => {
      if (selectedNode) {
        setNodes((nds) =>
          nds.map((node) => {
            if (node.id === selectedNode.id) {
              node.data = {
                ...node.data,
                ...c,
              };
            }
            return node;
          })
        );
      }
    },
    [selectedNode, setNodes]
  );

  const handleElementClick = (_: ReactMouseEvent, node: Node) => {
    setSelectedNode(node);
  };

  const validateSubmit = () => {
    const nodesWithEmptyTargets = nodes.filter(
      (node: Node) => !edges.some((edge) => edge.target === node.id)
    );

    if (nodes.length > 1 && nodesWithEmptyTargets.length > 1) {
      return false;
    }
    return true;
  };

  const onSave = () => {
    const isValid = validateSubmit();
    if (isValid) {
      onSaveLocally();
      setToast({
        type: "success",
        message: "Saved",
      });
    } else {
      setToast({
        type: "error",
        message: "Cannot save Flow",
      });
    }
    setTimeout(() => {
      setToast(null);
    }, 5000);
  };

  const onSaveLocally = useCallback(() => {
    if (reactFlowInstance) {
      const flow = reactFlowInstance.toObject();
      localStorage.setItem(FLOW_KEY, JSON.stringify(flow));
    }
  }, [reactFlowInstance]);

  const onRestoreFromLocal = useCallback(() => {
    const restoreFlow = async () => {
      const flow = JSON.parse(localStorage.getItem(FLOW_KEY) || "");

      if (flow) {
        const { x = 0, y = 0, zoom = 1 } = flow.viewport;
        setNodes(flow.nodes || []);
        setEdges(flow.edges || []);
        setViewport({ x, y, zoom });
      }
    };

    restoreFlow();
  }, [setEdges, setNodes, setViewport]);

  useEffect(() => {
    onRestoreFromLocal();
  }, [onRestoreFromLocal]);

  return (
    <div className="h-screen grid grid-rows-[55px_1fr] relative">
      {toast && <Toast {...toast} />}
      <Header onSave={onSave} />
      <div className="grid grid-cols-[minmax(0px,_1fr)_400px] ">
        <ReactFlow
          nodes={nodes}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          edges={edges}
          edgeTypes={edgeTypes}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onEdgeUpdate={onEdgeUpdate}
          onNodeClick={handleElementClick}
          onInit={(instance: ReactFlowInstance) =>
            setReactFlowInstance(instance)
          }
          onNodesDelete={() => setSelectedNode(null)}
          onDrop={onDrop}
          onDragOver={onDragOver}
          fitView
        >
          <Background />
          <MiniMap />
          <Controls />
        </ReactFlow>
        {selectedNode ? (
          <NodeEditor
            key={selectedNode.id}
            node={Object.assign({}, selectedNode)}
            onExit={onExit}
            onChange={handleNodeContentChange}
          />
        ) : (
          <NodeSelector />
        )}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ReactFlowProvider>
      <AppWrapper />
    </ReactFlowProvider>
  );
}
