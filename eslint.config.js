// ESLint for the tests and scripts. The extension itself is Liquid, which Theme Check lints. See
// skills/smarter-code-quality.
import js from "@eslint/js";
import globals from "globals";

export default [
  { ignores: ["node_modules/", "coverage/", "build/", "**/*.ts"] },
  js.configs.recommended,
  { files: ["**/*.{js,mjs}"], languageOptions: { globals: globals.node } },
];
