// CDP 检查 - 等待更久,检查所有 img 和 generating 文字
import { spawn } from "child_process";
import { WebSocket } from "ws";

const CHROME = "C:\\Users\\dxc92\\AppData\\Local\\ms-playwright\\chromium-1208\\chrome-win64\\chrome.exe";

const chrome = spawn(CHROME, [
  "--headless",
  "--disable-gpu",
  "--no-sandbox",
  "--remote-debugging-port=9224",
  "--remote-allow-origins=*",
], { stdio: "pipe" });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

try {
  await sleep(1500);
  const res = await fetch("http://localhost:9224/json/list");
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

  // 监听所有网络请求
  const failedReqs = [];
  ws.on("message", (data) => {
    const msg = JSON.parse(data.toString());
    if (msg.method === "Network.responseReceived") {
      const url = msg.params.response.url;
      const status = msg.params.response.status;
      if (url.includes("/images/") || url.includes("mchost") || url.includes("text_to_image")) {
        console.log(`NET: ${status} ${url.substring(0, 100)}`);
        if (status >= 400) failedReqs.push({ url, status });
      }
    }
    if (msg.method === "Network.loadingFailed") {
      failedReqs.push({ url: msg.params.requestId, error: msg.params.errorText });
    }
  });

  await send("Page.navigate", { url: "http://localhost:5173/" });
  await sleep(8000); // 等待 8 秒让所有图片加载

  const result = await send("Runtime.evaluate", {
    expression: `JSON.stringify({
      totalImgs: document.querySelectorAll('img').length,
      generatingText: document.body.innerText.includes('generating') || document.body.innerText.includes('Generating'),
      generatingContext: (document.body.innerText.match(/.{0,40}[Gg]enerating.{0,40}/) || [])[0],
      imgs: Array.from(document.querySelectorAll('img')).map(img => ({
        src: img.src.replace('http://localhost:5173', ''),
        alt: img.alt.substring(0, 30),
        loaded: img.complete && img.naturalWidth > 0,
        naturalW: img.naturalWidth,
      })),
    })`,
    returnByValue: true,
  });

  console.log("\n=== FINAL STATE ===");
  const value = result.result?.result?.value || result.result?.value;
  console.log(value);

  console.log("\n=== FAILED REQUESTS ===");
  console.log(failedReqs.length ? JSON.stringify(failedReqs, null, 2) : "None");

  ws.close();
  chrome.kill();
} catch (e) {
  console.error("Error:", e.message);
  chrome.kill();
}
