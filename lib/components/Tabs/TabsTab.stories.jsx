import { Tabs } from './Tabs';


export default {
  tags: ['!dev'],
  title: 'Navigation/TabsTab',
  component: Tabs.Tab,
  args: {
    node: 0,
  },
  argTypes: {
    node: {
      type: {
        name: 'number',
        required: true,
      },
      description: 'Node name as an integer corresponding to the index of Tab in the list.',
      table: {
        category: 'Node Props',
        readonly: true,
      },
    },
  },
};

export const Default = {};
