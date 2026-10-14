# ADR-008: Testing

## Status

Accepted

Follows the Python SDK's [ADR-009: Testing](https://github.com/smarter-sh/smarter-python/blob/main/doc/adr/009-testing.md).

## Context

The extension is Liquid and JSON. Shopify renders it, so it can't be run locally without the Shopify CLI and a development store. Its mistakes are an unescaped value, a missing setting, a schema that the theme editor rejects, or a tag that the embed script can't read.

## Decision

- **Unit tests** with Vitest render each block with [LiquidJS](https://liquidjs.com), with Shopify's `escape` semantics and a fake `block.settings`, and parse the html: every setting reaches the right attribute, hostile values are escaped, nothing is written without a chatbot, and the script url is the snippet's.
- **Schema tests** parse each block's `{% schema %}` JSON: valid JSON, the target, unique setting ids, every `t:` label present in the locale file, every option of the embed script that a block writes has a setting.
- **[Theme Check](https://shopify.dev/docs/storefronts/themes/tools/theme-check)**, Shopify's linter, through `@shopify/theme-check-node`, with its theme app extension configuration, in `npm run theme-check`.
- Before a release, `shopify app dev` on a development store, checked by hand in the theme editor and the storefront.

## Consequences

- **Positive:**
  - Fast tests, without a store or Shopify credentials, and Shopify's own linter in CI.
- **Negative:**
  - LiquidJS is not Shopify's Liquid: the development store check is still needed for a release.

## Related ADRs

- [ADR-009: CI/CD and Releases](009-ci-cd.md)
