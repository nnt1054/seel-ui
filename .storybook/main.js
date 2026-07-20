

/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  "stories": [
    "../lib/**/*.mdx",
    "../lib/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx|mdx)",
  ],
  "addons": ["@storybook/addon-docs"],
  "framework": "@storybook/react-vite"
};
export default config;
