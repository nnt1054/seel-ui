import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import { NumberInput } from "@components/NumberInput";
import { includeInputProvider, includeTailwind } from "@docs/decorators";
import { StyledNumberInput } from "./examples/styled";
import { TailwindNumberInput } from "./examples/tailwind";

const meta = {
  title: "Inputs/NumberInput",
  component: NumberInput,
  decorators: [includeInputProvider],
  args: {
    onCycleL: fn(),
    onCycleR: fn(),
    ref: undefined,
    node: "checkbox",
    hasFocus: true,
  },
  argTypes: {
    onCycleL: {
      type: "function",
      description: "Function to call on receieving a `cycleL` event.",
      table: {
        readonly: true,
      },
    },
    onCycleR: {
      type: "function",
      description: "Function to call on receieving a `cycleL` event.",
      table: {
        readonly: true,
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
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof NumberInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Styled: Story = {
  render: (props) => {
    return <StyledNumberInput {...props} />;
  },
};

export const Tailwind: Story = {
  decorators: [includeTailwind],
  render: (props) => {
    return <TailwindNumberInput {...props} />;
  },
};
