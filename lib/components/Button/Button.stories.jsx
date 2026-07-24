import { useRef } from 'react';
import { fn } from 'storybook/test';

import { includeTailwind } from '@docs/decorators';
import { InputProvider } from '@providers/InputProvider/InputProvider';
import { ActiveContainer } from '@components/ActiveContainer/ActiveContainer';
import { Button } from '@components/Button/Button';
import { TailwindButton } from './examples/tailwind';
import { CssButton } from './examples/css-modules';
import { StyledButton } from './examples/styled';


export default {
  title: 'Inputs/Button',
  component: Button,
  args: {
    onClick: fn(),
  },
  argTypes: {
    hasFocus: {
      control: 'boolean'
    },
  },
  parameters: {
    layout: 'centered',
  },
};

export const Default = {
  render: (props) => {
    const { hasFocus, ...others } = props;
    const ref = useRef();
    const node = 'button';
    return (
      <InputProvider inputRef={ ref }>
        <ActiveContainer ref={ ref } initial={ node } hasFocus={ hasFocus }>
          <Button
            node={ node }
            { ...others }
          > Button </Button>
        </ActiveContainer>
      </InputProvider>
    )
  },
};

export const Styled = {
  render: (props) => {
    const { hasFocus, ...others } = props;
    const ref = useRef();
    const node = 'button';
    return (
      <InputProvider inputRef={ ref }>
        <ActiveContainer ref={ ref } initial={ node } hasFocus={ hasFocus }>
          <StyledButton
            node={ node }
            { ...others }
          >Button</StyledButton>
        </ActiveContainer>
      </InputProvider>
    )
  },
}

export const CssModule = {
  render: (props) => {
    const { hasFocus, ...others } = props;
    const ref = useRef();
    const node = 'button';
    return (
      <InputProvider inputRef={ ref }>
        <ActiveContainer ref={ ref } initial={ node } hasFocus={ hasFocus }>
          <CssButton
            node={ node }
            { ...others }
          >Button</CssButton>
        </ActiveContainer>
      </InputProvider>
    )
  },
}

export const Tailwind = {
  decorators: [includeTailwind],
  render: (props) => {
    const { hasFocus, ...others } = props;
    const ref = useRef();
    const node = 'button';
    return (
      <InputProvider inputRef={ ref }>
        <ActiveContainer ref={ ref } initial={ node } hasFocus={ hasFocus }>
          <TailwindButton
            node={ node }
            { ...others }
          >Button</TailwindButton>
        </ActiveContainer>
      </InputProvider>
    )
  },
}
