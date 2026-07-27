import { useRef, useState } from 'react';
import { fn } from 'storybook/test';
import styled from 'styled-components';

import { includeInputProvider, includeTailwind } from '@docs/decorators';
import { TextInput } from '@components/TextInput/TextInput';
import { StyledTextInput } from './examples/styled';
import { TailwindTextInput } from './examples/tailwind';


export default {
  title: 'Inputs/TextInput',
  component: TextInput,
  decorators: [includeInputProvider],
  args: {
    hasFocus: false,
    node: 'button',
    placeholder: 'placeholder',
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
    return <StyledTextInput { ...props }/>
  },
}

export const Tailwind = {
  decorators: [includeTailwind],
  render: (props) => {
    return <TailwindTextInput { ...props }/>
  },
}
