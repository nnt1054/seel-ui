import { useRef } from 'react';
import { fn } from 'storybook/test';

import { useActiveNode } from './useActiveNode';

export default {
  tags: ['!dev'],
  title: 'Hooks/useActiveNode',
  component: useActiveNode,
  render: (props) => {
    const ref = useRef();
    const { hasFocus } = useActiveNode()
    return (
      <div />
    )
  },
};

export const Default = {};
