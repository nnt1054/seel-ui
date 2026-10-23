import type { Meta, StoryObj } from "@storybook/react-vite";

import { InputProvider } from './InputProvider';


const meta = {
  tags: ['!dev'],
  title: 'Providers/InputProvider',
  component: InputProvider,
  args: {
    inputRef: undefined,
  },
  argTypes: {
    inputRef: {
      description: "The entrypoint or top level active node to dispatch navigation events to.",
			table: {
				readonly: true,
			},
		},
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof InputProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
