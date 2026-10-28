// The home page fits in 8 screens at 1440×900 and 12 at 390×844 (a recruiter's
// scan). Needs a production build and Chrome: `pnpm build && pnpm test:height`.
// Set CHROME_PATH when Chrome is not in its usual place.
import test from "node:test";
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { existsSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const port = 3391;
const limits = [
  { width: 1440, height: 900, mobile: false, screens: 8 },
  { width: 390, height: 844, mobile: true, screens: 12 },
];

const chromePath = [
  process.env.CHROME_PATH,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/google-chrome-stable",
  "/usr/bin/chromium",
].find((path) => path && existsSync(path));

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function waitFor(url) {
  for (let attempt = 0; attempt < 120; attempt += 1) {
    try {
      if ((await fetch(url)).ok) return;
    } catch {}
    await sleep(500);
  }
  throw new Error(`${url} did not answer`);
}

// A minimal DevTools Protocol client over one browser WebSocket.
function connect(url) {
  const socket = new WebSocket(url);
  let id = 0;
  const pending = new Map();
  const listeners = new Set();
  socket.addEventListener("message", ({ data }) => {
    const message = JSON.parse(data);
    if (message.id && pending.has(message.id)) {
      const { resolve, reject } = pending.get(message.id);
      pending.delete(message.id);
      if (message.error) reject(new Error(message.error.message));
      else resolve(message.result);
    } else {
      for (const listener of listeners) listener(message);
    }
  });
  const send = (method, params = {}, sessionId) =>
    new Promise((resolve, reject) => {
      id += 1;
      pending.set(id, { resolve, reject });
      socket.send(JSON.stringify({ id, method, params, sessionId }));
    });
  const once = (method, sessionId) =>
    new Promise((resolve) => {
      const listener = (message) => {
        if (message.method === method && message.sessionId === sessionId) {
          listeners.delete(listener);
          resolve(message.params);
        }
      };
      listeners.add(listener);
    });
  return new Promise((resolve) =>
    socket.addEventListener("open", () => resolve({ send, once, close: () => socket.close() })),
  );
}

test("the home page fits in 8 screens on a laptop and 12 on a phone", { skip: !chromePath && "Chrome not found" }, async () => {
  const server = spawn(join(root, "node_modules/.bin/next"), ["start", "-p", String(port)], { cwd: root, stdio: "ignore" });
  const profile = mkdtempSync(join(tmpdir(), "home-height-"));
  const chrome = spawn(chromePath, ["--headless=new", "--remote-debugging-port=0", `--user-data-dir=${profile}`, "--no-first-run", "about:blank"], {
    stdio: ["ignore", "ignore", "pipe"],
  });

  try {
    const endpoint = await new Promise((resolve, reject) => {
      let log = "";
      chrome.stderr.on("data", (chunk) => {
        log += chunk;
        const match = log.match(/DevTools listening on (ws:\/\/\S+)/);
        if (match) resolve(match[1]);
      });
      chrome.on("exit", () => reject(new Error("Chrome exited")));
    });
    await waitFor(`http://localhost:${port}/es`);
    const cdp = await connect(endpoint);

    for (const locale of ["es", "en"]) {
      for (const { width, height, mobile, screens } of limits) {
        const { targetId } = await cdp.send("Target.createTarget", { url: "about:blank" });
        const { sessionId } = await cdp.send("Target.attachToTarget", { targetId, flatten: true });
        await cdp.send("Page.enable", {}, sessionId);
        await cdp.send("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile }, sessionId);
        const loaded = cdp.once("Page.loadEventFired", sessionId);
        await cdp.send("Page.navigate", { url: `http://localhost:${port}/${locale}` }, sessionId);
        await loaded;
        const { result } = await cdp.send(
          "Runtime.evaluate",
          {
            expression: "document.fonts.ready.then(() => new Promise((r) => setTimeout(r, 800))).then(() => document.documentElement.scrollHeight)",
            awaitPromise: true,
            returnByValue: true,
          },
          sessionId,
        );
        const total = result.value;
        assert.ok(
          total <= screens * height,
          `/${locale} at ${width}: ${total}px is ${(total / height).toFixed(1)} screens (limit ${screens})`,
        );
        await cdp.send("Target.closeTarget", { targetId });
      }
    }
    cdp.close();
  } finally {
    const closed = new Promise((resolve) => chrome.once("exit", resolve));
    chrome.kill();
    server.kill();
    await Promise.race([closed, sleep(5000)]);
    rmSync(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });
  }
});
