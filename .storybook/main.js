const tsconfigPaths = require('tsconfig-paths-webpack-plugin')
module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/preset-scss",
  ],
  "core": {
    "builder": "webpack5"
  },
  "framework": "@storybook/react",
  webpackFinal: async (config, { configType }) => {
    config.resolve.plugins = [new tsconfigPaths()];
    return config;
  }
}