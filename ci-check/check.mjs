// Opens a page in headless Chrome with a FAKE location, clicks "Use my location",
// and reports what the page shows, console errors and failed requests.
// usage: node check.mjs <chrome.exe> <profile dir> <screenshot.png> <url> [lat] [lon]
import { spawn } from 'node:child_process';
import { writeFileSync } from 'node:fs';

const [chrome, profile, shot, url, lat = '18.5204', lon = '73.8567'] = process.argv.slice(2);
const port = 9333;
const proc = spawn(chrome, [
  '--headless=new', '--disable-gpu', `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`,
  '--window-size=1280,1100', '--no-first-run', '--no-sandbox', 'about:blank',
], { stdio: 'ignore' });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let targets;
for (let i = 0; i < 40 && !targets; i++) {
  await sleep(250);
  try { targets = await (await fetch(`http://127.0.0.1:${port}/json`)).json(); } catch {}
}
const page = targets.find((t) => t.type === 'page');
const ws = new WebSocket(page.webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener('open', r, { once: true }));
let id = 0;
const pending = new Map();
const log = [];
ws.addEventListener('message', (e) => {
  const msg = JSON.parse(e.data);
  if (msg.id && pending.has(msg.id)) { pending.get(msg.id)(msg); pending.delete(msg.id); return; }
  if (msg.method === 'Runtime.consoleAPICalled' && ['error', 'warning'].includes(msg.params.type))
    log.push(`console.${msg.params.type}: ${msg.params.args.map((a) => a.value ?? a.description).join(' ')}`);
  if (msg.method === 'Runtime.exceptionThrown') log.push(`exception: ${msg.params.exceptionDetails.exception?.description ?? msg.params.exceptionDetails.text}`);
  if (msg.method === 'Network.responseReceived' && msg.params.response.status >= 400)
    log.push(`HTTP ${msg.params.response.status}: ${msg.params.response.url.slice(0, 120)}`);
  if (msg.method === 'Network.loadingFailed') log.push(`request failed (${msg.params.errorText}) ${msg.params.blockedReason ?? ''}`);
});
const send = (method, params = {}) => new Promise((r) => { const n = ++id; pending.set(n, r); ws.send(JSON.stringify({ id: n, method, params })); });

await send('Runtime.enable');
await send('Network.enable');
await send('Browser.grantPermissions', { origin: new URL(url).origin, permissions: ['geolocation'] });
await send('Emulation.setGeolocationOverride', { latitude: +lat, longitude: +lon, accuracy: 30 });
if (process.env.BLOCK_NOMINATIM) await send('Network.setBlockedURLs', { urls: ['*nominatim.openstreetmap.org*'] });
await send('Page.enable');
await send('Page.navigate', { url });
await sleep(8000);

const evalText = async (expr) => (await send('Runtime.evaluate', { expression: expr, returnByValue: true })).result?.result?.value;
const clicked = await evalText(`(() => { const b = [...document.querySelectorAll('button')].find(b => /use my location/i.test(b.textContent)); if (!b) return 'no button'; b.click(); return 'clicked'; })()`);
console.log('button:', clicked);
for (const t of [3, 8, 15]) {
  await sleep(t === 3 ? 3000 : 5000);
  const status = await evalText(`(() => { const sel = [...document.querySelectorAll('[class*=location], [role=status], .error, [class*=error], [class*=message]')].map(e => e.textContent.trim()).filter(Boolean).slice(0, 6).join(' | '); const label = document.querySelector('.profile-button strong')?.textContent; return 'label=' + label + ' || ' + sel; })()`);
  console.log(`after ${t}s:`, status);
}
const png = await send('Page.captureScreenshot', { format: 'png' });
writeFileSync(shot, Buffer.from(png.result.data, 'base64'));
console.log('--- log');
for (const l of [...new Set(log)]) console.log(l);
ws.close();
proc.kill();
process.exit(0);
