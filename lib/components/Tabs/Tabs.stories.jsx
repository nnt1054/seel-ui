import { useRef, useState, useContext, useEffect } from 'react';

import { includeInputProvider } from '@docs/decorators';
import { Tabs } from './Tabs';
import { ActiveList, ActiveListItem } from '@components/ActiveList/ActiveList';
import { ActiveGrid } from '@components/ActiveGrid/ActiveGrid';
import { StyledTabs, StyledList, StyledCycleButtons, StyledTab } from './examples/styled';
import { KeybindsContext } from '@providers/InputProvider/InputProvider';


export default {
  title: 'Navigation/Tabs',
  component: Tabs,
  decorators: [includeInputProvider],
  args: {
    adjacentNodes: {},
    maxIndex: undefined,
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
        <Tabs { ...props } maxIndex={ 4 }>

          <Tabs.List>
            <Tabs.CycleButton direction={ 'left' }> L </Tabs.CycleButton>
            <Tabs.Tab node={ 0 }> Tab 1 </Tabs.Tab>
            <Tabs.Tab node={ 1 }> Tab 2 </Tabs.Tab>
            <Tabs.Tab node={ 2 }> Tab 3 </Tabs.Tab>
            <Tabs.Tab node={ 3 }> Tab 4 </Tabs.Tab>
            <Tabs.CycleButton direction={ 'right' }> R </Tabs.CycleButton>
          </Tabs.List>

          <Tabs.Panel index={ 0 }>
            <ActiveListItem label={ 'first' }/>
          </Tabs.Panel>

          <Tabs.Panel index={ 1 }>
            <span> hi </span>
          </Tabs.Panel>

          <Tabs.Panel index={ 2 }>
            <ActiveList>
              {
                Array(5).fill(0).map((_, i) => {
                  return (
                    <ActiveListItem key={ i } node={ i }> { i }</ActiveListItem>
                  )
                })
              }
            </ActiveList>
          </Tabs.Panel>
          
          <Tabs.Panel index={ 3 }>
            <ActiveGrid columns={ 5 }>
              {
                Array(25).fill(0).map((_, i) => {
                  return (
                    <ActiveGrid.Item key={ i } node={ i }> { i } </ActiveGrid.Item> 
                  )
                })
              }
            </ActiveGrid>
          </Tabs.Panel>

        </Tabs>
    )
  },
};

export const Styled = {
  render: (props) => {
    return (
        <StyledTabs { ...props } maxIndex={ 4 }>
          <StyledList>
            <StyledCycleButtons direction={ 'left' }> ⇧Tab </StyledCycleButtons>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '8px', }}>
              <StyledTab node={ 0 }> Tab 1 </StyledTab>
              <StyledTab node={ 1 }> Tab 2 </StyledTab>
              <StyledTab node={ 2 }> Tab 3 </StyledTab>
              <StyledTab node={ 3 }> Tab 4 </StyledTab>
            </div>
            <StyledCycleButtons direction={ 'right' }> Tab </StyledCycleButtons>
          </StyledList>

          <Tabs.Panel index={ 0 }>
            <ActiveListItem label={ 'first' }/>
          </Tabs.Panel>

          <Tabs.Panel index={ 1 }>
            <span> hi </span>
          </Tabs.Panel>

          <Tabs.Panel index={ 2 }>
            <ActiveList>
              {
                Array(5).fill(0).map((_, i) => {
                  return (
                    <ActiveListItem key={ i } node={ i } />
                  )
                })
              }
            </ActiveList>
          </Tabs.Panel>
          
          <Tabs.Panel index={ 3 }>
            <ActiveGrid columns={ 5 }>
              {
                Array(25).fill(0).map((_, i) => {
                  return (
                    <ActiveListItem key={ i } node={ i } />
                  )
                })
              }
            </ActiveGrid>
          </Tabs.Panel>
        </StyledTabs>
    )
  },
};
