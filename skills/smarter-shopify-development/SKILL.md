---
name: smarter-shopify-development
description: Start here for any change to the smarter-shopify repository, Smarter Chat for Shopify - an extension-only Shopify app whose theme app extension adds a Smarter chatbot to a store as an app embed (launcher) and an app block (inline chat), by writing the tag of @smarter.sh/ui-chat's embed script. Gives the rules, the extension's architecture, how a block setting becomes an attribute, how to add an option, the pinned embed version, and an index of the narrower skills.
---

# Smarter Chat for Shopify: Development

The extension is Liquid that writes the embed script's tag
(`../smarter-chat/src/embed/`, which is the chat). Merchants configure it in
the theme editor; there is no app server (`doc/adr/003-extension-only-app.md`).

## Non-negotiable rules

1. **Never execute git write commands**, and **never deploy** (`shopify app
deploy`, `shopify app release`, anything with a store or Partner token).
2. **`make test` after every change**: Vitest and Theme Check.
3. **Settings become attributes through `| escape`**, in double quotes. No
   value is ever written inside a `<script>`'s body.
4. **Setting ids are permanent.** Add new ones; never rename or remove one.
5. **The embed script's url is written in one place**,
   `snippets/smarter-chat-script-url.liquid`. Change it with
   `make embed-version V=x.y.z`.

## Architecture

| File                                                 | What it writes                                                                                         |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `blocks/launcher.liquid` (app embed, `target: body`) | `<script src="..." data-chatbot data-position data-label data-color [data-api-key] [data-open] async>` |
| `blocks/chat.liquid` (app block, `target: section`)  | `<smarter-chat chatbot height width [api-key]>` and the same script tag                                |
| `snippets/smarter-chat-script-url.liquid`            | The pinned jsDelivr url of `embed.js`                                                                  |
| `locales/en.default.schema.json`                     | Every `t:` label and help text of the schemas                                                          |

The embed script reads its script tag's `data-` attributes for the launcher,
and defines `<smarter-chat>` once, however many times its tag is on a page.

### Adding an option

1. Check `../smarter-chat/src/embed/options.ts` for it, and the version that
   added it; pin that version or later.
2. Add a setting to the block's `{% schema %}`, with a typed input where
   Shopify has one (`color`, `select`, `checkbox`, `range`), and its label and
   `info` to `locales/en.default.schema.json`.
3. Write it as an escaped attribute, only when it is set.
4. Add rendering tests (value, hostile value, unset) and run `make test`.
5. Describe it on `../smarter/docs/source/smarter-framework/smarter-shopify.rst`.

## Related skills

| Skill                     | Use it when                                             |
| ------------------------- | ------------------------------------------------------- |
| `smarter-shopify-testing` | Writing or running the tests, or Theme Check            |
| `smarter-code-quality`    | Before finishing: Prettier (Liquid), ESLint, pre-commit |
| `smarter-git-commits`     | Asked to write a commit message                         |
| `monthly-maintenance`     | Bumping the embed script, Shopify tooling, dependencies |
