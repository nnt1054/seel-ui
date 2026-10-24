import type { Meta, StoryObj } from "@storybook/react-vite";

import { useActiveScrollableNode } from "./useActiveScrollableNode";

const meta = {
  tags: ["!dev"],
  title: "Hooks/useActiveScrollableNode",
  args: {
    ref: undefined,
    adjacentNodes: {},
    moveFocus: () => {},
    isActive: true,
  },
  argTypes: {
    ref: {
      type: "RefObject<>",
      description: "Ref to node and element to scroll on.",
      table: {
        readonly: true,
      },
    },
    adjacentNodes: {
      description:
        "Object denoting what nodes within the same parent, if any, are adjacent to the current node and in what direction.  See `useAdjacentNodes` hook for more information.",
      table: {
        defaultValue: {
          summary: `{}`,
        },
        readonly: true,
      },
    },
    moveFocus: {
      description:
        "Function to be called on a node name when responding to a directional navigation event.  This function is expected to be retrieved from the `useActiveNode` hook.",
      table: {
        defaultValue: {
          summary: "() => {}",
        },
      },
    },
    isActive: {
      type: "boolean",
      description: "Controls whether or not hook is actively listening for events.",
      table: {
        defaultValue: {
          summary: "true",
        },
      },
    },
  },
} satisfies Meta<typeof useActiveScrollableNode>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
