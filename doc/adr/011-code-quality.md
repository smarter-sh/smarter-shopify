# ADR-011: Code Quality

## Status

Accepted

## Context

Liquid has one standard linter, Theme Check, and the rest of the repository is JavaScript, JSON and Markdown.

## Decision

- **Liquid:** Theme Check (ADR-008), and Prettier with `@shopify/prettier-plugin-liquid`.
- **Everything else:** Prettier, ESLint for the tests and scripts, codespell, the generic pre-commit hooks, and commitlint, as in every Smarter repository.

## Consequences

- **Positive:**
  - Shopify's own rules, plus Smarter's.

## Related ADRs

- [ADR-008: Testing](008-testing.md)
