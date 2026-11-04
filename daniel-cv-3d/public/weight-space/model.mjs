// Sparse serialization of a dense 5 → 193 → 185 → 185 → 151 → 3 MLP.
// Omitted entries are exactly zero. No drawing primitives or image assets are used.
export function encodePrompt(prompt, model) {
  if (/[^a-z\s.,!?'-]/i.test(prompt)) throw new Error('Use words from the vocabulary below. Numbers and symbols are not supported.');
  const tokens = (prompt.toLowerCase().match(/[a-z]+/g) || []).map(t => Object.hasOwn(model.aliases, t) ? model.aliases[t] : t);
  const objects = tokens.filter(t => model.objects.includes(t));
  const colors = tokens.filter(t => Object.hasOwn(model.colors, t));
  const sizes = tokens.filter(t => Object.hasOwn(model.sizes, t));
  const allowed = new Set([...model.objects, ...Object.keys(model.colors), ...Object.keys(model.sizes), 'a','an','the','draw','generate','image','picture','of','icon','please']);
  const unknown = [...new Set(tokens.filter(t => !allowed.has(t)))];
  if (unknown.length) throw new Error(`Unsupported words: ${unknown.join(', ')}. Choose one of the six objects below.`);
  if (objects.length !== 1) throw new Error('Specify exactly one object: rocket, sailboat, tree, house, mushroom or cat.');
  if (colors.length > 1 || sizes.length > 1) throw new Error('Use at most one color and one size.');
  const object = objects[0];
  const defaults = ['red','cyan','green','orange','pink','purple'];
  const color = colors[0] || defaults[model.objects.indexOf(object)];
  const size = sizes[0] || 'medium';
  return { controls: [-1 + model.objects.indexOf(object) * .4, model.colors[color], model.sizes[size]], label: `${size} ${color} ${object}` };
}

export function renderNetwork(model, controls, size = 256) {
  const steps = renderNetworkSteps(model, controls, size);
  let result = steps.next();
  while (!result.done) result = steps.next();
  return result.value;
}

// The worker yields between batches so a new slider value can cancel old work.
export function* renderNetworkSteps(model, controls, size = 256) {
  if (!Number.isInteger(size) || size < 1 || size > 512) throw new Error('Image size must be between 1 and 512.');
  if (controls.length !== 3 || controls.some(x => !Number.isFinite(x) || x < -1 || x > 1)) throw new Error('Controls must be between -1 and 1.');
  const batch = 512;
  let a = new Float32Array(193 * batch), b = new Float32Array(193 * batch);
  const pixels = new Uint8ClampedArray(size * size * 4);
  for (let start = 0; start < size * size; start += batch) {
    const n = Math.min(batch, size * size - start);
    for (let p = 0; p < n; p++) {
      const index = start + p;
      a[p] = ((index % size) + .5) * 2 / size - 1;
      a[batch + p] = 1 - (Math.floor(index / size) + .5) * 2 / size;
      for (let c = 0; c < 3; c++) a[(c + 2) * batch + p] = controls[c];
    }
    for (let layer = 0; layer < model.layers.length; layer++) {
      for (let row = 0; row < model.layers[layer].length; row++) {
        const [bias, edges] = model.layers[layer][row], offset = row * batch;
        b.fill(bias, offset, offset + n);
        for (let e = 0; e < edges.length; e += 2) {
          const input = edges[e] * batch, weight = edges[e + 1];
          for (let p = 0; p < n; p++) b[offset + p] += a[input + p] * weight;
        }
        if (layer < model.layers.length - 1) {
          for (let p = 0; p < n; p++) b[offset + p] = Math.max(0, b[offset + p]);
        }
      }
      [a, b] = [b, a];
    }
    for (let p = 0; p < n; p++) {
      for (let c = 0; c < 3; c++) pixels[(start + p) * 4 + c] = Math.round(Math.max(0, Math.min(1, a[c * batch + p])) * 255);
      pixels[(start + p) * 4 + 3] = 255;
    }
    if ((start / batch) % 8 === 7) yield;
  }
  return pixels;
}
