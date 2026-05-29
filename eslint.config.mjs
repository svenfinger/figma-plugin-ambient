import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import figmaPlugin from '@figma/eslint-plugin-figma-plugins'
import globals from 'globals'
import { defineConfig } from 'eslint/config'

export default defineConfig(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: ['code.js', 'dist/**', 'eslint.config.mjs', 'vite.config.ts', '**/*.js'],
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
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
)
