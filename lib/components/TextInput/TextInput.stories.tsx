import type { Meta, StoryObj } from "@storybook/react-vite";

import { TextInput } from "@components/TextInput/TextInput";
import { includeInputProvider, includeTailwind } from "@docs/decorators";
import { StyledTextInput } from "./examples/styled";
import { TailwindTextInput } from "./examples/tailwind";

const meta = {
  title: "Inputs/TextInput",
  component: TextInput,
  decorators: [includeInputProvider],
  args: {
    hasFocus: false,
    node: "button",
    placeholder: "placeholder",
  },
  argTypes: {
    hasFocus: {
      control: "boolean",
    },
    node: {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Styled: Story = {
  render: (props) => {
    return <StyledTextInput {...props} />;
  },
};

export const Tailwind: Story = {
  decorators: [includeTailwind],
  render: (props) => {
    return <TailwindTextInput {...props} />;
  },
};
