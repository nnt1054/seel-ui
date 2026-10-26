import type { Meta, StoryObj } from "@storybook/react-vite";

import { RangeInput } from "@components/RangeInput";
import { includeInputProvider, includeTailwind } from "@docs/decorators";
import { StyledRangeInput } from "./examples/styled";
import { TailwindRangeInput } from "./examples/tailwind";

const meta = {
  title: "Inputs/RangeInput",
  component: RangeInput,
  decorators: [includeInputProvider],
  args: {
    value: undefined,
    setValue: undefined,
    min: 0,
    max: 100,
    step: 1,
    adjacentNodes: {},
    ref: undefined,
    node: "checkbox",
    hasFocus: true,
  },
  argTypes: {
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
} satisfies Meta<typeof RangeInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Styled: Story = {
  render: (props) => {
    return <StyledRangeInput {...props} />;
  },
};

export const Tailwind: Story = {
  decorators: [includeTailwind],
  render: (props) => {
    return <TailwindRangeInput {...props} />;
  },
};
