/**
 * The tests: test/*.test.ts, in jsdom, so that rendered blocks are parsed with DOMParser. See
 * skills/smarter-shopify-testing.
 */
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    include: ["test/**/*.test.ts"],
  },
});
