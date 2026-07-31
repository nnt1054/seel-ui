import { useRef, useState, useContext, useEffect } from 'react';

import { includeInputProvider } from '@docs/decorators';
import { Tabs } from './Tabs';
import { ActiveList, ActiveListItem } from '@components/ActiveList/ActiveList';
import { ActiveGrid } from '@components/ActiveGrid/ActiveGrid';
import { StyledList, StyledCycleButtons } from './examples/styled';


export default {
  title: 'Navigation/Tabs',
  component: Tabs,
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
        <Tabs initial={ 1 } maxIndex={ 4 } { ...props }>

          <Tabs.List>
            <Tabs.CycleButton direction={ 'left' }> -1 </Tabs.CycleButton>
            <Tabs.Tab node={ 0 }> Tab 1 </Tabs.Tab>
            <Tabs.Tab node={ 1 }> Tab 2 </Tabs.Tab>
            <Tabs.Tab node={ 2 }> Tab 3 </Tabs.Tab>
            <Tabs.Tab node={ 3 }> Tab 4 </Tabs.Tab>
            <Tabs.CycleButton direction={ 'right' }> +1 </Tabs.CycleButton>
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

        </Tabs>
    )
  },
};

export const Styled = {
  render: (props) => {
    return (
        <Tabs initial={ 1 } maxIndex={ 4 } { ...props }>

          <StyledList>
            <StyledCycleButtons direction={ 'left' }> LB </StyledCycleButtons>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '8px', }}>
              <Tabs.Tab node={ 0 }> Tab 1 </Tabs.Tab>
              <Tabs.Tab node={ 1 }> Tab 2 </Tabs.Tab>
              <Tabs.Tab node={ 2 }> Tab 3 </Tabs.Tab>
              <Tabs.Tab node={ 3 }> Tab 4 </Tabs.Tab>
            </div>
            <StyledCycleButtons direction={ 'right' }> RB </StyledCycleButtons>
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

        </Tabs>
    )
  },
};
