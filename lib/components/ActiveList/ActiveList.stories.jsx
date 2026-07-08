import { useRef, useState, useContext, useEffect } from 'react';
import { fn } from 'storybook/test';

import { ActiveList } from './ActiveList';


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
    const up = () => { ref.current.up() }
    const down = () => { ref.current.down() }
    const confirm = () => { ref.current.confirm() }
    return (
      <>
        <ActiveList ref={ ref } />
        <button onClick={ up }> up </button>
        <button onClick={ down }> down </button>
        <button onClick={ confirm }> confirm </button>
      </>
    )
  }
};


export const Default = {};
