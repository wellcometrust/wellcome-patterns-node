import { dirname, join } from "path";

const path = require('path');
module.exports = {
  stories: [
    '../stories/**/*.mdx',
    '../stories/**/*.stories.tsx',
  ],

  addons: [
    getAbsolutePath("@storybook/addon-actions"),
    getAbsolutePath("@storybook/addon-controls"),
    getAbsolutePath("@storybook/addon-a11y"),
    getAbsolutePath("@storybook/addon-backgrounds"),
    getAbsolutePath("@storybook/addon-docs"),
  ],

  framework: {
    name: getAbsolutePath("@storybook/nextjs"),
    options: {}
  },

  docs: {
    autodocs: false
  },

  core: {
    disableTelemetry: true
  },
};

function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, "package.json")));
}
