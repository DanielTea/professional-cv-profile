"""Check the shipped browser weights and renderer against the downloadable NumPy models.

Run: python3 scripts/verify-weight-space.py
Requires: Python, numpy, Pillow and Node.js. No model training or network access.
"""
import hashlib
import importlib.util
import json
import subprocess
import sys
import tempfile
import zipfile
from pathlib import Path
import numpy as np

PUBLIC = Path(__file__).resolve().parents[1] / 'public/weight-space'
manifest = json.loads((PUBLIC/'manifest.json').read_text())
report = {'test': 'JavaScript sparse renderer versus saved NumPy checkpoints',
          'resolution':64, 'max_allowed_8bit_channel_difference':2,
          'models':{}, 'notes':'Numerical agreement and parser checks. No image-quality or generalization claim.'}
with tempfile.TemporaryDirectory() as directory:
    root=Path(directory)
    for kind,record in manifest['models'].items():
        archive=PUBLIC/record['archive']
        assert hashlib.sha256(archive.read_bytes()).hexdigest()==record['archive_sha256']
        assert hashlib.sha256((PUBLIC/f'{kind}.json').read_bytes()).hexdigest()==record['sparse_json_sha256']
        with zipfile.ZipFile(archive) as z:z.extractall(root)
        path=root/('planet_100k_v2' if kind=='planet' else 'text_image_100k')
        name='adapt_weights' if kind=='planet' else 'text_image'
        sys.path.insert(0,str(path))
        spec=importlib.util.spec_from_file_location(name,path/f'{name}.py')
        module=importlib.util.module_from_spec(spec);spec.loader.exec_module(module)
        checkpoint=path/('adapted_weights.npz' if kind=='planet' else 'text_image_weights.npz')
        assert hashlib.sha256(checkpoint.read_bytes()).hexdigest()==record['checkpoint_sha256']
        with np.load(checkpoint,allow_pickle=False) as f:arrays={key:f[key] for key in f.files}
        assert sum(a.size for a in arrays.values())==100000
        assert sum(np.count_nonzero(a) for a in arrays.values())==record['nonzero_entries']
        model=json.loads((PUBLIC/f'{kind}.json').read_text())
        for i,rows in enumerate(model['layers']):
            w=np.zeros_like(arrays[f'W{i}']);b=np.zeros_like(arrays[f'b{i}'])
            for j,(bias,edges) in enumerate(rows):
                b[j]=bias
                for k in range(0,len(edges),2):w[j,edges[k]]=edges[k+1]
            assert np.array_equal(w,arrays[f'W{i}']) and np.array_equal(b,arrays[f'b{i}'])
        # Replay the published patch instead of relying on the recorded report.
        previous=path/('original_weights.npz' if kind=='planet' else 'previous_planet_weights.npz')
        with np.load(previous,allow_pickle=False) as f, np.load(path/'weight_patch.npz',allow_pickle=False) as patch:
            for key in arrays:
                edited=f[key].copy()
                edited.ravel()[patch[key+'_indices']]=patch[key+'_values']
                assert np.array_equal(edited,arrays[key])
        cases=[{'controls':list(z),'label':n} for n,_,z in module.PRESETS] if kind=='planet' else [{'prompt':p,'label':p} for p in module.EXAMPLES]
        (root/'cases.json').write_text(json.dumps(cases))
        script=root/'test.mjs'
        script.write_text('''
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
const {encodePrompt,renderNetwork}=await import(process.argv[2]);
const model=JSON.parse(fs.readFileSync(process.argv[3],'utf8'));
const cases=JSON.parse(fs.readFileSync(process.argv[4],'utf8'));
if(model.objects){
  assert.equal(encodePrompt('draw a small pink kitten',model).label,'small pink cat');
  assert.equal(encodePrompt('a boat',model).label,'medium cyan sailboat');
  for(const prompt of ['','dog','cat house','red blue cat','small large cat','cat in space','constructor','two cats','2 cats'])
    assert.throws(()=>encodePrompt(prompt,model));
  const hashes=new Set();
  for(const object of model.objects)for(const color of Object.keys(model.colors))for(const size of Object.keys(model.sizes)){
    const {controls}=encodePrompt(`${size} ${color} ${object}`,model);
    hashes.add(createHash('sha256').update(renderNetwork(model,controls,48)).digest('hex'));
  }
  assert.equal(hashes.size,162);
}
for(let i=0;i<cases.length;i++){
  const z=cases[i].controls||encodePrompt(cases[i].prompt,model).controls;
  fs.writeFileSync(process.argv[5]+'/'+i+'.rgba',renderNetwork(model,z,64));
}
''')
        subprocess.run(['node',str(script),(PUBLIC/'model.mjs').as_uri(),str(PUBLIC/f'{kind}.json'),str(root/'cases.json'),str(root)],check=True)
        errors=[];net=module.Network(arrays)
        for i,case in enumerate(cases):
            expected=module.image_from_weights(net,64,case['controls']) if kind=='planet' else module.render(net,case['prompt'],64)
            actual=np.frombuffer((root/f'{i}.rgba').read_bytes(),dtype=np.uint8).reshape(64,64,4)
            assert np.all(actual[:,:,3]==255)
            error=int(np.abs(actual[:,:,:3].astype(int)-np.asarray(expected).astype(int)).max())
            assert error<=2,(kind,case,error)
            errors.append(error)
        report['models'][kind]={'cases':[c['label'] for c in cases], 'max_8bit_channel_difference':max(errors),
                                'sparse_json_matches_checkpoint_exactly':True,'patch_replay_exact':True,
                                'checkpoint_sha256':record['checkpoint_sha256']}
        if kind=='text':report['models'][kind].update(parser_checks_passed=True,distinct_combinations_at_48px=162)
(PUBLIC/'browser-verification.json').write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps(report,indent=2))
