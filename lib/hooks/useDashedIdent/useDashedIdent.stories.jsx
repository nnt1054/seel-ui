import { useRef } from 'react';
import { fn } from 'storybook/test';

import { includeInputProvider } from '@docs/decorators';
import { useDashedIdent } from './useDashedIdent';


export default {
  tags: ['!dev'],
  title: 'Hooks/useDashedIdent',
  component: useDashedIdent,
  args: {
    salt: 'use-dashed-ident',
  },
  argTypes: {
    salt: {
      type: 'string',
      description: 'String used to salt the generated dashed ident',
      table: {
        defaultValue: {
          summary: 'use-dashed-ident',
        },
      },
    },
  },
};

export const Default = {};
