import { useRef, useState, useContext, useEffect } from 'react';

import { includeInputProvider } from '@docs/decorators';
import { Tabs } from './Tabs';

import { StyledTabs, StyledList, StyledCycleButtons, StyledTab } from './examples/styled';

import { ActiveScrollableNode } from '@components/ActiveScrollableNode/ActiveScrollableNode';
import { StyledActiveScrollableNode } from '@components/ActiveScrollableNode/examples/styled';

import { ActiveList, ActiveListItem } from '@components/ActiveList/ActiveList';
import { StyledActiveList, StyledActiveListItem } from '@components/ActiveList/examples/styled';

import { ActiveGrid } from '@components/ActiveGrid/ActiveGrid';
import { StyledActiveGrid, StyledActiveGridItem } from '@components/ActiveGrid/examples/styled';

import { KeybindsContext } from '@providers/InputProvider/InputProvider';


export default {
  title: 'Navigation/Tabs',
  component: Tabs,
  decorators: [includeInputProvider],
  args: {
    adjacentNodes: {},
    maxIndex: 3,
    events: undefined,
    ref: undefined,
    node: 'tabs',
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
      description: 'The number of panels in the Tabs component.',
      table: {
        defaultValue: {
          summary: null,
        },
      },
    },
    events: {
      type: 'array',
      description: 'List of event names to propagate through to the active child.',
      control: false,
      table: {
        defaultValue: {
          summary: `['up', 'down', 'left', 'right', 'confirm']`,
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

export const Default = {
  render: (props) => {
    return (
        <Tabs { ...props } maxIndex={ 3 }>
          <Tabs.List>
            <Tabs.CycleButton direction={ 'left' }> L </Tabs.CycleButton>
            <Tabs.Tab node={ 0 }> Tab 1 </Tabs.Tab>
            <Tabs.Tab node={ 1 }> Tab 2 </Tabs.Tab>
            <Tabs.Tab node={ 2 }> Tab 3 </Tabs.Tab>
            <Tabs.CycleButton direction={ 'right' }> R </Tabs.CycleButton>
          </Tabs.List>

          <Tabs.Panel index={ 0 }>
            <ActiveScrollableNode>
  						Lorem ipsum dolor sit amet.
  						Ut autem dolores et quasi itaque ut molestiae ipsum.
  						Est quaerat aliquam id sapiente ullam non dolores odio.
  						...
  					</ActiveScrollableNode>
          </Tabs.Panel>

          <Tabs.Panel index={ 1 }>
            <ActiveList>
              <ActiveList.Item node={ 0 }> Item 0 </ActiveList.Item>
  						<ActiveList.Item node={ 1 }> Item 1 </ActiveList.Item>
  						<ActiveList.Item node={ 2 }> Item 2 </ActiveList.Item>
            </ActiveList>
          </Tabs.Panel>

          <Tabs.Panel index={ 2 }>
            <ActiveGrid columns={ 2 }>
              <ActiveList.Item node={ 0 }> Item 0 </ActiveList.Item>
  						<ActiveList.Item node={ 1 }> Item 1 </ActiveList.Item>
  						<ActiveList.Item node={ 2 }> Item 2 </ActiveList.Item>
  						<ActiveList.Item node={ 3 }> Item 3 </ActiveList.Item>
            </ActiveGrid>
          </Tabs.Panel>
        </Tabs>
    )
  },
};

export const Styled = {
  render: (props) => {
    return (
        <StyledTabs { ...props } maxIndex={ 3 }>
          <StyledList>
            <StyledCycleButtons direction={ 'left' }> L </StyledCycleButtons>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '8px', }}>
              <StyledTab node={ 0 }> Tab w/ Text </StyledTab>
              <StyledTab node={ 1 }> Tab w/ Buttons </StyledTab>
              <StyledTab node={ 2 }> Tab w/ Grid </StyledTab>
            </div>
            <StyledCycleButtons direction={ 'right' }> R </StyledCycleButtons>
          </StyledList>

          <Tabs.Panel index={ 0 }>
            <StyledActiveScrollableNode>
  						Lorem ipsum dolor sit amet.
  						Ut autem dolores et quasi itaque ut molestiae ipsum.
  						Est quaerat aliquam id sapiente ullam non dolores odio.
  						...
  					</StyledActiveScrollableNode>
          </Tabs.Panel>

          <Tabs.Panel index={ 1 }>
            <StyledActiveList>
              <StyledActiveListItem node={ 0 }> Item 0 </StyledActiveListItem>
  						<StyledActiveListItem node={ 1 }> Item 1 </StyledActiveListItem>
  						<StyledActiveListItem node={ 2 }> Item 2 </StyledActiveListItem>
            </StyledActiveList>
          </Tabs.Panel>

          <Tabs.Panel index={ 2 }>
            <StyledActiveGrid columns={ 2 }>
              <StyledActiveGridItem node={ 0 }> 0 </StyledActiveGridItem>
  						<StyledActiveGridItem node={ 1 }> 1 </StyledActiveGridItem>
  						<StyledActiveGridItem node={ 2 }> 2 </StyledActiveGridItem>
              <StyledActiveGridItem node={ 3 }> 3 </StyledActiveGridItem>
            </StyledActiveGrid>
          </Tabs.Panel>
        </StyledTabs>
    )
  },
};
