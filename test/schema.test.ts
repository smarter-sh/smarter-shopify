import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

import { EXTENSION, blockSchema } from "./liquid";

const schemaLocale = JSON.parse(fs.readFileSync(path.join(EXTENSION, "locales/en.default.schema.json"), "utf-8"));

/** Every "t:" key in a value, at any depth. */
function translationKeys(value: unknown): string[] {
  if (typeof value === "string") return value.startsWith("t:") ? [value.slice(2)] : [];
  if (Array.isArray(value)) return value.flatMap(translationKeys);
  if (value && typeof value === "object") return Object.values(value).flatMap(translationKeys);
  return [];
}

function translate(key: string): unknown {
  return key
    .split(".")
    .reduce((node, part) => (node as Record<string, unknown> | undefined)?.[part], schemaLocale as unknown);
}

// the setting ids that merchants' themes store values by. Removing or renaming one loses their values: add new
// settings instead (doc/adr/010-versioning.md).
const SETTING_IDS = {
  launcher: ["chatbot", "api_key", "position", "label", "color", "open"],
  chat: ["chatbot", "api_key", "height"],
};

describe.each([
  ["launcher", "body"],
  ["chat", "section"],
])("blocks/%s.liquid's schema", (name, target) => {
  const schema = blockSchema(name);

  it(`targets ${target}`, () => {
    expect(schema.target).toBe(target);
  });

  it("keeps its setting ids, and has no duplicates", () => {
    const ids = schema.settings.map((setting) => setting.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids).toEqual(expect.arrayContaining(SETTING_IDS[name as keyof typeof SETTING_IDS]));
  });

  it("has a label for every setting, in the locale file", () => {
    for (const setting of schema.settings) expect(setting.label, setting.id).toMatch(/^t:/);
    for (const key of translationKeys(schema)) expect(typeof translate(key), key).toBe("string");
  });

  it("has defaults within each setting's options and range", () => {
    for (const setting of schema.settings) {
      if (setting.type === "select") {
        const values = (setting.options as { value: string }[]).map((option) => option.value);
        expect(values, setting.id).toContain(setting.default);
      }
      if (setting.type === "range") {
        const { min, max, step } = setting as unknown as { min: number; max: number; step: number };
        expect(setting.default as number).toBeGreaterThanOrEqual(min);
        expect(setting.default as number).toBeLessThanOrEqual(max);
        expect(((setting.default as number) - min) % step).toBe(0);
        // Shopify allows at most 101 steps in a range.
        expect((max - min) / step).toBeLessThanOrEqual(100);
      }
    }
  });
});

describe("the launcher's positions", () => {
  it("are the embed script's", () => {
    const position = blockSchema("launcher").settings.find((setting) => setting.id === "position")!;
    expect((position.options as { value: string }[]).map((option) => option.value)).toEqual([
      "bottom-right",
      "bottom-left",
    ]);
  });
});
