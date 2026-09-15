import { useRef, useState } from 'react';
import { fn } from 'storybook/test';
import styled from 'styled-components';

import { includeInputProvider, includeTailwind } from '@docs/decorators';
import { CheckboxInput } from '@components/CheckboxInput/CheckboxInput';
import { StyledCheckboxInput } from './examples/styled';
import { TailwindCheckboxInput } from './examples/tailwind';


export default {
  title: 'Inputs/CheckboxInput',
  component: CheckboxInput,
  decorators: [includeInputProvider],
  args: {
    value: undefined,
    setValue: undefined,
    adjacentNodes: {},
    ref: undefined,
    node: 'checkbox',
		hasFocus: true,
  },
  argTypes: {
    value: {
      type: 'boolean',
      control: false,
      table: {
        readonly: true,
      },
    },
    setValue: {
      type: 'function',
      control: false,
      table: {
        readonly: true,
      },
    },
    adjacentNodes: {
      description: 'Object denoting what nodes within the same parent, if any, are adjacent to the current node and in what direction.  See `useAdjacentNodes` hook for more information.',
      table: {
        defaultValue: {
          summary: `{}`,
        },
        readonly: true,
      },
    },
    ref: {
			type: 'RefObject<>',
			table: {
				category: 'Node Props',
				readonly: true,
			},
		},
		node: {
			type: {
				name: 'string',
				required: true,
			},
			table: {
				category: 'Node Props',
				readonly: true,
			},
		},
		hasFocus: {
			type: 'boolean',
			description: "Controlled override for the node's `hasFocus` value.  Primarily used for setting focus value for the top level node.",
			table: {
				category: 'Node Props',
				defaultValue: {
					summary: 'null',
				},
			},
		},
  },
  parameters: {
    layout: 'centered',
  },
};

export const Default = {};

export const Styled = {
  render: (props) => {
    return <StyledCheckboxInput { ...props }/>
  },
}

export const Tailwind = {
  decorators: [includeTailwind],
  render: (props) => {
    return <TailwindCheckboxInput { ...props }/>
  },
}
