

/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  "stories": [
    "../docs/Introduction.mdx",
    "../docs/**/*.mdx",
    "../lib/**/*.mdx",
    "../lib/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  "addons": ["@storybook/addon-docs"],
  "framework": "@storybook/react-vite"
};
export default config;
