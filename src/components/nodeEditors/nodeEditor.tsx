import { Node } from "reactflow";
import TextMessageEditor from "./TextMessageEditor";

type Props = {
  node: Node;
  onChange: (c: { [key: string]: string }) => void;
  onExit: () => void;
};

export default function NodeEditor({ node, onExit, onChange }: Props) {
  return (
    <aside className="border-l-2">
      <TextMessageEditor {...node.data} onChange={onChange} onExit={onExit} />
    </aside>
  );
}
