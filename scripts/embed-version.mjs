/**
 * Pins the embed script of @smarter.sh/ui-chat to an exact version, in its one snippet:
 * `make embed-version V=0.9.1`, or `npm run embed-version -- 0.9.1`. See doc/adr/004-cdn.md.
 */
import fs from "node:fs";
import path from "node:path";

const version = process.argv[2];
if (!/^\d+\.\d+\.\d+(-[\w.]+)?$/.test(version ?? "")) {
  console.error("usage: npm run embed-version -- <exact version, e.g. 0.9.1>");
  process.exit(2);
}
const file = path.resolve(import.meta.dirname, "../extensions/smarter-chat/snippets/smarter-chat-script-url.liquid");
const source = fs.readFileSync(file, "utf-8");
const updated = source.replace(/@smarter\.sh\/ui-chat@[^/]+\//, `@smarter.sh/ui-chat@${version}/`);
if (updated === source && !source.includes(`@${version}/`)) {
  console.error(`${file} has no @smarter.sh/ui-chat url`);
  process.exit(1);
}
fs.writeFileSync(file, updated);
console.log(`The embed script is @smarter.sh/ui-chat@${version}.`);
