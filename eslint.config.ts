import js from "@eslint/js";
import globals from "globals";
import json from "@eslint/json";
import tseslint from "typescript-eslint";
import { globalIgnores } from "eslint/config";
import perfectionist from "eslint-plugin-perfectionist";

export default tseslint.config(
  tseslint.configs.recommended,
  json.configs.recommended,
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    languageOptions: { globals: globals.node },
  },
  js.configs.recommended,
  {
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
      },
    },
    rules: {
      "no-unused-vars": "off",
      "no-undef": "off",
      "constructor-super": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          args: "all",
          argsIgnorePattern: "^_",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: "enumMember",
          format: ["UPPER_CASE"],
        },
      ],
    },
  },
  {
    plugins: {
      perfectionist,
    },
    rules: {
      "perfectionist/sort-imports": "error",
    },
    settings: {
      perfectionist: {
        type: "line-length",
        partitionByComment: true,
      },
    },
  },
  globalIgnores(["./dist/*", "./game/*"])
);
