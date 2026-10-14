# ADR-001: Scope of the App

## Status

Accepted

Same decision as Smarter Chat for WordPress's [ADR-001](https://github.com/smarter-sh/smarter-wordpress/blob/main/doc/adr/001-scope.md).

## Context

Merchants want a chatbot that knows their catalog, policies and shipping, and Smarter LLMClients can be that chatbot, with plugins that call the store's data. Shopify themes are edited in the theme editor, not in code, and Shopify's supported way to add something to a theme without editing its code is a [theme app extension](https://shopify.dev/docs/apps/build/online-store/theme-app-extensions).

## Decision

Smarter Chat for Shopify is a theme app extension, in an app (ADR-003), with:

- an **app embed** (Smarter Chat launcher): a chat button in a corner of every page of the storefront, which merchants turn on in Theme settings → App embeds,
- an **app block** (Smarter Chat): the chat in a section of a page, e.g. a Contact page, which merchants add in the theme editor.

Both write the embed script's tag with the merchant's settings (ADR-002, ADR-005). The app has no chat code, no server, and no access to the store's data.

## Alternatives Considered

- **A ScriptTag (Admin API).** Deprecated for the Online Store, and needs an app server with OAuth.
- **Only documenting a `theme.liquid` snippet.** Lost when the merchant changes or updates the theme, and merchants don't edit Liquid. The docs still show it, for stores that prefer it (ADR-013).

## Consequences

- **Positive:**
  - Merchants install, configure and remove it in the theme editor, without code, and theme updates keep it.
- **Negative:**
  - Shopify's app distribution has its own review and listing process (ADR-007).

## Related ADRs

- [ADR-003: An Extension-Only App](003-extension-only-app.md)
- [ADR-005: An App Embed and an App Block](005-blocks.md)
