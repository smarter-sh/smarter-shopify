---
name: monthly-maintenance
description: Use when asked to do smarter-shopify's monthly maintenance, or part of it - pin the latest @smarter.sh/ui-chat embed script and pick up its new options, update the Shopify tooling (@shopify/cli, theme-check, the Liquid Prettier plugin) and the other npm dev dependencies, retest with Theme Check, and write a "fix" or "feat" git commit.
---

# Monthly Maintenance

1. **The embed script.** Compare the version in
   `extensions/smarter-chat/snippets/smarter-chat-script-url.liquid` with
   `npm view @smarter.sh/ui-chat version`. Read `../smarter-chat/CHANGELOG.md`
   between them, especially `src/embed/options.ts`. Pin it with
   `make embed-version V=<version>`, and add settings for new options (see
   "Adding an option" in `smarter-shopify-development`). Minor: `feat`; patch: `fix`.
2. **Shopify tooling and dependencies.** `npm update`, then check
   `@shopify/theme-check-node`'s changelog for new checks; `pre-commit autoupdate`.
3. **Test.** `make lint test`.
4. **Commit.** Load `smarter-git-commits`, and name the embed version tested.
   Remind the user that the app's owner deploys it (`shopify app deploy`).
