import { Tabs } from './Tabs';


export default {
  tags: ['!dev'],
  title: 'Navigation/TabsCycleButton',
  component: Tabs.CycleButton,
  args: {
    direction: 'left',
  },
  argTypes: {
    direction: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Direction in which to cycle the active tab.  `left` for decrementing and `right` for incrementing the active tab index regardless of the tab list orientation.',
      table: {
        defaultValue: {
          summary: 'left',
        },
      },
    },
  },
};

export const Default = {};
