---
name: smarter-shopify-testing
description: Use when writing, fixing or running smarter-shopify's tests - Vitest tests that render the theme app extension's blocks with LiquidJS and a fake block.settings and parse the html, schema tests of each block's {% schema %} JSON and its locale labels, and Shopify's Theme Check through @shopify/theme-check-node. Covers what each proves, hostile-value tests, and why a development store check is still needed before a release.
---

# Smarter Chat for Shopify: Testing

`make test` runs `npm test` (Vitest) and `npm run theme-check`.

## Rendering tests (`test/blocks.test.ts`)

`test/liquid.ts` builds a LiquidJS engine that reads
`extensions/smarter-chat/`, registers a `schema` tag that renders nothing, and
renders a block with `{ block: { settings, id } }`. Parse the result with
`DOMParser` (jsdom), never with regular expressions, and assert on attributes:

- each setting reaches its attribute; optional attributes are absent when unset,
- a hostile value (`"><script>alert(1)</script>`, `javascript:` urls) comes out
  as one attribute's text, and adds no element,
- nothing is rendered without a chatbot,
- the script url is the snippet's, pinned to an exact version.

LiquidJS's `escape` is Shopify's (`&`, `<`, `>`, `"`, `'`), so these tests are
meaningful for escaping, but LiquidJS is not Shopify's renderer: objects like
`request` or `shop` must be faked if a block starts to use them.

## Schema tests (`test/schema.test.ts`)

Each block's `{% schema %}` is valid JSON with the right `target`, unique
setting ids, defaults within `range`s and `select` options, and every `t:`
key present in `locales/en.default.schema.json`. A test also lists the
setting ids that exist today: removing or renaming one fails it on purpose
(`doc/adr/010-versioning.md`).

## Theme Check

`scripts/theme-check.mjs` runs Shopify's Theme Check on the extension with the
`theme-app-extension` configuration and fails on any offense of severity error
or warning, except where `.theme-check.yml` says why.

## Before a release

`npx shopify app dev` on a development store, by the app's owner: enable the
app embed, add the block, check both in the storefront. Not automated, because
it needs Shopify credentials.
