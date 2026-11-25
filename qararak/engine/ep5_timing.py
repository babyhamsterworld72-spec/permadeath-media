import json
SP=1.07;OFF=0.10
raw=json.load(open('words_raw.json'));raw=raw.get('words',raw) if isinstance(raw,dict) else raw
ws=[w for w in raw if w.get('type','word')=='word' and not w['text'].startswith('[')]
script="""كسبت القضية… بس أبو فهد كان ينتظرك برّا، ومعه ولده!
مديرك اللي اتّهمك بالسرقة… رفع عليك قضية تشهير.
وأغلبكم قال: كمّل.
القاضي قال: اللي عرضته حقيقة… والحقيقة مو تشهير.
الدعوى مرفوضة… ولك تعويض عن فصلك.
بس عرض الكاميرا قدام الكل… لا تعيده.
طلعت… وفجأة وقفت.
أبو فهد… وولده الصغير ماسك يده.
قال: قضية السرقة بتدخّلني السجن…
وولدي… ماله أحد غيري.
وش بتسوي؟
A: تسامحه… وتتنازل عن القضية.
B: تكمّل… وياخذ جزاه.
اكتب حرفك… وقرارك بيقفل القصة.""".split('\n')
i=0;lines=[]
f=lambda t:round(t/SP+OFF,3)
for k,l in enumerate(script):
    toks=l.split();seg=ws[i:i+len(toks)];i+=len(toks)
    assert [s['text'] for s in seg]==toks,(k,[s['text'] for s in seg],toks)
    lines.append({'id':f'L{k}','text':l,'start':f(seg[0]['start']),'end':f(seg[-1]['end']),'words':[{'w':s['text'],'s':f(s['start']),'e':f(s['end'])} for s in seg]})
assert i==len(ws)
dur=round(lines[-1]['end']+1.6,2)
d={'lines':lines,'duration':dur,'vo_offset':OFF,'speed':SP}
json.dump(d,open('timing.json','w'),ensure_ascii=False)
open('../engine/timing5.js','w').write('var TIMING='+json.dumps(d,ensure_ascii=False)+';')
for l in lines:print(l['id'],l['start'],l['end'],l['text'][:30])
print('dur',dur)
