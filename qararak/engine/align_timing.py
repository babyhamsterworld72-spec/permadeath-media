# usage: python3 align_timing.py <epdir> <timingjs> <script.txt> [speed] ; fuzzy-aligns ElevenLabs words to script lines
import json,sys,difflib,re
ep,tjs,scr=sys.argv[1:4];SP=float(sys.argv[4]) if len(sys.argv)>4 else 1.07;OFF=0.10
raw=json.load(open(f'{ep}/words_raw.json'));raw=raw.get('words',raw) if isinstance(raw,dict) else raw
ws=[w for w in raw if w.get('type','word')=='word' and not w['text'].startswith('[')]
norm=lambda s:re.sub(r'[^\w]','',s.replace('ّ','')).replace('أ','ا').replace('إ','ا').replace('ة','ه').replace('ى','ي')
lines=open(scr).read().strip().split('\n');toks=[(k,t) for k,l in enumerate(lines) for t in l.split()]
A=[norm(t) for _,t in toks];B=[norm(w['text']) for w in ws]
m=difflib.SequenceMatcher(None,A,B,autojunk=False);mp={}
for op,a0,a1,b0,b1 in m.get_opcodes():
    if op in('equal','replace'):
        for i in range(a1-a0):mp[a0+i]=b0+min(i*(b1-b0)//max(1,a1-a0),b1-b0-1) if b1>b0 else None
f=lambda t:round(t/SP+OFF,3)
# fill gaps by interpolation
times=[]
for i in range(len(toks)):
    j=mp.get(i);times.append((ws[j]['start'],ws[j]['end']) if j is not None else None)
for i,t in enumerate(times):
    if t is None:
        p=next((times[k] for k in range(i-1,-1,-1) if times[k]),(0,0));n=next((times[k] for k in range(i+1,len(times)) if times[k]),(p[1]+.3,p[1]+.3))
        times[i]=(p[1],n[0]) if n[0]>p[1] else (p[1],p[1]+.2)
out=[];i=0
for k,l in enumerate(lines):
    n=len(l.split());seg=[(toks[i+q][1],times[i+q]) for q in range(n)];i+=n
    out.append({'id':f'L{k}','text':l,'start':f(seg[0][1][0]),'end':f(seg[-1][1][1]),'words':[{'w':w,'s':f(s),'e':f(e)} for w,(s,e) in seg]})
dur=round(out[-1]['end']+1.6,2);d={'lines':out,'duration':dur,'vo_offset':OFF,'speed':SP}
json.dump(d,open(f'{ep}/timing.json','w'),ensure_ascii=False);open(tjs,'w').write('var TIMING='+json.dumps(d,ensure_ascii=False)+';')
for l in out:print(l['id'],l['start'],l['end'],l['text'][:40])
print('dur',dur,'unmatched',sum(1 for x in mp.values() if x is None)+len(toks)-len(mp))
