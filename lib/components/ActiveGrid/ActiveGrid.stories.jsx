import { useRef, useState, useContext, useEffect } from 'react';
import { fn } from 'storybook/test';

import { includeInputProvider } from '@docs/decorators';
import { ActiveGrid } from './ActiveGrid';
import { ActiveList } from '@components/ActiveList/ActiveList';
import { InputProvider } from '@providers/InputProvider/InputProvider';
import { StyledActiveGrid, StyledActiveGridItem } from './examples/styled';


export default {
  title: 'Navigation/ActiveGrid',
  component: ActiveGrid,
  decorators: [includeInputProvider],
  args: {
    hasFocus: true,
    node: 'button',
    columns: 5,
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

export const Styled = {
  render: (props) => {
    return (
        <StyledActiveGrid
          { ...props }
        >
          {
            Array(25).fill(0).map((_, i) => {
              return (
                <StyledActiveGridItem key={ i } node={ i }> { i } </StyledActiveGridItem>
              )
            })
          }
        </StyledActiveGrid>
    )
  }
};
