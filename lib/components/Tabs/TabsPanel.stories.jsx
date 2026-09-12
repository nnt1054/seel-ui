import { Tabs } from './Tabs';


export default {
  tags: ['!dev'],
  title: 'Navigation/TabsPanel',
  component: Tabs.Panel,
  args: {
    index: 0,
  },
  argTypes: {
    index: {
      type: {
        name: 'number',
        required: true,
      },
      description: "Index number of Tab Panel.  Should match the `node` prop for this panel's corresponding `Tabs.Tab` component.",
    },
  },
};

export const Default = {};
