import type { Meta, StoryObj } from "@storybook/react";
import { NodeSelectorTypeMessage } from "./NodeSelectorTypeMessage";

const meta = {
  title: "NodeSelectorTypeMessage",
  component: NodeSelectorTypeMessage,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof NodeSelectorTypeMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    content: "Message",
  },
};
