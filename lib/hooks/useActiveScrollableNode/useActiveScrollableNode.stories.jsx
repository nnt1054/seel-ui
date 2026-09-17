import { useRef } from 'react';
import { fn } from 'storybook/test';

import { includeInputProvider } from '@docs/decorators';
import { useActiveScrollableNode } from './useActiveScrollableNode';


export default {
  tags: ['!dev'],
  title: 'Hooks/useActiveScrollableNode',
  component: useActiveScrollableNode,
  args: {
    ref: undefined,
    adjacentNodes: {},
    moveFocus: () => {},
    isActive: true,
  },
  argTypes: {
    ref: {
      type: 'RefObject<>',
      description: 'Ref to node and element to scroll on.',
      table: {
        readonly: true,
      },
    },
    adjacentNodes: {
      description: 'Object denoting what nodes within the same parent, if any, are adjacent to the current node and in what direction.  See `useAdjacentNodes` hook for more information.',
      table: {
        defaultValue: {
          summary: `{}`,
        },
        readonly: true,
      },
    },
    moveFocus: {
      description: "Function to be called on a node name when responding to a directional navigation event.  This function is expected to be retrieved from the `useActiveNode` hook.",
      table: {
        defaultValue: {
          summary: '() => {}',
        },
      },
    },
    isActive: {
      type: 'boolean',
      description: "Controls whether or not hook is actively listening for events.",
      table: {
        defaultValue: {
          summary: 'true',
        },
      },
    },
  },
  render: (props) => {
    const ref = useRef();

    useActiveScrollableNode({
      ...props,
      ref,
    })

    return (
      <div />
    )
  },
};

export const Default = {};
