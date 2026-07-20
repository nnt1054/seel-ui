import { useRef, useState, useContext, useEffect, memo } from 'react';
import { fn } from 'storybook/test';

import { ActiveContainer } from './ActiveContainer';
import { ActiveList, ActiveListItem } from '@components/ActiveList/ActiveList';
import { ActiveGrid } from '@components/ActiveGrid/ActiveGrid';
import { InputProvider } from '@providers/InputProvider/InputProvider';


export default {
  title: 'Navigation/ActiveContainer',
  component: ActiveContainer,
  args: {
    hasFocus: true,
  },
  argTypes: {
    hasFocus: {
      control: 'boolean'
    },
  },
  parameters: {
    layout: 'centered',
  },
  render: (props) => {
    const { hasFocus } = props;

    const ref = useRef();
    const initial = 'list1';

    return (
      <InputProvider inputRef={ ref }>
        <ActiveContainer ref={ ref } initial={ initial } hasFocus={ hasFocus }>
          <div style={{ display: 'flex', flexDirection: 'row', gap: '24px' }}>
            <ActiveList
              node={ 'list1' }
              adjacentNodes={{
                right: 'list2',
              }}
            >
              {
                Array(5).fill(0).map((_, i) => {
                  return (
                    <ActiveListItem key={ i } node={ i } />
                  )
                })
              }
            </ActiveList>
            <ActiveGrid
              node={ 'list2' }
              columns={ 5 }
              adjacentNodes={{
                left: 'list1',
              }}
            >
              {
                Array(25).fill(0).map((_, i) => {
                  return (
                    <ActiveListItem key={ i } node={ i } />
                  )
                })
              }
            </ActiveGrid>
          </div>
        </ActiveContainer>
      </InputProvider>
    )
  }
};


export const Default = {};
