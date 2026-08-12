import { useRef, useState, useContext, useEffect, memo } from 'react';

import { ActiveScrollableNode } from './ActiveScrollableNode';
import { ActiveContainer } from '@components/ActiveContainer/ActiveContainer';
import {
  StyledActiveScrollableNode,
  StyledActiveContainer,
  StyledActions,
  StyledAction,
  StyledActionAccept,
  StyledDiv,
  StyledHeader,
} from './examples/styled';
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

    return (
      <InputProvider inputRef={ ref }>
        <StyledActiveContainer
          ref={ ref }
          initial={ 'content' }
          hasFocus={ hasFocus }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <StyledHeader style={{ margin: '0px', }}> Terms and Conditions </StyledHeader>
            <StyledDiv>
              <StyledActiveScrollableNode
                node={ 'content' }
                adjacentNodes={{
                  down: 'actions',
                }}
              >
                  Lorem ipsum dolor sit amet.
                  Ut autem dolores et quasi itaque ut molestiae ipsum.
                  Est quaerat aliquam id sapiente ullam non dolores odio.
                  <br/> <br/>
                  Et harum culpa cum unde pariatur et dolor animi aut eius animi ut velit explicabo!
                  Et iusto similique nam quasi voluptatem eos dignissimos facere.
                  Quo maxime quos rem voluptatibus provident sit velit rerum At exercitationem dolor hic delectus autem?
                  <br/> <br/>
                  Ex enim exercitationem sed fugit molestias id soluta modi est voluptates sunt aut
                  aspernatur beatae et aliquid cumque est sequi facilis.
                  In expedita molestiae eos ullam quaerat 33 dolores esse rem quibusdam consequatur ad culpa dolor.
                  <br/> <br/>
                  Lorem ipsum dolor sit amet.
                  Ut autem dolores et quasi itaque ut molestiae ipsum.
                  Est quaerat aliquam id sapiente ullam non dolores odio.
                  <br/> <br/>
                  Et harum culpa cum unde pariatur et dolor animi aut eius animi ut velit explicabo!
                  Et iusto similique nam quasi voluptatem eos dignissimos facere.
                  Quo maxime quos rem voluptatibus provident sit velit rerum At exercitationem dolor hic delectus autem?
                  <br/> <br/>
                  Ex enim exercitationem sed fugit molestias id soluta modi est voluptates sunt aut
                  aspernatur beatae et aliquid cumque est sequi facilis.
                  In expedita molestiae eos ullam quaerat 33 dolores esse rem quibusdam consequatur ad culpa dolor.
                  <br/> <br/>
              </StyledActiveScrollableNode>
            </StyledDiv>
            <StyledActions
              node={ 'actions' }
              adjacentNodes={{
                up: 'content',
              }}
              orientation={ 'horizonatl' }
              disableWrap={ true }
              disableJump={ true }
            >
              <StyledAction node={ 0 }> Back </StyledAction>
              <StyledActionAccept node={ 1 }> Accept </StyledActionAccept>
            </StyledActions>
          </div>
        </StyledActiveContainer>
      </InputProvider>
    )
  }
};


export const Default = {};
