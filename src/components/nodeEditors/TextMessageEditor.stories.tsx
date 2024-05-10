import type { Meta, StoryObj } from "@storybook/react";
import TextMessageEditor from "./TextMessageEditor";
import { fn } from "@storybook/test";

const meta = {
  title: "TextMessageEditor",
  component: TextMessageEditor,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: { onChange: fn(), onExit: fn() },
} satisfies Meta<typeof TextMessageEditor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: "Message Message",
    title: "Message",
  },
};
