# ADR-009: CI/CD and Releases

## Status

Accepted

## Context

Deploying the extension needs the app's Shopify credentials, which belong to whoever deploys it (ADR-007).

## Decision

GitHub Actions run the tests and Theme Check for every push and pull request (`test.yml`), and semantic-release on `main`, `beta` and `alpha` (`pushMain.yml`). Deploying is `shopify app deploy`, by the app's owner, by hand or in their own pipeline with a `SHOPIFY_CLI_PARTNERS_TOKEN`. This repository's CI never deploys.

## Consequences

- **Positive:**
  - No Shopify credentials in this repository's CI.
- **Negative:**
  - Deploying is the app owner's step.

## Related ADRs

- [ADR-007: Distribution](007-distribution.md)
- [ADR-008: Testing](008-testing.md)
