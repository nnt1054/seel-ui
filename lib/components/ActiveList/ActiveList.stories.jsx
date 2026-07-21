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
    return (
      <InputProvider inputRef={ ref }>
        <ActiveList
          ref={ ref }
          orientation={ 'vertical' }
          hasFocus={ true }
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
      </InputProvider>
    )
  }
};


export const Default = {};
