import { useRef, useState, useContext, useEffect, memo } from 'react';

import { includeInputProvider } from '@docs/decorators';

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
  decorators: [includeInputProvider],
  args: {
    adjacentNodes: {},
    ref: undefined,
		node: 'container',
		hasFocus: true,
  },
  argTypes: {
    adjacentNodes: {
      description: 'Object denoting what nodes within the same parent, if any, are adjacent to the current node and in what direction.  See `useAdjacentNodes` hook for more information.',
      table: {
        defaultValue: {
          summary: `{}`,
        },
        readonly: true,
      },
    },
    ref: {
			type: 'RefObject<>',
			table: {
				category: 'Node Props',
				readonly: true,
			},
		},
		node: {
			type: {
				name: 'string',
				required: true,
			},
			table: {
				category: 'Node Props',
				readonly: true,
			},
		},
		hasFocus: {
			type: 'boolean',
			description: "Controlled override for the node's `hasFocus` value.  Primarily used for setting focus value for the top level node.",
			table: {
				category: 'Node Props',
				defaultValue: {
					summary: 'null',
				},
			},
		},
  },
  parameters: {
    layout: 'centered',
  },
  render: (props) => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <StyledHeader> Terms and Conditions </StyledHeader>
        <StyledDiv>
          <StyledActiveScrollableNode
            node={ props.node }
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
            up: props.node,
          }}
          orientation={ 'horizonatl' }
          disableWrap={ true }
          disableJump={ true }
        >
          <StyledAction node={ 0 }> Back </StyledAction>
          <StyledActionAccept node={ 1 }> Accept </StyledActionAccept>
        </StyledActions>
      </div>
    )
  }
};


export const Default = {};
