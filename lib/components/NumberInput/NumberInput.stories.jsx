import { useRef, useState } from 'react';
import { fn } from 'storybook/test';
import styled from 'styled-components';

import { includeInputProvider, includeTailwind } from '@docs/decorators';
import { NumberInput } from '@components/NumberInput/NumberInput';
import { StyledNumberInput } from './examples/styled';
import { TailwindNumberInput } from './examples/tailwind';


export default {
  title: 'Inputs/NumberInput',
  component: NumberInput,
  decorators: [includeInputProvider],
  args: {
    onCycleL: fn(),
    onCycleR: fn(),
    ref: undefined,
    node: 'checkbox',
    hasFocus: true,
  },
  argTypes: {
    onCycleL: {
      type: 'function',
      description: "Function to call on receieving a `cycleL` event.",
      table: {
        readonly: true,
      },
    },
    onCycleR: {
      type: 'function',
      description: "Function to call on receieving a `cycleL` event.",
      table: {
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
    return <StyledNumberInput { ...props }/>
  },
}

export const Tailwind = {
  decorators: [includeTailwind],
  render: (props) => {
    return <TailwindNumberInput { ...props }/>
  },
}
