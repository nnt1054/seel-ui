import { create } from 'storybook/theming';

export default create({
  base: 'light',
  brandTitle: 'Seel UI',
  // brandUrl: 'https://example.com',
  // brandImage: 'https://storybook.js.org/images/placeholders/350x150.png',
  brandTarget: '_self',

  fontBase: '"Open Sans", sans-serif',
  fontCode: 'monospace',

  colorPrimary: '#4E97FF',
  colorSecondary: '#82DFA1',

  appBg: '#ffffff',
  appContentBg: '#ffffff',
  appPreviewBg: '#ffffff',
  appBorderColor: '#585C6D',
  appBorderRadius: 8,

  textColor: '#10162F',
  textInverseColor: '#ffffff',
});
