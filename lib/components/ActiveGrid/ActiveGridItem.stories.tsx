import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import { includeInputProvider } from "@docs/decorators";
import { ActiveGrid } from "./ActiveGrid";

const meta = {
  tags: ["!dev"],
  title: "Navigation/ActiveGridItem",
  component: ActiveGrid.Item,
  decorators: [includeInputProvider],
  args: {
    onConfirm: fn(),
    ref: undefined,
    node: "griditem",
    hasFocus: true,
  },
  argTypes: {
    onConfirm: {
      description: "Function to call on receiving a `confirm` event or onClick.",
      table: {
        defaultValue: {
          summary: "() => {}",
        },
      },
    },
    ref: {
      table: {
        category: "Node Props",
        readonly: true,
      },
    },
    node: {
      type: {
        name: "string",
        required: true,
      },
      table: {
        category: "Node Props",
        readonly: true,
      },
    },
    hasFocus: {
      type: "boolean",
      description:
        "Controlled override for the node's `hasFocus` value.  Primarily used for setting focus value for the top level node.",
      table: {
        category: "Node Props",
        defaultValue: {
          summary: "null",
        },
      },
    },
  },
} satisfies Meta<typeof ActiveGrid.Item>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
