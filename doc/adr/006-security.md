# ADR-006: Security

## Status

Accepted

Same principles as Smarter Chat for WordPress's [ADR-006](https://github.com/smarter-sh/smarter-wordpress/blob/main/doc/adr/006-security.md).

## Context

The blocks write merchant-entered values into every storefront page. Liquid has no url or css validators of its own.

## Decision

- **Every value is written as an html attribute, through Liquid's `escape` filter**, never into inline JavaScript. The embed script then validates each value (an `http(s)` chatbot url, plain css values, known positions), and ignores invalid ones.
- **Typed settings** narrow the input: `color` for the button color, `select` for the position, `checkbox` for start open, `range` for the height.
- **No inline script**, so a store's Content Security Policy needs only `script-src` for jsDelivr, and the chat's own `connect-src` for the Smarter platform.
- **The api key is public** in the page. The setting's help text says so, and recommends an LLMClient without api keys, with a budget, or a key dedicated to the store.
- The LLMClient's manifest must list the store's origins (`https://<store>.myshopify.com` and its custom domains) in `allowedOrigins`.

## Consequences

- **Positive:**
  - A setting can't inject markup or script.
- **Negative:**
  - Invalid values are ignored by the embed script, in the browser, rather than rejected in the theme editor.

## Related ADRs

- [ADR-005: An App Embed and an App Block](005-blocks.md)
