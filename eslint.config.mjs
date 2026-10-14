// @ts-check
import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import expo from 'eslint-config-expo';

export default [
  // Apply to all JS/TS files
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        // Node.js globals
        console: 'readonly',
        process: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        module: 'readonly',
        require: 'readonly',
        // React Native globals
        __DEV__: 'readonly',
        // Jest globals
        describe: 'readonly',
        it: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        jest: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      prettier: eslintPluginPrettier,
    },
    rules: {
      // Expo recommended rules
      ...expo.rules,
      // Prettier integration
      ...eslintConfigPrettier.rules,
      'prettier/prettier': 'error',
    },
  },
  // TypeScript specific rules
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-shadow': 'off',
      'no-shadow': 'off',
      'no-undef': 'off',
      'react/react-in-jsx-scope': 'off',
    },
  },
  // Ignore patterns
  {
    ignores: [
      'node_modules/',
      '.expo/',
      'dist/',
      'build/',
      'coverage/',
      '*.config.js',
      '*.config.mjs',
    ],
  },
];
