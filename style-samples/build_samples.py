"""Seven 6-second style samples (same voice line) as HyperFrames projects: style-samples/sNN_name/."""
import os, shutil, json

B = os.path.dirname(os.path.abspath(__file__))
SH = os.path.join(B, 'shared')
T = json.load(open(os.path.join(SH, 'timing.json')))  # [[s,e],...] for the 3 lines
b1, b2, b3 = T

GSAP = '<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js"></script>'
FONTS = '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=League+Gothic&family=Inter:wght@500;700;900&display=swap">'

# Puppet rig: every joint is a <g> rotated about its own origin; one pose object per figure, applied on every timeline update.
RIG = r"""
const NS='http://www.w3.org/2000/svg';
function mk(tag,a,p){const e=document.createElementNS(NS,tag);for(const k in a)e.setAttribute(k,a[k]);p.appendChild(e);return e}
function man(id,o){
  o=Object.assign({stroke:'#17140F',w:8,head:'#fff',fill:false,scarf:'#C8341F',r:30},o);
  const g=document.getElementById(id); const P={};
  const L=(p,len,w)=>mk('line',{x1:0,y1:0,x2:0,y2:len,stroke:o.stroke,'stroke-width':w||o.w,'stroke-linecap':'round'},p);
  const J=(p,x,y)=>mk('g',{},mk('g',{transform:`translate(${x},${y})`},p));
  const body=J(g,0,0);
  for(const s of ['L','R']){const th=J(body,0,0);L(th,52);const sh=J(th,0,52);L(sh,52);P['th'+s]=th;P['sh'+s]=sh;}
  mk('line',{x1:0,y1:0,x2:0,y2:-112,stroke:o.stroke,'stroke-width':o.w,'stroke-linecap':'round'},body);
  for(const s of ['L','R']){const ua=J(body,0,-100);L(ua,44);const fa=J(ua,0,44);L(fa,40);P['ua'+s]=ua;P['fa'+s]=fa;}
  const hd=J(body,0,-148);
  mk('circle',{cx:0,cy:0,r:o.r,fill:o.fill?o.stroke:o.head,stroke:o.stroke,'stroke-width':o.w},hd);
  const eyes=mk('g',{},hd);
  if(o.fill){mk('ellipse',{cx:-10,cy:-4,rx:5,ry:8,fill:'#fff'},eyes);mk('ellipse',{cx:10,cy:-4,rx:5,ry:8,fill:'#fff'},eyes);}
  else{mk('circle',{cx:-10,cy:-5,r:4,fill:o.stroke},eyes);mk('circle',{cx:10,cy:-5,r:4,fill:o.stroke},eyes);
       P.mouth=mk('path',{d:'M-9 12 L9 12',stroke:o.stroke,'stroke-width':4,fill:'none','stroke-linecap':'round'},hd);}
  if(o.scarf){mk('path',{d:'M-20 -122 L20 -122 L18 -108 L-18 -108Z',fill:o.scarf,stroke:o.stroke,'stroke-width':3},body);
              mk('path',{d:'M6 -110 L18 -110 L24 -72 L12 -72Z',fill:o.scarf,stroke:o.stroke,'stroke-width':3},body);}
  P.eyes=eyes;P.body=body;P.head=hd;P.root=g;
  const S={x:0,y:0,s:1,lean:0,thL:10,thR:-10,shL:0,shR:0,uaL:14,uaR:-14,faL:0,faR:0,hd:0,blink:1,face:1};
  P.S=S; return P;
}
function pose(P){const S=P.S;
  P.root.setAttribute('transform',`translate(${S.x},${S.y-104*S.s}) scale(${S.s*S.face},${S.s})`);
  P.body.setAttribute('transform',`rotate(${S.lean})`);
  for(const k of ['thL','thR','shL','shR','uaL','uaR','faL','faR'])P[k].setAttribute('transform',`rotate(${S[k]})`);
  P.head.setAttribute('transform',`rotate(${S.hd})`);
  P.eyes.setAttribute('transform',`scale(1,${S.blink})`);
}
function walk(tl,P,t0,dur,dx,step=0.32){
  tl.to(P.S,{x:P.S.x+dx,duration:dur,ease:'none'},t0);
  for(let t=t0,k=0;t<t0+dur-0.05;t+=step,k++){const a=k%2?1:-1;
    tl.to(P.S,{thL:24*a,thR:-24*a,shL:a>0?0:20,shR:a>0?20:0,uaL:-22*a,uaR:22*a,duration:step,ease:'sine.inOut'},t);}
  tl.to(P.S,{thL:10,thR:-10,shL:0,shR:0,uaL:14,uaR:-14,duration:0.2},t0+dur);
}
function blink(tl,P,t){tl.to(P.S,{blink:0.1,duration:0.06},t);tl.to(P.S,{blink:1,duration:0.08},t+0.08);}
function breathe(tl,P,t0,t1){for(let t=t0,k=0;t<t1;t+=1.1,k++)tl.to(P.S,{lean:k%2?0:1.5,duration:1.1,ease:'sine.inOut'},t);}
"""

BOIL = """<svg width="0" height="0" style="position:absolute"><filter id="boil"><feTurbulence id="turb" type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="1"/><feDisplacementMap in="SourceGraphic" scale="3.2"/></filter></svg>"""
BOIL_JS = "for(let i=0;i<72;i++)tl.set('#turb',{attr:{seed:1+(i%4)}},i/12);"


def page(name, css, body, js, sfx, bg='#FBF8F2'):
    d = os.path.join(B, name); os.makedirs(os.path.join(d, 'assets'), exist_ok=True)
    for f in os.listdir(SH):
        if f.endswith(('.mp3',)) or f == 'vo.wav': shutil.copy(os.path.join(SH, f), os.path.join(d, 'assets', f))
    for f in ('hero-stand.png', 'walk-away.png', 'arms-crossed.png', 'bench-phone.png', 'face-calm.png'):
        shutil.copy(os.path.join(B, '..', 'unchased-shorts', 'shared', f), os.path.join(d, 'assets', f))
    aud = ['<audio id="vo" class="clip" src="assets/vo.wav" data-start="0" data-duration="6" data-track-index="10" data-volume="1"></audio>']
    for k, (f, t, v) in enumerate(sfx):
        aud.append(f'<audio id="fx{k}" class="clip" src="assets/{f}" data-start="{t:.2f}" data-duration="{min(0.9, 6 - t):.2f}" data-track-index="{20 + k}" data-volume="{v}"></audio>')
    html = f"""<!doctype html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=1920, height=1080">
{GSAP}
{FONTS}
<style>
*{{margin:0;padding:0;box-sizing:border-box}} html,body{{width:1920px;height:1080px;overflow:hidden;background:{bg}}}
#root{{position:relative;width:1920px;height:1080px;overflow:hidden;background:{bg};font-family:Inter,sans-serif}}
.abs{{position:absolute}} .hl{{font-family:'League Gothic',sans-serif;text-transform:uppercase;line-height:.92}}
.cap{{position:absolute;left:0;right:0;bottom:70px;text-align:center;font:900 46px Inter;color:#17140F;opacity:0}}
{css}
</style></head><body>
<div id="root" data-composition-id="main" data-start="0" data-duration="6" data-width="1920" data-height="1080">
{body}
{chr(10).join(aud)}
</div>
<script>
{RIG}
const tl=gsap.timeline({{paused:true}});
const FIG=[];
{js}
tl.eventCallback('onUpdate',()=>FIG.forEach(pose)); FIG.forEach(pose);
tl.set({{}},{{}},6);
window.__timelines["main"]=tl;
</script>
</body></html>"""
    open(os.path.join(d, 'index.html'), 'w').write(html)
    for f in ('hyperframes.json', 'package.json', 'meta.json'):
        shutil.copy(os.path.join(B, '..', 'unchased-shorts', 'tpl', f), os.path.join(d, f))


def caps(lines, cls='cap', color=None):
    body = ''.join(f'<div class="{cls}" id="cap{i}"{f" style=\"color:{color}\"" if color else ""}>{t}</div>' for i, t in enumerate(lines))
    js = '\n'.join(f"tl.fromTo('#cap{i}',{{opacity:0,y:12}},{{opacity:1,y:0,duration:.15}},{s-.05:.2f});tl.to('#cap{i}',{{opacity:0,duration:.12}},{e+.2:.2f});"
                   for i, (s, e) in enumerate(T))
    return body, js


LINES = ["He didn't block her.", "He didn't argue.", "One day, he just stopped."]

# ---------------------------------------------------------------- 1 animated stickman
cb, cj = caps(LINES)
page('s1_stickman_animated', """
#world{position:absolute;inset:0;transform-origin:50% 60%}
.paper{position:absolute;inset:0;background:radial-gradient(ellipse at 50% 40%,#FFFDF7 0%,#F3EDE0 100%)}
#scene2{opacity:0} #scene3{opacity:0}
.wipe{position:absolute;top:0;bottom:0;width:2400px;left:-2400px;background:#17140F}
""", f"""
{BOIL}
<div class="paper"></div>
<div id="world">
<svg id="stage" width="1920" height="1080" viewBox="0 0 1920 1080" class="abs" style="filter:url(#boil)">
  <line x1="200" y1="820" x2="1720" y2="820" stroke="#17140F" stroke-width="6" stroke-linecap="round"/>
  <g id="scene1">
    <g id="phoneBig" transform="translate(1180,250)">
      <rect x="0" y="0" width="300" height="520" rx="40" fill="#fff" stroke="#17140F" stroke-width="8"/>
      <circle cx="150" cy="110" r="46" fill="#2F7D4F" stroke="#17140F" stroke-width="6"/>
      <rect id="blockBtn" x="40" y="210" width="220" height="80" rx="18" fill="#C8341F" stroke="#17140F" stroke-width="6"/>
      <text x="150" y="263" text-anchor="middle" font-family="Inter" font-weight="900" font-size="38" fill="#fff">BLOCK</text>
      <line id="x1" x1="30" y1="200" x2="270" y2="300" stroke="#17140F" stroke-width="12" stroke-linecap="round"/>
    </g>
  </g>
  <g id="scene2" transform="translate(-280,-130)">
    <path id="bubble" d="M1180 250 L1560 230 L1600 380 L1420 400 L1380 460 L1360 405 L1180 400 Z" fill="#fff" stroke="#17140F" stroke-width="7" stroke-linejoin="round"/>
    <text x="1390" y="345" text-anchor="middle" font-family="League Gothic" font-size="110" fill="#C8341F">?!#@</text>
  </g>
  <g id="scene3">
    <circle id="sun" cx="1650" cy="320" r="120" fill="#F6C76B" opacity=".75"/>
    <rect id="phoneDown" x="420" y="800" width="120" height="20" rx="6" fill="#17140F"/>
  </g>
  <g id="her"></g>
  <g id="him"></g>
</svg>
</div>
<div class="wipe" id="wipe"></div>
{cb}
""", f"""
const H=man('him',{{}}); const W=man('her',{{scarf:'#2F7D4F'}}); FIG.push(H,W);
Object.assign(H.S,{{x:760,y:820,s:2.1}}); Object.assign(W.S,{{x:1450,y:820,s:2.0,face:-1}}); W.root.style.opacity=0;
// beat 1: he raises phone arm, thumb hovers, the block button gets crossed out; he lowers it
tl.to(H.S,{{uaR:-120,faR:-40,duration:.45,ease:'back.out(1.6)'}},.15);
tl.fromTo('#phoneBig',{{opacity:0,scale:.6,transformOrigin:'50% 50%'}},{{opacity:1,scale:1,duration:.35,ease:'back.out(1.7)'}},.25);
tl.fromTo('#x1',{{attr:{{x2:30,y2:200}}}},{{attr:{{x2:270,y2:300}},duration:.3,ease:'power2.inOut'}},1.0);
tl.to(H.S,{{hd:-6,duration:.4}},.9); {''}
tl.to(H.S,{{uaR:-14,faR:0,duration:.35,ease:'power2.inOut'}},1.45);
tl.to('#phoneBig',{{opacity:0,y:30,duration:.25}},1.5);
// wipe transition into beat 2
tl.to('#wipe',{{x:4300,duration:.55,ease:'power3.inOut'}},1.55);
tl.set('#scene1',{{opacity:0}},1.83); tl.set('#scene2',{{opacity:1}},1.83); tl.set(W.root,{{opacity:1}},1.83);
tl.set(H.S,{{x:560}},1.83);
// she shouts (arms up, leaning in), he stays still and calm
tl.to(W.S,{{uaL:150,uaR:-150,faL:-30,faR:30,lean:-8,duration:.25,ease:'back.out(2)'}},2.0);
for(let k=0;k<4;k++)tl.to(W.S,{{uaL:k%2?150:120,uaR:k%2?-150:-120,duration:.18}},2.25+k*.2);
tl.fromTo('#bubble',{{scale:.3,opacity:0,transformOrigin:'1180px 400px'}},{{scale:1,opacity:1,duration:.25,ease:'back.out(2.5)'}},2.05);
tl.to(H.S,{{uaL:40,uaR:-40,faL:60,faR:-60,duration:.4}},2.2);  // arms crossed-ish
blink(tl,H,2.9);
// beat 3: camera push, she fades, he puts phone down and walks off
tl.to('#scene2',{{opacity:0,duration:.25}},3.4); tl.to(W.root,{{opacity:0,duration:.25}},3.4);
tl.set('#scene3',{{opacity:1}},3.45);
tl.to(H.S,{{uaL:14,uaR:-14,faL:0,faR:0,duration:.3}},3.45);
tl.fromTo('#phoneDown',{{opacity:0,y:-60}},{{opacity:1,y:0,duration:.25,ease:'bounce.out'}},3.6);
tl.to(H.S,{{face:-1,duration:.01}},4.1);
walk(tl,H,4.15,1.7,820,.3);
tl.fromTo('#world',{{scale:1}},{{scale:1.12,duration:2.4,ease:'power1.inOut'}},3.5);
tl.fromTo('#sun',{{scale:.8,transformOrigin:'1650px 320px'}},{{scale:1.15,duration:2.4}},3.5);
{BOIL_JS}
{cj}
""", [('pop.mp3', .3, .35), ('click-soft.mp3', 1.0, .5), ('whoosh-short.mp3', 1.55, .4), ('pop.mp3', 2.05, .3), ('whoosh.mp3', 3.35, .25), ('click-soft.mp3', 3.75, .5)])

# ---------------------------------------------------------------- 2 whiteboard
cb, cj = caps(LINES)
page('s2_whiteboard', """
#board{position:absolute;inset:0;background:#FFFFFF}
.ink{fill:none;stroke:#1C1C1C;stroke-width:7;stroke-linecap:round;stroke-linejoin:round}
.red{stroke:#D0342C}
#hand{position:absolute;left:0;top:0;width:260px;height:260px;transform-origin:0 0}
""", f"""
<div id="board"></div>
<svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
  <g id="d1">
    <circle class="ink p" cx="640" cy="330" r="60"/><path class="ink p" d="M640 390 L640 600 M640 600 L580 760 M640 600 L700 760 M640 450 L560 540 M640 450 L760 470 L800 420"/>
    <rect class="ink p" x="780" y="330" width="90" height="150" rx="14"/>
    <path class="ink p" d="M620 320 L620 330 M660 320 L660 330 M620 360 L660 360"/>
    <text id="t1" x="1100" y="420" font-family="League Gothic" font-size="150" fill="#1C1C1C" opacity="0">BLOCK?</text>
    <path class="ink red p" d="M1080 300 L1480 460 M1080 460 L1480 300" stroke-width="12"/>
  </g>
  <g id="d2" opacity="0">
    <circle class="ink p2" cx="1300" cy="330" r="60"/><path class="ink p2" d="M1300 390 L1300 600 M1300 600 L1240 760 M1300 600 L1360 760 M1300 450 L1200 380 M1300 450 L1400 380"/>
    <path class="ink red p2" d="M1180 180 L1230 230 M1300 150 L1300 220 M1420 180 L1370 230"/>
    <text x="900" y="420" font-family="League Gothic" font-size="150" fill="#1C1C1C" class="tt2" opacity="0">ARGUE?</text>
    <path class="ink red p2" d="M880 300 L1160 460 M880 460 L1160 300" stroke-width="12"/>
  </g>
  <g id="d3" opacity="0">
    <path class="ink p3" d="M200 780 L1720 780"/>
    <rect class="ink p3" x="300" y="700" width="200" height="80"/><rect class="ink p3" x="360" y="688" width="80" height="12" />
    <circle class="ink p3" cx="1200" cy="420" r="60"/><path class="ink p3" d="M1200 480 L1200 640 M1200 640 L1150 780 M1200 640 L1270 770 M1200 520 L1150 600 M1200 520 L1260 590"/>
    <path class="ink p3" d="M1340 600 L1500 600 M1460 560 L1500 600 L1460 640"/>
    <text x="960" y="250" text-anchor="middle" font-family="League Gothic" font-size="170" fill="#1C1C1C" class="tt3" opacity="0">HE JUST <tspan fill="#D0342C">STOPPED.</tspan></text>
  </g>
</svg>
<svg id="hand" viewBox="0 0 260 260"><path d="M10 10 L40 0 L210 170 L240 250 L170 230 Z" fill="#E8B898" stroke="#1C1C1C" stroke-width="5"/><path d="M10 10 L40 0 L60 20 L28 30Z" fill="#1C1C1C"/></svg>
{cb}
""", f"""
function draw(sel,t0,dur){{
  const els=[...document.querySelectorAll(sel)]; const each=dur/els.length;
  els.forEach((e,i)=>{{const L=e.getTotalLength?e.getTotalLength():800;
    tl.fromTo(e,{{strokeDasharray:L,strokeDashoffset:L}},{{strokeDashoffset:0,duration:each,ease:'none'}},t0+i*each);
    const bb=e.getBBox(); tl.to('#hand',{{x:bb.x+bb.width,y:bb.y+bb.height*.6,duration:each,ease:'none'}},t0+i*each);}});
}}
gsap.set('#hand',{{x:900,y:1200}});
draw('#d1 .p',.15,1.0); tl.to('#t1',{{opacity:1,duration:.2}},.6);
tl.to('#d1',{{opacity:0,duration:.2}},1.7); tl.set('#d2',{{opacity:1}},1.85);
draw('#d2 .p2',1.85,1.2); tl.to('.tt2',{{opacity:1,duration:.2}},2.3);
tl.to('#d2',{{opacity:0,duration:.2}},3.35); tl.set('#d3',{{opacity:1}},3.5);
draw('#d3 .p3',3.5,1.6); tl.to('.tt3',{{opacity:1,duration:.25}},4.6);
tl.to('#hand',{{x:2000,y:1300,duration:.4}},5.2);
{cj}
""", [('typing.mp3', .15, .18), ('typing.mp3', 1.85, .18), ('typing.mp3', 3.5, .18)], bg='#FFFFFF')

# ---------------------------------------------------------------- 3 paper collage (stop-motion steps)
cb, cj = caps(LINES)
page('s3_collage', """
#bg{position:absolute;inset:0;background:#E9DCC4}
#bg:after{content:'';position:absolute;inset:0;background:repeating-linear-gradient(0deg,rgba(0,0,0,.025) 0 2px,transparent 2px 6px)}
.cut{position:absolute;background:#fff;padding:14px;box-shadow:8px 10px 0 rgba(0,0,0,.22);clip-path:polygon(0 3%,4% 0,30% 2%,60% 0,96% 2%,100% 8%,98% 40%,100% 70%,97% 100%,60% 98%,30% 100%,2% 97%,0 60%)}
.tape{position:absolute;width:150px;height:44px;background:rgba(245,220,140,.82);box-shadow:0 2px 3px rgba(0,0,0,.15)}
.snip{position:absolute;font-family:'League Gothic';text-transform:uppercase;padding:4px 18px;box-shadow:5px 6px 0 rgba(0,0,0,.25)}
""", f"""
<div id="bg"></div>
<div class="cut" id="c1" style="left:240px;top:190px;width:420px;transform:rotate(-4deg)"><img src="assets/bench-phone.png" style="width:100%;display:block"></div>
<div class="tape" style="left:360px;top:170px;transform:rotate(-8deg)" id="tp1"></div>
<div class="snip" id="w1" style="left:820px;top:300px;font-size:150px;background:#fff;color:#17140F;transform:rotate(3deg)">BLOCKED?</div>
<div class="snip" id="w1x" style="left:830px;top:470px;font-size:120px;background:#C8341F;color:#fff;transform:rotate(-3deg)">NO.</div>
<div class="cut" id="c2" style="left:1240px;top:180px;width:360px;transform:rotate(5deg)"><img src="assets/arms-crossed.png" style="width:100%;display:block"></div>
<div class="snip" id="w2" style="left:260px;top:620px;font-size:140px;background:#17140F;color:#fff;transform:rotate(-2deg)">NO ARGUMENT.</div>
<div class="cut" id="c3" style="left:700px;top:160px;width:430px;transform:rotate(-2deg)"><img src="assets/walk-away.png" style="width:100%;display:block"></div>
<div class="tape" style="left:860px;top:140px;transform:rotate(6deg)" id="tp3"></div>
<div class="snip" id="w3" style="left:560px;top:690px;font-size:170px;background:#C8341F;color:#fff;transform:rotate(2deg)">HE JUST STOPPED.</div>
{cb}
""", f"""
const step='steps(4)';
tl.fromTo('#c1',{{y:-900}},{{y:0,duration:.4,ease:step}},.1); tl.fromTo('#tp1',{{opacity:0}},{{opacity:1,duration:.01}},.5);
tl.fromTo('#w1',{{x:900,opacity:0}},{{x:0,opacity:1,duration:.3,ease:step}},.45);
tl.fromTo('#w1x',{{scale:3,opacity:0}},{{scale:1,opacity:1,duration:.2,ease:'steps(3)'}},1.15);
tl.to(['#c1','#tp1','#w1','#w1x'],{{y:1100,duration:.3,ease:step,stagger:.03}},1.7);
tl.fromTo('#c2',{{x:900}},{{x:0,duration:.35,ease:step}},1.85);
tl.fromTo('#w2',{{x:-1400}},{{x:0,duration:.35,ease:step}},2.2);
for(let k=0;k<6;k++)tl.set('#c2',{{rotation:k%2?6:4}},2.55+k*.12);
tl.to(['#c2','#w2'],{{x:-2200,duration:.3,ease:step,stagger:.04}},3.35);
tl.fromTo('#c3',{{y:900,rotation:-12}},{{y:0,rotation:-2,duration:.4,ease:step}},3.5); tl.fromTo('#tp3',{{opacity:0}},{{opacity:1,duration:.01}},3.9);
tl.fromTo('#c3 img',{{x:0}},{{x:120,duration:1.8,ease:'steps(10)'}},3.9);
tl.fromTo('#w3',{{scale:2.4,opacity:0}},{{scale:1,opacity:1,duration:.25,ease:'steps(3)'}},4.55);
""" + cj, [('whoosh-short.mp3', .1, .35), ('pop.mp3', 1.15, .4), ('whoosh-short.mp3', 1.8, .3), ('whoosh-short.mp3', 3.45, .3), ('impact-bass-1.mp3', 4.55, .35)], bg='#E9DCC4')

# ---------------------------------------------------------------- 4 flat motion graphics (brand style, upgraded)
cb, cj = caps(LINES)
page('s4_flat_motion', """
#bg{position:absolute;inset:0;background:#FBF8F2}
.card{position:absolute;background:#fff;border:7px solid #17140F;border-radius:32px;box-shadow:14px 14px 0 #17140F}
.blk{background:#C8541A;color:#FBF8F2;padding:0 .14em}
#ring{position:absolute;border-radius:50%;border:10px solid #C8541A}
""", f"""
<div id="bg"></div>
<div id="ring" style="left:1180px;top:200px;width:560px;height:560px"></div>
<div id="hero" class="abs" style="left:1260px;top:150px;width:400px;transform-origin:50% 100%"><img id="pA" src="assets/bench-phone.png" style="width:100%;position:absolute"><img id="pB" src="assets/arms-crossed.png" style="width:80%;left:10%;position:absolute;opacity:0"><img id="pC" src="assets/walk-away.png" style="width:80%;left:10%;position:absolute;opacity:0"></div>
<div class="card" id="phone" style="left:240px;top:220px;width:520px;height:300px;padding:40px">
  <div style="font:900 40px Inter">Her</div>
  <div id="blk" style="margin-top:30px;border:6px solid #17140F;border-radius:20px;padding:18px;text-align:center;font:900 40px Inter;position:relative">Block contact<div id="bx" style="position:absolute;left:-8px;right:-8px;top:46%;height:10px;background:#C8541A;transform-origin:0 50%"></div></div>
</div>
<div id="h2" class="abs hl" style="left:200px;top:260px;font-size:200px;opacity:0">NO<br><span class="blk">ARGUMENT.</span></div>
<div id="h3" class="abs hl" style="left:200px;top:240px;font-size:220px;opacity:0">HE JUST<br><span class="blk">STOPPED.</span></div>
{cb}
""", f"""
tl.fromTo('#ring',{{scale:0}},{{scale:1,duration:.5,ease:'back.out(1.6)'}},.05);
tl.fromTo('#hero',{{y:80,opacity:0}},{{y:0,opacity:1,duration:.45,ease:'power3.out'}},.1);
tl.fromTo('#phone',{{x:-300,opacity:0,rotation:-6}},{{x:0,opacity:1,rotation:-2,duration:.5,ease:'back.out(1.5)'}},.2);
tl.fromTo('#bx',{{scaleX:0}},{{scaleX:1,duration:.3,ease:'power2.inOut'}},1.0);
tl.to('#phone',{{x:-900,rotation:-12,duration:.35,ease:'power3.in'}},1.6);
tl.to('#pA',{{opacity:0,duration:.15}},1.8); tl.to('#pB',{{opacity:1,duration:.15}},1.8);
tl.fromTo('#hero',{{scaleY:1}},{{scaleY:.96,duration:.12,yoyo:true,repeat:1}},1.8);
tl.fromTo('#h2',{{opacity:0,y:40}},{{opacity:1,y:0,duration:.35,ease:'power3.out'}},1.95);
tl.to('#ring',{{borderColor:'#17140F',duration:.3}},2.0);
tl.to('#h2',{{opacity:0,y:-40,duration:.25}},3.35);
tl.to('#pB',{{opacity:0,duration:.15}},3.5); tl.to('#pC',{{opacity:1,duration:.15}},3.5);
tl.to('#hero',{{x:250,duration:2.0,ease:'power1.inOut'}},3.6);
tl.to('#ring',{{x:250,scale:1.2,borderColor:'#C8541A',duration:2.0,ease:'power1.inOut'}},3.6);

tl.fromTo('#h3',{{opacity:0,x:60}},{{opacity:1,x:0,duration:.35,ease:'power3.out'}},4.3);
""" + cj, [('whoosh-short.mp3', .15, .3), ('click-soft.mp3', 1.0, .5), ('whoosh.mp3', 1.6, .25), ('whoosh-short.mp3', 3.45, .3), ('pop.mp3', 4.35, .35)])

# ---------------------------------------------------------------- 5 silhouette noir
cb, cj = caps(LINES, color='#FBEBD0')
page('s5_silhouette_noir', """
#sky{position:absolute;inset:0;background:linear-gradient(180deg,#1B1530 0%,#5B2A4A 45%,#E0703A 78%,#F6B565 100%)}
#glow{position:absolute;left:1240px;top:420px;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,#FFE3A8 0%,rgba(255,227,168,0) 65%)}
#ground{position:absolute;left:0;right:0;top:820px;bottom:0;background:#0D0A12}
#vig{position:absolute;inset:0;background:radial-gradient(ellipse at 50% 55%,rgba(0,0,0,0) 55%,rgba(0,0,0,.6) 100%)}
.rain{position:absolute;width:3px;height:80px;background:rgba(255,235,210,.28)}
.cap{color:#FBEBD0}
""", f"""
<div id="sky"></div><div id="glow"></div>
<svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080">
  <g fill="#0D0A12"><rect x="80" y="520" width="160" height="300"/><rect x="260" y="440" width="120" height="380"/><rect x="1620" y="500" width="200" height="320"/>
  <rect x="1080" y="300" width="14" height="520"/><path d="M1094 300 Q1180 300 1190 340 L1170 350 Q1150 320 1094 322Z"/></g>
  <polygon id="beam" points="1180,345 1060,820 1320,820" fill="rgba(255,230,170,.18)"/>
  <g id="her"></g><g id="him"></g>
</svg>
<div id="rainbox"></div>
<div id="vig"></div>
{cb}
""", f"""
const H=man('him',{{stroke:'#0D0A12',fill:true,w:12,r:30,scarf:'#C8341F'}}); const W=man('her',{{stroke:'#0D0A12',fill:true,w:12,r:28,scarf:false}}); FIG.push(H,W);
Object.assign(H.S,{{x:820,y:820,s:1.6}}); Object.assign(W.S,{{x:560,y:820,s:1.5}});
const rb=document.getElementById('rainbox');
for(let i=0;i<60;i++){{const d=document.createElement('div');d.className='rain';d.style.left=((i*97)%1920)+'px';d.style.top=(-100-((i*53)%900))+'px';d.style.transform='rotate(12deg)';rb.appendChild(d);
  tl.fromTo(d,{{y:0}},{{y:1300,duration:.9,ease:'none',repeat:6}},(i%9)*.1);}}
breathe(tl,H,0,1.8);
tl.to(W.S,{{uaR:-110,faR:-30,duration:.4}},.3); tl.to(W.S,{{uaR:-14,faR:0,duration:.4}},1.2);
tl.to(H.S,{{hd:8,duration:.5}},.6);
tl.to(W.S,{{uaL:130,uaR:-130,lean:6,duration:.25,ease:'back.out(2)'}},2.0);
for(let k=0;k<3;k++)tl.to(W.S,{{uaL:k%2?130:100,uaR:k%2?-130:-100,duration:.2}},2.25+k*.22);
tl.to(H.S,{{hd:0,duration:.4}},2.2); blink(tl,H,2.8);
tl.to(W.S,{{uaL:14,uaR:-14,lean:0,duration:.3}},3.2);
tl.to(H.S,{{face:1,duration:.01}},3.6);
walk(tl,H,3.7,2.2,520,.34);
tl.to(H.S,{{s:1.35,duration:2.2,ease:'none'}},3.7);
tl.to('#glow',{{scale:1.25,duration:2.2,transformOrigin:'50% 50%'}},3.7);
tl.to(W.root,{{opacity:.35,duration:1.5}},3.8);
""" + cj, [('whoosh.mp3', 1.9, .2), ('whoosh.mp3', 3.6, .2)], bg='#1B1530')

# ---------------------------------------------------------------- 6 kinetic typography
page('s6_kinetic_type', """
#bg{position:absolute;inset:0;background:#17140F}
.w{position:absolute;font-family:'League Gothic';text-transform:uppercase;color:#FBF8F2;line-height:.9;white-space:nowrap}
.or{color:#C8541A}
#bar{position:absolute;left:0;top:520px;height:16px;width:1920px;background:#C8541A;transform-origin:0 50%}
""", """
<div id="bg"></div>
<div class="w" id="a1" style="left:300px;top:250px;font-size:220px">HE DIDN'T</div>
<div class="w or" id="a2" style="left:300px;top:470px;font-size:320px">BLOCK</div>
<div class="w" id="a3" style="left:1010px;top:470px;font-size:320px">HER.</div>
<div class="w" id="b1" style="left:420px;top:300px;font-size:180px">HE DIDN'T</div>
<div class="w or" id="b2" style="left:420px;top:470px;font-size:360px">ARGUE.</div>
<div id="bar"></div>
<div class="w" id="c1" style="left:0;right:0;text-align:center;top:180px;font-size:160px">ONE DAY, HE JUST</div>
<div class="w or" id="c2" style="left:0;right:0;text-align:center;top:360px;font-size:460px"><span>S</span><span>T</span><span>O</span><span>P</span><span>P</span><span>E</span><span>D</span><span>.</span></div>
""", f"""
tl.fromTo('#a1',{{y:60,opacity:0}},{{y:0,opacity:1,duration:.3,ease:'power3.out'}},.12);
tl.fromTo('#a2',{{scale:1.6,opacity:0,transformOrigin:'0 50%'}},{{scale:1,opacity:1,duration:.25,ease:'power4.out'}},.75);
tl.fromTo('#a3',{{x:200,opacity:0}},{{x:0,opacity:1,duration:.25,ease:'power3.out'}},1.2);
tl.fromTo('#bar',{{scaleX:0}},{{scaleX:1,duration:.25,ease:'power2.inOut'}},1.35);
tl.to(['#a1','#a2','#a3'],{{y:-1200,duration:.35,ease:'power3.in',stagger:.04}},1.6);
tl.to('#bar',{{y:-1200,duration:.35,ease:'power3.in'}},1.6);
tl.fromTo('#b1',{{y:1100}},{{y:0,duration:.35,ease:'power3.out'}},1.85);
tl.fromTo('#b2',{{y:1100}},{{y:0,duration:.35,ease:'power3.out'}},2.0);
for(let k=0;k<6;k++)tl.to('#b2',{{x:k%2?-14:14,duration:.05}},2.6+k*.05);
tl.to('#b2',{{x:0,duration:.05}},2.9);
tl.to(['#b1','#b2'],{{opacity:0,scale:.9,duration:.25}},3.35);
tl.fromTo('#c1',{{opacity:0,y:30}},{{opacity:1,y:0,duration:.3}},3.6);
document.querySelectorAll('#c2 span').forEach((s,i)=>{{s.style.display='inline-block';
  tl.fromTo(s,{{y:-900,rotation:(i%2?12:-12)}},{{y:0,rotation:0,duration:.28,ease:'power4.in'}},4.55+i*.05);}});
tl.fromTo('#c2',{{scale:1.03}},{{scale:1,duration:.3,ease:'power2.out'}},5.05);
""", [('whoosh-short.mp3', .1, .3), ('impact-bass-1.mp3', .75, .3), ('whoosh.mp3', 1.6, .25), ('pop.mp3', 2.6, .3), ('whoosh-short.mp3', 3.35, .3), ('impact-bass-1.mp3', 4.9, .45)], bg='#17140F')

# ---------------------------------------------------------------- 7 paper cutout 2.5D parallax
cb, cj = caps(LINES)
page('s7_paper_25d', """
#cam{position:absolute;inset:0;perspective:1400px;perspective-origin:50% 45%}
#rig{position:absolute;inset:0;transform-style:preserve-3d}
.layer{position:absolute;left:-400px;top:-200px;width:2720px;height:1480px;transform-style:preserve-3d}
.p{position:absolute;filter:drop-shadow(0 18px 10px rgba(0,0,0,.25))}
.cap{z-index:9}
""", f"""
<div id="cam"><div id="rig">
  <div class="layer" style="transform:translateZ(-900px) scale(1.65);background:linear-gradient(#F4D7A8,#EFC28A)"></div>
  <div class="layer" style="transform:translateZ(-600px) scale(1.43)"><svg class="p" width="2720" height="1480"><path d="M0 900 Q400 640 800 860 T1600 820 T2720 840 V1480 H0Z" fill="#D98B5F"/></svg></div>
  <div class="layer" style="transform:translateZ(-300px) scale(1.21)"><svg class="p" width="2720" height="1480"><path d="M0 1000 Q500 820 1000 960 T2000 940 T2720 980 V1480 H0Z" fill="#B85E3E"/><circle cx="2000" cy="420" r="150" fill="#FBEBC8"/></svg></div>
  <div class="layer" style="transform:translateZ(0)"><svg class="p" width="2720" height="1480"><path d="M0 1120 Q800 1060 1600 1110 T2720 1100 V1480 H0Z" fill="#6E3A2E"/><g id="her"></g><g id="him"></g>
     <g id="phone2"><rect x="1050" y="660" width="110" height="190" rx="18" fill="#fff" stroke="#17140F" stroke-width="7"/><rect x="1068" y="740" width="74" height="30" rx="8" fill="#C8541A"/></g></svg></div>
  <div class="layer" style="transform:translateZ(300px) scale(.79)"><svg class="p" width="2720" height="1480"><path d="M-50 1480 L-50 980 Q120 940 260 1080 L380 1480Z" fill="#3F211B"/><path d="M2770 1480 L2770 1000 Q2600 960 2480 1100 L2400 1480Z" fill="#3F211B"/></svg></div>
</div></div>
{cb}
""", f"""
const H=man('him',{{w:10}}); const W=man('her',{{w:10,scarf:'#2F7D4F'}}); FIG.push(H,W);
Object.assign(H.S,{{x:1260,y:1120,s:1.7}}); Object.assign(W.S,{{x:1660,y:1120,s:1.6,face:-1}});
tl.fromTo('#rig',{{x:120,z:-120,rotationY:-6}},{{x:-260,z:160,rotationY:5,duration:6,ease:'sine.inOut'}},0);
tl.to(H.S,{{uaR:-110,faR:-50,duration:.4}},.2);
tl.fromTo('#phone2',{{opacity:0}},{{opacity:1,duration:.2}},.35);
tl.to('#phone2',{{opacity:0,y:40,duration:.25}},1.4); tl.to(H.S,{{uaR:-14,faR:0,duration:.35}},1.4);
tl.to(W.S,{{uaL:140,uaR:-140,lean:-6,duration:.25,ease:'back.out(2)'}},2.0);
for(let k=0;k<3;k++)tl.to(W.S,{{uaL:k%2?140:110,uaR:k%2?-140:-110,duration:.2}},2.25+k*.22);
blink(tl,H,2.7); breathe(tl,H,1.8,3.6);
tl.to(W.S,{{uaL:14,uaR:-14,lean:0,duration:.3}},3.3);
tl.to(H.S,{{face:-1,duration:.01}},3.65);
walk(tl,H,3.7,2.2,-700,.32);
""" + cj, [('pop.mp3', .3, .3), ('whoosh.mp3', 1.9, .2), ('whoosh-short.mp3', 3.6, .25)], bg='#F4D7A8')
print('built 7 samples')
