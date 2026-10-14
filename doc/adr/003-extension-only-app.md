# ADR-003: An Extension-Only App

## Status

Accepted

## Context

A theme app extension must belong to a Shopify app. A Shopify app usually has a server, for OAuth and the Admin API, which someone must host, secure and keep running. The chat doesn't need the store's data: the LLMClient's own plugins reach whatever data it needs, from the Smarter platform.

## Decision

The app is an **extension-only app**: `shopify.app.toml` with Shopify's default app home and no access scopes, and one theme app extension, `extensions/smarter-chat`. There is no server, no OAuth, no webhook and no database. The app is created in the Shopify Partner Dashboard (or with `shopify app config link`), which gives it its `client_id`, and deployed with `shopify app deploy`.

## Alternatives Considered

- **A full app (Remix template) with an admin page** for the settings. The theme editor already is the settings screen for blocks, and a server would be the only part of Smarter Chat that has to be hosted.

## Consequences

- **Positive:**
  - Nothing to host, and no merchant data to protect.
- **Negative:**
  - Settings live in each theme's block settings: a merchant who switches themes enables the app embed again.

## Related ADRs

- [ADR-001: Scope of the App](001-scope.md)
- [ADR-007: Distribution](007-distribution.md)
