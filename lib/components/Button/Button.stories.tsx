import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import { Button } from "@components/Button/Button";
import { includeInputProvider, includeTailwind } from "@docs/decorators";
import { CssButton } from "./examples/css-modules";
import { StyledButton } from "./examples/styled";
import { TailwindButton } from "./examples/tailwind";

const meta = {
  title: "Inputs/Button",
  component: Button,
  decorators: [includeInputProvider],
  args: {
    onClick: fn(),
    adjacentNodes: {},
    ref: undefined,
    node: "button",
    hasFocus: true,
  },
  argTypes: {
    onClick: {
      type: "function",
      description: "Function to call when button is clicked or on receieving a `confirm` event.",
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
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (props) => {
    return <Button {...props}>Button</Button>;
  },
};

export const Styled: Story = {
  render: (props) => {
    return <StyledButton {...props}>Button</StyledButton>;
  },
};

export const CssModule: Story = {
  render: (props) => {
    return <CssButton {...props}>Button</CssButton>;
  },
};

export const Tailwind: Story = {
  decorators: [includeTailwind],
  render: (props) => {
    return <TailwindButton {...props}>Button</TailwindButton>;
  },
};
