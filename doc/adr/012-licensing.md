# ADR-012: Licensing

## Status

Accepted

## Context

Shopify places no license requirement on apps. Smarter and `@smarter.sh/ui-chat` are AGPL-3.0-or-later.

## Decision

AGPL-3.0-or-later, as Smarter is. The extension doesn't contain the embed script (ADR-004).

## Consequences

- **Positive:**
  - The same license as Smarter.
- **Negative:**
  - A customer who modifies the app and deploys it must offer their changes' source, as with Smarter itself.
