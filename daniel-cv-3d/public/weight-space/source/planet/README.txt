ADAPTED PLANET NETWORK — VERSION 2

The original model had almost fixed geometry and color. This version directly
rewrites its weights so a SINGLE fixed checkpoint produces different worlds.
No training, fitting, optimizer, target images or pretrained model was used.

The architecture and original forward evaluator are unchanged:
5 -> 193 -> 185 -> 185 -> 151 -> 3, ReLU hidden layers, RGB output clipping.
Exactly 100,000 parameter entries, including deliberately zero connections.
The network is sparse; verification.json records the exact nonzero count.

INPUTS
The first two inputs are pixel coordinates x and y. The remaining three,
each in [-1,1], have been repurposed:
  climate:   cold blue/green through warm orange/red palettes and surfaces
  structure: oppositely tilted blue rings at negative values, no rings near
             zero, amber rings at positive values; also changes illumination
  terrain:   changes planet size, surface feature size and position

All six example images use the same adapted_weights.npz. Presets are only
three input numbers. No checkpoint is swapped, no weights are changed per
example, and no post-render color transformation is used.

WEIGHT ADAPTATION
adapt_weights.py specifies a redesigned set of geometric circuits, compares
their tensors with original_weights.npz and saves the changed entries to
weight_patch.npz. Applying those indices and replacement values to the
original checkpoint reconstructs adapted_weights.npz exactly.

The edits add latent-dependent radius, two ring orientations with gates,
two surface palettes, continent/crater features, and strong texture controls.
The original forward evaluator in base_network.py is reused without edits.
Geometry calculations occur when programming weights, while inference uses
only matrix operations, ReLU and output clipping.

RUN (Python 3, NumPy, Pillow)

  python3 -m pip install numpy Pillow

Reapply the weight adaptation, render examples, and verify:
  python3 adapt_weights.py

Render from the saved adapted weights without rebuilding or modifying them:
  python3 adapt_weights.py --render --z -1 0 0.65 --size 512 --output ocean.png
  python3 adapt_weights.py --render --z 1 0 0.65 --size 512 --output volcanic.png
  python3 adapt_weights.py --render --z -1 -0.95 0.5 --size 512 --output ice_rings.png

CHECKS
verification.json records exact patch replay, checkpoint reload, dense versus
sparse evaluation, connectivity, activation probes, parameter counts, and
before/after image differences using identical control vectors. Pixel
differences are a regression check, not a general image-quality benchmark.

This remains a deliberately programmed family of stylized planet images,
with polygonal surfaces and rings. It is not a general text-to-image model.
