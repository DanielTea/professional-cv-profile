"use client";

import { useEffect, useId, useRef, useState } from "react";
import { asset } from "@/assets/asset";
import styles from "./WeightSpaceLab.module.css";

const presets = [
  { name: "Pelagic", z: [-1, 0, .65] }, { name: "Ember", z: [1, 0, .65] },
  { name: "Frost", z: [-.7, -.12, -.95] }, { name: "Aurelia", z: [1, .95, .85] },
  { name: "Azure", z: [-1, -.95, .50] }, { name: "Dusk", z: [.5, .75, -.75] },
];
const examples = ["red rocket", "cyan sailboat", "green tree", "orange house", "pink mushroom", "purple cat"];

export function WeightSpaceLab({ kind }: { kind: "planet" | "text" }) {
  const uid = useId();
  const canvas = useRef<HTMLCanvasElement>(null);
  const worker = useRef<Worker | null>(null);
  const sequence = useRef(0);
  const [ready, setReady] = useState(false);
  const [controls, setControls] = useState([1, .95, .85]);
  const [input, setInput] = useState("red rocket");
  const [prompt, setPrompt] = useState("red rocket");
  const [status, setStatus] = useState("Loading the local renderer…");
  const [error, setError] = useState("");
  const [label, setLabel] = useState("");
  const [busy, setBusy] = useState(true);
  const [hasImage, setHasImage] = useState(false);

  useEffect(() => {
    const w = new Worker(asset("/weight-space/worker.js"), { type: "module" });
    worker.current = w;
    w.onmessage = ({ data }) => {
      if (data.id !== sequence.current) return;
      setBusy(false);
      if (data.error) { setError(data.error); setStatus("No new image. The previous image is kept."); return; }
      const ctx = canvas.current?.getContext("2d");
      if (!ctx) { setError("This browser could not create a canvas."); return; }
      ctx.putImageData(new ImageData(data.pixels, 256, 256), 0, 0);
      setError(""); setLabel(data.label); setHasImage(true);
      setStatus(`256 × 256 pixels · ${data.milliseconds} ms for this render`);
    };
    w.onerror = () => { setBusy(false); setError("The renderer could not start. Reload the page, or use the Python download below."); };
    setReady(true);
    return () => { worker.current = null; w.terminate(); };
  }, []);

  useEffect(() => {
    if (!ready) return;
    // Invalidate old responses as soon as the input changes.
    const id = ++sequence.current;
    setBusy(true); setError(""); setStatus("Generating pixels with the saved weights…");
    const timer = setTimeout(() => worker.current?.postMessage({ id, kind, controls, prompt }), 180);
    return () => clearTimeout(timer);
  }, [ready, kind, controls, prompt]);

  function download() {
    canvas.current?.toBlob(blob => {
      if (!blob) return;
      const url = URL.createObjectURL(blob), a = document.createElement("a");
      a.href = url; a.download = `100k-${kind}-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.png`; a.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    });
  }

  return <div className={styles.lab} aria-label={kind === "planet" ? "Interactive planet network" : "Interactive text-to-image network"}>
    <div className={styles.banner}><span>RUN THE NETWORK / {kind === "planet" ? "01" : "02"}</span><span>100,000 ENTRIES / FIXED WEIGHTS</span></div>
    <div className={styles.body}>
      <figure className={styles.output}>
        <canvas ref={canvas} width={256} height={256} role="img" aria-label={hasImage ? label : "The image will appear after the network loads."} />
        <figcaption>{label || "Waiting for the first image"}</figcaption>
      </figure>
      <div className={styles.controls}>
        {kind === "planet" ? <>
          <label htmlFor={`${uid}-preset`}>Choose a planet</label>
          <select id={`${uid}-preset`} value={presets.find(p => p.z.every((v, i) => v === controls[i]))?.name || "custom"} onChange={e => { const p = presets.find(p => p.name === e.target.value); if (p) setControls([...p.z]); }}>
            <option value="custom" disabled>Custom controls</option>
            {presets.map(p => <option key={p.name}>{p.name}</option>)}
          </select>
          {["Climate: cold to warm", "Structure: rings and light", "Terrain: size and surface"].map((name, i) => <div className={styles.slider} key={name}>
            <label htmlFor={`${uid}-${i}`}>{name}<output>{controls[i].toFixed(2)}</output></label>
            <input id={`${uid}-${i}`} type="range" min={-1} max={1} step={.01} value={controls[i]} onChange={e => setControls(values => values.map((v, j) => i === j ? Number(e.target.value) : v))} />
          </div>)}
          <p className={styles.note}>Move a control to run the same network again. These controls can change several features at once.</p>
        </> : <>
          <form onSubmit={e => { e.preventDefault(); setPrompt(input.trim()); }}>
            <label htmlFor={`${uid}-prompt`}>Describe one supported object</label>
            <input id={`${uid}-prompt`} type="text" value={input} maxLength={180} onChange={e => setInput(e.target.value)} aria-describedby={`${uid}-vocab`} spellCheck={false} />
            <button type="submit">Generate image</button>
          </form>
          <div className={styles.examples} aria-label="Example prompts">{examples.map(p => <button key={p} type="button" onClick={() => { setInput(p); setPrompt(p); }}>{p}</button>)}</div>
          <div id={`${uid}-vocab`} className={styles.vocabulary}>
            <p><strong>Objects:</strong> rocket, sailboat, tree, house, mushroom, cat.</p>
            <p><strong>Colors:</strong> red, orange, yellow, green, cyan, blue, purple, pink, white.</p>
            <p><strong>Sizes:</strong> small, medium, large.</p>
            <p>Try “large blue sailboat”. A fixed word parser selects the controls. It rejects unsupported objects and scenes.</p>
          </div>
        </>}
        <p className={styles.error} role="alert">{error}</p>
        <p className={styles.status} role="status" aria-live="polite">{status}</p>
        <button type="button" className={styles.download} onClick={download} disabled={!hasImage || busy || !!error}>Save image as PNG</button>
      </div>
    </div>
    <div className={styles.foot}>Runs in your browser on the CPU. No prompt or pixel data is sent to a model service. <a href={asset(`/weight-space/${kind}.json`)} download>Inspect the weights</a>.</div>
    <noscript>Enable JavaScript to run this network. The article and Python downloads work without JavaScript.</noscript>
  </div>;
}

export function WeightSpaceTable() {
  return <div className={styles.tableWrap}><table className={styles.table}>
    <caption>Dense parameter entries, including zero values and biases</caption>
    <thead><tr><th scope="col">Layer</th><th scope="col">Calculation</th><th scope="col">Entries</th></tr></thead>
    <tbody>{[["Input → hidden 1", "5 × 193 + 193", "1,158"], ["Hidden 1 → hidden 2", "193 × 185 + 185", "35,890"], ["Hidden 2 → hidden 3", "185 × 185 + 185", "34,410"], ["Hidden 3 → hidden 4", "185 × 151 + 151", "28,086"], ["Hidden 4 → RGB", "151 × 3 + 3", "456"]].map(row => <tr key={row[0]}>{row.map((cell, i) => i === 0 ? <th scope="row" key={cell}>{cell}</th> : <td key={cell}>{cell}</td>)}</tr>)}</tbody>
    <tfoot><tr><th scope="row" colSpan={2}>Total per network</th><td>100,000</td></tr></tfoot>
  </table></div>;
}
