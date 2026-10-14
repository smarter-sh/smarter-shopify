# CLAUDE.md

Guidance for Claude Code (and other coding agents) working in this repository.

smarter-shopify is **Smarter Chat for Shopify**: an extension-only Shopify app
whose theme app extension (`extensions/smarter-chat/`) adds a Smarter chatbot
to a store, as an **app embed** (a launcher on every page) and an **app block**
(the chat in a section). It has no server and no chat code of its own: its
Liquid writes the tag of the embed script of
[`@smarter.sh/ui-chat`](https://github.com/smarter-sh/smarter-chat)
(`../smarter-chat`), loaded from jsDelivr. The chatbot is an LLMClient on a
Smarter platform ([smarter-sh/smarter](https://github.com/smarter-sh/smarter), `../smarter`).
Its siblings `../smarter-wordpress` and `../smarter-drupal` make the same
decisions where they can.

Detailed know-how lives in the Agent Skills under `skills/` (symlinked to
`.claude/skills`). **Load `smarter-shopify-development` first for any change.**

## Hard rules

1. **Never run git write commands**, here, in `../smarter` or in
   `../smarter-chat`. "Write a git commit" means print the command as text.
   See `smarter-git-commits`.
2. **Never run `shopify app deploy`** or anything else that changes a Shopify
   app or store. Deploying is the app owner's step (`doc/adr/009-ci-cd.md`).
3. **Run the tests yourself** after any change (`make test`, which includes
   Theme Check). Report failures honestly.
4. **Every setting reaches the page as an escaped attribute** (`| escape`),
   never inside a `<script>`'s code. See `doc/adr/006-security.md`.
5. **Never rename or remove a block setting's `id`**: merchants' values are
   stored by id.
6. **This repository is public.** No api keys, store names, client ids,
   tokens or customer data anywhere.
7. **Don't reimplement the chat.** A missing feature belongs in
   `../smarter-chat`'s embed script first.

## Repository map

| Path                                             | Contents                                                        |
| ------------------------------------------------ | --------------------------------------------------------------- |
| `shopify.app.toml`                               | The extension-only app's configuration (no scopes, no server)   |
| `extensions/smarter-chat/shopify.extension.toml` | The theme app extension                                         |
| `extensions/smarter-chat/blocks/launcher.liquid` | The app embed: the launcher                                     |
| `extensions/smarter-chat/blocks/chat.liquid`     | The app block: the chat in a section                            |
| `extensions/smarter-chat/snippets/`              | `smarter-chat-script-url.liquid`: the embed script's pinned url |
| `extensions/smarter-chat/locales/`               | The settings' labels and help text                              |
| `test/`                                          | Vitest + LiquidJS rendering and schema tests                    |
| `scripts/`                                       | `theme-check.mjs`, `embed-version.mjs`                          |
| `doc/adr/`, `skills/`                            | Architecture decisions, Agent Skills                            |

User documentation lives in the platform's repository:
`../smarter/docs/source/smarter-framework/smarter-shopify.rst`.

## Common commands

```bash
make init              # npm dev dependencies, venv/ (pre-commit, codespell), hooks
make test              # Vitest, then Theme Check
make lint              # ESLint and Prettier (with the Liquid plugin)
make embed-version V=0.9.1   # pin another version of the embed script
npx shopify app dev    # the app owner, on a development store (not in CI)
```

## Definition of done

- The change follows an existing pattern and the ADRs in `doc/adr/`.
- Tests and Theme Check pass, and you ran them.
- Pre-commit hooks pass on the changed files.
- The locale file and docs.smarter.sh describe user-facing changes.
- Your summary says what changed, what you verified, and what you skipped
  (such as the check on a development store, which needs Shopify credentials).
