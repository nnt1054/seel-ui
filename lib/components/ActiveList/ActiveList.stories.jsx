import { useRef, useState, useContext, useEffect } from 'react';
import { fn } from 'storybook/test';

import { ActiveList, ActiveListItem } from './ActiveList';
import { useActiveNodeContainer } from '@hooks/utils';


export default {
  title: 'Navigation/ActiveList',
  component: ActiveList,
  args: {},
  argTypes: {},
  parameters: {
    layout: 'centered',
  },
  render: (props) => {

    const node = 'default';
    const [ActiveNodeProvider, mapRef, store] = useActiveNodeContainer({
      initial: node,
    });

    const dispatchEvent = (event) => {
      return () => {
        const activeRef = mapRef.current.get(node);
        activeRef.current?.dispatchEvent(new Event(event))
      }
    }
    const up = dispatchEvent('up');
    const down = dispatchEvent('down');
    const left = dispatchEvent('left');
    const right = dispatchEvent('right');
    const confirm = dispatchEvent('confirm');

    return (
      <ActiveNodeProvider>
        <ActiveList
          node={ node }
        >
          {
            Array(5).fill(0).map((_, i) => {
              return (
                <ActiveListItem key={ i } node={ i } />
              )
            })
          }
        </ActiveList>
        <button onClick={ left }> left </button>
        <button onClick={ right }> right </button>
        <button onClick={ up }> up </button>
        <button onClick={ down }> down </button>
        <button onClick={ confirm }> confirm </button>
      </ActiveNodeProvider>
    )
  }
};


export const Default = {};
