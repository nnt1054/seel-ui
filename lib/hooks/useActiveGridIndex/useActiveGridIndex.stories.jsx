import { useRef } from 'react';
import styled from 'styled-components';

import { useActiveGridIndex } from './useActiveGridIndex';


export default {
  title: 'Hooks/useActiveGridIndex',
  component: useActiveGridIndex,
  parameters: {
    layout: 'centered',
  },
  render: (props) => {
    const ref = useRef();
    const { columns, maxIndex } = props;
    const rows = Math.ceil(maxIndex / columns);

    const [activeIndex, setActiveIndex] = useActiveGridIndex({
      ref,
      ...props,
    });

    const emit = (name) => ref.current?.dispatchEvent(new Event(name));

    return (
      <div ref={ ref }>
        <span> Active Index: { activeIndex } </span> <br/>
        <button onClick={() => emit('left')}> Left </button>
        <button onClick={() => emit('right')}> Right </button>
        <button onClick={() => emit('up')}> Up </button>        
        <button onClick={() => emit('down')}> Down </button>
        <br/>
        <Grid columns={ columns }>
          {
            Array(maxIndex).fill(0).map((_, i) => {
              const isActive = i == activeIndex;
              const style = {
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
                <span key={ i } style={ style }> { i } </span>
              )
            })
          }
        </Grid>
      </div>
    )
  },
};

export const Default = {
  args: {
    columns: 5,
    maxIndex: 23,
  },
};


const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: ${props => `repeat(${props.$columns}, 1fr)`};
  justify-content: space-between;
  align-items: center;
  gap: ${props => `${props.$gap}px`};
`
const Grid = ({ columns, children, gap = 16 }) => {
    return (
        <StyledGrid
          $columns={ columns }
          $gap={ gap }
        >
            { children }
        </StyledGrid>
    )
}
