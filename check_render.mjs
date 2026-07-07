import { chromium } from "playwright";

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    bypassCSP: true,
  });
  const page = await context.newPage();

  const requests = [];
  page.on("requestfailed", (req) => {
    requests.push({ url: req.url(), failure: req.failure()?.errorText });
  });
  page.on("response", (res) => {
    if (res.url().includes("/images/")) {
      requests.push({ url: res.url(), status: res.status(), type: res.headers()["content-type"] });
    }
  });

  await page.goto("http://localhost:5173/", { waitUntil: "networkidle", timeout: 30000 });
  await page.waitForTimeout(3000);

  // 检查 hero img 的实际 src 和渲染状态
  const imgInfo = await page.evaluate(() => {
    const imgs = Array.from(document.querySelectorAll("img"));
    return imgs.slice(0, 6).map((img) => ({
      src: img.src,
      alt: img.alt,
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight,
      complete: img.complete,
      displayStyle: window.getComputedStyle(img).display,
      visibility: window.getComputedStyle(img).visibility,
      opacity: window.getComputedStyle(img).opacity,
      parentOpacity: img.parentElement ? window.getComputedStyle(img.parentElement).opacity : null,
    }));
  });

  console.log("=== IMG INFO ===");
  console.log(JSON.stringify(imgInfo, null, 2));
  console.log("\n=== REQUESTS ===");
  console.log(JSON.stringify(requests, null, 2));

  await page.screenshot({ path: "hero_render.png", fullPage: false });
  console.log("\nScreenshot saved: hero_render.png");

  await browser.close();
})();
