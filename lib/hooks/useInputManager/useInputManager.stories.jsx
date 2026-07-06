import { useState } from 'react';

import { useKeyPress } from './useInputManager';


export default {
  title: 'Hooks/useKeyPress',
  component: useKeyPress,
  parameters: {
    layout: 'centered',
  },
  render: () => {
    const [keydown, setKeydown] = useState();
    const [keyup, setKeyup] = useState();

    useKeyPress((event) => {
      if (event.type == 'keydown') setKeydown(event.code);
      if (event.type == 'keyup') setKeyup(event.code);
    });

    return (
      <div style={{ padding: '16px', textAlign: 'center', }}>
        <span> Last Key Down: { keydown }</span> <br/>
        <span> Last Key Up: { keyup }</span> <br/>
        <br/>
        <span> Keydown Events are suppressed while any input is active: </span> <br/>
        <span> Input: </span> <input/>
      </div>
    )
  },
};

export const Default = {};
