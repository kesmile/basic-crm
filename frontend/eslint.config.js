import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import prettierConfig from 'eslint-config-prettier';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"]},
  {languageOptions: { globals: globals.browser }},
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  pluginReact.configs.flat['jsx-runtime'],
  { 
    settings: {
      react: {
        version: 'detect', // Automatically detect the React version
      },
    },
    rules: {
    'react/react-in-jsx-scope': 'off', // Disable React import requirement
    'no-unused-vars': [
      'warn',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^React$' }, // Ignore unused React variable
    ],
    '@typescript-eslint/no-unused-vars': ['warn'], // For TypeScript
  }},
  prettierConfig,
];