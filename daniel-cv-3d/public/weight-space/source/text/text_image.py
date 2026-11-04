"""Hand-programmed, controlled-vocabulary text-to-image; exactly 100k parameters.

Text encoding is an explicit grammar, not a learned language encoder.
One fixed ReLU network maps coordinates + object/color/size codes to RGB.
"""
import argparse
import json
import math
import re
import hashlib
from pathlib import Path
import numpy as np
from PIL import Image, ImageDraw, ImageFont
from network import Affine, Layer, Network, ARCHITECTURE

HERE=Path(__file__).resolve().parent
OBJECTS=['rocket','sailboat','tree','house','mushroom','cat']
COLORS={'red':-1.,'orange':-.75,'yellow':-.5,'green':-.25,'cyan':0.,'blue':.25,'purple':.5,'pink':.75,'white':1.}
SIZES={'small':-.9,'medium':0.,'large':1.}
ALIASES={'spaceship':'rocket','boat':'sailboat','pine':'tree','cabin':'house','toadstool':'mushroom','kitten':'cat'}
EXAMPLES=['red rocket','cyan sailboat','green tree','orange house','pink mushroom','purple cat',
          'small blue rocket','large yellow sailboat','small pink tree','blue house','red mushroom','orange cat']


def encode_prompt(prompt):
    tokens=re.findall(r'[a-z]+',prompt.lower())
    tokens=[ALIASES.get(t,t) for t in tokens]
    allowed=set(OBJECTS)|set(COLORS)|set(SIZES)|{'a','an','the','draw','generate','image','picture','of','icon','please'}
    unknown=sorted(set(tokens)-allowed)
    if unknown:raise ValueError('Unsupported words: '+', '.join(unknown)+'. Objects: '+', '.join(OBJECTS)+'.')
    objects=[t for t in tokens if t in OBJECTS]
    colors=[t for t in tokens if t in COLORS]
    sizes=[t for t in tokens if t in SIZES]
    if len(objects)!=1:raise ValueError('Specify exactly one object: '+', '.join(OBJECTS))
    if len(colors)>1 or len(sizes)>1:raise ValueError('Use at most one color and one size.')
    defaults={'rocket':'red','sailboat':'cyan','tree':'green','house':'orange','mushroom':'pink','cat':'purple'}
    obj=objects[0];color=colors[0] if colors else defaults[obj];size=sizes[0] if sizes else 'medium'
    return [-1+OBJECTS.index(obj)*.4,COLORS[color],SIZES[size]],{'object':obj,'color':color,'size':size}


def ellipse(cx,cy,rx,ry,n):
    return [(cx+rx*math.cos(2*math.pi*i/n),cy+ry*math.sin(2*math.pi*i/n)) for i in range(n)]


def rect(x0,y0,x1,y1):return [(x0,y0),(x1,y0),(x1,y1),(x0,y1)]


def drawings():
    parts=[]
    def part(obj,name,vertices,dynamic=False,shade=1.,tint=(0,0,0),rgb=None):
        parts.append(dict(obj=obj,name=name,vertices=vertices,dynamic=dynamic,shade=shade,tint=tint,rgb=rgb))
    # Back-to-front drawing order is compiled into neural occlusion weights.
    part('rocket','flame',[(-.13,-.35),(.13,-.35),(0,-.78)],rgb=(.95,.46,.08))
    part('rocket','left_fin',[(-.12,-.36),(-.38,-.48),(-.13,.08)],True,.65)
    part('rocket','right_fin',[(.12,-.36),(.38,-.48),(.13,.08)],True,.80)
    part('rocket','body',[(-.16,-.40),(.16,-.40),(.16,.20),(.09,.48),(0,.65),(-.16,.20)],True,.85,(.08,.08,.08))
    part('rocket','nose',[(-.10,.38),(.10,.38),(0,.65)],True,.55)
    part('rocket','stripe',rect(-.16,-.31,.16,-.23),True,.4,(.38,.40,.44))
    part('rocket','window',ellipse(0,.13,.095,.095,8),rgb=(.26,.73,.92))

    part('sailboat','water',rect(-.72,-.51,.72,-.46),rgb=(.12,.37,.54))
    part('sailboat','sun',ellipse(.48,.48,.12,.12,6),rgb=(.92,.68,.20))
    part('sailboat','mast',rect(-.035,-.34,.015,.63),True,.35,(.24,.20,.15))
    part('sailboat','left_sail',[(-.075,.58),(-.075,-.18),(-.56,-.18)],True,.75,(.12,.12,.12))
    part('sailboat','right_sail',[(.065,.39),(.065,-.18),(.51,-.18)],True,.48,(.34,.34,.34))
    part('sailboat','hull',[(-.63,-.28),(.64,-.28),(.40,-.49),(-.40,-.49)],True,.80)

    part('tree','ground',ellipse(0,-.56,.38,.065,6),rgb=(.13,.18,.20))
    part('tree','trunk',rect(-.07,-.56,.07,-.10),rgb=(.39,.22,.10))
    part('tree','lower',[(-.48,-.27),(.48,-.27),(0,.39)],True,.56)
    part('tree','middle',[(-.37,-.04),(.37,-.04),(0,.55)],True,.75)
    part('tree','upper',[(-.25,.20),(.25,.20),(0,.72)],True,.92)
    part('tree','highlight',[(.02,.24),(.18,.24),(.02,.58)],True,.65,(.18,.18,.12))

    part('house','path',[(-.11,-.31),(.11,-.31),(.26,-.65),(-.26,-.65)],rgb=(.29,.32,.39))
    part('house','chimney',rect(.23,.30,.34,.62),True,.45)
    part('house','walls',rect(-.41,-.44,.41,.29),True,.65,(.13,.13,.13))
    part('house','roof',[(-.56,.25),(.56,.25),(0,.70)],True,.75)
    part('house','door',rect(-.10,-.44,.10,-.08),True,.30)
    part('house','left_window',rect(-.32,-.06,-.18,.11),rgb=(.92,.75,.34))
    part('house','right_window',rect(.18,-.06,.32,.11),rgb=(.92,.75,.34))

    part('mushroom','stem',[(-.14,-.51),(.16,-.51),(.10,.23),(-.09,.23)],True,.22,(.56,.51,.40))
    part('mushroom','stem_highlight',rect(-.075,-.43,-.025,.16),True,.15,(.65,.61,.53))
    cap=[(.56*math.cos(i*math.pi/9),.08+.49*math.sin(i*math.pi/9)) for i in range(10)]
    part('mushroom','cap',cap,True,.9)
    for i,(x,y,r) in enumerate(((-.27,.28,.075),(.02,.43,.084),(.29,.24,.07))):
        part('mushroom','spot.'+str(i),ellipse(x,y,r,r,6),rgb=(.87,.84,.73))

    part('cat','body',ellipse(0,-.22,.26,.36,8),True,.63)
    part('cat','left_paw',[(-.26,-.51),(-.04,-.51),(-.15,-.38)],True,.83)
    part('cat','right_paw',[(.04,-.51),(.26,-.51),(.15,-.38)],True,.83)
    part('cat','left_ear',[(-.26,.27),(-.31,.64),(-.03,.41)],True,.73)
    part('cat','right_ear',[(.26,.27),(.31,.64),(.03,.41)],True,.73)
    part('cat','head',[(-.29,.30),(-.18,.47),(.18,.47),(.29,.30),(.18,.09),(-.18,.09)],True,.95)
    part('cat','left_eye',rect(-.17,.27,-.09,.33),rgb=(.89,.94,.83))
    part('cat','right_eye',rect(.09,.27,.17,.33),rgb=(.89,.94,.83))
    part('cat','nose',[(-.05,.22),(.05,.22),(0,.16)],rgb=(.94,.48,.51))
    assert len(parts)==41,len(parts)
    assert sum(len(p['vertices']) for p in parts)==176
    assert sum(p['dynamic'] for p in parts)==26
    return parts


def palette_spline():
    anchors=np.array([[.92,.14,.12],[.94,.44,.10],[.92,.79,.16],[.19,.74,.28],
                      [.12,.77,.85],[.16,.38,.94],[.59,.27,.88],[.92,.35,.64],[.88,.91,.94]])
    knots=sorted(set(np.arange(-1,1,.125).tolist()+[-.9375,-.6875,-.4375]))
    samples=[]
    for z in knots+[1.]:
        t=(z+1)*4;j=min(7,int(t));f=t-j
        p0=anchors[max(0,j-1)];p1=anchors[j];p2=anchors[j+1];p3=anchors[min(8,j+2)]
        value=.5*((2*p1)+(-p0+p2)*f+(2*p0-5*p1+4*p2-p3)*f*f+(-p0+3*p1-3*p2+p3)*f*f*f)
        samples.append(np.clip(value,.06,.95))
    slopes=np.diff(samples,axis=0)/np.diff(knots+[1.])[:,None]
    coefficients=np.vstack((slopes[0],np.diff(slopes,axis=0)))
    assert len(knots)==19
    return knots,np.array(samples)[0],coefficients


def compile_weights():
    parts=drawings();x,y,object_code,color,size=[Affine({i:1}) for i in range(5)]
    l1=Layer(5)
    relay=[l1.add('input.'+name,e+1) for name,e in zip(('x','y','object','color','size'),(x,y,object_code,color,size))]
    gates={}
    for j,obj in enumerate(OBJECTS):
        code=-1+j*.4
        gates[obj]=l1.add(obj+'.gate.positive',object_code-code+.025)+l1.add(obj+'.gate.negative',code-object_code+.025)-.05
    violations=[]
    for p in parts:
        verts=p['vertices'];area=sum(verts[i][0]*verts[(i+1)%len(verts)][1]-verts[(i+1)%len(verts)][0]*verts[i][1] for i in range(len(verts)))
        if area<0:verts=list(reversed(verts))
        edges=[]
        for i,(ax,ay) in enumerate(verts):
            bx,by=verts[(i+1)%len(verts)];dx,dy=bx-ax,by-ay;length=math.hypot(dx,dy)
            nx,ny=dy/length,-dx/length;offset=nx*ax+ny*ay
            expression=x*nx+y*ny-offset*(.83+size*.24)
            edges.append(l1.add(p['obj']+'.'+p['name']+'.edge.'+str(i),expression))
        violations.append(sum(edges,Affine()))
    # The five input relays all have a job: palette, spatial glow, gate precision,
    # and coverage softness conditioned on size.
    l2=Layer(193);masks=[]
    for p,v in zip(parts,violations):
        group=[]
        for k,softness in enumerate((.0035,.007,.022,.065)):
            gate=gates[p['obj']]*12
            # Tiny object-code and size terms preserve all input relay paths;
            # they meaningfully vary antialias/glow coverage, without adding pixels.
            softness_adjust=(relay[4]-1)*.035+(relay[2]-1)*.015
            group.append(l2.add(p['obj']+'.'+p['name']+'.coverage.'+str(k),1-v*(1/softness)-gate-softness_adjust))
        masks.append(group)
    knots,base,coefficients=palette_spline()
    hinges=[l2.add('palette.hinge.'+str(i),relay[3]-1-k) for i,k in enumerate(knots)]
    positions=[l2.add('position.'+axis,e) for axis,e in zip(('x','y'),relay[:2])]
    l3=Layer(185)
    inverse=[[l3.add('inverse.'+str(i)+'.'+str(k),1-e) for k,e in enumerate(group)] for i,group in enumerate(masks)]
    hp=[l3.add('palette.hinge.'+str(i),e) for i,e in enumerate(hinges)]
    pp=[l3.add('position.'+str(i),e) for i,e in enumerate(positions)]
    palette=[float(base[c])+sum([h*float(coefficients[i,c]) for i,h in enumerate(hp)],Affine()) for c in range(3)]
    l4=Layer(185);rgb=[]
    def emit(name,expression,color):
        l4.add(name,expression);rgb.append(color)
    coverage=[[1-e for e in group] for group in inverse]
    for i,p in enumerate(parts):
        later=[j for j in range(i+1,len(parts)) if parts[j]['obj']==p['obj']]
        occlusion=sum([coverage[j][0] for j in later],Affine())
        visible=coverage[i][0]-occlusion
        if p['dynamic']:
            for c in range(3):
                channel=[0,0,0];channel[c]=1
                emit(p['obj']+'.'+p['name']+'.rgb.'+str(c),visible+palette[c]*p['shade']+p['tint'][c]-1,channel)
        else:emit(p['obj']+'.'+p['name']+'.fill',visible,p['rgb'])
        emit(p['obj']+'.'+p['name']+'.outline',coverage[i][2]-coverage[i][1]-occlusion,(.13,.17,.24))
    # Seventeen groups of soft silhouette glows, covering every geometric part.
    for oi,obj in enumerate(OBJECTS):
        indices=[i for i,p in enumerate(parts) if p['obj']==obj]
        groups=np.array_split(indices,2 if obj=='tree' else 3)
        for j,group in enumerate(groups):
            glow=sum([coverage[int(i)][3]-coverage[int(i)][2] for i in group],Affine())
            glow-=sum([coverage[int(i)][0] for i in group],Affine())
            glow-=pp[j%2]*.006
            emit(obj+'.glow.'+str(j),glow,(.035,.055,.09))
    l5=Layer(151)
    for c,bias in enumerate((.025,.039,.068)):
        l5.add(('red','green','blue')[c],Affine({i:float(v[c]) for i,v in enumerate(rgb)},bias))
    layers=[l1,l2,l3,l4,l5]
    assert [5]+[len(l.names) for l in layers]==ARCHITECTURE,[len(l.names) for l in layers]
    result={}
    for i,layer in enumerate(layers):result['W'+str(i)],result['b'+str(i)]=layer.arrays()
    return result,[l.names for l in layers]


def load(path):
    with np.load(path,allow_pickle=False) as f:return {k:f[k] for k in f.files}


def render(network,prompt,size=256,activity=None):
    z,_=encode_prompt(prompt);a=(np.arange(size,dtype=np.float32)+.5)*2/size-1
    x,y=np.meshgrid(a,-a)
    inputs=np.column_stack((x.ravel(),y.ravel(),np.tile(z,(size*size,1)))).astype(np.float32)
    rgb=np.empty((len(inputs),3),np.float32)
    for start in range(0,len(inputs),4096):rgb[start:start+4096]=network(inputs[start:start+4096],activity=activity)
    assert np.isfinite(rgb).all()
    return Image.fromarray(np.round(rgb.reshape(size,size,3)*255).astype(np.uint8))


def font(size):
    try:return ImageFont.truetype('/System/Library/Fonts/Menlo.ttc',size)
    except OSError:return ImageFont.load_default()


def build():
    target,names=compile_weights();previous=load(HERE/'previous_planet_weights.npz')
    patch={};changes={};edited={k:v.copy() for k,v in previous.items()}
    for key in previous:
        assert previous[key].shape==target[key].shape
        idx=np.flatnonzero(previous[key].ravel()!=target[key].ravel()).astype(np.int32)
        values=target[key].ravel()[idx];patch[key+'_indices']=idx;patch[key+'_values']=values
        edited[key].ravel()[idx]=values;changes[key]=len(idx)
        assert np.array_equal(edited[key],target[key])
    np.savez_compressed(HERE/'text_image_weights.npz',**edited)
    np.savez_compressed(HERE/'weight_patch.npz',**patch)
    (HERE/'neuron_names.json').write_text(json.dumps(names,indent=2)+'\n')
    net=Network(edited);size=224
    sheet=Image.new('RGB',(size*4,(size+44)*3),(6,10,17));d=ImageDraw.Draw(sheet)
    for i,prompt in enumerate(EXAMPLES):
        im=render(net,prompt,size);im.save(HERE/(prompt.replace(' ','_')+'.png'))
        left,top=i%4*size,i//4*(size+44);sheet.paste(im,(left,top))
        d.text((left+12,top+size+12),prompt,font=font(12),fill=(202,218,235))
    sheet.save(HERE/'examples.png')
    rng=np.random.default_rng(117);probes=rng.uniform(-1,1,(1024,5)).astype(np.float32)
    error=float(np.abs(net(probes)-net(probes,dense=True)).max());assert error<.002,error
    activity=[np.zeros(w,bool) for w in ARCHITECTURE[1:-1]]
    for obj in OBJECTS:
        for color in ('red','green','white'):
            render(net,'large '+color+' '+obj,160,activity)
    net(probes,activity=activity)
    inactive=[[names[i][j] for j in np.flatnonzero(~a)] for i,a in enumerate(activity)]
    assert not any(inactive),inactive
    reachable=np.ones(3,bool)
    for i in reversed(range(5)):
        assert reachable.all(),(i,np.flatnonzero(~reachable))
        reachable=np.any(edited['W'+str(i)][reachable]!=0,axis=0)
    assert reachable.all()
    assert sum(a.size for a in edited.values())==100000
    replay=load(HERE/'previous_planet_weights.npz');saved=load(HERE/'weight_patch.npz')
    for key in replay:
        replay[key].ravel()[saved[key+'_indices']]=saved[key+'_values']
        assert np.array_equal(replay[key],edited[key])
    reload_net=Network(load(HERE/'text_image_weights.npz'))
    assert np.array_equal(net(probes),reload_net(probes))
    try:encode_prompt('a dog')
    except ValueError:pass
    else:raise AssertionError('Unsupported object accepted')
    # All combinations share a single checkpoint; verify distinct outputs,
    # including combinations not selected for the example sheet.
    digests=set()
    for obj in OBJECTS:
        for color in COLORS:
            for size_word in SIZES:
                image=render(net,size_word+' '+color+' '+obj,48)
                digests.add(hashlib.sha256(image.tobytes()).hexdigest())
    assert len(digests)==162,len(digests)
    report=dict(architecture=ARCHITECTURE,parameter_entries=100000,
        nonzero_entries=sum(int(np.count_nonzero(a)) for a in edited.values()),changed_entries=sum(changes.values()),
        changes_by_tensor=changes,training_steps=0,one_checkpoint_for_all_prompts=True,
        exact_patch_replay=True,exact_checkpoint_reload=True,dense_sparse_error=error,
        inactive_neurons_in_probes=inactive,all_neurons_have_output_path=True,
        text_encoder='Explicit keyword grammar; no learned language understanding',
        supported_objects=OBJECTS,colors=list(COLORS),sizes=list(SIZES),distinct_tested_combinations=len(digests),
        checkpoint_sha256=hashlib.sha256((HERE/'text_image_weights.npz').read_bytes()).hexdigest())
    (HERE/'verification.json').write_text(json.dumps(report,indent=2)+'\n')
    print(json.dumps(report,indent=2))


def main():
    p=argparse.ArgumentParser(description=__doc__)
    p.add_argument('prompt',nargs='?',default='red rocket')
    p.add_argument('--build',action='store_true')
    p.add_argument('--size',type=int,default=512)
    p.add_argument('--output',type=Path,default=HERE/'generated.png')
    args=p.parse_args()
    if args.build:build();return
    if not 16<=args.size<=2048:p.error('Size must be 16 to 2048')
    try:encode_prompt(args.prompt)
    except ValueError as e:p.error(str(e))
    render(Network(load(HERE/'text_image_weights.npz')),args.prompt,args.size).save(args.output)
    print('Saved',args.output)


if __name__=='__main__':main()
