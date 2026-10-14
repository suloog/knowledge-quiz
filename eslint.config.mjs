// @ts-check
import expoConfig from 'eslint-config-expo/flat.js';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginPrettier from 'eslint-plugin-prettier';

export default [
  // Expo's recommended config: core, TypeScript, React, React hooks and Expo rules
  ...expoConfig,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      globals: {
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
      prettier: eslintPluginPrettier,
    },
    rules: {
      // Prettier integration: formatting rules off, formatting reported by prettier itself
      ...eslintConfigPrettier.rules,
      'prettier/prettier': 'error',
    },
  },
  // Ignore patterns
  {
    ignores: [
      'node_modules/',
      '.expo/',
      'android/',
      'dist/',
      'build/',
      'coverage/',
      'test-results/',
      'test-runs/',
      '*.config.js',
      '*.config.mjs',
    ],
  },
];
