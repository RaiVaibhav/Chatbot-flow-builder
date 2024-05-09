import type { Node, NodeTypes } from "reactflow";
import TextMessageNode from "./messageNode/TextMessageNode";
import { TEXT_MESSAGE_NODE } from "../../constants";

export const initialNodes = [] satisfies Node[];

export const nodeTypes = {
  [TEXT_MESSAGE_NODE]: TextMessageNode,
  // Add any of your custom nodes here!
} satisfies NodeTypes;
