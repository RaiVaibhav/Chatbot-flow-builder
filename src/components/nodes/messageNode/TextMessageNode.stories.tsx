import type { Meta, StoryObj } from "@storybook/react";
import type { Node } from "reactflow";
import TextMessageNode from "./TextMessageNode";
import Flow from "./FlowWrapper";

import "reactflow/dist/style.css";
import { TEXT_MESSAGE_NODE, WHATSAPP } from "../../../constants";
import { Story } from "@storybook/blocks";

const meta = {
  title: "TextMessageNode",
  component: TextMessageNode,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (_, { args }) => {
      const initialNodes = [
        {
          id: "node-1",
          type: TEXT_MESSAGE_NODE,
          position: { x: 0, y: 0 },
          data: args.data,
        },
      ] satisfies Node[];
      return (
        <div className="p-4 w-[70vw] h-[40vh]">
          <Flow initialNodes={initialNodes}></Flow>
        </div>
      );
    },
  ],
  tags: ["autodocs"],
} satisfies Meta<typeof TextMessageNode>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  args: {
    data: {
      title: "Send Message",
      content: "something something",
      platform: WHATSAPP,
    },
  },
};
