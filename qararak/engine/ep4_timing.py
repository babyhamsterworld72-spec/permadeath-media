import json
SP=1.07;OFF=0.10
raw=json.load(open('words_raw.json'));raw=raw.get('words',raw) if isinstance(raw,dict) else raw
ws=[w for w in raw if w.get('type','word')=='word']
script="""فضحته قدام الكل… والحين هو اللي رافع عليك قضية!
مديرك اتّهمك إنك سرقت عشرة آلاف… من محفظته اللي رجّعتها له بيدك.
بس كاميرا المكتب صوّرته… وهو يدسّها في درجه.
وأغلبكم قال: اعرضه قدام الكل.
دخلت الاجتماع… وشبكت جوالك على الشاشة الكبيرة.
وطلع هو… قدام الشركة كلها.
محد تكلّم… وفجأة انفتح الباب.
صاحب الشركة كان واقف… وشاف كل شي.
قال له: أبو فهد… أنت مفصول.
بس بعد يومين… وصلتك رسالة.
أبو فهد رافع عليك قضية تشهير… لأنك عرضت التسجيل بدون إذن.
واللي قالوا محامي… كنتم صح.
محاميك قال: عندك طريقين.
وش بتسوي؟
A: تكمّل للمحكمة… وتطالب بتعويض عن فصلك.
B: تقبل عرضه… مية ألف ريال، وتسحبون القضيتين.
اكتب حرفك… والجزء الجاي بتعرف حكم القاضي.""".split('\n')
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
open('../engine/timing4.js','w').write('var TIMING='+json.dumps(d,ensure_ascii=False)+';')
for l in lines:print(l['id'],l['start'],l['end'],l['text'][:30])
print('dur',dur)
