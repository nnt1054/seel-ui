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
    hasFocus: false,
    node: 'button',
  },
  argTypes: {
    hasFocus: {
      control: 'boolean'
    },
    node: {
      table: {
        disable: true,
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
