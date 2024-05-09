import { Handle, NodeProps, Position } from "reactflow";
import IconMap from "../../../assets/index";
import { WHATSAPP } from "../../../constants";
import { memo, useMemo } from "react";

//Todo: Add more platform type, like Messenger
type PlatformType = typeof WHATSAPP;

type DataProps = {
  title: string;
  content: string;
  platform: PlatformType;
};

/** Composition of the node */
type MessageNode = NodeProps<DataProps>;

/**
 * Primary UI component for text node
 */
const MessageNode = ({ data, selected }: MessageNode) => {
  const Icon = useMemo(() => {
    return IconMap[data.platform];
  }, [data.platform]);

  return (
    <div
      className={`w-36 border rounded-md ${selected ? "border-indigo-600" : "border-white"}`}
    >
      <Handle
        type="target"
        className="w-[3px] h-[3px]"
        position={Position.Left}
        isConnectable={true}
      />
      <div className="flex flex-col shadow-lg rounded-[inherit]">
        <div className="flex justify-between bg-[#a1e4e7] text-[8px] font-bold rounded-t-md py-[2px] px-2">
          <div>
            <h5>
              <span>💬</span> {data.title}
            </h5>
          </div>
          {Icon && (
            <div className="flex items-center rounded-full bg-white w-3 h-3 p-[3px] justify-center">
              <Icon />
            </div>
          )}
        </div>

        <div className="text-[8px] min-h-6 p-2 bg-white rounded-b-md">
          {data.content}
        </div>
      </div>
      <Handle
        className="w-[3px] h-[3px]"
        type="source"
        position={Position.Right}
        isConnectable={true}
      />
    </div>
  );
};
const TextMessageNode = memo(MessageNode);
export default TextMessageNode;
