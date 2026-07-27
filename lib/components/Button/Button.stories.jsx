import { useRef } from 'react';
import { fn } from 'storybook/test';

import { includeInputProvider, includeTailwind } from '@docs/decorators';
import { Button } from '@components/Button/Button';
import { TailwindButton } from './examples/tailwind';
import { CssButton } from './examples/css-modules';
import { StyledButton } from './examples/styled';


export default {
  title: 'Inputs/Button',
  component: Button,
  decorators: [includeInputProvider],
  args: {
    onClick: fn(),
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
    }
  },
  parameters: {
    layout: 'centered',
  },
};

export const Default = {
  render: (props) => {
    return <Button { ...props }> Button </Button>
  },
};

export const Styled = {
  render: (props) => {
    return <StyledButton { ...props }> Button </StyledButton>
  },
}

export const CssModule = {
  render: (props) => {
    return <CssButton { ...props }> Button </CssButton>
  },
}

export const Tailwind = {
  decorators: [includeTailwind],
  render: (props) => {
    return <TailwindButton { ...props }> Button </TailwindButton>
  },
}
