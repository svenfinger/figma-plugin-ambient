const eslint = require('@eslint/js')
const tseslint = require('typescript-eslint')
const figmaPlugin = require('@figma/eslint-plugin-figma-plugins')
const globals = require('globals')

module.exports = tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: ['code.js', 'dist/**', 'eslint.config.js', 'vite.config.ts', '**/*.js'],
  },
  {
    files: ['code.ts'],
    plugins: {
      '@figma/figma-plugins': figmaPlugin,
    },
    rules: {
      ...figmaPlugin.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
    },
  },
  {
    files: ['ui/**/*.ts'],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        project: './tsconfig.ui.json',
        tsconfigRootDir: __dirname,
      },
    },
  },
)
