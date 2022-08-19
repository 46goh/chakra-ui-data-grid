module.exports = {
  stories: ["./src/**/*.story.@(js|jsx|ts|tsx)"],
  addons: [
    "@chakra-ui/storybook-addon",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: "@storybook/react",
  staticDirs: ["../public"],
  core: {
    builder: "@storybook/builder-webpack5",
  },
};
