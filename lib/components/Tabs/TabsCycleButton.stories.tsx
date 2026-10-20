import type { Meta, StoryObj } from "@storybook/react-vite";

import { Tabs } from "./Tabs";

const meta = {
  tags: ["!dev"],
  title: "Navigation/TabsCycleButton",
  component: Tabs.CycleButton,
  args: {
    direction: "left",
  },
  argTypes: {
    direction: {
      control: "select",
      options: ["left", "right"],
      description:
        "Direction in which to cycle the active tab.  `left` for decrementing and `right` for incrementing the active tab index regardless of the tab list orientation.",
      table: {
        defaultValue: {
          summary: "left",
        },
      },
    },
  },
} satisfies Meta<typeof Tabs.CycleButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
