/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  stories: [
    "../stories/**/*.mdx",
    "../stories/components/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-onboarding",
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
    "@storybook/addon-design-assets",
    "@storybook/addon-links",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
};
export default config;
