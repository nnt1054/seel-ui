import type { Meta, StoryObj } from "@storybook/react-vite";

import { useActiveNode } from "./useActiveNode";

const meta = {
  tags: ["!dev"],
  title: "Hooks/useActiveNode",
} satisfies Meta<typeof useActiveNode>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
