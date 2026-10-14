# ADR Introduction

Architectural Design Records (ADRs) are short documents that capture a single architectural or design decision, its context, and its consequences. Less is more: keep them brief.

These are the ADRs of Smarter Chat for Shopify, the Shopify app whose theme app extension adds a Smarter chatbot to a Shopify store. They follow the Smarter platform's own [ADRs](https://github.com/smarter-sh/smarter/tree/main/docs/source/adr) and those of the [Python SDK](https://github.com/smarter-sh/smarter-python/tree/main/doc/adr), from which this repository's layout is copied, and its siblings [for WordPress](https://github.com/smarter-sh/smarter-wordpress/tree/main/doc/adr) and [for Drupal](https://github.com/smarter-sh/smarter-drupal/tree/main/doc/adr).

See: [Michael Nygard's ADRs](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions.html)

## Guidelines for writing ADRs

- **One decision per ADR.**
- **Be concise.** Focus on clarity and brevity.
- **State the context:** the forces that led to the decision.
- **List the alternatives**, and why they weren't chosen.
- **Explain the decision**, and **describe its consequences**, positive and negative.
- **Use simple language**, for future contributors without today's context.
- **Use the same format** as the others, and **reference related ADRs**.

## Index

- [ADR-001: Scope of the App](001-scope.md)
- [ADR-002: The Embed Script Is the Chat](002-embed-script.md)
- [ADR-003: An Extension-Only App](003-extension-only-app.md)
- [ADR-004: The Embed Script Is Loaded from jsDelivr](004-cdn.md)
- [ADR-005: An App Embed and an App Block](005-blocks.md)
- [ADR-006: Security](006-security.md)
- [ADR-007: Distribution](007-distribution.md)
- [ADR-008: Testing](008-testing.md)
- [ADR-009: CI/CD and Releases](009-ci-cd.md)
- [ADR-010: Semantic Versioning](010-versioning.md)
- [ADR-011: Code Quality](011-code-quality.md)
- [ADR-012: Licensing](012-licensing.md)
- [ADR-013: Documentation](013-documentation.md)
