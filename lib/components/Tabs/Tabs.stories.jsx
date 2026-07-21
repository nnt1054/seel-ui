import { useRef, useState, useContext, useEffect } from 'react';

import { Tabs } from './Tabs';
import { InputProvider } from '@providers/InputProvider/InputProvider';
import { ActiveContainer } from '@components/ActiveContainer/ActiveContainer';
import { ActiveList, ActiveListItem } from '@components/ActiveList/ActiveList';
import { ActiveGrid } from '@components/ActiveGrid/ActiveGrid';

export default {
  title: 'Navigation/Tabs',
  component: Tabs,
  args: {},
  argTypes: {},
  parameters: {
    layout: 'centered',
  },
};

export const Default = {
  args: {},
  render: (props) => {
    const ref = useRef();
    const initial = 'tabs';

    // todo: we need to have the activelist items here to have
    // adjacentNodes={{ up: 'tabButtons' }}

    return (
      <InputProvider inputRef={ ref }>
        <ActiveContainer ref={ ref } initial={ initial } hasFocus={ true }>
          <Tabs node={ initial } initial={ 1 } maxIndex={ 4 }>

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
        </ActiveContainer>
      </InputProvider>
    )
  },
};
