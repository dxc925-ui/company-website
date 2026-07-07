// CDP 检查 4173 preview 端口
import { spawn } from "child_process";
import { WebSocket } from "ws";

const CHROME = "C:\\Users\\dxc92\\AppData\\Local\\ms-playwright\\chromium-1208\\chrome-win64\\chrome.exe";

const chrome = spawn(CHROME, [
  "--headless",
  "--disable-gpu",
  "--no-sandbox",
  "--remote-debugging-port=9225",
  "--remote-allow-origins=*",
], { stdio: "pipe" });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

try {
  await sleep(1500);
  const res = await fetch("http://localhost:9225/json/list");
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
  await send("Network.enable");

  const imgRequests = [];
  ws.on("message", (data) => {
    const msg = JSON.parse(data.toString());
    if (msg.method === "Network.responseReceived") {
      const url = msg.params.response.url;
      if (url.includes("hero-models") || url.includes("/images/")) {
        imgRequests.push({
          url: url.substring(0, 80),
          status: msg.params.response.status,
          type: msg.params.response.mimeType,
          size: msg.params.response.encodedDataLength,
        });
      }
    }
  });

  await send("Page.navigate", { url: "http://localhost:4173/" });
  await sleep(6000);

  // 截图
  const ss = await send("Page.captureScreenshot", { format: "png" });
  const fs = await import("fs");
  fs.writeFileSync("preview_4173.png", Buffer.from(ss.result.data, "base64"));
  console.log("Screenshot saved: preview_4173.png");

  // 检查页面状态
  const result = await send("Runtime.evaluate", {
    expression: `JSON.stringify({
      title: document.title,
      hasGeneratingText: document.body.innerText.toLowerCase().includes('generating'),
      generatingContext: (document.body.innerText.match(/.{0,50}[Gg]enerating.{0,50}/) || [])[0],
      heroImg: (() => {
        const img = document.querySelector('.absolute.inset-0.z-0 img');
        if (!img) return { found: false };
        return {
          found: true,
          src: img.src,
          naturalWidth: img.naturalWidth,
          naturalHeight: img.naturalHeight,
          complete: img.complete,
          display: getComputedStyle(img).display,
          opacity: getComputedStyle(img).opacity,
          visibility: getComputedStyle(img).visibility,
        };
      })(),
      allImgs: Array.from(document.querySelectorAll('img')).map(i => ({
        src: i.src.substring(0, 60),
        w: i.naturalWidth,
        ok: i.complete && i.naturalWidth > 0,
      })).slice(0, 10),
    })`,
    returnByValue: true,
  });

  console.log("\n=== PAGE STATE (4173) ===");
  console.log(JSON.stringify(result.result.result.value, null, 2));

  console.log("\n=== IMAGE REQUESTS ===");
  console.log(JSON.stringify(imgRequests, null, 2));

  ws.close();
  chrome.kill();
} catch (e) {
  console.error("Error:", e.message);
  console.error(e.stack);
  chrome.kill();
}
