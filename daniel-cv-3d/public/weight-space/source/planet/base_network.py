#!/usr/bin/env python3
"""A hand-programmed, exactly 100,000-parameter image-generating ReLU MLP.

No training, pretrained weights, reference images, loss, or optimizer is used.
Architecture: 5 -> 193 -> 185 -> 185 -> 151 -> 3.
Inputs: x, y, band phase, light position, star brightness (each in [-1, 1]).
All visible scene content is computed by the saved network's forward pass.

Requires Python 3, numpy and Pillow.
Run: python3 handcrafted_planet.py --size 512
"""

from __future__ import annotations

import argparse
import hashlib
import json
import math
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFont


HERE = Path(__file__).resolve().parent
ARCHITECTURE = [5, 193, 185, 185, 151, 3]


class Affine:
    """An affine expression in the immediately preceding layer's neurons."""

    def __init__(self, terms=None, bias=0.0):
        self.terms = dict(terms or {})
        self.bias = float(bias)

    def __add__(self, other):
        if not isinstance(other, Affine):
            other = Affine(bias=other)
        terms = self.terms.copy()
        for index, value in other.terms.items():
            terms[index] = terms.get(index, 0.0) + value
        return Affine(terms, self.bias + other.bias)

    __radd__ = __add__

    def __mul__(self, scalar):
        return Affine({i: w * scalar for i, w in self.terms.items()}, self.bias * scalar)

    __rmul__ = __mul__

    def __neg__(self):
        return self * -1

    def __sub__(self, other):
        return self + (-other)

    def __rsub__(self, other):
        return -self + other


class Layer:
    def __init__(self, input_width):
        self.input_width = input_width
        self.names = []
        self.expressions = []

    def add(self, name, expression):
        if not isinstance(expression, Affine):
            expression = Affine(bias=expression)
        index = len(self.names)
        self.names.append(name)
        self.expressions.append(expression)
        return Affine({index: 1.0})

    def arrays(self):
        weights = np.zeros((len(self.names), self.input_width), dtype=np.float32)
        biases = np.zeros(len(self.names), dtype=np.float32)
        for row, expression in enumerate(self.expressions):
            for col, weight in expression.terms.items():
                weights[row, col] = weight
            biases[row] = expression.bias
        return weights, biases


def polygon_norm(layer, name, x, y, directions):
    """A regular-polygon approximation to sqrt(x*x+y*y), using only ReLU.

    pi/N * sum_theta ReLU(cos(theta)*x + sin(theta)*y) approximates
    Euclidean distance. The trigonometry runs ONLY during weight creation.
    """
    pieces = []
    for i in range(directions):
        angle = 2 * math.pi * (i + 0.37) / directions
        pieces.append(layer.add(f"{name}.projection.{i}", math.cos(angle) * x + math.sin(angle) * y))
    return sum(pieces, Affine()) * (math.pi / directions)


def star_layout(count):
    """Deterministic positions; these are geometry instructions, not image data."""
    stars = []
    for i in range(200):
        x = ((i * 0.61803398875 + 0.11) % 1) * 1.86 - 0.93
        y = ((i * 0.41421356237 + 0.38) % 1) * 1.86 - 0.93
        # Keep the sparse starfield outside the main objects.
        if x * x + y * y < 0.53**2:
            continue
        if ((x + 0.66) / 0.17)**2 + ((y - 0.58) / 0.15)**2 < 1:
            continue
        u = math.cos(-0.30) * x + math.sin(-0.30) * y
        v = -math.sin(-0.30) * x + math.cos(-0.30) * y
        if (u / 0.96)**2 + (v / 0.31)**2 < 1.08:
            continue
        size = 0.008 + 0.007 * ((i * 7) % 11) / 10
        stars.append((x, y, size))
        if len(stars) == count:
            return stars
    raise RuntimeError("Not enough star positions")


def construct_weights():
    # These feature counts determine the real architecture; no padding units.
    lights, moon_lights, rings, bands, stars = 24, 10, 29, 31, 21
    x, y, phase, light, twinkle = [Affine({i: 1.0}) for i in range(5)]
    l1 = Layer(5)
    relays = [l1.add(f"input.{name}", value + 1) for name, value in
              zip(("x", "y", "phase", "light", "twinkle"), (x, y, phase, light, twinkle))]
    xr, yr, pr, lr, tr = [value - 1 for value in relays]

    planet_r = polygon_norm(l1, "planet", x, y, 32)
    theta = -0.30
    u = math.cos(theta) * x + math.sin(theta) * y
    v = -math.sin(theta) * x + math.cos(theta) * y
    ring_r = polygon_norm(l1, "rings", u * (1 / 0.93), v * (1 / 0.28), 32)
    illumination_r = polygon_norm(l1, "light", x + 0.23 - light * 0.13, y - 0.23, 24)
    moon_x = -0.66 + phase * 0.045
    moon_y = 0.58 + phase * 0.020
    moon_r = polygon_norm(l1, "moon", x - moon_x, y - moon_y, 16)

    star_distances = []
    for i, (sx, sy, size) in enumerate(star_layout(stars)):
        terms = [l1.add(f"star.{i}.{axis}", value) for axis, value in (
            ("right", (x - sx) * (1 / size)), ("left", (sx - x) * (1 / size)),
            ("up", (y - sy) * (1 / size)), ("down", (sy - y) * (1 / size)))]
        star_distances.append(sum(terms, Affine()))

    l2 = Layer(len(l1.names))
    threshold_names = []

    def threshold(name, expression):
        threshold_names.append(name)
        return l2.add(name, expression)

    # Each threshold is the first half of a clipped ramp.
    threshold("planet.coverage", (0.445 - planet_r) * 320)
    for i in range(lights):
        radius = 0.10 + i * 0.80 / (lights - 1)
        threshold(f"light.{i}", (radius - illumination_r) * 30)
    for i, (inner, outer) in enumerate(((0.443, 0.462), (0.461, 0.480))):
        threshold(f"atmosphere.{i}.outer", (outer - planet_r) * 190)
        threshold(f"atmosphere.{i}.inner", (inner - planet_r) * 190)

    for i in range(rings):
        step = (1.0 - 0.61) / rings
        inner = 0.61 + i * step + step * 0.08
        outer = 0.61 + (i + 1) * step - step * 0.08
        threshold(f"ring.{i}.outer", (outer - ring_r) * 600)
        threshold(f"ring.{i}.inner", (inner - ring_r) * 600)

    stripe_coordinate = yr + xr * 0.09 + pr * 0.065
    for i in range(bands):
        center = (i - (bands - 1) / 2) * 0.029
        width = 0.022 + 0.004 * math.sin(i * 1.7)
        threshold(f"band.{i}.upper", (center + width / 2 - stripe_coordinate) * 420)
        threshold(f"band.{i}.lower", (center - width / 2 - stripe_coordinate) * 420)

    threshold("moon.coverage", (0.077 - moon_r) * 520)
    moon_dx = xr + 0.66 - pr * 0.045
    for i in range(moon_lights):
        radius = 0.004 + i * 0.105 / (moon_lights - 1)
        threshold(f"moon.light.{i}", (radius - moon_r - moon_dx * 0.40 + lr * 0.005) * 100)

    copies2 = {}
    for i, distance in enumerate(star_distances):
        copies2[f"star.{i}"] = l2.add(f"star.{i}", 0.78 + tr * 0.20 - distance)
    for name, value in zip(("background.x", "background.y", "background.light"), (xr + 1, yr + 1, lr + 1)):
        copies2[name] = l2.add(name, value)
    vr = -math.sin(theta) * xr + math.cos(theta) * yr
    threshold("ring.front", 0.5 - vr * 400)

    l3 = Layer(len(l2.names))
    inverse = {}
    index2 = {name: i for i, name in enumerate(l2.names)}
    for name in threshold_names:
        inverse[name] = l3.add(f"inverse.{name}", 1 - Affine({index2[name]: 1}))
    copies3 = {name: l3.add(name, expression) for name, expression in copies2.items()}
    # If a = ReLU(t), 1 - ReLU(1-a) = clip(t, 0, 1).
    # We store ReLU(1-a), the inverse mask, and combine masks in layer 4.

    l4 = Layer(len(l3.names))
    colors = []

    def visible(name, expression, rgb):
        l4.add(name, expression)
        colors.append(rgb)

    inv_sphere = inverse["planet.coverage"]
    sphere = 1 - inv_sphere
    visible("planet.base", sphere, (0.022, 0.055, 0.105))
    for i in range(lights):
        visible(f"planet.illumination.{i}", 1 - inverse[f"light.{i}"] - inv_sphere,
                tuple(c / lights for c in (0.24, 0.58, 0.66)))
    for i in range(2):
        mask = inverse[f"atmosphere.{i}.inner"] - inverse[f"atmosphere.{i}.outer"]
        visible(f"planet.atmosphere.{i}", mask, (0.015, 0.080 / (i + 1), 0.145 / (i + 1)))

    inv_front = inverse["ring.front"]
    for i in range(rings):
        ring = inverse[f"ring.{i}.inner"] - inverse[f"ring.{i}.outer"]
        brightness = 0.52 + 0.27 * math.sin(i * 0.82)**2 + 0.15 * math.cos(i * 0.23)
        # The broad darker interval resembles Saturn's Cassini division.
        if 17 <= i <= 19:
            brightness *= 0.28
        rgb = np.array((0.75, 0.59, 0.37)) * brightness
        visible(f"ring.{i}.front", ring - inv_front, rgb)
        visible(f"ring.{i}.back", ring + inv_front - 1 - sphere, rgb * 0.72)

    for i in range(bands):
        band = inverse[f"band.{i}.lower"] - inverse[f"band.{i}.upper"]
        warmth = 0.40 + 0.60 * (0.5 + 0.5 * math.sin(i * 1.31))
        rgb = (0.18 * warmth, 0.090 * warmth, 0.030 * warmth)
        visible(f"planet.band.{i}", band - inv_sphere, rgb)

    inv_moon = inverse["moon.coverage"]
    visible("moon.base", 1 - inv_moon, (0.055, 0.070, 0.110))
    for i in range(moon_lights):
        visible(f"moon.illumination.{i}", 1 - inverse[f"moon.light.{i}"] - inv_moon,
                tuple(c / moon_lights for c in (0.48, 0.54, 0.66)))
    for i in range(stars):
        visible(f"star.{i}", copies3[f"star.{i}"], (0.72, 0.79, 0.93))
    for name, rgb in (
        ("background.x", (0.003, 0.002, 0.008)),
        ("background.y", (0.005, 0.007, 0.015)),
        ("background.light", (0.002, 0.003, 0.004)),
    ):
        visible(name, copies3[name], rgb)

    l5 = Layer(len(l4.names))
    for channel, background in enumerate((0.008, 0.012, 0.030)):
        l5.add(("red", "green", "blue")[channel],
               Affine({i: float(rgb[channel]) for i, rgb in enumerate(colors)}, background))
    layers = [l1, l2, l3, l4, l5]
    assert [5] + [len(layer.names) for layer in layers] == ARCHITECTURE
    arrays = {}
    for i, layer in enumerate(layers):
        arrays[f"W{i}"], arrays[f"b{i}"] = layer.arrays()
    assert sum(a.size for a in arrays.values()) == 100_000
    return arrays, [layer.names for layer in layers]


class Network:
    def __init__(self, arrays):
        self.arrays = arrays
        self.sparse = []
        for i in range(5):
            w, b = arrays[f"W{i}"], arrays[f"b{i}"]
            self.sparse.append([(np.flatnonzero(row), row[np.flatnonzero(row)], bias)
                                for row, bias in zip(w, b)])

    def __call__(self, inputs, dense=False, activity=None):
        values = np.asarray(inputs, dtype=np.float32)
        for layer_i in range(5):
            if dense:
                values = values @ self.arrays[f"W{layer_i}"].T + self.arrays[f"b{layer_i}"]
            else:
                result = np.empty((len(values), len(self.sparse[layer_i])), dtype=np.float32)
                for j, (indices, weights, bias) in enumerate(self.sparse[layer_i]):
                    if len(indices) == 1:
                        result[:, j] = values[:, indices[0]] * weights[0] + bias
                    else:
                        result[:, j] = np.sum(values[:, indices] * weights, axis=1) + bias
                values = result
            if layer_i < 4:
                np.maximum(values, 0, out=values)
                if activity is not None:
                    activity[layer_i] |= np.any(values > 1e-7, axis=0)
        return np.clip(values, 0, 1)


def render(network, size, phase=0.0, light=0.0, twinkle=0.0, activity=None):
    # Pixel coordinates are the ONLY per-pixel inputs. No renderer outside the MLP.
    axis = (np.arange(size, dtype=np.float32) + 0.5) * (2 / size) - 1
    xx, yy = np.meshgrid(axis, -axis)
    pixels = np.column_stack((xx.ravel(), yy.ravel(),
                             np.full(size * size, phase), np.full(size * size, light),
                             np.full(size * size, twinkle))).astype(np.float32)
    rgb = np.empty((size * size, 3), dtype=np.float32)
    for start in range(0, len(pixels), 4096):
        rgb[start:start + 4096] = network(pixels[start:start + 4096], activity=activity)
    assert np.isfinite(rgb).all()
    return Image.fromarray(np.round(rgb.reshape(size, size, 3) * 255).astype(np.uint8))


def verify(arrays, network, names):
    rng = np.random.default_rng(123)
    probes = rng.uniform(-1, 1, (257, 5)).astype(np.float32)
    sparse, dense = network(probes), network(probes, dense=True)
    error = float(np.max(np.abs(sparse - dense)))
    assert error < 0.001, error
    reachable = np.ones(3, dtype=bool)
    for i in reversed(range(5)):
        w = arrays[f"W{i}"]
        assert np.all(reachable), f"Disconnected neurons in layer {i + 1}"
        reachable = np.any(w[reachable] != 0, axis=0)
    assert np.all(reachable), "An input has no path to output"
    activity = [np.zeros(width, dtype=bool) for width in ARCHITECTURE[1:-1]]
    for phase, light in ((-1, -1), (0, 0), (1, 1)):
        render(network, 160, phase=phase, light=light, twinkle=1, activity=activity)
    # A coarse grid can miss the smallest stars, so also test their exact peaks.
    star_peaks = np.array([[x, y, 0, 0, 1] for x, y, _ in star_layout(21)], dtype=np.float32)
    network(star_peaks, activity=activity)
    inactive = [[names[i][j] for j in np.flatnonzero(~live)] for i, live in enumerate(activity)]
    assert not any(inactive), inactive
    return {
        "architecture": ARCHITECTURE,
        "parameters": int(sum(value.size for value in arrays.values())),
        "nonzero_parameters": int(sum(np.count_nonzero(value) for value in arrays.values())),
        "checkpoint_dtype": "float32",
        "raw_parameter_bytes": int(sum(value.nbytes for value in arrays.values())),
        "dense_sparse_max_rgb_difference": error,
        "all_hidden_neurons_active_on_grid_and_feature_probes": True,
        "all_neurons_connected_to_output": True,
        "training_steps": 0,
        "external_image_assets": 0,
        "note": "100,000 counts all entries and biases in the standard dense MLP, including deliberately zero connections.",
    }


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--size", type=int, default=512)
    parser.add_argument("--phase", type=float, default=0.0)
    parser.add_argument("--light", type=float, default=-0.30)
    parser.add_argument("--twinkle", type=float, default=0.2)
    parser.add_argument("--load", type=Path, help="Render a checkpoint instead of constructing weights")
    parser.add_argument("--output", type=Path, help="Destination PNG; defaults to planet.png beside this script")
    parser.add_argument("--samples", action="store_true", help="Also create six example renders and a contact sheet")
    args = parser.parse_args()
    if args.size < 16 or args.size > 2048:
        parser.error("--size must be between 16 and 2048")
    if any(abs(v) > 1 for v in (args.phase, args.light, args.twinkle)):
        parser.error("All three controls must be in [-1, 1]")
    if args.load:
        with np.load(args.load, allow_pickle=False) as checkpoint:
            arrays = {name: checkpoint[name] for name in checkpoint.files}
        names = None
    else:
        arrays, names = construct_weights()
        np.savez_compressed(HERE / "planet_100k_weights.npz", **arrays)
    network = Network(arrays)
    output = args.output or HERE / "planet.png"
    render(network, args.size, args.phase, args.light, args.twinkle).save(output)
    print(f"Saved {output}")
    if names is not None:
        report = verify(arrays, network, names)
        checkpoint = HERE / "planet_100k_weights.npz"
        report["checkpoint_sha256"] = hashlib.sha256(checkpoint.read_bytes()).hexdigest()
        (HERE / "verification.json").write_text(json.dumps(report, indent=2) + "\n")
        (HERE / "neuron_names.json").write_text(json.dumps(names, indent=2) + "\n")
        print(json.dumps(report, indent=2))
    if args.samples:
        size = 256
        sheet = Image.new("RGB", (size * 3, (size + 34) * 2), (8, 11, 24))
        draw = ImageDraw.Draw(sheet)
        try:
            font = ImageFont.truetype("/System/Library/Fonts/Menlo.ttc", 11)
        except OSError:
            font = ImageFont.load_default()
        settings = [(-0.9, -1.0, -0.7), (0.0, -0.5, -0.2), (0.9, 0.0, 0.2),
                    (-0.6, 0.4, 0.4), (0.2, 0.8, 0.7), (1.0, 1.0, 1.0)]
        for i, (phase, light, twinkle) in enumerate(settings):
            picture = render(network, size, phase, light, twinkle)
            picture.save(HERE / f"sample_{i + 1}.png")
            left, top = (i % 3) * size, (i // 3) * (size + 34)
            sheet.paste(picture, (left, top))
            draw.text((left + 12, top + size + 9), f"phase {phase:+.1f} / light {light:+.1f}", fill=(164, 187, 216), font=font)
        sheet.save(HERE / "samples.png")
        print(f"Saved {HERE / 'samples.png'}")


if __name__ == "__main__":
    main()
