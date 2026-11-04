"""Directly rewrite the original 100k MLP; no fitting or training.

One fixed adapted checkpoint generates all examples from three continuous
inputs: climate (cold/warm), structure (ring direction/presence), terrain.
The original architecture and original forward evaluator are unchanged.
"""
import argparse
import hashlib
import json
import math
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFont
from base_network import Affine, Layer, Network, polygon_norm, ARCHITECTURE

HERE = Path(__file__).resolve().parent
PRESETS = [
    ("PELAGIC", "Oceans and continents", (-1.0, 0.0, 0.65)),
    ("EMBER", "Cratered volcanic world", (1.0, 0.0, 0.65)),
    ("FROST", "Small, cold, sparse surface", (-0.7, -0.12, -0.95)),
    ("AURELIA", "Amber gas giant", (1.0, 0.95, 0.85)),
    ("AZURE", "Tilted ice rings", (-1.0, -0.95, 0.50)),
    ("DUSK", "Small world, broad rings", (0.5, 0.75, -0.75)),
]


def construct_adapted():
    x, y, climate, structure, terrain = [Affine({i: 1}) for i in range(5)]
    l1 = Layer(5)
    relays = [l1.add(f"input.{name}", e + 1) for name, e in
              zip(("x", "y", "climate", "structure", "terrain"), (x, y, climate, structure, terrain))]
    xr, yr, cr, sr, tr = [e - 1 for e in relays]
    cx, cy = structure * .06, climate * .055
    px, py = x - cx, y - cy
    pr = polygon_norm(l1, "planet", px, py, 32)
    light_r = polygon_norm(l1, "illumination", px + .23 - structure * .35, py - .24, 24)
    ring_r = []
    for j, angle in enumerate((-.39, .72)):
        u = math.cos(angle) * px + math.sin(angle) * py
        v = -math.sin(angle) * px + math.cos(angle) * py
        ring_r.append(polygon_norm(l1, f"ring.{j}", u * (1/.86), v * (1/.29), 24))

    blobs = []
    positions = [(-.20,.22,.14,.21),(-.14,.02,.13,.18),(-.06,-.22,.11,.18),
                 (.18,.16,.17,.13),(.22,-.10,.13,.18),(.04,.31,.12,.10)]
    for j, (bx, by, sx, sy) in enumerate(positions):
        angle = .41 + j * 1.17
        dx = px - bx - terrain * (.035 * math.cos(j*2))
        dy = py - by - terrain * (.055 * math.sin(j*2+1))
        u = math.cos(angle)*dx + math.sin(angle)*dy
        v = -math.sin(angle)*dx + math.cos(angle)*dy
        blobs.append(polygon_norm(l1, f"surface.{j}", u*(1/sx), v*(1/sy), 8))
    star_positions = [(-.81,.80),(-.42,.69),(.39,.86),(.83,.53),(-.86,-.51),
                      (.68,-.72),(-.29,-.83),(.88,-.18),(.07,.78)]
    distances = []
    for j, (sx, sy) in enumerate(star_positions):
        dx, dy = x-sx-terrain*.025*math.sin(j), y-sy-climate*.025*math.cos(j)
        scale = 1/(.011+.004*(j%3))
        distances.append(sum([l1.add(f"star.{j}.{k}", e*scale)
                              for k,e in enumerate((dx,-dx,dy,-dy))], Affine()))

    l2 = Layer(len(l1.names))
    thresholds = {}
    def threshold(name, expression):
        thresholds[name] = l2.add(name, expression)
    radius = .40 + tr*.105
    threshold("sphere", (radius-pr)*300)
    for i in range(24):
        threshold(f"light.{i}", (.08+i*.76/23-light_r)*32)
    for i in range(2):
        threshold(f"atmosphere.{i}.outer", (radius+.014+i*.013-pr)*220)
        threshold(f"atmosphere.{i}.inner", (radius-.002+i*.013-pr)*220)
    for j in range(2):
        for i in range(16):
            lo = .64+i*.36/16
            threshold(f"ring.{j}.{i}.outer", (lo+.36/16*.92-ring_r[j])*300)
            threshold(f"ring.{j}.{i}.inner", (lo+.36/16*.08-ring_r[j])*300)
    for j, distance in enumerate(blobs):
        for k, radius0 in enumerate((.36,.53,.78,1.0)):
            threshold(f"blob.{j}.{k}", (radius0+tr*.32-distance)*70)
    band_y = yr-cr*.055 + (xr-sr*.06)*.16 + tr*.055
    for i in range(24):
        center = (i-11.5)*.037
        threshold(f"band.{i}.upper", (center+.015-band_y)*300)
        threshold(f"band.{i}.lower", (center-.015-band_y)*300)
    copies2 = {}
    for j,distance in enumerate(distances):
        copies2[f"star.{j}"] = l2.add(f"star.{j}", .85-distance)
    for name,e in (("background.x",xr+1),("background.y",yr+1),("background.radius",pr),
                   ("latent.climate",cr+1),("latent.structure",sr+1),("latent.terrain",tr+1)):
        copies2[name] = l2.add(name,e)
    for j,angle in enumerate((-.39,.72)):
        vr = -math.sin(angle)*(xr-sr*.06)+math.cos(angle)*(yr-cr*.055)
        threshold(f"front.{j}", .5-vr*350)
    threshold("warm", .5+cr*.5)
    threshold("enable.0", (sr-.20)*2.5)
    threshold("enable.1", (-sr-.20)*2.5)

    l3 = Layer(len(l2.names))
    inv = {name:l3.add("inverse."+name,1-e) for name,e in thresholds.items()}
    copies = {name:l3.add(name,e) for name,e in copies2.items()}
    l4 = Layer(len(l3.names))
    colors = []
    def feature(name,e,rgb):
        l4.add(name,e)
        colors.append(rgb)
    sphere = 1-inv["sphere"]
    warm, cold = 1-inv["warm"], inv["warm"]
    ringed = 2-inv["enable.0"]-inv["enable.1"]
    feature("sphere.base",sphere,(.018,.028,.044))
    for i in range(24):
        shade = 1-inv[f"light.{i}"]-inv["sphere"]
        feature(f"cold.light.{i}",shade-warm,tuple(c/24 for c in (.15,.59,.94)))
        feature(f"warm.light.{i}",shade-cold,tuple(c/24 for c in (.98,.37,.105)))
    for i in range(2):
        m = inv[f"atmosphere.{i}.inner"]-inv[f"atmosphere.{i}.outer"]
        feature(f"cold.atmosphere.{i}",m-warm,(.015,.075/(i+1),.16/(i+1)))
        feature(f"warm.atmosphere.{i}",m-cold,(.16/(i+1),.045/(i+1),.012))
    for j in range(2):
        for group in range(8):
            # Two adjacent ringlets per feature; grouping saves neurons for surfaces.
            m=Affine()
            for i in (2*group,2*group+1):
                intensity=.70+.25*math.sin(i*.82)**2
                if i in (10,11): intensity*=.36
                m += (inv[f"ring.{j}.{i}.inner"]-inv[f"ring.{j}.{i}.outer"])*intensity
            rgb = np.array((.68,.49,.27) if j==0 else (.29,.57,.74))
            feature(f"ring.{j}.{group}.front",m-inv[f"front.{j}"]-inv[f"enable.{j}"],rgb)
            feature(f"ring.{j}.{group}.back",m+inv[f"front.{j}"]-1-sphere-inv[f"enable.{j}"],rgb*.70)
    for j in range(6):
        land = 1-inv[f"blob.{j}.3"]
        inner = 1-inv[f"blob.{j}.2"]
        terrain_gate = inv["sphere"]+ringed
        daylight = inv["light.19"]*.65
        feature(f"land.{j}.coast",land-terrain_gate-warm-daylight,(.025,.10,-.12))
        feature(f"land.{j}.interior",inner-terrain_gate-warm-daylight,(.055,.10,-.18))
        feature(f"crater.{j}.rim",land-inner-terrain_gate-cold,(.28,.085,.018))
        feature(f"crater.{j}.floor",inner-terrain_gate-cold,(-.24,-.10,-.025))
        lava = inv[f"blob.{j}.0"]-inv[f"blob.{j}.1"]
        feature(f"crater.{j}.lava",lava-terrain_gate-cold,(.52,.13,.025))
    for i in range(24):
        m=inv[f"band.{i}.lower"]-inv[f"band.{i}.upper"]
        strength=.45+.55*math.sin(i*1.73)**2
        feature(f"gas.band.{i}",m-inv["sphere"]-(1-ringed),
                (.14*strength,.10*strength,.045*strength))
    for i in range(9):
        star=copies[f"star.{i}"]-.02*copies["latent.terrain"]
        feature(f"star.{i}",star,(.65,.75,.90))
    feature("background.x",copies["background.x"]+.3*copies["latent.climate"],(.004,.001,.003))
    feature("background.y",copies["background.y"]+.2*copies["latent.structure"],(.002,.003,.008))
    feature("background.radius",copies["background.radius"],(.001,.001,.003))
    l5 = Layer(len(l4.names))
    for channel,bias in enumerate((.006,.009,.020)):
        l5.add(("r","g","b")[channel],Affine({i:float(rgb[channel]) for i,rgb in enumerate(colors)},bias))
    layers=[l1,l2,l3,l4,l5]
    widths=[5]+[len(l.names) for l in layers]
    assert widths==ARCHITECTURE,widths
    arrays={}
    for i,layer in enumerate(layers):
        arrays[f"W{i}"],arrays[f"b{i}"]=layer.arrays()
    return arrays,[l.names for l in layers]


def image_from_weights(network,size,z,activity=None):
    a=(np.arange(size,dtype=np.float32)+.5)*(2/size)-1
    x,y=np.meshgrid(a,-a)
    inputs=np.column_stack((x.ravel(),y.ravel(),np.tile(z,(size*size,1)))).astype(np.float32)
    rgb=np.empty((len(inputs),3),np.float32)
    for start in range(0,len(inputs),4096):
        rgb[start:start+4096]=network(inputs[start:start+4096],activity=activity)
    assert np.isfinite(rgb).all()
    return Image.fromarray(np.round(rgb.reshape(size,size,3)*255).astype(np.uint8))


def load(path):
    with np.load(path,allow_pickle=False) as f:
        return {key:f[key] for key in f.files}


def adapt():
    base=load(HERE/"original_weights.npz")
    target,names=construct_adapted()
    patch={}
    edited={key:value.copy() for key,value in base.items()}
    changes={}
    for key in base:
        assert base[key].shape==target[key].shape
        indices=np.flatnonzero(base[key].ravel()!=target[key].ravel()).astype(np.int32)
        values=target[key].ravel()[indices]
        patch[key+"_indices"]=indices
        patch[key+"_values"]=values
        edited[key].ravel()[indices]=values
        changes[key]=len(indices)
        assert np.array_equal(edited[key],target[key])
    np.savez_compressed(HERE/"weight_patch.npz",**patch)
    np.savez_compressed(HERE/"adapted_weights.npz",**edited)
    (HERE/"neuron_names.json").write_text(json.dumps(names,indent=2)+"\n")
    return edited,names,changes


def font(size):
    try:return ImageFont.truetype("/System/Library/Fonts/Menlo.ttc",size)
    except OSError:return ImageFont.load_default()


def examples(network):
    size=320
    sheet=Image.new("RGB",(size*3,(size+66)*2),(7,10,20))
    draw=ImageDraw.Draw(sheet)
    for i,(name,description,z) in enumerate(PRESETS):
        picture=image_from_weights(network,size,z)
        picture.save(HERE/f"{name.lower()}.png")
        left,top=(i%3)*size,(i//3)*(size+66)
        sheet.paste(picture,(left,top))
        draw.text((left+18,top+size+9),name,font=font(16),fill=(229,237,247))
        draw.text((left+18,top+size+32),description,font=font(10),fill=(133,161,189))
    sheet.save(HERE/"new_samples.png")


def verify(edited,names,changes):
    network=Network(edited)
    rng=np.random.default_rng(74)
    probes=rng.uniform(-1,1,(1024,5)).astype(np.float32)
    error=float(np.abs(network(probes)-network(probes,dense=True)).max())
    assert error<.001,error
    live=[np.zeros(w,bool) for w in ARCHITECTURE[1:-1]]
    for _,_,z in PRESETS:
        image_from_weights(network,192,z,live)
    network(probes,activity=live)
    inactive=[[names[i][j] for j in np.flatnonzero(~v)] for i,v in enumerate(live)]
    assert not any(inactive),inactive
    reachable=np.ones(3,bool)
    for i in reversed(range(5)):
        assert reachable.all(),(i,np.flatnonzero(~reachable))
        reachable=np.any(edited[f"W{i}"][reachable]!=0,axis=0)
    assert reachable.all()
    # Compare differences between the SAME latent pairs, before vs after adaptation.
    zvalues=[z for _,_,z in PRESETS]
    def diversity(net):
        samples=[np.asarray(image_from_weights(net,128,z),dtype=float)/255 for z in zvalues]
        diffs=[float(np.mean(np.abs(samples[i]-samples[j])))
               for i in range(len(samples)) for j in range(i)]
        return {"mean_pairwise_rgb_mae":float(np.mean(diffs)),"min_pairwise_rgb_mae":min(diffs)}
    before=diversity(Network(load(HERE/"original_weights.npz")))
    after=diversity(network)
    assert after["mean_pairwise_rgb_mae"]>before["mean_pairwise_rgb_mae"]*2
    assert sum(a.size for a in edited.values())==100000
    reloaded=Network(load(HERE/"adapted_weights.npz"))
    assert np.array_equal(network(probes),reloaded(probes))
    # Replay the actual saved patch against the original checkpoint.
    replay=load(HERE/"original_weights.npz")
    patch=load(HERE/"weight_patch.npz")
    for k in replay:
        replay[k].ravel()[patch[k+"_indices"]]=patch[k+"_values"]
        assert np.array_equal(replay[k],edited[k])
    report={"architecture":ARCHITECTURE,"parameter_entries":100000,
            "nonzero_entries":sum(int(np.count_nonzero(a)) for a in edited.values()),
            "changed_entries":sum(changes.values()),"changes_by_tensor":changes,
            "training_steps":0,"same_checkpoint_for_all_images":True,
            "patch_replay_exact":True,"checkpoint_reload_exact":True,
            "dense_sparse_max_difference":error,"inactive_neurons_in_probe_suite":inactive,
            "all_neurons_have_output_path":True,"before_diversity":before,"after_diversity":after,
            "diversity_ratio":after["mean_pairwise_rgb_mae"]/before["mean_pairwise_rgb_mae"],
            "checkpoint_sha256":hashlib.sha256((HERE/"adapted_weights.npz").read_bytes()).hexdigest(),
            "metric_note":"Pixel differences are a simple regression check, not a general generative-quality benchmark."}
    (HERE/"verification.json").write_text(json.dumps(report,indent=2)+"\n")
    print(json.dumps(report,indent=2))


def main():
    p=argparse.ArgumentParser(description=__doc__)
    p.add_argument("--render",action="store_true",help="Only load saved adapted weights and render")
    p.add_argument("--z",nargs=3,type=float,default=[-1,0,.65],metavar=("CLIMATE","STRUCTURE","TERRAIN"))
    p.add_argument("--size",type=int,default=512)
    p.add_argument("--output",type=Path,default=HERE/"planet.png")
    args=p.parse_args()
    if any(abs(z)>1 for z in args.z):p.error("Controls must be in [-1,1]")
    if not 16<=args.size<=2048:p.error("Image size must be between 16 and 2048")
    if args.render:
        network=Network(load(HERE/"adapted_weights.npz"))
        image_from_weights(network,args.size,args.z).save(args.output)
    else:
        edited,names,changes=adapt()
        network=Network(edited)
        examples(network)
        image_from_weights(network,512,PRESETS[0][2]).save(HERE/"planet.png")
        verify(edited,names,changes)


if __name__=="__main__":main()
