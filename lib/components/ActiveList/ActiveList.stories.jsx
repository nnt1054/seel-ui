import { useRef, useState, useContext, useEffect } from 'react';
import { fn } from 'storybook/test';

import { includeInputProvider } from '@docs/decorators';

import { ActiveList, ActiveListItem } from './ActiveList';
import { StyledActiveList, StyledActiveListItem, StyledActiveListButton } from './examples/styled';

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
    adjacentNodes: {},
    maxIndex: 4,
    initialIndex: 0,
    orientation: 'vertical',
    isReverse: false,
    disableWrap: false,
    disableJump: false,
    ref: null,
    node: 'list',
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
    maxIndex: {
      description: 'The number of active nodes in the list.  If maxIndex prop is not populated, maxIndex will default to the number of child components in the ActiveList.',
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
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal'],
      description: 'Orientation of the list items and determines how directional events will move focus around.',
      table: {
        defaultValue: {
          summary: 'vertical',
        },
      },
    },
    isReverse: {
      type: 'boolean',
      description: 'Modifies the orientation such that the 0 index node is on the bottom for `vertical` or on the right for `horizontal`.',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    disableWrap: {
      type: 'boolean',
      description: 'When navigating beyond the end or beginning of a list, controls whether or not focus will wrap around to the opposite end of the list.  If an adjacent node exists in the current direction, moving focus to the adjacent node will take priority over wrapping.',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    disableJump: {
      type: 'boolean',
      description: 'When navigating perpendicular to the list orientation, controls whether or not focus will move and jump to the beginning/end of the list.  If an adjacent node exists in the current direction, moving focus to the adjacent node will take priority over wrapping.',
      table: {
        defaultValue: {
          summary: 'false',
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

    const items = [
      { label: 'Button 0', onConfirm: () => { console.log('Button 0') } },
      { label: 'Button 1', onConfirm: () => { console.log('Button 1') } },
      { label: 'Button 2', onConfirm: () => { console.log('Button 2') } },    
    ]

    return (
      <StyledActiveList { ...props }>
        {
          items.map((item, i) => {
            return (
              <StyledActiveListItem
                key={ i }
                node={ i }
                onConfirm={ item.onConfirm }
              >{ item.label }</StyledActiveListItem>
            )
          })
        }
        <StyledActiveListButton
          key={ 3 }
          node={ 3 }
        >Hello World</StyledActiveListButton>
      </StyledActiveList>
    )
  }
};
