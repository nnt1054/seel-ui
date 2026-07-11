import { useRef, useState, useContext, useEffect } from 'react';
import { fn } from 'storybook/test';

import { ActiveGrid, ActiveListItem } from './ActiveGrid';


export default {
  title: 'Navigation/ActiveGrid',
  component: ActiveGrid,
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

    return (
      <>
        <ActiveGrid
          ref={ ref }
          columns={ 5 }
        >
          {
            Array(25).fill(0).map((_, i) => {
              return (
                <ActiveListItem key={ i } node={ i } />
              )
            })
          }
        </ActiveGrid>
        <button onClick={ left }> left </button>
        <button onClick={ right }> right </button>
        <button onClick={ up }> up </button>
        <button onClick={ down }> down </button>
        <button onClick={ confirm }> confirm </button>
      </>
    )
  }
};


export const Default = {};
