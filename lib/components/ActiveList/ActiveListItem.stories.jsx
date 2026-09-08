import { fn } from 'storybook/test';
import { includeInputProvider } from '@docs/decorators';
import { ActiveList } from './ActiveList';


export default {
  tags: ['!dev'],
  title: 'Navigation/ActiveListItem',
  component: ActiveList.Item,
  decorators: [includeInputProvider],
  args: {
    onConfirm: fn(),
    ref: undefined,
    node: 'listitem',
    hasFocus: true,
  },
  argTypes: {
    onConfirm: {
      description: "Function to call on receiving a `confirm` event or onClick.",
      table: {
        defaultValue: {
          summary: '() => {}',
        },
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
};

export const Default = {};
