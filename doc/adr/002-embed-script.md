# ADR-002: The Embed Script Is the Chat

## Status

Accepted

Same decision as Smarter Chat for WordPress's [ADR-002](https://github.com/smarter-sh/smarter-wordpress/blob/main/doc/adr/002-embed-script.md).

## Context

Shopify themes don't have React, and their css is the theme's. `@smarter.sh/ui-chat`'s `dist/embed.js` is one classic script that includes React and the chat, renders it in a Shadow DOM, and reads its options from its script tag's `data-` attributes or a `<smarter-chat>` element's attributes.

## Decision

The extension's Liquid writes the embed script's tag, with the block's settings as `data-` attributes (the app embed), or a `<smarter-chat>` element (the app block). The settings are the embed script's options, with the same names in snake_case. The extension is built and tested with one version of the embed script, in its url (ADR-004).

## Consequences

- **Positive:**
  - No JavaScript of our own, no build, and nothing for the theme's css to break.
- **Negative:**
  - About 330 kB of JavaScript (gzipped), once, on pages with the chat.

## Related ADRs

- [ADR-004: The Embed Script Is Loaded from jsDelivr](004-cdn.md)
- [ADR-005: An App Embed and an App Block](005-blocks.md)
