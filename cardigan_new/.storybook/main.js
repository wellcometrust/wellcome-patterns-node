import { dirname, join } from "path";

const path = require('path');
module.exports = {
  stories: [
    // '../stories/global/**/*.stories.mdx',
    // '../stories/global/**/*.stories.tsx',
    '../stories/components/**/*.mdx',
    '../stories/components/**/*.stories.tsx',
  ],

  addons: [
    getAbsolutePath("@storybook/addon-controls"),
    getAbsolutePath("@storybook/addon-a11y"),
    getAbsolutePath("@storybook/addon-backgrounds"),
    getAbsolutePath("@storybook/addon-docs"),
    getAbsolutePath("@storybook/addon-mdx-gfm")
  ],

  webpackFinal: async (config, { configType }) => {
    // Adds support for modules using mjs
    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: 'javascript/auto',
    });

    config.module.rules.push({
      test: /\.js$/,
      exclude: /node_modules/,
      include: [
        path.resolve(__dirname, '../../common'),
        path.resolve(__dirname, '../stories'),
        path.resolve(__dirname, '../../catalogue/webapp'),
      ],
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-flow', '@babel/preset-react'],
          plugins: [
            'babel-plugin-react-require',
            '@babel/plugin-proposal-class-properties',
            '@babel/plugin-proposal-optional-chaining',
            '@babel/plugin-syntax-dynamic-import',
          ],
        },
      },
    });

    return config;
  },

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
