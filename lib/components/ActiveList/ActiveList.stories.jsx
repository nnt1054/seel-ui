import { useRef, useState, useContext, useEffect } from 'react';
import { fn } from 'storybook/test';

import { ActiveList, ActiveListItem } from './ActiveList';
import { Button } from '@components/Button/Button';
import { InputProvider } from '@providers/InputProvider/InputProvider';

import { TextInput } from '@components/TextInput/TextInput';
import { NumberInput } from '@components/NumberInput/NumberInput';
import { RangeInput } from '@components/RangeInput/RangeInput';
import { CheckboxInput } from '@components/CheckboxInput/CheckboxInput';


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
      <InputProvider inputRef={ ref }>
        <ActiveList
          ref={ ref }
        >
          {
            ...Array(5).fill(0).map((_, i) => {
              return (
                <ActiveListItem key={ i } node={ i } />
              )
            })
          }
          <Button
            key={ 5 }
            node={ 5 }
            onClick={() => { console.log('hello worled') }}
          >
            hello
          </Button>
          <TextInput key={ 6 } node={ 6 } />
          <NumberInput key={ 7 } node={ 7 } />
          <RangeInput key={ 8 } node={ 8 } />
          <CheckboxInput key={ 9 } node={ 9 } />
        </ActiveList>
        <button onClick={ left }> left </button>
        <button onClick={ right }> right </button>
        <button onClick={ up }> up </button>
        <button onClick={ down }> down </button>
        <button onClick={ confirm }> confirm </button>
      </InputProvider>
    )
  }
};


export const Default = {};
