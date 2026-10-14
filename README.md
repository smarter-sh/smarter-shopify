# Smarter Chat for Shopify

> Add a [Smarter](https://smarter.sh) chatbot to a Shopify store, from the theme editor: a chat launcher on every
> page, and a Smarter Chat block for any section.

[![Build](https://github.com/smarter-sh/smarter-shopify/actions/workflows/pushMain.yml/badge.svg?branch=main)](https://github.com/smarter-sh/smarter-shopify/actions/workflows/pushMain.yml)
[![Test](https://github.com/smarter-sh/smarter-shopify/actions/workflows/test.yml/badge.svg?branch=main)](https://github.com/smarter-sh/smarter-shopify/actions/workflows/test.yml)
[![License: AGPL v3](https://img.shields.io/badge/license-AGPL--3.0--or--later-blue)](LICENSE.txt)

This is an extension-only Shopify app: a [theme app extension](https://shopify.dev/docs/apps/build/online-store/theme-app-extensions)
with an **app embed** (Smarter Chat launcher) and an **app block** (Smarter Chat), and no server. The chat itself is the
embed script of [`@smarter.sh/ui-chat`](https://github.com/smarter-sh/smarter-chat), which renders it in a Shadow DOM,
so the theme can't break it. The chatbot is an LLMClient that you build and deploy on a Smarter platform.

**[User guide](https://docs.smarter.sh/en/latest/smarter-framework/smarter-shopify.html)** ·
**[Architecture decisions](doc/adr/000-intro.md)**

## Deploy it as your store's app

You need a [Shopify Partner](https://www.shopify.com/partners) account and Node.js 22 or later.

```console
git clone https://github.com/smarter-sh/smarter-shopify.git && cd smarter-shopify
make init
npx shopify app config link     # create the app in your Partner account; writes its client_id
npx shopify app deploy          # publish the theme app extension
```

Then install the app on your store from the Partner Dashboard, and, in the theme editor:

1. **Theme settings → App embeds → Smarter Chat launcher**: turn it on, and enter the deployed LLMClient's url.
2. Or **Add block → Apps → Smarter Chat** in any section, for the chat in a page.

The LLMClient's manifest must allow the store's origins, `https://<store>.myshopify.com` and its custom domains:

```yaml
spec:
  config:
    prompt:
      allowedOrigins:
        - https://example.myshopify.com
        - https://www.example.com
```

Don't commit your `client_id` to a fork that you publish: it identifies your app.

## Development

```console
make test               # LiquidJS rendering and schema tests, then Shopify's Theme Check
make lint               # ESLint and Prettier (with the Liquid plugin)
npx shopify app dev     # preview on a development store
make embed-version V=0.9.1
```

The repository is developed with [Agent Skills](skills/README.md) for AI coding agents; start with
[CLAUDE.md](CLAUDE.md). See [CONTRIBUTING.md](.github/CONTRIBUTING.md).

## License

[AGPL-3.0-or-later](LICENSE.txt), as Smarter is.
