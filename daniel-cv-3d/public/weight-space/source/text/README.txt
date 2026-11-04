CONTROLLED TEXT-TO-IMAGE WITH 100,000 HAND-PROGRAMMED PARAMETERS

This adapts the previous planet network to six different object families.
The exact same architecture is retained:
5 -> 193 -> 185 -> 185 -> 151 -> 3, four ReLU hidden layers and RGB clipping.

The neural decoder has exactly 100,000 parameter entries, including zeros.
It is deliberately sparse; verification.json records the nonzero count and
the number of entries changed from the previous planet checkpoint.

WHAT TEXT-TO-IMAGE MEANS HERE

An explicit, non-neural keyword parser maps text to three numeric codes:
object, color and size. The fixed neural decoder combines those codes with
pixel coordinates to generate RGB. The parser has no trained parameters.

This is a controlled-vocabulary text-to-image pipeline, not a learned or
open-vocabulary language model. Unsupported requests produce an error.
It can draw one supported object per image. The six geometric object designs
were authored by hand, then compiled into the neural weights. No images,
SVGs or shape-rendering functions are used during inference.

Vocabulary:
  Objects: rocket, sailboat, tree, house, mushroom, cat.
  Colors: red, orange, yellow, green, cyan, blue, purple, pink, white.
  Sizes: small, medium, large.
  Aliases: spaceship, boat, pine, cabin, toadstool, kitten.

All 162 object/color/size combinations use one fixed checkpoint. The colors
and size can also vary continuously through the numeric inputs. Components
such as eyes, windows and rocket flames keep their semantic accent colors.

There are zero training steps. No optimizer, gradient computation, fitted
parameters, pretrained network or image-generation service is used.

RUN

  python3 -m pip install -r requirements.txt
  python3 text_image.py "large blue sailboat" --output boat.png
  python3 text_image.py "small pink cat" --size 256 --output cat.png
  python3 text_image.py "green mushroom" --output mushroom.png

These commands load text_image_weights.npz and evaluate it; they never
modify the weights. Rendering supports resolutions from 16 to 2048.

Reconstruct the adapted weights and run validation:

  python3 text_image.py --build

FILES

text_image_weights.npz: the single adapted checkpoint (float32).
previous_planet_weights.npz: the previous version, for patch replay.
weight_patch.npz: changed flat indices and their new values for each tensor.
text_image.py: weight adaptation, text parser, rendering and validation.
network.py: the unchanged original affine/ReLU inference engine.
neuron_names.json: the purpose of each neuron.
examples.png: twelve prompts rendered by the same checkpoint.
verification.json: parameter count, exact patch replay and reload checks,
  dense/sparse numerical agreement, neuron activity, and distinct outputs
  for all 162 combinations at the test resolution.

The original architecture's raw parameter storage is 400,000 bytes. NPZ
compresses the many zeros and repeated hand-programmed coefficients.
