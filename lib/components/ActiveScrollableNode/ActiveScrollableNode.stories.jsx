import { useRef, useState, useContext, useEffect, memo } from 'react';
import { fn } from 'storybook/test';

import { ActiveScrollableNode } from './ActiveScrollableNode';
import { ActiveContainer } from '@components/ActiveContainer/ActiveContainer';
import { StyledActiveList, StyledActiveListItem } from '@components/ActiveList/examples/styled';
import { StyledActiveGrid, StyledActiveGridItem } from '@components/ActiveGrid/examples/styled';
import { InputProvider } from '@providers/InputProvider/InputProvider';


export default {
  title: 'Navigation/ActiveScrollableNode',
  component: ActiveScrollableNode,
  args: {
    hasFocus: true,
  },
  argTypes: {
    hasFocus: {
      control: 'boolean'
    },
  },
  parameters: {
    layout: 'centered',
  },
  render: (props) => {
    const { hasFocus } = props;

    const ref = useRef();
    const initial = 'list1';

    return (
      <InputProvider inputRef={ ref }>
        <ActiveContainer ref={ ref } initial={ initial } hasFocus={ hasFocus }>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <StyledActiveList
              node={ 'list1' }
              adjacentNodes={{
                down: 'scrollable',
              }}
            >
              {
                Array(5).fill(0).map((_, i) => {
                  return (
                    <StyledActiveListItem key={ i } node={ i }> Item { i } </StyledActiveListItem>
                  )
                })
              }
            </StyledActiveList>
            <ActiveScrollableNode
              style={{ width: '512px', height: '128px', overflow: 'scroll' }}
              node={ 'scrollable' }
              adjacentNodes={{
                up: 'list1',
                down: 'list2',
              }}
            >
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.

              Lorem Ipsum has been the industry's standard dummy text ever since 1966,
              when designers at Letraset and James Mosley,
              the librarian at St Bride Printing Library in London,
              took a 1914 Cicero translation and scrambled it to make dummy text for Letraset's Body Type sheets.
              It has survived not only many decades, but also the leap into electronic typesetting,
              remaining essentially unchanged.

              It was popularised thanks to these sheets and more recently with desktop publishing software
              like Aldus PageMaker and Microsoft Word including versions of Lorem Ipsum.
            </ActiveScrollableNode>
            <StyledActiveGrid
              node={ 'list2' }
              columns={ 5 }
              adjacentNodes={{
                up: 'scrollable',
              }}
            >
              {
                Array(25).fill(0).map((_, i) => {
                  return (
                    <StyledActiveGridItem key={ i } node={ i }> Item { i } </StyledActiveGridItem>
                  )
                })
              }
            </StyledActiveGrid>
          </div>
        </ActiveContainer>
      </InputProvider>
    )
  }
};


export const Default = {};
