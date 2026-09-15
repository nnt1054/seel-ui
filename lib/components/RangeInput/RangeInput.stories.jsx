import { useRef, useState } from 'react';
import { fn } from 'storybook/test';
import styled from 'styled-components';

import { includeInputProvider, includeTailwind } from '@docs/decorators';
import { RangeInput } from '@components/RangeInput/RangeInput';
import { StyledRangeInput } from './examples/styled';
import { TailwindRangeInput } from './examples/tailwind';


export default {
  title: 'Inputs/RangeInput',
  component: RangeInput,
  decorators: [includeInputProvider],
  args: {
    min: 0,
    max: 100,
    step: 1,
    ref: undefined,
    node: 'checkbox',
    hasFocus: true,
  },
  argTypes: {
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
    return <StyledRangeInput { ...props }/>
  },
}

export const Tailwind = {
  decorators: [includeTailwind],
  render: (props) => {
    return <TailwindRangeInput { ...props }/>
  },
}
