/**
 * Shopify's Theme Check, on the theme app extension, with its theme-app-extension checks (the defaults when the
 * directory has a *.extension.toml), or extensions/smarter-chat/.theme-check.yml when it exists. Fails on any error
 * or warning. `npm run theme-check`, part of `make test`. See doc/adr/008-testing.md.
 */
import fs from "node:fs";
import path from "node:path";
import { Severity, themeCheckRun } from "@shopify/theme-check-node";

const root = path.resolve(import.meta.dirname, "../extensions/smarter-chat");
const configPath = path.join(root, ".theme-check.yml");
const names = { [Severity.ERROR]: "error", [Severity.WARNING]: "warning", [Severity.INFO]: "info" };

const { offenses } = await themeCheckRun(root, fs.existsSync(configPath) ? configPath : undefined, () => {});
for (const offense of offenses) {
  const file = path.relative(root, new URL(offense.uri).pathname);
  const line = offense.start.line + 1;
  console.log(`${names[offense.severity] ?? offense.severity}: ${file}:${line} ${offense.check}: ${offense.message}`);
}
const failing = offenses.filter((offense) => offense.severity <= Severity.WARNING);
console.log(`Theme Check: ${offenses.length} offense(s), ${failing.length} error(s) or warning(s).`);
process.exit(failing.length > 0 ? 1 : 0);
