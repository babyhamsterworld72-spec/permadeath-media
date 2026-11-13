import json,subprocess,os
d=json.load(open('../channel-kit/kit_data.json'))
for v in d['v'][1:]:
    vid='v'+v['id']; os.makedirs(f'{vid}/assets/vo',exist_ok=True)
    json.dump(v,open(f'../channel-kit/{vid}.json','w'),ensure_ascii=False,indent=1)
    for x in v['scenes']:
        p=f"{vid}/assets/vo/s{x['n']:02d}.wav"
        if not os.path.exists(p):
            subprocess.run(['npx','hyperframes','tts',x['vo'],'-v','am_michael','-s','0.95','-o',p,'--json'],capture_output=True)
    print(vid,'done',flush=True)
