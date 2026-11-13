"""Builds four 15-second Unchased example videos as HyperFrames projects.

Run: python3 build.py   (from unchased-shorts/). Each vN/ is a HyperFrames project.
"""
import json, os, re, shutil

B = os.path.dirname(os.path.abspath(__file__))
SFX_SRC = os.path.join(B, '..', '.claude', 'skills', 'media-use', 'audio', 'assets', 'sfx')
TIMING = json.load(open(os.path.join(B, 'timing.json')))
DUR = 15

GSAP = '<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js"></script>'
FONTS = '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=League+Gothic&family=Inter:wght@500;700;900&display=swap">'

BASE_CSS = """
#root{position:absolute;inset:0;overflow:hidden;background:#FBF8F2;font-family:Inter,sans-serif;color:#17140F}
.hl{font-family:'League Gothic',Oswald,sans-serif;text-transform:uppercase;line-height:.92;letter-spacing:.01em;color:#17140F}
.blk{display:inline-block;background:#C8541A;color:#FBF8F2;padding:0 .14em}
.blk-dark{display:inline-block;background:#17140F;color:#FBF8F2;padding:0 .14em}
.char{position:absolute;transform-origin:50% 100%;margin-top:-80px}
.char img{display:block;width:100%;height:auto}
.floor{position:absolute;margin-top:-80px;height:4px;background:#17140F;border-radius:2px}
.face{position:absolute;border-radius:50%;background:#C8541A;border:7px solid #17140F;overflow:hidden}
.face img{position:absolute;left:50%;bottom:-2%;width:86%;transform:translateX(-50%)}
.card{position:absolute;background:#fff;border:6px solid #17140F;border-radius:28px;box-shadow:12px 12px 0 #17140F}
"""


def scene(cid, body, js, css=''):
    return f"""<template>
  <style>{BASE_CSS}{css}</style>
  <div id="root" data-composition-id="{cid}" data-width="1920" data-height="1080">
{body}
  </div>
  <script>
    const tl = gsap.timeline({{ paused: true }});
    const S = (s) => document.querySelector('[data-composition-id="{cid}"] ' + s);
    const SA = (s) => document.querySelectorAll('[data-composition-id="{cid}"] ' + s);
{js}
    window.__timelines["{cid}"] = tl;
  </script>
</template>
"""


def idle(sel, t0, t1, amp=0.012, period=2.4):
    """Breathing idle: a gentle seeded-free yoyo built from explicit tweens (no repeat:-1)."""
    out = []
    t = t0
    up = True
    while t < t1:
        out.append(f"tl.to({sel}, {{scaleY:{1+amp if up else 1}, duration:{period/2}, ease:'sine.inOut'}}, {t:.2f});")
        t += period / 2
        up = not up
    return '\n'.join(out)


# ---------------------------------------------------------------- captions
def word_times(line):
    s, e, text = line
    words = text.split()
    w = [max(len(re.sub(r'[^A-Za-z0-9]', '', x)), 2) + 1.5 for x in words]
    tot = sum(w)
    t = s
    out = []
    for word, ww in zip(words, w):
        d = (e - s) * ww / tot
        out.append((word, t, t + d))
        t += d
    return out


def captions(cid, lines, accent_words):
    body, js = [], []
    for i, ln in enumerate(lines):
        wt = word_times(ln)
        spans = ''.join(f'<span class="w" id="{cid}-l{i}w{j}">{w}</span> ' for j, (w, _, _) in enumerate(wt))
        body.append(f'    <div class="cap" id="{cid}-l{i}">{spans}</div>')
        end = lines[i + 1][0] - 0.05 if i + 1 < len(lines) else ln[1] + 0.35
        js.append(f"tl.fromTo('#{cid}-l{i}', {{opacity:0, y:18}}, {{opacity:1, y:0, duration:.18, ease:'power2.out'}}, {ln[0]-0.06:.2f});")
        js.append(f"tl.to('#{cid}-l{i}', {{opacity:0, duration:.12}}, {end:.2f});")
        for j, (w, a, b) in enumerate(wt):
            key = re.sub(r'[^a-z]', '', w.lower())
            col = '#C8541A' if key in accent_words else '#17140F'
            js.append(f"tl.fromTo('#{cid}-l{i}w{j}', {{color:'rgba(23,20,15,.52)'}}, {{color:'{col}', duration:.08}}, {a:.2f});")
    css = """
.cap{position:absolute;left:50%;bottom:58px;font-family:Inter,sans-serif;transform:translateX(-50%);width:1500px;text-align:center;font-weight:900;font-size:50px;line-height:1.18;opacity:0;
  background:rgba(251,248,242,.92);padding:14px 34px;border-radius:18px}
.w{color:rgba(23,20,15,.52)}
#root{background:transparent}
"""
    return f"""<template>
  <style>{css}</style>
  <div id="root" data-composition-id="{cid}" data-width="1920" data-height="1080" data-layout-allow-caption-zone>
{chr(10).join(body)}
  </div>
  <script>
    const tl = gsap.timeline({{ paused: true }});
{chr(10).join(js)}
    window.__timelines["{cid}"] = tl;
  </script>
</template>
"""


# ---------------------------------------------------------------- shared pieces
def logo_bug(cid):
    body = """    <div id="bug" style="position:absolute;left:96px;top:70px;font-family:'League Gothic';font-size:54px;letter-spacing:.06em;color:#17140F"><span style="color:#C8541A">U</span>NCHASED</div>"""
    js = "tl.fromTo(S('#bug'), {opacity:0, x:-20}, {opacity:1, x:0, duration:.4, ease:'power2.out'}, 0.1);"
    return scene(cid, body, js, css='#root{background:transparent}')


def end_card(cid, title):
    body = f"""    <div id="ec-bg" style="position:absolute;inset:0;background:#C8541A"></div>
    <div id="ec-in" style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center">
      <div id="ec-logo" class="hl" style="font-size:230px;color:#FBF8F2">UNCHASED</div>
      <div id="ec-sub" style="font-weight:700;font-size:44px;color:#17140F;margin-top:10px">{title}</div>
    </div>
    <div id="ec-face" class="face" style="width:220px;height:220px;right:120px;top:90px;background:#FBF8F2"><img src="assets/char/face-smirk.png" alt=""></div>"""
    js = """tl.fromTo(S('#ec-bg'), {clipPath:'circle(0% at 50% 50%)'}, {clipPath:'circle(75% at 50% 50%)', duration:.32, ease:'power3.out'}, 0);
tl.fromTo(S('#ec-logo'), {opacity:0, scale:.86}, {opacity:1, scale:1, duration:.3, ease:'back.out(2)'}, .08);
tl.fromTo(S('#ec-sub'), {opacity:0, y:16}, {opacity:1, y:0, duration:.25, ease:'power2.out'}, .2);
tl.fromTo(S('#ec-face'), {opacity:0, scale:.6, rotation:-8}, {opacity:1, scale:1, rotation:0, duration:.3, ease:'back.out(2)'}, .16);"""
    return scene(cid, body, js, css='#ec-face{z-index:3}')


def sfx(id_, file, t, vol=0.4, track=20):
    import soundfile as sf
    try:
        dur = sf.info(os.path.join(SFX_SRC, file)).duration
    except Exception:
        import subprocess
        dur = float(subprocess.run(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',os.path.join(SFX_SRC, file)],capture_output=True,text=True).stdout)
    dur = min(dur, DUR - t)
    return f'      <audio id="{id_}" class="clip" src="assets/sfx/{file}" data-start="{t:.2f}" data-duration="{dur:.2f}" data-track-index="{track}" data-volume="{vol}"></audio>'


def write_project(v, title, scenes, cap_accents, sfx_list):
    d = os.path.join(B, v)
    os.makedirs(os.path.join(d, 'compositions'), exist_ok=True)
    os.makedirs(os.path.join(d, 'assets', 'char'), exist_ok=True)
    os.makedirs(os.path.join(d, 'assets', 'sfx'), exist_ok=True)
    for f in os.listdir(os.path.join(B, 'shared')):
        shutil.copy(os.path.join(B, 'shared', f), os.path.join(d, 'assets', 'char', f))
    lines = TIMING[v]
    vo_end = lines[-1][1]
    end_start = round(min(vo_end + 0.1, DUR - 0.75), 2)
    hosts = []
    t = 0
    for i, (sid, start, html) in enumerate(scenes):
        nxt = scenes[i + 1][1] if i + 1 < len(scenes) else end_start
        open(os.path.join(d, 'compositions', f'{sid}.html'), 'w').write(html)
        hosts.append(f'      <div id="{sid}" data-composition-id="{sid}" data-composition-src="compositions/{sid}.html" data-start="{start:.2f}" data-duration="{nxt-start:.2f}" data-track-index="1" data-track-kind="graphics" data-width="1920" data-height="1080" style="z-index:1"></div>')
    open(os.path.join(d, 'compositions', 'bug.html'), 'w').write(logo_bug('bug'))
    open(os.path.join(d, 'compositions', 'captions.html'), 'w').write(captions('captions', lines, cap_accents))
    open(os.path.join(d, 'compositions', 'endcard.html'), 'w').write(end_card('endcard', 'Psychology for men who stopped chasing.'))
    hosts.append(f'      <div id="bug" data-composition-id="bug" data-composition-src="compositions/bug.html" data-start="0" data-duration="{end_start:.2f}" data-track-index="2" data-track-kind="graphics" data-width="1920" data-height="1080" style="z-index:5"></div>')
    hosts.append(f'      <div id="captions" data-composition-id="captions" data-composition-src="compositions/captions.html" data-start="0" data-duration="{end_start:.2f}" data-track-index="3" data-track-kind="captions" data-width="1920" data-height="1080" style="z-index:6"></div>')
    hosts.append(f'      <div id="endcard" data-composition-id="endcard" data-composition-src="compositions/endcard.html" data-start="{end_start:.2f}" data-duration="{DUR-end_start:.2f}" data-track-index="4" data-track-kind="graphics" data-width="1920" data-height="1080" style="z-index:7"></div>')
    used = set()
    aud = [f'      <audio id="vo" class="clip" src="assets/vo/vo.wav" data-start="0" data-track-index="10" data-volume="1"></audio>']
    sfx_list = sfx_list + [('impact-bass-1.mp3', end_start - 0.02, 0.45)]
    for k, (f, tt, vol) in enumerate(sfx_list):
        shutil.copy(os.path.join(SFX_SRC, f), os.path.join(d, 'assets', 'sfx', f))
        aud.append(sfx(f'sfx{k+1}', f, max(tt, 0), vol, 20 + k))
    index = f"""<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=1920, height=1080" />
    {GSAP}
    {FONTS}
    <style>
      * {{ margin:0; padding:0; box-sizing:border-box; }}
      html, body {{ margin:0; width:1920px; height:1080px; overflow:hidden; background:#FBF8F2; }}
      #root {{ width:100%; height:100%; position:relative; }}
    </style>
  </head>
  <body>
    <div id="root" data-composition-id="main" data-start="0" data-duration="{DUR}" data-width="1920" data-height="1080">
{chr(10).join(hosts)}
{chr(10).join(aud)}
    </div>
    <script>
      window.__timelines["main"] = gsap.timeline({{ paused: true }});
    </script>
  </body>
</html>
"""
    open(os.path.join(d, 'index.html'), 'w').write(index)
    for f in ('hyperframes.json', 'package.json', 'meta.json'):
        src = os.path.join(B, 'tpl', f)
        if os.path.exists(src):
            shutil.copy(src, os.path.join(d, f))
    print(v, 'scenes', [s[0] for s in scenes], 'end card at', end_start)


# =============================================================== V1  LET HER GO
def v1():
    L = TIMING['v1']
    s1 = scene('s1', """
    <div id="phone" class="card" style="left:300px;top:150px;width:520px;height:760px;border-radius:56px;padding:40px 34px">
      <div style="display:flex;align-items:center;gap:20px;border-bottom:4px solid #17140F;padding-bottom:22px">
        <div style="width:84px;height:84px;border-radius:50%;background:#2F7D4F;border:5px solid #17140F"></div>
        <div style="font-weight:900;font-size:40px">Her</div>
      </div>
      <div id="blockbtn" style="margin-top:34px;border:5px solid #17140F;border-radius:20px;padding:16px;text-align:center;font-weight:900;font-size:36px;position:relative">Block contact
        <div id="blockx" style="position:absolute;left:-10px;right:-10px;top:50%;height:8px;background:#C8541A;transform-origin:0 50%"></div></div>
      <div id="argue" style="margin-top:30px;display:flex;gap:16px">
        <div class="bub" id="ag1">Why would you…</div><div class="bub" id="ag2">?!</div>
      </div>
      <div id="longmsg" data-layout-allow-overlap class="bub me" style="margin-top:30px;min-height:60px"><span id="typed"></span><span id="caret">|</span></div>
    </div>
    <div id="hero" class="char" style="left:1180px;top:200px;width:330px"><img src="assets/char/hero-stand.png" alt=""></div>
    <div class="floor" style="left:1060px;top:968px;width:580px"></div>
    """, f"""
const msg = "I just think we need to talk about everything, because honestly I don't understand what happened and I";
tl.fromTo(S('#phone'), {{opacity:1, y:60, rotation:-4}}, {{opacity:1, y:0, rotation:-2, duration:.45, ease:'back.out(1.6)'}}, 0);
tl.fromTo(S('#hero'), {{opacity:1, x:60}}, {{opacity:1, x:0, duration:.5, ease:'power3.out'}}, 0);
tl.fromTo(S('#blockx'), {{scaleX:0}}, {{scaleX:1, duration:.3, ease:'power2.inOut'}}, {L[0][0]+0.8:.2f});
tl.fromTo(S('#blockbtn'), {{opacity:1}}, {{opacity:.35, duration:.2}}, {L[0][0]+1.1:.2f});
tl.fromTo(S('#ag1'), {{opacity:0, scale:.6}}, {{opacity:1, scale:1, duration:.2, ease:'back.out(2)'}}, {L[1][0]-0.1:.2f});
tl.fromTo(S('#ag2'), {{opacity:0, scale:.6}}, {{opacity:1, scale:1, duration:.2, ease:'back.out(2)'}}, {L[1][0]+0.25:.2f});
tl.to(SA('#ag1, #ag2'), {{opacity:.2, duration:.25}}, {L[1][0]+0.9:.2f});
const typed = S('#typed'); const st = {{n:0}};
tl.fromTo(st, {{n:0}}, {{n:msg.length, duration:1.3, ease:'none', onUpdate:()=>typed.textContent = msg.slice(0, Math.round(st.n))}}, {L[2][0]-0.1:.2f});
tl.to(st, {{n:0, duration:.45, ease:'power1.in', onUpdate:()=>typed.textContent = msg.slice(0, Math.round(st.n))}}, {L[2][1]-0.35:.2f});
tl.fromTo(S('#caret'), {{opacity:1}}, {{opacity:0, duration:.01}}, {L[2][1]+0.2:.2f});
{idle("S('#hero img')", 0.5, 5.4)}
tl.fromTo(S('#hero img'), {{rotation:0}}, {{rotation:-1.5, duration:1.2, ease:'sine.inOut'}}, {L[2][0]:.2f});
""", css="""
.bub{background:#F1ECE2;border:4px solid #17140F;border-radius:22px;padding:12px 20px;font-weight:700;font-size:28px;line-height:1.3}
.bub.me{background:#C8541A;color:#FBF8F2}
#hero img{transform-origin:50% 100%}
""")
    t2 = L[3][0] - 0.15
    s2 = scene('s2', """
    <div id="desk" style="position:absolute;left:0;right:0;top:700px;bottom:0;background:#EFE7DA;border-top:6px solid #17140F"></div>
    <div id="ph2" style="position:absolute;left:760px;top:420px;width:400px;height:280px;perspective:900px">
      <div id="ph2i" style="width:100%;height:100%;border:7px solid #17140F;border-radius:34px;background:#C8541A;transform-origin:50% 100%"></div>
    </div>
    <div id="t2" class="hl" style="position:absolute;left:0;right:0;top:150px;text-align:center;font-size:190px">HE JUST <span class="blk">STOPPED.</span></div>
    """, f"""
tl.fromTo(S('#ph2i'), {{rotationX:0, background:'#C8541A'}}, {{rotationX:72, background:'#17140F', duration:.5, ease:'power3.in'}}, .9);
tl.fromTo(S('#ph2'), {{y:-40}}, {{y:0, duration:.5, ease:'power3.in'}}, .9);
tl.fromTo(S('#t2'), {{opacity:0, y:30}}, {{opacity:1, y:0, duration:.3, ease:'power3.out'}}, .5);
tl.fromTo(S('#desk'), {{y:0}}, {{y:6, duration:.08, yoyo:true, repeat:1}}, 1.4);
""")
    s3 = scene('s3', f"""
    <svg id="heart" data-layout-allow-overflow width="190" height="180" viewBox="0 0 190 180" style="position:absolute;left:330px;top:390px">
      <path id="hl" d="M95 170 L20 90 C-10 55 20 5 60 15 C80 20 90 35 95 45 L80 80 L105 105 Z" fill="#C8541A" stroke="#17140F" stroke-width="7" stroke-linejoin="round"/>
      <path id="hr" d="M95 170 L170 90 C200 55 170 5 130 15 C110 20 100 35 95 45 L80 80 L105 105 Z" fill="#C8541A" stroke="#17140F" stroke-width="7" stroke-linejoin="round"/>
    </svg>
    <div id="walker" class="char" style="left:700px;top:270px;width:300px"><img src="assets/char/walk-away.png" alt=""></div>
    <div class="floor" style="left:120px;top:975px;width:1680px"></div>
    <div id="t3" class="hl" style="position:absolute;right:120px;top:150px;text-align:right;font-size:150px">LOVED THE<br><span class="blk">HARDEST</span></div>
    """, f"""
tl.fromTo(S('#heart'), {{opacity:0, scale:.5}}, {{opacity:1, scale:1, duration:.35, ease:'back.out(2)'}}, .2);
tl.fromTo(S('#hl'), {{x:0, rotation:0}}, {{x:-14, rotation:-10, svgOrigin:'95 170', duration:.5, ease:'power2.out'}}, 1.4);
tl.fromTo(S('#hr'), {{x:0, rotation:0}}, {{x:14, rotation:10, svgOrigin:'95 170', duration:.5, ease:'power2.out'}}, 1.45);
tl.fromTo(S('#walker'), {{x:0}}, {{x:520, duration:5.6, ease:'none'}}, .1);
""" + '\n'.join(f"tl.fromTo(S('#walker img'), {{y:0}}, {{y:-10, duration:.28, ease:'sine.out', yoyo:true, repeat:1}}, {0.1+k*0.56:.2f});" for k in range(10)) + f"""
tl.fromTo(S('#t3'), {{opacity:0, y:30}}, {{opacity:1, y:0, duration:.35, ease:'power3.out'}}, {L[4][1]-L[4][0]-1.5+0.22:.2f});
""")
    scenes = [('s1', 0, s1), ('s2', t2, s2), ('s3', L[4][0] - 0.2, s3)]
    write_project('v1', 'Men Who Let Her Go', scenes, {'stopped', 'hardest', 'loved', 'quietest'},
                  [('typing.mp3', L[2][0] - 0.1, 0.25), ('whoosh-short.mp3', t2 - 0.05, 0.35), ('click-soft.mp3', t2 + 1.4, 0.5), ('whoosh.mp3', L[4][0] - 0.25, 0.3)])


# =============================================================== V2  STOP CHASING
def v2():
    L = TIMING['v2']
    s1 = scene('s1', """
    <div id="t1" class="hl" style="position:absolute;left:150px;top:260px;font-size:220px">STOP<br><span id="chs" style="position:relative;display:inline-block">CHASING<span id="strike" style="position:absolute;left:-12px;right:-12px;top:48%;height:22px;background:#C8541A;transform-origin:0 50%"></span></span></div>
    <div id="arms" class="char" style="left:1240px;top:180px;width:330px"><img src="assets/char/arms-crossed.png" alt=""></div>
    <div class="floor" style="left:1120px;top:960px;width:560px"></div>
    <svg id="spark" width="140" height="140" viewBox="0 0 140 140" style="position:absolute;left:1580px;top:170px">
      <path d="M70 5 L82 58 L135 70 L82 82 L70 135 L58 82 L5 70 L58 58 Z" fill="#C8541A" stroke="#17140F" stroke-width="6" stroke-linejoin="round"/></svg>
    """, f"""
tl.fromTo(S('#t1'), {{opacity:1, x:-40}}, {{opacity:1, x:0, duration:.35, ease:'power3.out'}}, .15);
tl.fromTo(S('#strike'), {{scaleX:0}}, {{scaleX:1, duration:.35, ease:'power2.inOut'}}, 1.2);
tl.fromTo(S('#arms'), {{opacity:0, y:30}}, {{opacity:1, y:0, duration:.4, ease:'power3.out'}}, .4);
tl.fromTo(S('#spark'), {{opacity:0, scale:0, rotation:-60}}, {{opacity:1, scale:1, rotation:0, duration:.4, ease:'back.out(2.4)'}}, 2.6);
{idle("S('#arms img')", 0.8, 3.8)}
""", css='#arms img{transform-origin:50% 100%}')
    s2 = scene('s2', """
    <svg id="eye" width="760" height="420" viewBox="0 0 760 420" style="position:absolute;left:580px;top:230px">
      <path d="M20 210 Q380 -60 740 210 Q380 480 20 210 Z" fill="#fff" stroke="#17140F" stroke-width="14"/>
      <circle id="iris" cx="380" cy="210" r="110" fill="#C8541A" stroke="#17140F" stroke-width="12"/>
      <circle id="pupil" cx="380" cy="210" r="48" fill="#17140F"/>
      <rect id="lid" x="0" y="0" width="760" height="420" fill="#FBF8F2"/>
    </svg>
    <div id="t2" class="hl" style="position:absolute;left:0;right:0;top:110px;text-align:center;font-size:120px">SHE <span class="blk">NOTICES.</span></div>
    """, """
tl.fromTo(S('#lid'), {attr:{height:420}}, {attr:{height:0}, duration:.35, ease:'power3.out'}, .05);
tl.fromTo(S('#t2'), {opacity:0, y:20}, {opacity:1, y:0, duration:.25, ease:'power3.out'}, .15);
tl.fromTo(SA('#iris, #pupil'), {x:-60}, {x:40, duration:.5, ease:'power2.inOut'}, .55);
""")
    s3 = scene('s3', """
    <div id="dict" class="card" style="left:300px;top:200px;width:1320px;height:520px;padding:60px 80px">
      <div id="word" style="font-family:'League Gothic';font-size:150px;line-height:1">re·ac·tance</div>
      <div style="font-weight:700;font-size:34px;color:#C8541A;margin:8px 0 26px">noun · Jack Brehm, 1966</div>
      <div id="def" style="font-weight:700;font-size:46px;line-height:1.3"></div>
    </div>
    """, f"""
const def = "When a freedom we took for granted disappears, we suddenly want it back.";
tl.fromTo(S('#dict'), {{opacity:0, y:50, rotation:2}}, {{opacity:1, y:0, rotation:0, duration:.4, ease:'back.out(1.6)'}}, 0);
const el = S('#def'); const st = {{n:0}};
tl.fromTo(st, {{n:0}}, {{n:def.length, duration:1.5, ease:'none', onUpdate:()=>el.textContent = def.slice(0, Math.round(st.n))}}, .55);
""")
    a0 = L[3][0] - 0.15
    s4 = scene('s4', f"""
    <div id="meters" style="position:absolute;left:180px;top:220px;width:1000px">
      <div class="lbl">HIS ATTENTION</div>
      <div class="bar"><div id="att" class="fill" style="background:#17140F"></div></div>
      <div id="attv" class="tag">ALWAYS THERE = INVISIBLE</div>
      <div class="lbl" style="margin-top:70px">HOW MUCH SHE WANTS IT</div>
      <div class="bar"><div id="want" class="fill" style="background:#C8541A"></div></div>
      <div id="wantv" class="tag" style="color:#C8541A">EVERYTHING</div>
    </div>
    <div id="pt" class="char" style="left:1340px;top:200px;width:340px"><img src="assets/char/pointing.png" alt=""></div>
    <div class="floor" style="left:1240px;top:955px;width:540px"></div>
    """, f"""
tl.fromTo(S('#meters'), {{opacity:0, x:-40}}, {{opacity:1, x:0, duration:.35, ease:'power3.out'}}, 0);
tl.fromTo(S('#pt'), {{opacity:0, x:40}}, {{opacity:1, x:0, duration:.4, ease:'power3.out'}}, .1);
tl.fromTo(S('#att'), {{scaleX:0}}, {{scaleX:1, duration:.6, ease:'power2.out'}}, .3);
tl.fromTo(S('#want'), {{scaleX:0}}, {{scaleX:.12, duration:.6, ease:'power2.out'}}, .45);
tl.fromTo(S('#attv'), {{opacity:0}}, {{opacity:1, duration:.25}}, {L[3][1]-a0-1.2:.2f});
tl.to(S('#att'), {{scaleX:0, duration:.5, ease:'power3.in'}}, {L[4][0]-a0+0.1:.2f});
tl.to(S('#attv'), {{opacity:0, duration:.2}}, {L[4][0]-a0+0.1:.2f});
tl.to(S('#want'), {{scaleX:1, duration:.55, ease:'back.out(1.4)'}}, {L[4][0]-a0+1.05:.2f});
tl.fromTo(S('#wantv'), {{opacity:0, scale:.7}}, {{opacity:1, scale:1, duration:.3, ease:'back.out(2)'}}, {L[4][0]-a0+1.3:.2f});
{idle("S('#pt img')", 0.6, L[4][1]-a0)}
""", css="""
.lbl{font-family:'League Gothic';font-size:70px;letter-spacing:.03em}
.bar{height:76px;border:7px solid #17140F;border-radius:40px;overflow:hidden;background:#fff;margin-top:12px}
.fill{height:100%;width:100%;transform-origin:0 50%}
.tag{font-weight:900;font-size:36px;margin-top:14px;transform-origin:0 50%}
#pt img{transform-origin:50% 100%}
""")
    scenes = [('s1', 0, s1), ('s2', L[1][0] - 0.15, s2), ('s3', L[2][0] - 0.15, s3), ('s4', a0, s4)]
    write_project('v2', 'Stop Chasing', scenes, {'chasing', 'notices', 'reactance', 'invisible', 'everything'},
                  [('whoosh-short.mp3', L[1][0] - 0.2, 0.35), ('whoosh.mp3', L[2][0] - 0.2, 0.3), ('typing.mp3', L[2][0] + 0.4, 0.22),
                   ('whoosh-short.mp3', a0 - 0.05, 0.3), ('pop.mp3', L[4][0] + 1.3, 0.45)])


# =============================================================== V3  NEVER BEG
def v3():
    L = TIMING['v3']
    s1 = scene('s1', """
    <svg id="scale" data-layout-allow-overflow width="1180" height="640" viewBox="-40 0 1180 640" style="position:absolute;left:80px;top:240px">
      <rect x="530" y="140" width="40" height="440" fill="#17140F"/>
      <rect x="400" y="570" width="300" height="34" rx="10" fill="#17140F"/>
      <g id="beam"><rect x="90" y="120" width="920" height="30" rx="15" fill="#17140F"/>
        <g id="panL"><line x1="130" y1="135" x2="130" y2="300" stroke="#17140F" stroke-width="6"/>
          <path d="M20 300 H240 Q130 380 20 300 Z" fill="#2F7D4F" stroke="#17140F" stroke-width="7"/>
          <text x="130" y="430" text-anchor="middle" font-family="League Gothic" font-size="54">HER VALUE OF YOU</text></g>
        <g id="panR"><line x1="970" y1="135" x2="970" y2="300" stroke="#17140F" stroke-width="6"/>
          <path d="M860 300 H1080 Q970 380 860 300 Z" fill="#C8541A" stroke="#17140F" stroke-width="7"/>
          <text x="970" y="430" text-anchor="middle" font-family="League Gothic" font-size="54">YOUR VALUE OF YOU</text></g>
      </g>
      <circle cx="550" cy="135" r="26" fill="#C8541A" stroke="#17140F" stroke-width="7"/>
    </svg>
    <div id="sad" class="face" style="width:360px;height:360px;left:1380px;top:250px"><img src="assets/char/face-sad.png" alt=""></div>
    <div id="beg" class="hl" style="position:absolute;left:1300px;top:660px;width:520px;text-align:center;font-size:110px"><span class="blk-dark">BEGGING</span></div>
    """, """
tl.fromTo(S('#scale'), {opacity:1, y:40}, {opacity:1, y:0, duration:.4, ease:'power3.out'}, 0);
tl.fromTo(S('#sad'), {opacity:0, scale:.6}, {opacity:1, scale:1, duration:.35, ease:'back.out(2)'}, .4);
tl.fromTo(S('#beg'), {opacity:0, y:20}, {opacity:1, y:0, duration:.25}, .8);
tl.fromTo(S('#beam'), {rotation:0}, {rotation:-12, svgOrigin:'550 135', duration:1.6, ease:'power2.inOut'}, 2.2);
tl.fromTo(S('#panL'), {rotation:0}, {rotation:12, svgOrigin:'130 135', duration:1.6, ease:'power2.inOut'}, 2.2);
tl.fromTo(S('#panR'), {rotation:0}, {rotation:12, svgOrigin:'970 135', duration:1.6, ease:'power2.inOut'}, 2.2);
tl.fromTo(S('#sad'), {y:0}, {y:14, duration:1.2, ease:'sine.inOut'}, 3.2);
""")
    s2 = scene('s2', """
    <div id="arms" class="char" style="left:250px;top:190px;width:320px"><img src="assets/char/arms-crossed.png" alt=""></div>
    <div class="floor" style="left:120px;top:955px;width:580px"></div>
    <div class="hl" style="position:absolute;left:820px;top:260px;font-size:200px">NOT <span id="cold" style="position:relative;display:inline-block">COLD.<span id="st2" style="position:absolute;left:-10px;right:-10px;top:47%;height:20px;background:#C8541A;transform-origin:0 50%"></span></span></div>
    <div id="clear" class="hl" style="position:absolute;left:820px;top:480px;font-size:200px"><span class="blk">CLEAR.</span></div>
    """, """
tl.fromTo(S('#arms'), {opacity:0, x:-40}, {opacity:1, x:0, duration:.4, ease:'power3.out'}, 0);
tl.fromTo(S('#cold'), {opacity:0, y:20}, {opacity:1, y:0, duration:.25}, .2);
tl.fromTo(S('#st2'), {scaleX:0}, {scaleX:1, duration:.3, ease:'power2.inOut'}, 1.2);
tl.fromTo(S('#clear'), {opacity:0, scale:.8}, {opacity:1, scale:1, duration:.3, ease:'back.out(2)'}, 1.5);
""" + idle("S('#arms img')", 0.4, 2.6), css='#arms img{transform-origin:50% 100%}')
    s3 = scene('s3', """
    <div id="pt" class="char" style="left:400px;top:190px;width:350px"><img src="assets/char/pointing.png" alt=""></div>
    <div class="floor" style="left:280px;top:945px;width:600px"></div>
    <div id="one" style="position:absolute;left:1000px;top:250px;width:520px;height:520px;border-radius:50%;background:#C8541A;border:12px solid #17140F;display:flex;align-items:center;justify-content:center">
      <span class="hl" style="font-size:400px;color:#FBF8F2;line-height:1">1</span></div>
    """, """
tl.fromTo(S('#pt'), {opacity:0, y:30}, {opacity:1, y:0, duration:.35, ease:'power3.out'}, 0);
tl.fromTo(S('#pt img'), {rotation:0}, {rotation:-2, duration:.3, ease:'back.out(3)'}, .7);
tl.fromTo(S('#one'), {opacity:0, scale:0, rotation:-30}, {opacity:1, scale:1, rotation:0, duration:.45, ease:'back.out(2)'}, .75);
""", css='#pt img{transform-origin:50% 100%}')
    q0 = L[3][0] - 0.2
    wt = word_times(L[3])
    s4 = scene('s4', """
    <div id="q" class="hl" style="position:absolute;left:0;right:0;top:170px;text-align:center;font-size:190px;line-height:1">
      <span class="qw">LOVE</span> <span class="qw">YOU</span> <span class="qw">HAVE</span> <span class="qw">TO</span> <span class="qw">BEG</span> <span class="qw">FOR</span><br>
      <span class="qw">WAS</span> <span class="qw blk">NEVER</span> <span class="qw">LOVE.</span></div>
    <div id="mq" style="position:absolute;left:0;right:0;top:110px;text-align:center;font-family:'League Gothic';font-size:200px;color:#C8541A;line-height:1">“</div>
    """, '\n'.join(f"tl.fromTo(SA('.qw')[{k}], {{opacity:0, y:30}}, {{opacity:1, y:0, duration:.18, ease:'power3.out'}}, {a-q0-0.03:.2f});" for k, (w, a, b) in enumerate(wt)) +
        "\ntl.fromTo(S('#mq'), {opacity:0}, {opacity:1, duration:.3}, 0);\n" +
        f"tl.fromTo(SA('.qw')[7], {{scale:1}}, {{scale:1.12, duration:.25, ease:'back.out(3)'}}, {wt[7][1]-q0:.2f});")
    scenes = [('s1', 0, s1), ('s2', L[1][0] - 0.2, s2), ('s3', L[2][0] - 0.2, s3), ('s4', q0, s4)]
    write_project('v3', 'Men Who Never Beg', scenes, {'begs', 'beg', 'cold', 'one', 'never'},
                  [('whoosh-short.mp3', L[1][0] - 0.25, 0.32), ('whoosh.mp3', L[2][0] - 0.25, 0.3), ('pop.mp3', L[2][0] + 0.55, 0.45), ('whoosh-short.mp3', q0 - 0.05, 0.3)])


# =============================================================== V4  SILENCE
def v4():
    L = TIMING['v4']
    s1 = scene('s1', """
    <svg id="crack" width="1920" height="1080" viewBox="0 0 1920 1080" style="position:absolute;left:0;top:0">
      <path id="ck" d="M0 520 L380 470 L520 590 L760 500 L900 560" fill="none" stroke="#17140F" stroke-width="10" stroke-linejoin="round" stroke-linecap="round"/></svg>
    <div id="sad" class="face" style="width:430px;height:430px;left:1220px;top:220px"><img src="assets/char/face-sad.png" alt=""></div>
    <div id="t1" class="hl" style="position:absolute;left:150px;top:250px;font-size:150px">THEY EXPECTED<br><span class="blk">A SCENE.</span></div>
    """, """
tl.fromTo(S('#ck'), {strokeDasharray:1200, strokeDashoffset:1200}, {strokeDashoffset:0, duration:.35, ease:'power4.out'}, .3);
tl.to(S('#ck'), {opacity:0, duration:.3}, 1.3);
tl.fromTo(S('#sad'), {opacity:1, scale:.9}, {opacity:1, scale:1, duration:.35, ease:'back.out(2)'}, 0);
tl.fromTo(S('#t1'), {opacity:0, y:30}, {opacity:1, y:0, duration:.3, ease:'power3.out'}, 1.35);
""")
    c0 = L[1][0] - 0.2
    wt = word_times(L[1])
    s2 = scene('s2', """
    <div id="c1" class="chip"><svg width="90" height="110" viewBox="0 0 90 110"><path d="M45 5 C45 5 8 55 8 74 A37 37 0 0 0 82 74 C82 55 45 5 45 5Z" fill="#6FA8DC" stroke="#17140F" stroke-width="7"/></svg>TEARS.</div>
    <div id="c2" class="chip"><svg width="90" height="110" viewBox="0 0 90 110"><path d="M45 4 C60 30 84 44 80 76 A35 35 0 0 1 10 76 C8 56 22 48 26 30 C34 44 40 46 45 4Z" fill="#C8541A" stroke="#17140F" stroke-width="7"/></svg>ANGER.</div>
    <div id="c3" class="chip"><svg width="110" height="100" viewBox="0 0 110 100"><path d="M8 10 H102 V70 H44 L20 92 V70 H8Z" fill="#fff" stroke="#17140F" stroke-width="7" stroke-linejoin="round"/><path d="M24 30H86M24 48H70" stroke="#17140F" stroke-width="6"/></svg>A LONG MESSAGE.</div>
    """, '\n'.join(f"tl.fromTo(S('#c{k+1}'), {{opacity:0, scale:.5, rotation:{r}}}, {{opacity:1, scale:1, rotation:{r/3:.1f}, duration:.3, ease:'back.out(2.2)'}}, {t-c0-0.05:.2f});"
                   for k, (t, r) in enumerate([(wt[0][1], -8), (wt[1][1], 6), (wt[2][1], -4)])), css="""
.chip{position:absolute;display:flex;align-items:center;gap:26px;background:#fff;border:7px solid #17140F;border-radius:30px;box-shadow:10px 10px 0 #17140F;padding:24px 44px;font-family:'League Gothic';font-size:120px}
#c1{left:180px;top:210px} #c2{left:1060px;top:300px} #c3{left:420px;top:560px}
""")
    q0 = L[2][0] - 0.2
    s3 = scene('s3', """
    <div id="calm" class="face" style="width:470px;height:470px;left:725px;top:170px;background:#FBF8F2"><img src="assets/char/face-calm.png" alt=""></div>
    <div id="t3" class="hl" style="position:absolute;left:0;right:0;top:690px;text-align:center;font-size:150px">YOU WENT <span class="blk-dark">QUIET.</span></div>
    """, """
tl.fromTo(S('#calm'), {opacity:0, scale:.85}, {opacity:1, scale:1, duration:.7, ease:'power2.out'}, .1);
tl.fromTo(S('#t3'), {opacity:0}, {opacity:1, duration:.5}, .7);
tl.fromTo(S('#calm'), {scale:1}, {scale:1.04, duration:1.4, ease:'sine.inOut'}, .8);
""")
    g0 = L[3][0] - 0.2
    s4 = scene('s4', f"""
    <svg id="graph" width="1100" height="640" viewBox="0 0 1100 640" style="position:absolute;left:700px;top:200px">
      <path d="M20 20 V620 H1080" fill="none" stroke="#17140F" stroke-width="8"/>
      <path id="gl" d="M40 580 L240 540 L420 470 L600 420 L780 280 L1000 90" fill="none" stroke="#C8541A" stroke-width="18" stroke-linecap="round" stroke-linejoin="round"/>
      <circle id="gd" cx="1000" cy="90" r="26" fill="#C8541A" stroke="#17140F" stroke-width="8"/>
    </svg>
    <div id="hero" class="char" style="left:250px;top:200px;width:320px"><img src="assets/char/hero-stand.png" alt=""></div>
    <div class="floor" style="left:120px;top:955px;width:580px"></div>
    <div id="k1" class="hl tagw" style="left:820px;top:150px">KIND.</div>
    <div id="k2" class="hl tagw" style="left:1180px;top:150px"><span class="blk">BETTER.</span></div>
    """, f"""
tl.fromTo(S('#hero'), {{opacity:0, x:-40}}, {{opacity:1, x:0, duration:.4, ease:'power3.out'}}, 0);
tl.fromTo(S('#gl'), {{strokeDasharray:1400, strokeDashoffset:1400}}, {{strokeDashoffset:0, duration:2.1, ease:'power1.inOut'}}, .3);
tl.fromTo(S('#gd'), {{scale:0, transformOrigin:'50% 50%'}}, {{scale:1, duration:.3, ease:'back.out(3)'}}, 2.35);
tl.fromTo(S('#k1'), {{opacity:0, y:20}}, {{opacity:1, y:0, duration:.25}}, .55);
tl.fromTo(S('#k2'), {{opacity:0, y:20}}, {{opacity:1, y:0, duration:.25}}, 1.65);
{idle("S('#hero img')", 0.5, 2.6)}
""", css=".tagw{position:absolute;font-size:130px} #hero img{transform-origin:50% 100%}")
    f0 = L[4][0] - 0.2
    words = ['SORRY?', 'WHY?!', 'ANSWER ME', 'HELLO??', 'YOU OK?', 'SO THAT\'S IT?']
    pos = [(160, 200), (1450, 220), (120, 700), (1480, 720), (200, 470), (1440, 470)]
    bubbles = '\n'.join(f'<div class="wb" style="left:{x}px;top:{y}px">{w}</div>' for w, (x, y) in zip(words, pos))
    s5 = scene('s5', f"""
    {bubbles}
    <div id="sil" class="hl" style="position:absolute;left:0;right:0;top:330px;text-align:center;font-size:330px;line-height:1"><span class="blk">SILENCE</span></div>
    <div id="sub5" style="position:absolute;left:0;right:0;top:690px;text-align:center;font-weight:900;font-size:56px">said more than any words.</div>
    """, f"""
tl.fromTo(SA('.wb'), {{opacity:0, scale:.5}}, {{opacity:1, scale:1, duration:.25, ease:'back.out(2)', stagger:.08}}, 0);
tl.fromTo(S('#sil'), {{opacity:0, scale:.85}}, {{opacity:1, scale:1, duration:.35, ease:'power3.out'}}, .5);
tl.to(SA('.wb'), {{opacity:0, scale:.6, duration:.5, ease:'power2.in', stagger:.12}}, 1.6);
tl.fromTo(S('#sub5'), {{opacity:0, y:20}}, {{opacity:1, y:0, duration:.3}}, 1.3);
""", css=".wb{position:absolute;background:#fff;border:6px solid #17140F;border-radius:26px;padding:12px 28px;font-weight:900;font-size:44px;color:#17140F}")
    scenes = [('s1', 0, s1), ('s2', c0, s2), ('s3', q0, s3), ('s4', g0, s4), ('s5', f0, s5)]
    write_project('v4', 'Silent Behaviors', scenes, {'scene', 'quiet', 'kind', 'better', 'silence'},
                  [('impact-bass-2.mp3', 0.28, 0.3), ('whoosh-short.mp3', c0 - 0.05, 0.3), ('pop.mp3', c0 + 0.4, 0.4),
                   ('whoosh.mp3', g0 - 0.05, 0.28), ('whoosh-short.mp3', f0 - 0.05, 0.3)])


if __name__ == '__main__':
    v1(); v2(); v3(); v4()
