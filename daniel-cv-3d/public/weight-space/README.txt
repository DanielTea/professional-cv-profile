PROGRAMMING NEURAL NETWORK WEIGHTS

Article and live demos:
https://danieltremer.com/blog/programming-neural-network-weights/

Two fixed coordinate networks map x, y and three controls to RGB.
Architecture: 5 -> 193 -> 185 -> 185 -> 151 -> 3.
Hidden layers: ReLU. Output: affine RGB, clipped to [0, 1].
Each dense network has exactly 100,000 weight and bias entries, including zeros.
Nonzero entries: planet 5,429; text-selected objects 5,228.

The target networks received no training. A pretrained coding assistant wrote
the construction code. Visual inspection and manual code revisions were part
of the process. The original ZIP archives preserve the experiment files.
Their statements about no pretrained model refer to the target image pipeline,
not to the coding assistant that helped create it.

The text system uses a fixed word parser outside the neural network.
It supports six object families, nine colors and three sizes.
It has no learned text encoder or open-ended scene understanding.

FILES
planet.json and text.json: sparse float32 values, represented as JSON numbers.
Each layer contains rows of [bias, [input_index, weight, input_index, weight, ...]].
Every omitted connection has value zero. The architecture field specifies
the full dense shapes. Serialization does not reduce the logical entry count.

model.mjs: generic affine/ReLU evaluator and fixed text parser.
worker.js: CPU evaluation with cancellation of obsolete render requests.
manifest.json: counts, file sizes and SHA-256 hashes.
browser-verification.json: numerical comparisons and parser checks.
source/: construction scripts and original verification reports.
ZIP archives: complete Python packages, checkpoints, patches and examples.

REPRODUCE THE PUBLICATION CHECKS
From the website repository's daniel-cv-3d directory:
  python3 -m pip install numpy Pillow
  python3 scripts/verify-weight-space.py
Node.js must also be installed. The script uses only local files.
It checks archive hashes, dense versus sparse serialization, exact patch
replay, 18 JavaScript/NumPy comparisons and all 162 supported combinations.

The 100k count excludes the parser, compiler, evaluator and UI code.
Distinct outputs and numerical agreement do not establish image quality,
generalization, a minimum network size or an advantage over procedural code.
