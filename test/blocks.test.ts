import { describe, expect, it } from "vitest";

import { renderBlock, renderDocument, scriptUrl } from "./liquid";

const CHATBOT = "https://support.3141-5926-5359.api.example.com/";
const HOSTILE = `"><script>alert(1)</script><x y='`;

const launcherDefaults = {
  chatbot: CHATBOT,
  api_key: "",
  position: "bottom-right",
  label: "Chat",
  color: "#ff5733",
  open: false,
};

describe("the embed script's url", () => {
  it("is pinned to an exact version on jsDelivr", () => {
    expect(scriptUrl()).toMatch(
      /^https:\/\/cdn\.jsdelivr\.net\/npm\/@smarter\.sh\/ui-chat@\d+\.\d+\.\d+\/dist\/embed\.js$/,
    );
  });
});

describe("the launcher (app embed)", () => {
  it("writes the embed script's tag, async, with the settings as data- attributes", async () => {
    const doc = await renderDocument("launcher", {
      settings: { ...launcherDefaults, position: "bottom-left", label: "Ask us" },
    });
    const scripts = doc.querySelectorAll("script");
    expect(scripts).toHaveLength(1);
    const script = scripts[0];
    expect(script.getAttribute("src")).toBe(scriptUrl());
    expect(script.hasAttribute("async")).toBe(true);
    expect({ ...script.dataset }).toEqual({
      chatbot: CHATBOT,
      position: "bottom-left",
      label: "Ask us",
      color: "#ff5733",
    });
    expect(script.textContent).toBe("");
  });

  it("adds the api key and start open only when they are set", async () => {
    const doc = await renderDocument("launcher", { settings: { ...launcherDefaults, api_key: " key-1 ", open: true } });
    const script = doc.querySelector("script")!;
    expect(script.dataset.apiKey).toBe("key-1");
    expect(script.dataset.open).toBe("true");
  });

  it("uses the default label when it is empty", async () => {
    const doc = await renderDocument("launcher", { settings: { ...launcherDefaults, label: "" } });
    expect(doc.querySelector("script")!.dataset.label).toBe("Chat");
  });

  it("writes nothing without a chatbot", async () => {
    expect((await renderBlock("launcher", { settings: { ...launcherDefaults, chatbot: "  " } })).trim()).toBe("");
    expect((await renderBlock("launcher", { settings: { ...launcherDefaults, chatbot: null } })).trim()).toBe("");
  });

  it("escapes hostile values into attribute text", async () => {
    const doc = await renderDocument("launcher", {
      settings: {
        ...launcherDefaults,
        chatbot: `javascript:alert(1)${HOSTILE}`,
        label: HOSTILE,
        api_key: HOSTILE,
        color: HOSTILE,
      },
    });
    const scripts = doc.querySelectorAll("script");
    expect(scripts).toHaveLength(1);
    expect(doc.querySelector("x")).toBeNull();
    const script = scripts[0];
    expect(script.dataset.label).toBe(HOSTILE);
    expect(script.dataset.apiKey).toBe(HOSTILE);
    // the embed script rejects a chatbot that isn't an http(s) url: the attribute only has to hold it.
    expect(script.dataset.chatbot).toBe(`javascript:alert(1)${HOSTILE}`);
    expect(script.textContent).toBe("");
  });
});

describe("the chat (app block)", () => {
  it("writes a <smarter-chat> element with its height, and the embed script's tag", async () => {
    const doc = await renderDocument("chat", { settings: { chatbot: CHATBOT, api_key: "", height: 480 } });
    const chat = doc.querySelector("smarter-chat")!;
    expect(chat.getAttribute("chatbot")).toBe(CHATBOT);
    expect(chat.getAttribute("height")).toBe("480px");
    expect(chat.getAttribute("width")).toBe("100%");
    expect(chat.hasAttribute("api-key")).toBe(false);
    // the theme editor selects the block by these attributes.
    expect(chat.parentElement!.getAttribute("data-shopify-editor-block")).toBe("{}");
    const script = doc.querySelector("script")!;
    expect(script.getAttribute("src")).toBe(scriptUrl());
    expect(script.hasAttribute("async")).toBe(true);
  });

  it("adds the api key when it is set, and uses the default height", async () => {
    const doc = await renderDocument("chat", { settings: { chatbot: CHATBOT, api_key: "key-2" } });
    const chat = doc.querySelector("smarter-chat")!;
    expect(chat.getAttribute("api-key")).toBe("key-2");
    expect(chat.getAttribute("height")).toBe("600px");
  });

  it("escapes hostile values", async () => {
    const doc = await renderDocument("chat", { settings: { chatbot: HOSTILE, api_key: HOSTILE, height: 500 } });
    expect(doc.querySelectorAll("script")).toHaveLength(1);
    expect(doc.querySelector("x")).toBeNull();
    expect(doc.querySelector("smarter-chat")!.getAttribute("chatbot")).toBe(HOSTILE.trim());
  });

  it("without a chatbot, shows a placeholder in the theme editor, and nothing in the storefront", async () => {
    const editor = await renderDocument("chat", { settings: { chatbot: "" }, designMode: true });
    expect(editor.querySelector("p.smarter-chat-block")!.textContent).toContain("enter your chatbot's url");
    expect(editor.querySelector("script")).toBeNull();
    expect((await renderBlock("chat", { settings: { chatbot: "" } })).trim()).toBe("");
  });
});
