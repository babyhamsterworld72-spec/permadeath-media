"""Builds the V01 long video (Unchased) as a HyperFrames project in v01/."""
import json, os, re, shutil
import numpy as np, soundfile as sf
from icons import svg
from spec_v01 import S

B = os.path.dirname(os.path.abspath(__file__)); P = os.path.join(B, 'v01')
KIT = json.load(open(os.path.join(B, '..', 'channel-kit', 'v01.json')))
SFX = os.path.join(B, '..', '.claude', 'skills', 'media-use', 'audio', 'assets', 'sfx')
SHARED = os.path.join(B, '..', 'unchased-shorts', 'shared')
GSAP = '<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js"></script>'
FONTS = '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=League+Gothic&family=Inter:wght@500;700;900&display=swap">'
CSS = """
#root{position:absolute;inset:0;overflow:hidden;background:#FBF8F2;font-family:Inter,sans-serif;color:#17140F}
.stage{position:absolute;inset:0}
.hl{position:absolute;font-family:'League Gothic',sans-serif;text-transform:uppercase;line-height:.95;color:#17140F;font-size:150px}
.blk{display:inline-block;background:#C8541A;color:#FBF8F2;padding:0 .14em;margin-top:.06em}
.char{position:absolute;transform-origin:50% 100%}
.char img{display:block;width:100%;height:auto;transform-origin:50% 100%}
.floor{position:absolute;height:5px;background:#17140F;border-radius:3px}
.face{position:absolute;border-radius:50%;background:#C8541A;border:8px solid #17140F;overflow:hidden}
.face img{position:absolute;left:50%;bottom:-2%;width:86%;transform:translateX(-50%)}
.disc{position:absolute;border-radius:50%;background:#fff;border:8px solid #17140F;box-shadow:14px 14px 0 #17140F;display:flex;align-items:center;justify-content:center}
.card{position:absolute;background:#fff;border:7px solid #17140F;border-radius:30px;box-shadow:14px 14px 0 #17140F}
"""
FULL = {'hero-stand', 'arms-crossed', 'pointing', 'walk-away', 'bench-phone'}


def headline(head, acc):
    return head.replace('{a}', f'<span class="blk">{acc}</span>') if '{a}' in head else head


def scene_html(n, sid, dur, side):
    head, acc, kind, arg = S[n][:4]
    q = f'[data-composition-id="{sid}"] '
    body, js = [], []
    T = lambda s: f"document.querySelector('{q}{s}')"
    if kind == 'title':
        num = f'<div id="num" class="disc" style="left:200px;top:300px;width:460px;height:460px;background:#FBF8F2"><span style="font-family:League Gothic;font-size:330px;line-height:1;color:#C8541A">{acc}</span></div>' if acc else ''
        body += ['<div style="position:absolute;inset:0;background:#C8541A"></div>', num,
                 f'<div id="h" class="hl" style="left:{760 if acc else 200}px;top:330px;width:{1000 if acc else 1500}px;font-size:{170 if acc else 210}px;color:#FBF8F2">{head}</div>']
        if acc: js.append(f"tl.fromTo({T('#num')}, {{scale:.4, rotation:-25, opacity:0}}, {{scale:1, rotation:0, opacity:1, duration:.5, ease:'back.out(2)'}}, .05);")
        js.append(f"tl.fromTo({T('#h')}, {{x:60, opacity:0}}, {{x:0, opacity:1, duration:.45, ease:'power3.out'}}, .25);")
    else:
        left = side == 0  # visual on left
        vx, hx = (180, 980) if left else (1080, 140)
        if kind == 'pose':
            if arg in FULL:
                w = 470 if arg == 'bench-phone' else 330
                body.append(f'<div id="vis" class="char" style="left:{vx+ (40 if arg!="bench-phone" else -40)}px;top:{150 if arg!="bench-phone" else 230}px;width:{w}px"><img src="assets/char/{arg}.png" alt=""></div>')
                body.append(f'<div class="floor" style="left:{vx-60}px;top:{915}px;width:{w+240}px"></div>')
            else:
                body.append(f'<div id="vis" class="face" style="left:{vx}px;top:200px;width:560px;height:560px;background:{"#C8541A" if n%2 else "#FBF8F2"}"><img src="assets/char/{arg}.png" alt=""></div>')
        elif kind == 'icon':
            body.append(f'<div id="vis" class="disc" style="left:{vx}px;top:170px;width:600px;height:600px">{svg(arg, 440)}</div>')
        elif kind == 'cite':
            year, who, ic = arg
            body.append(f'<div id="vis" class="card" style="left:{vx-40}px;top:170px;width:700px;height:600px;padding:50px 56px">'
                        f'<div style="font-family:League Gothic;font-size:190px;line-height:1;color:#C8541A">{year}</div>'
                        f'<div style="font-weight:900;font-size:40px;margin-top:6px">{who}</div>'
                        f'<div id="cic" style="position:absolute;right:30px;bottom:20px">{svg(ic, 270)}</div></div>')
        body.append(f'<div id="h" class="hl" style="left:{hx}px;top:250px;width:820px">{headline(head, acc)}</div>')
        js.append(f"tl.fromTo({T('#vis')}, {{opacity:0, y:50, scale:.92}}, {{opacity:1, y:0, scale:1, duration:.55, ease:'back.out(1.5)'}}, .05);")
        js.append(f"tl.fromTo({T('#h')}, {{opacity:0, x:{-50 if not left else 50}}}, {{opacity:1, x:0, duration:.45, ease:'power3.out'}}, .35);")
        js.append(f"tl.fromTo({T('.blk')}, {{scaleX:0, transformOrigin:'0 50%'}}, {{scaleX:1, duration:.35, ease:'power3.out'}}, {min(1.3, dur*0.3):.2f});")
        if kind == 'pose' and arg in FULL:
            k, t = 0, .6
            while t < dur - 1:
                js.append(f"tl.to({T('#vis img')}, {{scaleY:{1.012 if k%2==0 else 1}, duration:1.2, ease:'sine.inOut'}}, {t:.2f});"); t += 1.2; k += 1
            if arg == 'walk-away':
                js.append(f"tl.fromTo({T('#vis')}, {{x:0}}, {{x:{-180 if left else 180}, duration:{dur:.2f}, ease:'none'}}, .1);")
        elif kind in ('icon', 'cite'):
            js.append(f"tl.fromTo({T('#vis svg')}, {{rotation:-3}}, {{rotation:3, duration:{max(dur-0.8,1):.2f}, ease:'sine.inOut'}}, .6);")
        else:
            js.append(f"tl.fromTo({T('#vis img')}, {{y:6}}, {{y:-6, duration:{max(dur-0.8,1):.2f}, ease:'sine.inOut'}}, .6);")
    js.append(f"tl.fromTo({T('.stage')}, {{scale:1}}, {{scale:1.035, duration:{dur:.2f}, ease:'none'}}, 0);")
    return f"""<template>
  <style>{CSS}</style>
  <div id="root" data-composition-id="{sid}" data-width="1920" data-height="1080">
    <div class="stage" data-layout-allow-overflow data-layout-allow-overlap>
    {chr(10).join(body)}
    </div>
  </div>
  <script>
    const tl = gsap.timeline({{ paused: true }});
    {chr(10).join(js)}
    window.__timelines["{sid}"] = tl;
  </script>
</template>
"""


def captions(lines):
    body, js = [], []
    for i, (s, e, text) in enumerate(lines):
        words = text.split(); w = [max(len(re.sub(r'[^A-Za-z0-9]', '', x)), 2) + 1.5 for x in words]; tot = sum(w); t = s
        spans = []
        for j, (word, ww) in enumerate(zip(words, w)):
            spans.append(f'<span class="w" id="c{i}w{j}">{word}</span>')
            js.append(f"tl.fromTo('#c{i}w{j}', {{color:'rgba(23,20,15,.52)'}}, {{color:'#17140F', duration:.06}}, {t:.2f});"); t += (e - s) * ww / tot
        body.append(f'<div class="cap" id="c{i}">{" ".join(spans)}</div>')
        end = lines[i + 1][0] - 0.04 if i + 1 < len(lines) else e + 0.4
        js.append(f"tl.fromTo('#c{i}', {{opacity:0}}, {{opacity:1, duration:.12}}, {s-0.05:.2f});")
        js.append(f"tl.to('#c{i}', {{opacity:0, duration:.1}}, {end-0.1:.2f});")
    css = """#root{position:absolute;inset:0}
.cap{position:absolute;left:50%;bottom:52px;transform:translateX(-50%);width:1560px;text-align:center;font-family:Inter,sans-serif;font-weight:900;font-size:46px;line-height:1.2;opacity:0;background:rgba(251,248,242,.94);padding:12px 32px;border-radius:18px}
.w{color:rgba(23,20,15,.52)}"""
    return f"""<template>
  <style>{css}</style>
  <div id="root" data-composition-id="captions" data-width="1920" data-height="1080" data-layout-allow-caption-zone>
{chr(10).join(body)}
  </div>
  <script>
    const tl = gsap.timeline({{ paused: true }});
{chr(10).join(js)}
    window.__timelines["captions"] = tl;
  </script>
</template>
"""


def split_sentences(text):
    parts = re.split(r'(?<=[.!?])\s+', text.strip())
    out = []
    for p in parts:  # split long sentences at commas
        if len(p) > 95 and ',' in p:
            a = p.rfind(',', 0, len(p) // 2 + 25)
            out += [p[:a + 1], p[a + 2:]] if a > 0 else [p]
        else:
            out.append(p)
    return out


def main():
    for d in ('compositions', 'assets/char', 'assets/sfx'):
        os.makedirs(os.path.join(P, d), exist_ok=True)
    for f in os.listdir(SHARED):
        shutil.copy(os.path.join(SHARED, f), os.path.join(P, 'assets/char', f))
    scenes = KIT['scenes']
    t = 0.3; chunks = []; sr = 24000; hosts = []; caps = []; sfx = []; side = 0
    chunks.append(np.zeros(int(t * sr)))
    for x in scenes:
        n = x['n']; a, sr = sf.read(os.path.join(P, f'assets/vo/s{n:02d}.wav'))
        kind = S[n][2]
        pre = 0.35 if kind == 'title' else 0.12
        post = 0.75 if kind == 'title' else 0.38
        vs = t + pre; ve = vs + len(a) / sr; dur = (ve + post) - t
        chunks += [np.zeros(int(pre * sr)), a, np.zeros(int(post * sr))]
        sid = f's{n:02d}'
        open(os.path.join(P, 'compositions', sid + '.html'), 'w').write(scene_html(n, sid, dur, side))
        if kind != 'title': side = 1 - side
        hosts.append(f'<div id="{sid}" data-composition-id="{sid}" data-composition-src="compositions/{sid}.html" data-start="{t:.2f}" data-duration="{dur:.2f}" data-track-index="1" data-track-kind="graphics" data-width="1920" data-height="1080" style="z-index:1"></div>')
        sents = split_sentences(x['vo']); tot = sum(len(s) for s in sents); c = vs
        for s_ in sents:
            d = (ve - vs) * len(s_) / tot; caps.append((round(c, 2), round(c + d, 2), s_)); c += d
        if kind == 'title': sfx.append(('whoosh.mp3', t, .3))
        elif kind == 'cite': sfx.append(('pop.mp3', t + .3, .35))
        x['_start'] = round(t, 2)
        t += dur
    vo_end = t
    y = np.concatenate(chunks); y = y / np.abs(y).max() * 0.89
    sf.write(os.path.join(P, 'assets/vo/vo_full.wav'), y, sr)
    end_d = 3.0; total = round(vo_end + end_d, 2)
    ec = f"""<template><style>#root{{position:absolute;inset:0}}</style>
  <div id="root" data-composition-id="endcard" data-width="1920" data-height="1080">
    <div id="ec-bg" style="position:absolute;inset:0;background:#C8541A"></div>
    <div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center">
      <div id="ec-logo" style="font-family:'League Gothic';font-size:240px;line-height:1;color:#FBF8F2">UNCHASED</div>
      <div id="ec-sub" style="font-family:Inter;font-weight:700;font-size:46px;color:#17140F;margin-top:10px">Psychology for men who stopped chasing.</div>
    </div>
  </div>
  <script>const tl = gsap.timeline({{ paused: true }});
  tl.fromTo('#ec-bg', {{clipPath:'circle(0% at 50% 50%)'}}, {{clipPath:'circle(75% at 50% 50%)', duration:.4, ease:'power3.out'}}, 0);
  tl.fromTo('#ec-logo', {{opacity:0, scale:.86}}, {{opacity:1, scale:1, duration:.35, ease:'back.out(2)'}}, .1);
  tl.fromTo('#ec-sub', {{opacity:0, y:16}}, {{opacity:1, y:0, duration:.3}}, .3);
  window.__timelines["endcard"] = tl;</script></template>"""
    open(os.path.join(P, 'compositions/endcard.html'), 'w').write(ec)
    bug = """<template><style>#root{position:absolute;inset:0}</style><div id="root" data-composition-id="bug" data-width="1920" data-height="1080" data-no-timeline>
<div style="position:absolute;left:96px;top:66px;font-family:'League Gothic';font-size:50px;letter-spacing:.06em;color:#17140F;opacity:.85"><span style="color:#C8541A">U</span>NCHASED</div></div></template>"""
    open(os.path.join(P, 'compositions/bug.html'), 'w').write(bug)
    open(os.path.join(P, 'compositions/captions.html'), 'w').write(captions(caps))
    hosts.append(f'<div id="bug" data-composition-id="bug" data-composition-src="compositions/bug.html" data-start="0" data-duration="{vo_end:.2f}" data-track-index="2" data-track-kind="graphics" data-width="1920" data-height="1080" style="z-index:5"></div>')
    hosts.append(f'<div id="captions" data-composition-id="captions" data-composition-src="compositions/captions.html" data-start="0" data-duration="{vo_end:.2f}" data-track-index="3" data-track-kind="captions" data-width="1920" data-height="1080" style="z-index:6"></div>')
    hosts.append(f'<div id="endcard" data-composition-id="endcard" data-composition-src="compositions/endcard.html" data-start="{vo_end:.2f}" data-duration="{end_d}" data-track-index="4" data-track-kind="graphics" data-width="1920" data-height="1080" style="z-index:7"></div>')
    sfx.append(('impact-bass-1.mp3', vo_end, .45))
    aud = ['<audio id="vo" class="clip" src="assets/vo/vo_full.wav" data-start="0" data-track-index="10" data-volume="1"></audio>']
    music = os.path.join(P, 'assets/bgm/track.mp3')
    if os.path.exists(music):
        aud.append(f'<audio id="bgm" class="clip" src="assets/bgm/track.mp3" data-start="0" data-duration="{total}" data-track-index="11" data-volume="0.12" data-fade-in="1" data-fade-out="3"></audio>')
    for k, (f, tt, vol) in enumerate(sfx):
        shutil.copy(os.path.join(SFX, f), os.path.join(P, 'assets/sfx', f))
        dd = min(sf.info(os.path.join(SFX, f)).duration if f.endswith('wav') else 0.8, total - tt)
        aud.append(f'<audio id="sfx{k}" class="clip" src="assets/sfx/{f}" data-start="{tt:.2f}" data-duration="{dd:.2f}" data-track-index="{20 + k % 4}" data-volume="{vol}"></audio>')
    open(os.path.join(P, 'index.html'), 'w').write(f"""<!doctype html>
<html lang="en"><head><meta charset="UTF-8" /><meta name="viewport" content="width=1920, height=1080" />
{GSAP}
{FONTS}
<style>*{{margin:0;padding:0;box-sizing:border-box}} html,body{{width:1920px;height:1080px;overflow:hidden;background:#FBF8F2}} #root{{width:100%;height:100%;position:relative}}</style>
</head><body>
<div id="root" data-composition-id="main" data-start="0" data-duration="{total}" data-width="1920" data-height="1080">
{chr(10).join(hosts)}
{chr(10).join(aud)}
</div>
<script>window.__timelines["main"] = gsap.timeline({{ paused: true }});</script>
</body></html>
""")
    for f in ('hyperframes.json', 'package.json', 'meta.json'):
        shutil.copy(os.path.join(B, '..', 'unchased-shorts', 'tpl', f), os.path.join(P, f))
    # chapters from real timing
    ch, seen = [], set()
    for x in scenes:
        if x['sec'] not in seen:
            seen.add(x['sec']); m = int(x['_start'] if x['n'] > 1 else 0)
            ch.append(f"{m//60}:{m%60:02d} {x['sec'] if x['sec']!='Hook' else 'Intro'}")
    open(os.path.join(B, 'v01_chapters.txt'), 'w').write('\n'.join(ch) + '\n')
    print('total', total, 'scenes', len(scenes), 'captions', len(caps)); print('\n'.join(ch))


if __name__ == '__main__':
    main()
