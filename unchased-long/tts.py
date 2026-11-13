import json,subprocess,os
v=json.load(open('../channel-kit/v01.json')); out={}
for x in v['scenes']:
    p=f"v01/assets/vo/s{x['n']:02d}.wav"
    if not os.path.exists(p):
        r=subprocess.run(['npx','hyperframes','tts',x['vo'].replace('un ask','unask'),'-v','am_michael','-s','0.95','-o',p,'--json'],capture_output=True,text=True)
        print(x['n'],r.stdout.strip().splitlines()[-1][:80],flush=True)
