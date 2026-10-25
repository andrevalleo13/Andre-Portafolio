// Uso: node shot.mjs <url> <width> <height> <outPrefix> <reduce:0|1> "<objetivo>|||<objetivo>…"
// Objetivo: número (scrollY), selector CSS (baja hasta él) o "js:<código>" (lo ejecuta y captura).
// Hace scroll real (Lenis si existe) y captura el viewport en cada posición.
import { spawn } from 'node:child_process';
import { writeFileSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const [url, W, H, out, reduce, targetsArg] = process.argv.slice(2);
const targets = (targetsArg || '0').split(targetsArg?.includes('|||') ? '|||' : ',');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const port = 9300 + Math.floor(Math.random() * 500);
const profile = mkdtempSync(join(process.env.TMPDIR || tmpdir(), 'cdp-'));
const chrome = spawn(CHROME, ['--headless=new', `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, '--hide-scrollbars', `--window-size=${W},${H}`, 'about:blank'], { stdio: 'ignore' });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let wsUrl;
for (let i = 0; i < 150; i++) {
  try { wsUrl = (await (await fetch(`http://127.0.0.1:${port}/json/version`)).json()).webSocketDebuggerUrl; break; } catch { await sleep(200); }
}
const ws = new WebSocket(wsUrl);
await new Promise((r) => ws.addEventListener('open', r));
let id = 0; const pending = new Map(); const events = [];
ws.addEventListener('message', (m) => {
  const msg = JSON.parse(m.data);
  if (msg.id && pending.has(msg.id)) { pending.get(msg.id)(msg); pending.delete(msg.id); }
  else events.push(msg);
});
const send = (method, params = {}, sessionId) => new Promise((r) => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params, sessionId })); });

const { result: { targetId } } = await send('Target.createTarget', { url: 'about:blank' });
const { result: { sessionId } } = await send('Target.attachToTarget', { targetId, flatten: true });
const s = (m, p) => send(m, p, sessionId);
await s('Emulation.setDeviceMetricsOverride', { width: +W, height: +H, deviceScaleFactor: 1, mobile: +W < 600 });
await s('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: reduce === '1' ? 'reduce' : 'no-preference' }] });
await s('Page.enable');
await s('Runtime.enable');
await s('Page.navigate', { url });
await sleep(4500);

for (let i = 0; i < targets.length; i++) {
  const t = targets[i];
  if (t.startsWith('js:')) {
    await s('Runtime.evaluate', { expression: t.slice(3), awaitPromise: true });
    await sleep(1800);
  } else {
    const expr = /^\d+$/.test(t)
      ? `(${t})`
      : `(document.querySelector(${JSON.stringify(t)})?.getBoundingClientRect().top ?? 0) + window.scrollY - 60`;
    await s('Runtime.evaluate', { expression: `(async () => { const y = ${expr}; const step = 500; let cur = window.scrollY; while (Math.abs(cur - y) > 1) { cur = cur < y ? Math.min(y, cur + step) : Math.max(y, cur - step); (window.__lenis ? window.__lenis.scrollTo(cur, { immediate: true }) : window.scrollTo(0, cur)); await new Promise(r => setTimeout(r, 60)); } return y; })()`, awaitPromise: true });
    await sleep(2600);
  }
  const { result } = await s('Page.captureScreenshot', { format: 'png' });
  writeFileSync(`${out}_${i}.png`, Buffer.from(result.data, 'base64'));
}
const logs = events.filter((e) => e.method === 'Runtime.exceptionThrown' || (e.method === 'Runtime.consoleAPICalled' && e.params.type === 'error'));
if (logs.length) console.log('JS errors:', JSON.stringify(logs.map((l) => l.params.exceptionDetails?.exception?.description || l.params.args?.map((a) => a.value || a.description).join(' '))).slice(0, 1500));
ws.close(); chrome.kill();
console.log('ok', targets.length);
