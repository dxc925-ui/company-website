import { spawn } from "child_process";
import { WebSocket } from "ws";
import fs from "fs";

const CHROME = "C:\\Users\\dxc92\\AppData\\Local\\ms-playwright\\chromium-1208\\chrome-win64\\chrome.exe";

const chrome = spawn(CHROME, [
  "--headless",
  "--disable-gpu",
  "--no-sandbox",
  "--remote-debugging-port=9226",
  "--remote-allow-origins=*",
], { stdio: "pipe" });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

try {
  await sleep(1500);
  const res = await fetch("http://localhost:9226/json/list");
  const tabs = await res.json();
  const wsUrl = tabs[0].webSocketDebuggerUrl;

  const ws = new WebSocket(wsUrl);
  let msgId = 1;
  const pending = new Map();

  ws.on("message", (data) => {
    const msg = JSON.parse(data.toString());
    if (msg.id && pending.has(msg.id)) {
      pending.get(msg.id)(msg);
      pending.delete(msg.id);
    }
  });

  const send = (method, params = {}) => new Promise((resolve) => {
    const id = msgId++;
    pending.set(id, resolve);
    ws.send(JSON.stringify({ id, method, params }));
  });

  await new Promise((r) => ws.once("open", r));
  await send("Page.enable");
  await send("Runtime.enable");

  await send("Page.navigate", { url: "http://localhost:4173/" });
  await sleep(5000);

  // 截图 hero 区域
  const ss = await send("Page.captureScreenshot", { format: "png", clip: { x: 0, y: 0, width: 1440, height: 900, scale: 1 } });
  fs.writeFileSync("hero_v2_check.png", Buffer.from(ss.result.data, "base64"));
  console.log("Screenshot saved: hero_v2_check.png");

  // 检查 hero 图状态
  const result = await send("Runtime.evaluate", {
    expression: `JSON.stringify({
      heroImg: (() => {
        const img = document.querySelector('.absolute.inset-0.z-0 img');
        if (!img) return { found: false };
        return {
          found: true,
          src: img.src.split('?')[0].substring(img.src.lastIndexOf('/')),
          naturalW: img.naturalWidth,
          complete: img.complete,
          opacity: getComputedStyle(img).opacity,
          filter: getComputedStyle(img).filter,
        };
      })(),
      hasGenerating: document.body.innerText.toLowerCase().includes('generating'),
      heroTextSample: document.querySelector('h1')?.innerText.substring(0, 50),
    })`,
    returnByValue: true,
  });

  console.log("\n=== RESULT ===");
  console.log(JSON.stringify(result.result.result.value, null, 2));

  ws.close();
  chrome.kill();
} catch (e) {
  console.error("Error:", e.message);
  chrome.kill();
}
