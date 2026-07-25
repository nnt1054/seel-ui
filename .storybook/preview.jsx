/** @type { import('@storybook/react-vite').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
      disableSaveFromUI: true,
    },
    docs: {
      toc: true,
      codePanel: true,
    },
  },
};

export default preview;
