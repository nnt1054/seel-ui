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
    adjacentNodes: {},
    columns: 5,
    maxIndex: 25,
    initialIndex: 0,
    ref: null,
    node: 'grid',
    hasFocus: true,
  },
  argTypes: {
    adjacentNodes: {
      description: 'Object denoting what nodes within the same parent, if any, are adjacent to the current node and in what direction.  See `useAdjacentNodes` hook for more information.',
      table: {
        defaultValue: {
          summary: `{}`,
        },
        readonly: true,
      },
    },
    columns: {
      description: 'The number of columns (min. 1) to render the child nodes in.  The number of rows in the grid will be automatically calculated using maxIndex and columns.',
      table: {
        defaultValue: {
          summary: 1,
        },
      },
    },
    maxIndex: {
      description: 'The number of active nodes in the grid.  If maxIndex prop is not populated, maxIndex will default to the number of child components in the ActiveList.',
      table: {
        defaultValue: {
          summary: null,
        },
      },
    },
    initialIndex: {
      description: 'Index of child node to start with focus.  Changing the value of the initialIndex prop will automatically move focus to the node at the given index.',
      table: {
        defaultValue: {
          summary: 0,
        },
      },
    },
    ref: {
      type: 'RefObject<>',
      table: {
        category: 'Node Props',
        readonly: true,
      },
    },
    node: {
      type: {
        name: 'string',
        required: true,
      },
      table: {
        category: 'Node Props',
        readonly: true,
      },
    },
    hasFocus: {
      type: 'boolean',
      description: "Controlled override for the node's `hasFocus` value.  Primarily used for setting focus value for the top level node.",
      table: {
        category: 'Node Props',
        defaultValue: {
          summary: 'null',
        },
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
