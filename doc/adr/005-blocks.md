# ADR-005: An App Embed and an App Block

## Status

Accepted

## Context

Theme app extensions offer two kinds of block: **app embed blocks**, which apply to the whole storefront (`target: "body"`), are turned on in Theme settings → App embeds, and suit floating elements; and **app blocks** (`target: "section"`), which merchants add to sections of a page.

## Decision

- **`blocks/launcher.liquid`**, an app embed, writes the embed script's tag before `</body>`, with `data-chatbot`, `data-position`, `data-label`, `data-color`, and optionally `data-api-key` and `data-open`. Its settings: chatbot url, api key, position, label, button color, start open.
- **`blocks/chat.liquid`**, an app block, writes a `<smarter-chat>` element and the script tag (the embed script defines the element once, however many times its tag is on the page). Its settings: chatbot url and height. Its api key is the launcher's only if the chatbot is the same, which a block can't know, so an app block has its own api key setting.
- Setting labels are in `locales/en.default.schema.json`, so that they can be translated.
- Nothing is written when the chatbot url is empty, so an enabled but unconfigured embed is harmless.

## Consequences

- **Positive:**
  - Both of the shapes that merchants ask for, with the theme editor's own placement and preview.
- **Negative:**
  - The api key is entered in each block that needs it.

## Related ADRs

- [ADR-002: The Embed Script Is the Chat](002-embed-script.md)
- [ADR-006: Security](006-security.md)
