import { useRef, useState } from 'react';
import { fn } from 'storybook/test';
import styled from 'styled-components';

import { InputProvider } from '@providers/InputProvider/InputProvider';
import { ActiveContainer } from '@components/ActiveContainer/ActiveContainer';
import { Button } from '@components/Button/Button';
import styles from './Button.module.css';


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


const StyledButton = styled(Button)`
  &[data-focused] {
    background-color: yellow;
  }
`
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

const CssButton = (props) => {
  return (
    <Button
      className={styles.Button}
      {...props}
    >Button</Button>
  )
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
