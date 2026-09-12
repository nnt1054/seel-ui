import { Tabs } from './Tabs';


export default {
  tags: ['!dev'],
  title: 'Navigation/TabsList',
  component: Tabs.List,
  args: {
    position: 'up',
    orientation: 'horizontal', // or 'vertical'
    node: 'list',
  },
  argTypes: {
    position: {
      control: 'select',
      options: ['up', 'down', 'left', 'right'],
      description: 'Position of the tab list items in relation to the content area/panels.',
      table: {
        defaultValue: {
          summary: 'up',
        },
      },
    },
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal'],
      description: 'Orientation of the tab list items and determines how directional events will move focus around.',
      table: {
        defaultValue: {
          summary: 'vertical',
        },
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
  },
};

export const Default = {};
