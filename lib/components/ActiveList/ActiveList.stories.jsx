import { useRef, useState, useContext, useEffect } from 'react';
import { fn } from 'storybook/test';

import { includeInputProvider } from '@docs/decorators';

import { ActiveList, ActiveListItem } from './ActiveList';
import { StyledActiveList, StyledActiveListItem } from './examples/styled';

import { Button } from '@components/Button/Button';
import { InputProvider } from '@providers/InputProvider/InputProvider';

import { TextInput } from '@components/TextInput/TextInput';
import { NumberInput } from '@components/NumberInput/NumberInput';
import { RangeInput } from '@components/RangeInput/RangeInput';
import { CheckboxInput } from '@components/CheckboxInput/CheckboxInput';


export default {
  title: 'Navigation/ActiveList',
  component: ActiveList,
  decorators: [includeInputProvider],
  args: {
    hasFocus: true,
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


export const Default = {
  render: (props) => {
    return (
      <ActiveList { ...props }>
        {
          ...Array(5).fill(0).map((_, i) => {
            return (
              <ActiveListItem key={ i } node={ i }> Item { i } </ActiveListItem>
            )
          })
        }
      </ActiveList>
    )
  }
};


export const Styled = {
  render: (props) => {
    return (
      <StyledActiveList { ...props }>
        {
          ...Array(5).fill(0).map((_, i) => {
            return (
              <StyledActiveListItem key={ i } node={ i }> Item { i } </StyledActiveListItem>
            )
          })
        }
      </StyledActiveList>
    )
  }
};
