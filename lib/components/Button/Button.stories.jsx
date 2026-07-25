import { useRef } from 'react';
import { fn } from 'storybook/test';

import { includeTailwind } from '@docs/decorators';
import { InputProvider } from '@providers/InputProvider/InputProvider';
import { ActiveContainer } from '@components/ActiveContainer/ActiveContainer';
import { Button } from '@components/Button/Button';
import { TailwindButton } from './examples/tailwind';
import { CssButton } from './examples/css-modules';
import { StyledButton } from './examples/styled';


const includeInputProvider = (Story, context) => {
  const { node, hasFocus } = context.args;
  const ref = useRef();
  return (
    <InputProvider inputRef={ ref }>
      <ActiveContainer ref={ ref } initial={ node } hasFocus={ hasFocus }>
        <Story />
      </ActiveContainer>
    </InputProvider>
  )
}

export default {
  title: 'Inputs/Button',
  component: Button,
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
  decorators: [includeInputProvider],
  render: (props) => {
    return <Button { ...props }> Button </Button>
  },
};

export const Styled = {
  decorators: [includeInputProvider],
  render: (props) => {
    return <StyledButton { ...props }> Button </StyledButton>
  },
}

export const CssModule = {
  decorators: [includeInputProvider],
  render: (props) => {
    return <CssButton { ...props }> Button </CssButton>
  },
}

export const Tailwind = {
  decorators: [includeTailwind, includeInputProvider],
  render: (props) => {
    return <TailwindButton { ...props }> Button </TailwindButton>
  },
}
