const sharedPlugins = [
  'import',
  'react',
  'react-hooks',
  'jest',
  'prettier',
  'standard',
];

const sharedExtends = [
  'standard',
  'plugin:react/recommended',
  'plugin:jest-playwright/recommended',
  'prettier',
  'plugin:prettier/recommended', // Should be the last extension https://github.com/prettier/eslint-plugin-prettier#recommended-configuration
];

const sharedRules = {
  'no-multi-spaces': 'off',
  'eol-last': 'error',
  'no-multi-str': 'off',
  'no-mixed-operators': 'off',
  'no-return-assign': 'off',
  'react/react-in-jsx-scope': 'off',
  'react-hooks/rules-of-hooks': 'error',
  'prettier/prettier': 'error',
  'no-restricted-syntax': [
    'error',
    "JSXElement.children > [expression.callee.property.name='stringify']",
  ],
};

module.exports = {
  parser: '@babel/eslint-parser',
  plugins: sharedPlugins,
  env: {
    'jest/globals': true,
  },
  extends: sharedExtends,
  rules: sharedRules,
  ignorePatterns: ['!.storybook'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    requireConfigFile: false,
    babelOptions: {
      presets: ['@babel/preset-react'],
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      plugins: [...sharedPlugins, '@typescript-eslint'],
      extends: [
        ...sharedExtends,
        'plugin:@typescript-eslint/recommended',
        'plugin:jest-playwright/recommended',
      ],
      rules: {
        ...sharedRules,
        'no-use-before-define': 'off',
        '@typescript-eslint/array-type': ['error'],
        '@typescript-eslint/no-use-before-define': [
          'error',
          { functions: false },
        ],
        '@typescript-eslint/no-unused-vars': [
          'error',
          { ignoreRestSiblings: true },
        ],
        'jest/no-standalone-expect': [
          'error',
          { additionalTestBlockFunctions: ['each.test'] },
        ],
        // This rule does not support FunctionComponent<Props> and so
        // makes using (eg) children props more of a pain than it should be
        'react/prop-types': 'off',
      },
    },
  ],
};
