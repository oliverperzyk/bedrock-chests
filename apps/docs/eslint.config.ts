import js from "@eslint/js"
import globals from "globals"
import tseslint from "typescript-eslint"
import nextVitals from "eslint-config-next/core-web-vitals"
import json from "@eslint/json"
import markdown from "@eslint/markdown"
import css from "@eslint/css"
import { defineConfig } from "eslint/config"

/**
 * @summary ESLint configuration.
 * @description Configuration of linter for the documentation application.
 * @see {@link https://eslint.org/docs/latest/use/configure/configuration-files}
 */
export default defineConfig([
    ...nextVitals,
    tseslint.configs.recommended,
    {
        ignores: [".husky/**", ".next/**", "node_modules/**", "dist/**", "./tsconfig*.json"],
    },
    {
        /**
         * @remarks All of these rules below must be disabled as they're not compatible yet.
         * @see {@link https://github.com/jsx-eslint/eslint-plugin-react/issues/3970}
         */
        rules: {
            "react/display-name": "off",
            "react/no-direct-mutation-state": "off",
            "react/no-render-return-value": "off",
            "react/no-string-refs": "off",
            "react/require-render-return": "off",
        },
    },
    {
        files: ["postcss.config.js"],
        rules: {
            "import/no-anonymous-default-export": "off",
        },
    },
    {
        files: ["**/*.{ts,tsx}"],
        plugins: { js: js as never },
        extends: ["js/recommended"],
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },
            parserOptions: {
                project: "./tsconfig.json",
            },
        },
        rules: {
            "@typescript-eslint/no-unused-vars": [
                "error",
                {
                    argsIgnorePattern: "^_{1,2}",
                },
            ],
            // This rule is disabled as it wrongly flags TypeScript-only features
            // (e.g. enumerations, union types, etc.) as unused.
            "no-unused-vars": "off",
        },
    },
    {
        files: ["tests/**/*.ts"],
        languageOptions: {
            parserOptions: {
                project: "./tsconfig.test.json",
            },
        },
    },
    {
        files: ["**/*.json"],
        plugins: { json: json as never },
        language: "json/json",
        extends: ["json/recommended"],
    },
    {
        files: ["**/*.jsonc"],
        plugins: { json: json as never },
        language: "json/jsonc",
        extends: ["json/recommended"],
    },
    {
        files: ["**/*.json5"],
        plugins: { json: json as never },
        language: "json/json5",
        extends: ["json/recommended"],
    },
    {
        files: ["**/*.md"],
        plugins: { markdown: markdown as never },
        language: "markdown/gfm",
        extends: ["markdown/recommended"],
        rules: {
            "markdown/no-missing-label-refs": "off",
        },
    },
    {
        files: ["**/*.css"],
        plugins: { css: css as never },
        language: "css/css",
        extends: ["css/recommended"],
        rules: {
            "css/no-invalid-at-rules": "off",
        },
    },
])
