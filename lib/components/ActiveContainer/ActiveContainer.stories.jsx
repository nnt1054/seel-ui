import { useRef, useState, useContext, useEffect, memo } from 'react';
import { fn } from 'storybook/test';

import { ActiveContainer } from './ActiveContainer';
import { ActiveList, ActiveListItem } from '@components/ActiveList/ActiveList';


export default {
  title: 'Navigation/ActiveContainer',
  component: ActiveContainer,
  args: {},
  argTypes: {},
  parameters: {
    layout: 'centered',
  },
  render: (props) => {
    const ref = useRef();

    // note: no reason to clean this up atm leave it be
    // until we decide how we want to render buttons for
    // storybook very specifically
    const dispatchEvent = (event) => {
      return () => { ref.current?.dispatchEvent(new Event(event)) }
    }
    const up = dispatchEvent('up');
    const down = dispatchEvent('down');
    const left = dispatchEvent('left');
    const right = dispatchEvent('right');
    const confirm = dispatchEvent('confirm');
    const focus = dispatchEvent('focus');
    const blur = dispatchEvent('blur');
    const initial = 'list1';

    return (
      <>
        <ActiveContainer ref={ ref } initial={ initial }>
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
            <ActiveList
              node={ 'list2' }
              adjacentNodes={{
                left: 'list1',
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
          </div>
        </ActiveContainer>
        <button onClick={ left }> left </button>
        <button onClick={ right }> right </button>
        <button onClick={ up }> up </button>
        <button onClick={ down }> down </button>
        <button onClick={ confirm }> confirm </button>
        <button onClick={ focus }> focus </button>
        <button onClick={ blur }> blur </button>
      </>
    )
  }
};


export const Default = {};
