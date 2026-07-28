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
    return <StyledCheckboxInput { ...props }/>
  },
}

export const Tailwind = {
  decorators: [includeTailwind],
  render: (props) => {
    return <TailwindCheckboxInput { ...props }/>
  },
}
