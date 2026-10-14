---
name: smarter-code-quality
description: Use before finishing any change to smarter-shopify, to lint and format it - Prettier (with @shopify/prettier-plugin-liquid for Liquid), ESLint for the tests and scripts, Theme Check, codespell, the generic pre-commit hooks and commitlint. Explains which tools are authoritative and how to run them under zsh.
---

# Smarter Chat for Shopify: Code Quality

`.pre-commit-config.yaml` is the standard. Never bypass a hook.

| Tool        | Configuration      | Notes                                         |
| ----------- | ------------------ | --------------------------------------------- |
| Prettier    | `.prettierrc.json` | Liquid with `@shopify/prettier-plugin-liquid` |
| ESLint      | `eslint.config.js` | `test/` and `scripts/`                        |
| Theme Check | `.theme-check.yml` | `npm run theme-check`; part of `make test`    |
| codespell   | `codespell.txt`    |                                               |

```console
make lint
git diff --name-only | xargs pre-commit run --files
```

Use `xargs`: under zsh, `--files $FILES` is one argument. Let Prettier format
Liquid; if it produces something Theme Check rejects, fix the template, not the
formatter's output.
