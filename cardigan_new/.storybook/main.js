import { dirname, join } from "path";

const path = require('path');
module.exports = {
  stories: [
    '../stories/components/**/*.mdx',
    '../stories/components/**/*.stories.tsx',
  ],

  addons: [
    getAbsolutePath("@storybook/addon-controls"),
    getAbsolutePath("@storybook/addon-a11y"),
    getAbsolutePath("@storybook/addon-backgrounds"),
    getAbsolutePath("@storybook/addon-docs"),
    getAbsolutePath("@storybook/addon-mdx-gfm"),
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
