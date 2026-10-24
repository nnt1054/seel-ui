import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  "stories": [
    "../docs/Introduction.mdx",
    "../docs/**/*.mdx",
    "../lib/**/*.mdx",
    "../lib/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  "staticDirs": ['../public'],
  "addons": ["@storybook/addon-docs"],
  "framework": "@storybook/react-vite",
  "typescript": {
    check: true,
    checkOptions: {
      eslint: true,
    },
    "skipCompiler": false,
  },
};
export default config;
