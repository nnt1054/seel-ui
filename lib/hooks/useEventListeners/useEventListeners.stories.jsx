import { useRef } from 'react';
import { fn } from 'storybook/test';

import { includeInputProvider } from '@docs/decorators';
import { useEventListeners } from './useEventListeners';


export default {
  tags: ['!dev'],
  title: 'Hooks/useEventListeners',
  component: useEventListeners,
  args: {
    ref: undefined,
    callbacks: {},
    isActive: true,
  },
  argTypes: {
    ref: {
      type: 'RefObject<>',
      table: {
        readonly: true,
      },
    },
    callbacks: {
      description: 'Object mapping event names to their function callbacks.',
      table: {
        defaultValue: {
          summary: `{}`,
        },
        readonly: true,
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
};

export const Default = {};
