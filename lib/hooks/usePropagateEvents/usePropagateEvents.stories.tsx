import type { Meta, StoryObj } from "@storybook/react-vite";

import { usePropagateEvents } from "./usePropagateEvents";

const meta = {
  tags: ["!dev"],
  title: "Hooks/usePropagateEvents",
  args: {
    ref: undefined,
    childrenRef: undefined,
    activeNode: null,
    events: [],
    isActive: true,
  },
  argTypes: {
    ref: {
      type: "RefObject<>",
      table: {
        readonly: true,
      },
    },
    childrenRef: {
      type: "RefObject<>",
      description: "Object mapping child node names to their DOM elements from useActiveNode hook.",
      table: {
        readonly: true,
      },
    },
    activeNode: {
      type: "string",
      description: "Name of current active child node from useActiveNode hook.",
      table: {
        defaultValue: {
          summary: `{}`,
        },
        readonly: true,
      },
    },
    events: {
      type: "array",
      description: "List of event names to propagate through to the active child.",
      table: {
        defaultValue: {
          summary: `[]`,
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
} satisfies Meta<typeof usePropagateEvents>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
