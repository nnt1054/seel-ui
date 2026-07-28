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
    return <StyledNumberInput { ...props }/>
  },
}

export const Tailwind = {
  decorators: [includeTailwind],
  render: (props) => {
    return <TailwindNumberInput { ...props }/>
  },
}
