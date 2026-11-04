import { encodePrompt, renderNetworkSteps } from './model.mjs';
const cache = new Map();
let latest = null;
let running = false;
self.onmessage = ({ data }) => {
  latest = data;
  if (!running) void drain();
};
async function drain() {
  running = true;
  while (latest) {
    const data = latest;
    latest = null;
    await render(data);
  }
  running = false;
}
async function render(data) {
  const { id, kind, prompt, controls } = data;
  try {
    if (!['planet', 'text'].includes(kind)) throw new Error('Unknown model.');
    if (!cache.has(kind)) cache.set(kind, fetch(new URL(`./${kind}.json`, import.meta.url)).then(r => {
      if (!r.ok) throw new Error('The weights could not be loaded. Reload this page to try again.');
      return r.json();
    }).catch(error => { cache.delete(kind); throw error; }));
    const model = await cache.get(kind);
    if (latest) return;
    const encoded = kind === 'text' ? encodePrompt(prompt, model) : { controls, label: 'Planet from current controls' };
    const start = performance.now();
    const steps = renderNetworkSteps(model, encoded.controls, 256);
    let result = steps.next();
    while (!result.done) {
      await new Promise(resolve => setTimeout(resolve, 0));
      if (latest) return;
      result = steps.next();
    }
    const pixels = result.value;
    self.postMessage({ id, pixels, label: encoded.label, controls: encoded.controls, milliseconds: Math.round(performance.now() - start) }, [pixels.buffer]);
  } catch (error) {
    self.postMessage({ id, error: error instanceof Error ? error.message : 'The image could not be generated.' });
  }
}
