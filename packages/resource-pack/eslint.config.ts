import js from "@eslint/js"
import globals from "globals"
import tseslint from "typescript-eslint"
import json from "@eslint/json"
import markdown from "@eslint/markdown"
import { defineConfig } from "eslint/config"

/**
 * @summary ESLint configuration.
 * @description Configuration of linter for the resource pack.
 * @see {@link https://eslint.org/docs/latest/use/configure/configuration-files}
 */
export default defineConfig([
    tseslint.configs.recommended,
    {
        ignores: [".husky/**", "node_modules/**", "dist/**", "./tsconfig*.json"],
    },
    {
        files: ["**/*.ts"],
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
            "no-unused-vars": [
                "error",
                {
                    argsIgnorePattern: "^_{1,2}",
                },
            ],
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
])
