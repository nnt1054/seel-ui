import { fn } from 'storybook/test';
import { useRef, useState } from 'react';

import { useActiveIndex } from './useActiveIndex';


// todo: create story with multiple active nodes
// todo: swap out styles with actual components
export default {
  title: 'Hooks/useActiveIndex',
  component: useActiveIndex,
  parameters: {
    layout: 'centered',
  },
  render: (props) => {
    const ref = useRef();
    const { isColumn, maxIndex } = props;
    const [activeIndex, setActiveIndex] = useState(0);
    useActiveIndex({
      ref,
      activeIndex,
      setActiveIndex,
      ...props,
    });

    const emit = (name) => ref.current.dispatchEvent(new Event(name));

    return (
      <div ref={ ref }>
        <span> Active Index: { activeIndex } </span> <br/>
        <button onClick={() => emit('left')}> Left </button>
        <button onClick={() => emit('right')}> Right </button>
        <button onClick={() => emit('up')}> Up </button>        
        <button onClick={() => emit('down')}> Down </button>
        <br/>
        <div style={{ display: 'flex', flexDirection: isColumn ? 'column' : 'row' }}>
          {
            Array(maxIndex).fill(0).map((_, index) => {
              const isActive = index == activeIndex;
              const styles = {
                width: '32px',
                height: '32px',
                fontWeight: isActive ? 'bold' : 'normal',
                color: isActive ? 'white' : 'black',
                background: isActive ? 'red' : 'none',
                borderRadius: '25px',
                textAlign: 'center',
                verticalAlign: 'middle',
                lineHeight: '32px',
              }
              return (
                <span key={ index } style={ styles }> { index } </span>
              )
            })
          }
        </div>
      </div>
    )
  },
};

export const Row = {
  args: {
    initialIndex: 0,
    maxIndex: 8,
    isColumn: false,
    disableWrap: false,
  },
};

export const Column = {
  args: {
    initialIndex: 0,
    maxIndex: 8,
    isColumn: true,
    disableWrap: false,
  },
};
