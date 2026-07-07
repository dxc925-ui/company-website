// 用 CDP 协议连接 headless Chrome 检查渲染状态
import { spawn } from "child_process";
import { WebSocket } from "ws";

const CHROME = "C:\\Users\\dxc92\\AppData\\Local\\ms-playwright\\chromium-1208\\chrome-win64\\chrome.exe";

const chrome = spawn(CHROME, [
  "--headless",
  "--disable-gpu",
  "--no-sandbox",
  "--remote-debugging-port=9223",
  "--remote-allow-origins=*",
], { stdio: "pipe" });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

try {
  await sleep(1500);

  // 获取 CDP 端点
  const res = await fetch("http://localhost:9223/json/list");
  const tabs = await res.json();
  const wsUrl = tabs[0].webSocketDebuggerUrl;
  console.log("CDP WS:", wsUrl);

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

  // 导航到页面
  await send("Page.enable");
  await send("Runtime.enable");
  await send("Page.navigate", { url: "http://localhost:5173/" });
  await sleep(5000); // 等待 JS 渲染

  // 检查所有 img 元素的状态
  const result = await send("Runtime.evaluate", {
    expression: `JSON.stringify({
      imgs: Array.from(document.querySelectorAll('img')).slice(0, 8).map(img => ({
        src: img.src,
        alt: img.alt,
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight,
        complete: img.complete,
        display: getComputedStyle(img).display,
        visibility: getComputedStyle(img).visibility,
        opacity: getComputedStyle(img).opacity,
        rect: img.getBoundingClientRect ? {
          w: img.getBoundingClientRect().width,
          h: img.getBoundingClientRect().height,
        } : null,
      })),
      heroText: document.body.innerText.substring(0, 200),
    })`,
    returnByValue: true,
  });

  console.log("\n=== RENDER STATE ===");
  console.log(result.result?.value || JSON.stringify(result, null, 2));

  ws.close();
  chrome.kill();
} catch (e) {
  console.error("Error:", e.message);
  chrome.kill();
}
