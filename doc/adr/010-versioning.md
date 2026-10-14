# ADR-010: Semantic Versioning

## Status

Accepted

## Context

Shopify versions each deploy of an app's extensions itself. Merchants don't see a version.

## Decision

The repository follows semantic versioning with semantic-release, from conventional commits, in `package.json` and git tags, so that app owners know what changed between the versions they deploy. Updating the embed script to a new minor version is a `feat`; to a patch, a `fix`. A block setting's `id` is never renamed or removed in a minor release: Shopify keeps merchants' values by id.

## Consequences

- **Positive:**
  - The same release notes as every Smarter repository.
- **Negative:**
  - The repository's version and Shopify's app versions are unrelated numbers.

## Related ADRs

- [ADR-009: CI/CD and Releases](009-ci-cd.md)
