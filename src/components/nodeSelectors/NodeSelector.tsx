import { TEXT_MESSAGE_NODE } from "../../constants";
import { DEvent } from "../../types";
import { NodeSelectorTypeMessage } from "./NodeSelectorTypeMessage";

export default function NodeSelector() {
  const onDragStart = (event: DEvent<HTMLDivElement>, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside className="border-l-2 p-4">
      <div
        className="dndnode input"
        onDragStart={(event) => onDragStart(event, TEXT_MESSAGE_NODE)}
        draggable
      >
        <NodeSelectorTypeMessage />
      </div>
    </aside>
  );
}
