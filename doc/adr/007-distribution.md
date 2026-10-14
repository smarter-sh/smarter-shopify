# ADR-007: Distribution

## Status

Accepted

## Context

A Shopify app reaches stores in one of three ways: as a **custom app** for one store (or one Plus organization), as a **public app listed on the Shopify App Store**, after Shopify's review, or as an unlisted public app. Each Smarter customer could also create their own app from this repository.

## Decision

- The repository is a template that any Smarter customer can deploy as **their own custom app**: `shopify app config link` creates the app in their Partner account, `shopify app deploy` publishes the extension, and they install it on their store.
- Smarter may later list one public app on the App Store, built from the same repository, once the review's requirements are met (ADR-004's consequence among them).
- Stores that don't want an app can paste the embed script's tag into `theme.liquid`, as docs.smarter.sh shows.

## Consequences

- **Positive:**
  - Usable today, without waiting for an App Store review.
- **Negative:**
  - Each customer who deploys it needs a Shopify Partner account.

## Related ADRs

- [ADR-003: An Extension-Only App](003-extension-only-app.md)
- [ADR-009: CI/CD and Releases](009-ci-cd.md)
