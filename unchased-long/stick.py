"""Acted stickman scenes for the hybrid style: flat brand explainer + animated stickman story beats."""
import re

# Rig: one <g> per joint rotated about its own origin; S.y is the feet line.
RIG = r"""
const NS='http://www.w3.org/2000/svg';
function mk(tag,a,p){const e=document.createElementNS(NS,tag);for(const k in a)e.setAttribute(k,a[k]);p.appendChild(e);return e}
function man(g,o){
  o=Object.assign({stroke:'#17140F',w:8,head:'#fff',scarf:'#C8541A',r:30},o);
  const P={};
  const L=(p,len)=>mk('line',{x1:0,y1:0,x2:0,y2:len,stroke:o.stroke,'stroke-width':o.w,'stroke-linecap':'round'},p);
  const J=(p,x,y)=>mk('g',{},mk('g',{transform:`translate(${x},${y})`},p));
  const body=J(g,0,0);
  for(const s of ['L','R']){const th=J(body,0,0);L(th,52);const sh=J(th,0,52);L(sh,52);P['th'+s]=th;P['sh'+s]=sh;}
  mk('line',{x1:0,y1:0,x2:0,y2:-112,stroke:o.stroke,'stroke-width':o.w,'stroke-linecap':'round'},body);
  for(const s of ['L','R']){const ua=J(body,0,-100);L(ua,44);const fa=J(ua,0,44);L(fa,40);P['ua'+s]=ua;P['fa'+s]=fa;}
  const hd=J(body,0,-148);
  mk('circle',{cx:0,cy:0,r:o.r,fill:o.head,stroke:o.stroke,'stroke-width':o.w},hd);
  const eyes=mk('g',{},hd);mk('circle',{cx:-10,cy:-5,r:4,fill:o.stroke},eyes);mk('circle',{cx:10,cy:-5,r:4,fill:o.stroke},eyes);
  P.mouth=mk('path',{d:'M-9 12 L9 12',stroke:o.stroke,'stroke-width':4,fill:'none','stroke-linecap':'round'},hd);
  if(o.scarf){mk('path',{d:'M-20 -122 L20 -122 L18 -108 L-18 -108Z',fill:o.scarf,stroke:o.stroke,'stroke-width':3},body);
              mk('path',{d:'M6 -110 L18 -110 L24 -72 L12 -72Z',fill:o.scarf,stroke:o.stroke,'stroke-width':3},body);}
  P.eyes=eyes;P.body=body;P.head=hd;P.root=g;
  P.S={x:0,y:0,s:1,lean:0,thL:10,thR:-10,shL:0,shR:0,uaL:14,uaR:-14,faL:0,faR:0,hd:0,blink:1,face:1,op:1};
  return P;
}
function pose(P){const S=P.S;
  P.root.setAttribute('transform',`translate(${S.x},${S.y-104*S.s}) scale(${S.s*S.face},${S.s})`);
  P.root.setAttribute('opacity',S.op);
  P.body.setAttribute('transform',`rotate(${S.lean})`);
  for(const k of ['thL','thR','shL','shR','uaL','uaR','faL','faR'])P[k].setAttribute('transform',`rotate(${S[k]})`);
  P.head.setAttribute('transform',`rotate(${S.hd})`);
  P.eyes.setAttribute('transform',`scale(1,${S.blink})`);
}
function walk(tl,P,t0,dur,dx,step){step=step||0.32;
  tl.to(P.S,{x:P.S.x+dx,duration:dur,ease:'none'},t0);
  for(let t=t0,k=0;t<t0+dur-0.05;t+=step,k++){const a=k%2?1:-1;
    tl.to(P.S,{thL:24*a,thR:-24*a,shL:a>0?0:20,shR:a>0?20:0,uaL:-22*a,uaR:22*a,duration:step,ease:'sine.inOut'},t);}
  tl.to(P.S,{thL:10,thR:-10,shL:0,shR:0,uaL:14,uaR:-14,duration:0.2},t0+dur);
}
function blinks(tl,P,t0,t1){for(let t=t0+0.9;t<t1;t+=2.3){tl.to(P.S,{blink:0.1,duration:0.06},t);tl.to(P.S,{blink:1,duration:0.08},t+0.08);}}
function breathe(tl,P,t0,t1){for(let t=t0,k=0;t<t1-0.2;t+=1.2,k++)tl.to(P.S,{lean:k%2?0:1.6,duration:1.2,ease:'sine.inOut'},t);}
"""

# keyword -> acting template
KEYS = [
    ('phone', r'\b(phone|text|texted|texts|message|messages|replies|reply|replying|app|apps|screen|online)\b'),
    ('argue', r'\b(argu\w*|fight\w*|shout\w*|anger|angry|scene|revenge|insult\w*|joke)\b'),
    ('chase', r'\b(chas\w*|beg\w*|harder|pursu\w*|effort|convince)\b'),
    ('leave', r'\b(leav\w*|left|walk\w*|gone|exit|door|stopped|stops|quiet\w*|away)\b'),
    ('wait', r'\b(wait\w*|late|minutes|hour|clock|months)\b'),
    ('alone', r'\b(alone|single|isolat\w*|lonel\w*|silence|room)\b'),
    ('ask', r'\b(ask\w*|question|say|said|told|tell)\b'),
]


def pick_template(vo, k):
    for name, rx in KEYS:
        if re.search(rx, vo, re.I):
            return name
    return ['ponder', 'reach'][k % 2]


def template_js(name, dur, sid):
    """Return (extra_svg, js). H = hero puppet, W = second figure (woman, green scarf)."""
    D = dur
    q = f'[data-composition-id="{sid}"] '
    if name == 'phone':
        svg = ''
        js = f"""
Object.assign(H.S,{{x:960,y:860,s:2}});
const ph=mk('rect',{{x:-14,y:34,width:28,height:46,rx:6,fill:'#17140F'}},H.faR); const glow=mk('rect',{{x:-10,y:38,width:20,height:30,rx:3,fill:'#F6C76B'}},H.faR);
tl.to(H.S,{{uaR:-150,faR:-70,hd:12,duration:.45,ease:'back.out(1.5)'}},.2);
breathe(tl,H,.6,{D*0.55:.2f});
tl.to(H.S,{{hd:-4,duration:.3}},{D*0.55:.2f});
tl.to(H.S,{{uaR:-14,faR:0,duration:.4,ease:'power2.inOut'}},{D*0.6:.2f});
tl.to([ph,glow],{{opacity:0,duration:.2}},{D*0.62:.2f});
tl.to(H.S,{{face:-1,duration:.01}},{D*0.75:.2f});"""
    elif name == 'argue':
        svg = f'<g id="{sid}-bub" opacity="0"><path d="M1060 250 L1380 230 L1410 360 L1270 375 L1250 430 L1225 378 L1060 372 Z" fill="#fff" stroke="#17140F" stroke-width="7" stroke-linejoin="round"/><text x="1235" y="335" text-anchor="middle" font-family="League Gothic" font-size="96" fill="#C8341F">?!#@</text></g>'
        js = f"""
Object.assign(H.S,{{x:700,y:860,s:1.9}}); Object.assign(W.S,{{x:1300,y:860,s:1.8,face:-1}}); W.S.op=1;
tl.to(W.S,{{uaL:150,uaR:-150,faL:-30,faR:30,lean:-8,duration:.25,ease:'back.out(2)'}},.25);
for(let t=.5,k=0;t<{D-0.6:.2f};t+=.2,k++)tl.to(W.S,{{uaL:k%2?150:118,uaR:k%2?-150:-118,duration:.18}},t);
tl.fromTo(document.querySelector('{q}#{sid}-bub'),{{opacity:0,scale:.3,transformOrigin:'1250px 430px'}},{{opacity:1,scale:1,duration:.25,ease:'back.out(2.4)'}},.3);
tl.to(H.S,{{uaL:40,uaR:-40,faL:60,faR:-60,duration:.45}},.5);
breathe(tl,H,.9,{D:.2f});"""
    elif name == 'chase':
        svg = ''
        js = f"""
Object.assign(H.S,{{x:520,y:860,s:1.8}}); Object.assign(W.S,{{x:1150,y:860,s:1.75}}); W.S.op=1;
walk(tl,W,.2,{D-0.5:.2f},{(D-0.5)*110:.0f},.32);
walk(tl,H,.35,{D-0.6:.2f},{(D-0.6)*150:.0f},.26);
tl.to(H.S,{{lean:8,uaR:-80,duration:.3}},.4);"""
    elif name == 'leave':
        svg = '<g><rect x="1520" y="420" width="190" height="440" fill="#B07848" stroke="#17140F" stroke-width="8"/><circle cx="1680" cy="650" r="10" fill="#17140F"/></g>'
        js = f"""
Object.assign(H.S,{{x:760,y:860,s:2}});
breathe(tl,H,0,{D*0.3:.2f});
tl.to(H.S,{{face:1,duration:.01}},{D*0.3:.2f});
walk(tl,H,{D*0.3:.2f},{D*0.62:.2f},{min(820, D*0.62*190):.0f},.32);
tl.to(H.S,{{op:0,duration:.3}},{D-0.45:.2f});"""
    elif name == 'wait':
        svg = f'<g transform="translate(1320,330)"><circle r="110" fill="#fff" stroke="#17140F" stroke-width="9"/><line id="{sid}-mh" x1="0" y1="0" x2="0" y2="-80" stroke="#17140F" stroke-width="9" stroke-linecap="round"/><line x1="0" y1="0" x2="50" y2="0" stroke="#C8541A" stroke-width="9" stroke-linecap="round"/></g>'
        js = f"""
Object.assign(H.S,{{x:760,y:860,s:2}});
tl.to(H.S,{{uaL:40,faL:-100,uaR:-40,faR:100,duration:.4}},.1);
for(let t=.5,k=0;t<{D-0.3:.2f};t+=.25,k++)tl.to(H.S,{{shR:k%2?0:-25,duration:.12}},t);
tl.fromTo(document.querySelector('{q}#{sid}-mh'),{{rotation:0,svgOrigin:'0 0'}},{{rotation:{int(D*90)},svgOrigin:'0 0',duration:{D:.2f},ease:'none'}},0);
tl.to(H.S,{{hd:-10,duration:.4}},{D*0.5:.2f});"""
    elif name == 'alone':
        svg = '<g><rect x="660" y="700" width="520" height="26" rx="8" fill="#B07848" stroke="#17140F" stroke-width="7"/><rect x="690" y="726" width="18" height="134" fill="#17140F"/><rect x="1132" y="726" width="18" height="134" fill="#17140F"/></g>'
        js = f"""
Object.assign(H.S,{{x:920,y:806,s:2,thL:-80,thR:-72,shL:82,shR:74,uaL:-20,uaR:20,faL:-60,faR:60}});
tl.to(H.S,{{hd:24,lean:10,duration:.8,ease:'sine.inOut'}},.3);
breathe(tl,H,1.1,{D:.2f});"""
    elif name == 'ask':
        svg = f'<g id="{sid}-q" opacity="0"><circle cx="990" cy="250" r="64" fill="#C8541A" stroke="#17140F" stroke-width="7"/><text x="990" y="282" text-anchor="middle" font-family="League Gothic" font-size="110" fill="#fff">?</text></g>'
        js = f"""
Object.assign(H.S,{{x:720,y:860,s:1.9}}); Object.assign(W.S,{{x:1260,y:860,s:1.8,face:-1}}); W.S.op=1;
tl.to(H.S,{{uaR:-115,faR:-30,duration:.35,ease:'back.out(1.6)'}},.25);
tl.fromTo(document.querySelector('{q}#{sid}-q'),{{opacity:0,scale:.3,transformOrigin:'990px 250px'}},{{opacity:1,scale:1,duration:.3,ease:'back.out(2.4)'}},.45);
tl.to(W.S,{{hd:-12,duration:.4}},.9); breathe(tl,W,.9,{D:.2f});
tl.to(H.S,{{uaR:-14,faR:0,duration:.35}},{D*0.65:.2f});"""
    elif name == 'reach':
        svg = ''
        js = f"""
Object.assign(H.S,{{x:640,y:860,s:1.9}}); Object.assign(W.S,{{x:1150,y:860,s:1.8,face:1}}); W.S.op=1;
tl.to(H.S,{{uaR:-95,faR:-10,lean:6,duration:.45,ease:'power2.out'}},.3);
walk(tl,W,.5,{D-0.8:.2f},{(D-0.8)*170:.0f},.32);
tl.to(W.S,{{op:.25,duration:{D-0.8:.2f}}},.5);
tl.to(H.S,{{uaR:-14,faR:0,lean:0,hd:14,duration:.5}},{D*0.7:.2f});"""
    else:  # ponder
        svg = f'<g id="{sid}-qs" opacity="0"><text x="1200" y="360" font-family="League Gothic" font-size="140" fill="#C8541A">?</text><text x="1290" y="290" font-family="League Gothic" font-size="96" fill="#17140F">?</text></g>'
        js = f"""
Object.assign(H.S,{{x:880,y:860,s:2}});
tl.to(H.S,{{uaR:-160,faR:150,hd:-8,duration:.5,ease:'power2.inOut'}},.25);
tl.fromTo(document.querySelector('{q}#{sid}-qs'),{{opacity:0,y:30}},{{opacity:1,y:0,duration:.35}},.6);
breathe(tl,H,.8,{D:.2f});"""
    return svg, js


def scene(sid, dur, head_html, template, css_base):
    svg, js = template_js(template, dur, sid)
    boil = ''.join(f"tl.set(document.querySelector('[data-composition-id=\"{sid}\"] #{sid}-turb'),{{attr:{{seed:{1 + i % 4}}}}},{i / 12:.3f});"
                   for i in range(int(dur * 12)))
    return f"""<template>
  <style>{css_base}
  .paper{{position:absolute;inset:0;background:radial-gradient(ellipse at 50% 40%,#FFFDF7 0%,#F3EDE0 100%)}}
  .sh{{position:absolute;left:140px;top:150px;width:1640px;font-size:100px}}
  </style>
  <div id="root" data-composition-id="{sid}" data-width="1920" data-height="1080">
    <div class="stage" data-layout-allow-overflow data-layout-allow-overlap>
      <div class="paper"></div>
      <svg width="0" height="0" style="position:absolute"><filter id="{sid}-boil"><feTurbulence id="{sid}-turb" type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="1"/><feDisplacementMap in="SourceGraphic" scale="3"/></filter></svg>
      <svg class="abs-svg" width="1920" height="1080" viewBox="0 0 1920 1080" style="position:absolute;left:0;top:0;filter:url(#{sid}-boil)">
        <line x1="160" y1="860" x2="1760" y2="860" stroke="#17140F" stroke-width="6" stroke-linecap="round"/>
        {svg}
        <g id="{sid}-W"></g><g id="{sid}-H"></g>
      </svg>
      <div id="h" class="hl sh">{head_html}</div>
    </div>
  </div>
  <script>
    {RIG}
    const tl = gsap.timeline({{ paused: true }});
    const root=document.querySelector('[data-composition-id="{sid}"]');
    const H=man(root.querySelector('#{sid}-H'),{{}}); const W=man(root.querySelector('#{sid}-W'),{{scarf:'#2F7D4F'}});
    W.S.op=0;
    {js}
    blinks(tl,H,0,{dur:.2f});
    tl.fromTo(root.querySelector('#h'),{{opacity:0,y:-30}},{{opacity:1,y:0,duration:.4,ease:'power3.out'}},.15);
    tl.fromTo(root.querySelector('.blk'),{{scaleX:0,transformOrigin:'0 50%'}},{{scaleX:1,duration:.35,ease:'power3.out'}},{min(1.2, dur * 0.3):.2f});
    tl.fromTo(root.querySelector('.stage'),{{opacity:0,x:80}},{{opacity:1,x:0,duration:.3,ease:'power3.out'}},0);
    tl.to(root.querySelector('.stage'),{{opacity:0,x:-80,duration:.25,ease:'power2.in'}},{dur - 0.27:.2f});
    {boil}
    tl.eventCallback('onUpdate',()=>{{pose(H);pose(W);}}); pose(H); pose(W);
    window.__timelines["{sid}"] = tl;
  </script>
</template>
"""
