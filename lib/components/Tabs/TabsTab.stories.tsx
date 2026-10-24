import type { Meta, StoryObj } from "@storybook/react-vite";

import { Tabs } from "./Tabs";

const meta = {
  tags: ["!dev"],
  title: "Navigation/TabsTab",
  component: Tabs.Tab,
  args: {
    node: 0,
  },
  argTypes: {
    node: {
      type: {
        name: "number",
        required: true,
      },
      description: "Node name as an integer corresponding to the index of Tab in the list.",
      table: {
        category: "Node Props",
        readonly: true,
      },
    },
  },
} satisfies Meta<typeof Tabs.Tab>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
