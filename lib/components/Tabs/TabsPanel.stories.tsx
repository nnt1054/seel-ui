import type { Meta, StoryObj } from "@storybook/react-vite";

import { Tabs } from "./Tabs";

const meta = {
  tags: ["!dev"],
  title: "Navigation/TabsPanel",
  component: Tabs.Panel,
  args: {
    index: 0,
  },
  argTypes: {
    index: {
      type: {
        name: "number",
        required: true,
      },
      description:
        "Index number of Tab Panel.  Should match the `node` prop for this panel's corresponding `Tabs.Tab` component.",
    },
  },
} satisfies Meta<typeof Tabs.Panel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
