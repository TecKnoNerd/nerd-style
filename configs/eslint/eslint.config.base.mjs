/**
 * Shared ESLint flat config fragment for TecKnoNerd TypeScript repos.
 *
 * Host usage example:
 *   import base from "./.nerd-style/configs/eslint/eslint.config.base.mjs";
 *   export default [...base, { ignores: ["python/**"] }];
 *
 * Requires: eslint, @eslint/js, typescript-eslint, eslint-config-prettier
 */
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import prettier from "eslint-config-prettier";

export default tseslint.config(
  {
    ignores: [
      "**/node_modules/**",
      "**/dist/**",
      "**/coverage/**",
      "**/.next/**",
      "**/out/**",
      "**/.terraform/**",
      "**/.build/**",
    ],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  prettier,
  {
    files: ["**/*.{ts,tsx,mjs,js}"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
    },
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/consistent-type-imports": ["error", { prefer: "type-imports" }],
      "no-console": ["warn", { allow: ["warn", "error"] }],
    },
  },
);
