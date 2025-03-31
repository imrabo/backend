// eslint.config.js (New ESLint v9+ format)
import eslint from '@eslint/js';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default [
  eslint.configs.recommended, // Use recommended ESLint rules
  {
    languageOptions: {
      ecmaVersion: 'latest', // Modern JS
      sourceType: 'module', // Enable ES Modules (import/export)
    },
    ignores: ['node_modules/', 'dist/', 'logs/', '*.min.js'], // Files to ignore
    plugins: { prettier },
    rules: {
      'prettier/prettier': 'error', // Enforce Prettier rules
      'no-unused-vars': 'warn',
      'no-console': 'off',
    },
  },
  prettierConfig, // Ensure Prettier formatting compatibility
];
