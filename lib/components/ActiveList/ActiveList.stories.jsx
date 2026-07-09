import { useRef, useState, useContext, useEffect } from 'react';
import { fn } from 'storybook/test';

import { ActiveList, ActiveListItem } from './ActiveList';
import { createActiveNodeContext } from '@providers/ActiveNodeProvider/ActiveNodeProvider';


export default {
  title: 'Navigation/ActiveList',
  component: ActiveList,
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
        <ActiveList
          ref={ ref }
        >
          {
            Array(5).fill(0).map((_, i) => {
              return (
                <ActiveListItem key={ i } node={ i } />
              )
            })
          }
        </ActiveList>
        <button onClick={ focus }> focus </button>
        <button onClick={ blur }> blur </button>
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
