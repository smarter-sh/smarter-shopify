# ADR-013: Documentation

## Status

Accepted

## Context

The app's users are merchants, who use the theme editor, and the Smarter customers who deploy the app, who read docs.smarter.sh.

## Decision

- **The blocks' settings** have help text (`info`) in the locale file, which is what merchants read.
- **docs.smarter.sh** has the page `smarter-framework/smarter-shopify.rst`, in the platform's repository, listed in Smarter APIs and SDKs: deploying the app, the merchant's steps, the LLMClient's `allowedOrigins`, and the no-app `theme.liquid` snippet.
- **`README.md`** is for the app's owner and contributors: deploy, develop, test.

## Consequences

- **Positive:**
  - Each audience has one place to look.
