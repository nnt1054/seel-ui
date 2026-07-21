import { useRef, useState, useContext, useEffect } from 'react';
import { fn } from 'storybook/test';

import { ActiveGrid } from './ActiveGrid';
import { ActiveListItem } from '@components/ActiveList/ActiveList';
import { InputProvider } from '@providers/InputProvider/InputProvider';


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
    return (
      <InputProvider inputRef={ ref }>
        <ActiveGrid
          ref={ ref }
          hasFocus={ true }
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
      </InputProvider>
    )
  }
};


export const Default = {};
