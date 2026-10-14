/**
 * Renders the theme app extension's blocks with LiquidJS, as Shopify would, for the tests.
 *
 * LiquidJS has Liquid's standard tags and filters, whose `escape` is Shopify's. Shopify's own additions that the
 * blocks use are added here: the `schema` tag (which renders nothing), the `t` filter (from locales/en.default.json),
 * and snippets for `render`. Anything else Shopify-only must be faked here before a block uses it.
 */
import fs from "node:fs";
import path from "node:path";
import { Liquid, type TagToken, type TopLevelToken } from "liquidjs";

export const EXTENSION = path.resolve(import.meta.dirname, "../extensions/smarter-chat");

const locale = JSON.parse(fs.readFileSync(path.join(EXTENSION, "locales/en.default.json"), "utf-8"));

export const engine = new Liquid({
  root: [path.join(EXTENSION, "blocks")],
  partials: [path.join(EXTENSION, "snippets")],
  extname: ".liquid",
  strictFilters: true,
});

engine.registerTag("schema", {
  parse(token: TagToken, remainTokens: TopLevelToken[]) {
    // skip to {% endschema %}.
    while (remainTokens.length) {
      const next = remainTokens.shift() as TagToken;
      if (next.name === "endschema") return;
    }
    throw new Error(`{% schema %} without {% endschema %} in ${token.file}`);
  },
  render() {
    return "";
  },
});

engine.registerFilter("t", (key: string) =>
  String(key.split(".").reduce((node, part) => (node as Record<string, unknown>)?.[part], locale as unknown) ?? key),
);

export interface RenderOptions {
  settings: Record<string, unknown>;
  designMode?: boolean;
}

/** A block's html, rendered with its settings. */
export async function renderBlock(name: string, { settings, designMode = false }: RenderOptions): Promise<string> {
  return engine.renderFile(name, {
    block: { id: "block-1", settings, shopify_attributes: 'data-shopify-editor-block="{}"' },
    request: { design_mode: designMode },
  });
}

/** A block's html, parsed. */
export async function renderDocument(name: string, options: RenderOptions): Promise<Document> {
  return new DOMParser().parseFromString(`<body>${await renderBlock(name, options)}</body>`, "text/html");
}

/** A block's {% schema %} JSON. */
export function blockSchema(name: string): {
  name: string;
  target: string;
  settings: { id: string; type: string; label: string; info?: string; default?: unknown; [key: string]: unknown }[];
} {
  const source = fs.readFileSync(path.join(EXTENSION, "blocks", `${name}.liquid`), "utf-8");
  const match = /{%\s*schema\s*%}([\s\S]*?){%\s*endschema\s*%}/.exec(source);
  if (!match) throw new Error(`blocks/${name}.liquid has no {% schema %}`);
  return JSON.parse(match[1]);
}

/** The pinned url of the embed script, from its snippet. */
export function scriptUrl(): string {
  const snippet = fs.readFileSync(path.join(EXTENSION, "snippets/smarter-chat-script-url.liquid"), "utf-8");
  return snippet.replace(/{%-?\s*comment\s*-?%}[\s\S]*?{%-?\s*endcomment\s*-?%}/, "").trim();
}
