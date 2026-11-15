#!/usr/bin/env python3
"""Stickman Studio auto edit: beats.csv + voice + images (+ clips) -> finished MP4.

Needs only: Python 3.8+, Pillow, ffmpeg/ffprobe on PATH. No internet.

Project folder:
  voice.wav|mp3          the full take, uncut
  voice.srt | words.json word timings (SRT with ONE word per cue, or [{"w","s","e"}])
  beats.csv              beat,start,end,...,type(still|animate),voice_text,camera,...
  img/NN.png|jpg         one image per beat (NN = beat number, 2 digits)
  clips/NN.mp4           optional, animated beats (same number)
  sfx/NN.wav|mp3         optional, a sound placed at the start of beat NN

Run:   python auto_edit.py <project> [--size 1080x1920] [--gpu] [--no-snap] [--no-captions]
Out:   <project>/final.mp4  + <project>/qa/ (stills + report.txt)
"""
import argparse, csv, json, os, re, shutil, subprocess, sys, unicodedata

HERE = os.path.dirname(os.path.abspath(__file__))
FONT = os.path.join(HERE, '..', 'assets', 'Cairo-ExtraBold.ttf')
FPS = 30


def run(cmd, quiet=True):
    r = subprocess.run(cmd, capture_output=True, text=True, encoding='utf-8', errors='replace')
    if r.returncode != 0:
        sys.exit('ffmpeg failed:\n' + ' '.join(cmd) + '\n' + r.stderr[-2000:])
    return r.stderr + r.stdout


def duration(path):
    out = subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', path],
                         capture_output=True, text=True).stdout.strip()
    return float(out)


# ---------------------------------------------------------------- words
PUNCT = '.,،؛;:!?؟…"«»()[]-–—'
HARAKAT = re.compile('[\u064B-\u0652\u0670\u0640]')


def norm(w):
    return HARAKAT.sub('', w).strip(PUNCT + ' ')


def load_words(p):
    if os.path.exists(os.path.join(p, 'words.json')):
        W = json.load(open(os.path.join(p, 'words.json'), encoding='utf-8'))
        return [{'w': x['w'], 's': float(x['s']), 'e': float(x['e'])} for x in W]
    srt = open(os.path.join(p, 'voice.srt'), encoding='utf-8-sig').read().replace('\r', '')
    t = lambda s: (lambda h, m, r: int(h) * 3600 + int(m) * 60 + float(r.replace(',', '.')))(*s.strip().split(':'))
    W = []
    for blk in re.split(r'\n\s*\n', srt.strip()):
        L = [x for x in blk.split('\n') if x.strip()]
        i = next(k for k, x in enumerate(L) if '-->' in x)
        a, b = L[i].split('-->')
        text = ' '.join(L[i + 1:]).strip()
        parts = text.split() or ['']
        s, e = t(a), t(b)
        for k, w in enumerate(parts):  # cue with several words: split time evenly
            W.append({'w': w, 's': s + (e - s) * k / len(parts), 'e': s + (e - s) * (k + 1) / len(parts)})
    return W


def silences(voice):
    out = run(['ffmpeg', '-hide_banner', '-i', voice, '-af', 'silencedetect=noise=-35dB:d=0.15', '-f', 'null', '-'])
    ends = [float(x) for x in re.findall(r'silence_end: ([\d.]+)', out)]
    return ends


def snap(words, voice, win=0.7):
    """Free word timings (e.g. an AI-made SRT) drift ~0.3-1 s. Speech after a pause starts exactly
    at a silence end, so shift each sentence so its first word sits on the nearest silence end."""
    ends = silences(voice)
    starts = [0] + [i + 1 for i, w in enumerate(words[:-1]) if w['w'].rstrip()[-1:] in '.،,؟?!…؛:']
    starts = sorted(set(x for x in starts if x < len(words)))
    shifts = []
    for k, i in enumerate(starts):
        j = starts[k + 1] if k + 1 < len(starts) else len(words)
        s = words[i]['s']
        cand = [e for e in ends if abs(e - s) <= win]
        if not cand:
            continue
        d = min(cand, key=lambda e: abs(e - s)) - s
        for w in words[i:j]:
            w['s'] += d; w['e'] += d
        shifts.append(d)
    for a, b in zip(words, words[1:]):  # keep order
        if b['s'] < a['s']:
            b['s'] = a['s'] + 0.02
        a['e'] = min(a['e'], b['s']) if a['e'] > b['s'] else a['e']
    return shifts


# ---------------------------------------------------------------- beats
def load_beats(p, words):
    rows = list(csv.DictReader(open(os.path.join(p, 'beats.csv'), encoding='utf-8-sig')))
    B = []
    for r in rows:
        B.append({'n': int(r['beat']), 'type': (r.get('type') or 'still').strip().lower(),
                  'camera': (r.get('camera') or '').lower(), 'text': r.get('voice_text') or '',
                  's': float(r.get('start') or 0), 'e': float(r.get('end') or 0)})
    # re-time beats from the (snapped) words: beat starts with its first word
    i = 0
    for b in B:
        n = len([x for x in b['text'].split() if norm(x)])
        if n and i < len(words):
            b['s'] = words[i]['s'] - 0.12
            i += n
    B[0]['s'] = 0.0
    for a, b in zip(B, B[1:]):
        a['e'] = b['s']
    B[-1]['e'] = words[-1]['e'] + 0.8
    return B


def find(p, sub, n, exts):
    for e in exts:
        for name in (f'{n:02d}{e}', f'{n}{e}'):
            f = os.path.join(p, sub, name)
            if os.path.exists(f):
                return f
    return None


def segment(p, b, W, H, enc, out):
    D = max(b['e'] - b['s'], 0.2)
    F = max(int(round(D * FPS)), 1)
    clip = find(p, 'clips', b['n'], ['.mp4', '.mov', '.webm']) if b['type'].startswith('anim') else None
    cover = f'scale={W}:{H}:force_original_aspect_ratio=increase,crop={W}:{H}'
    if clip:
        vf = f'{cover},fps={FPS},setsar=1,tpad=stop_mode=clone:stop_duration={D:.3f}'
        cmd = ['ffmpeg', '-y', '-i', clip, '-t', f'{D:.3f}', '-an', '-vf', vf]
    else:
        img = find(p, 'img', b['n'], ['.png', '.jpg', '.jpeg', '.webp'])
        if not img:
            sys.exit(f'missing image for beat {b["n"]} (img/{b["n"]:02d}.png)')
        ken_burns(img, b['camera'], W, H, F, enc, out)
        return
    cmd += ['-frames:v', str(F), '-pix_fmt', 'yuv420p'] + enc + [out]
    run(cmd)


def ken_burns(img, cam, W, H, F, enc, out):
    """Smooth camera on a still: sub-pixel crop per frame (Pillow) + ease-in-out.
    ffmpeg's zoompan rounds x/y to whole pixels, which makes slow zooms step/jitter."""
    from PIL import Image
    im = Image.open(img).convert('RGB')
    iw, ih = im.size
    base = min(iw / W, ih / H)               # cover: source pixels per output pixel at zoom 1
    z = 0.10 if 'push' in cam or 'close' in cam else 0.06
    pull = 'pull' in cam or 'out' in cam
    pan = 'pan' in cam
    rs = getattr(Image, 'Resampling', Image).BICUBIC
    p = subprocess.Popen(['ffmpeg', '-y', '-v', 'error', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-s', f'{W}x{H}',
                          '-r', str(FPS), '-i', '-', '-frames:v', str(F), '-pix_fmt', 'yuv420p'] + enc + [out],
                         stdin=subprocess.PIPE)
    for i in range(F):
        t = i / max(F - 1, 1)
        e = t * t * (3 - 2 * t)              # smoothstep: no jerk at start/end
        zoom = (1 + z) - z * e if pull else 1 + z * e
        cw, ch = W * base / zoom, H * base / zoom
        cx = (cw / 2 + (iw - cw) * e) if pan else iw / 2
        cy = ih / 2
        box = (cx - cw / 2, cy - ch / 2, cx + cw / 2, cy + ch / 2)
        p.stdin.write(im.transform((W, H), Image.EXTENT, box, rs).tobytes())
    p.stdin.close()
    if p.wait() != 0:
        sys.exit('ffmpeg failed while writing ' + out)


# ---------------------------------------------------------------- Arabic captions (no raqm needed)
RIGHT_ONLY = set('اأإآٱدذرزوؤةىژ')
NAMES = {}


def _form(ch, form):
    key = (ch, form)
    if key not in NAMES:
        try:
            NAMES[key] = unicodedata.lookup(unicodedata.name(ch) + ' ' + form + ' FORM')
        except (KeyError, ValueError):
            NAMES[key] = None
    return NAMES[key]


def is_ar(ch):
    return '\u0621' <= ch <= '\u064A' or ch in 'ٱپچژگکی'


def joins_left(ch):  # can connect to the following letter
    return is_ar(ch) and ch not in RIGHT_ONLY and ch != 'ء'


LAM_ALEF = {'ا': 'ALEF', 'أ': 'ALEF WITH HAMZA ABOVE', 'إ': 'ALEF WITH HAMZA BELOW', 'آ': 'ALEF WITH MADDA ABOVE'}


def shape(word):
    """Arabic word -> presentation forms in visual (left-to-right) order."""
    s = HARAKAT.sub('', word)
    if not any(is_ar(c) for c in s):
        return s
    out, i = [], 0
    while i < len(s):
        c = s[i]
        prev = s[i - 1] if i else ''
        conn_prev = bool(prev) and joins_left(prev) and is_ar(c)
        if c == 'ل' and i + 1 < len(s) and s[i + 1] in LAM_ALEF:
            name = 'ARABIC LIGATURE LAM WITH ' + LAM_ALEF[s[i + 1]] + (' FINAL FORM' if conn_prev else ' ISOLATED FORM')
            try:
                out.append(unicodedata.lookup(name)); i += 2; continue
            except KeyError:
                pass
        if not is_ar(c):
            out.append(c); i += 1; continue
        nxt = s[i + 1] if i + 1 < len(s) else ''
        conn_next = joins_left(c) and bool(nxt) and is_ar(nxt)
        form = 'MEDIAL' if conn_prev and conn_next else 'FINAL' if conn_prev else 'INITIAL' if conn_next else 'ISOLATED'
        # isolated = the plain letter (many fonts have no glyph for the isolated presentation form)
        out.append(c if form == 'ISOLATED' else (_form(c, form) or c))
        i += 1
    # visual order: reverse Arabic, keep digit/latin runs readable
    runs = re.findall(r'[0-9A-Za-z.,%$]+|[^0-9A-Za-z.,%$]+', ''.join(out))
    return ''.join(r if re.match(r'[0-9A-Za-z]', r) else r[::-1] for r in reversed(runs))


def caption_groups(words, maxw=3):
    G, cur = [], []
    for i, w in enumerate(words):
        cur.append(i)
        if len(cur) >= maxw or w['w'].rstrip()[-1:] in '.،,؟?!…؛:':
            G.append(cur); cur = []
    if cur:
        G.append(cur)
    return G


def render_captions(p, words, W, H, vertical):
    from PIL import Image, ImageDraw, ImageFont
    try:
        from PIL import features
        raqm = features.check('raqm')
    except Exception:
        raqm = False
    size = int(W * (0.085 if vertical else 0.05))
    font = ImageFont.truetype(FONT, size)
    bh = int(size * 2.2)
    d = os.path.join(p, '_work', 'cap'); os.makedirs(d, exist_ok=True)
    blank = os.path.join(d, 'blank.png')
    Image.new('RGBA', (W, bh), (0, 0, 0, 0)).save(blank)
    entries, t = [], 0.0
    for g in caption_groups(words):
        texts = [norm(words[i]['w']) for i in g]
        for k, i in enumerate(g):
            s = words[i]['s']; e = words[g[k + 1]]['s'] if k + 1 < len(g) else words[i]['e'] + 0.25
            img = Image.new('RGBA', (W, bh), (0, 0, 0, 0)); dr = ImageDraw.Draw(img)
            gap = int(size * 0.35)
            if raqm:
                pieces = [(tx, dict(direction='rtl', language='ar')) for tx in texts]
            else:
                pieces = [(shape(tx), {}) for tx in texts]
            widths = [dr.textlength(tx, font=font, **kw) for tx, kw in pieces]
            total = sum(widths) + gap * (len(pieces) - 1)
            x = (W + total) / 2  # right edge; Arabic reads right -> left
            for j, ((tx, kw), wd) in enumerate(zip(pieces, widths)):
                x -= wd
                col = (255, 214, 0, 255) if j == k else (255, 255, 255, 255)
                dr.text((x, bh / 2), tx, font=font, fill=col, anchor='lm', stroke_width=max(4, size // 12),
                        stroke_fill=(0, 0, 0, 255), **kw)
                x -= gap
            f = os.path.join(d, f'{i:04d}.png'); img.save(f)
            entries.append((s, e, f))
    # absolute timeline (no drift): each image runs until the next one starts, gaps are blank
    entries.sort()
    lst = os.path.join(d, 'caps.txt')
    t = 0.0
    with open(lst, 'w', encoding='utf-8') as fh:
        for k, (s, e, f) in enumerate(entries):
            nxt = entries[k + 1][0] if k + 1 < len(entries) else e
            e = min(e, nxt)
            if s - t > 0.01:
                fh.write(f"file '{os.path.abspath(blank)}'\nduration {s - t:.3f}\n"); t = s
            if e - t > 0.01:
                fh.write(f"file '{os.path.abspath(f)}'\nduration {e - t:.3f}\n"); t = e
        fh.write(f"file '{os.path.abspath(blank)}'\nduration 1.000\nfile '{os.path.abspath(blank)}'\n")
    return lst, bh


# ---------------------------------------------------------------- main
def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('project')
    ap.add_argument('--size', default='1080x1920')
    ap.add_argument('--gpu', action='store_true', help='NVIDIA h264_nvenc')
    ap.add_argument('--no-snap', action='store_true')
    ap.add_argument('--no-captions', action='store_true')
    ap.add_argument('--lufs', type=float, default=-15.0)
    a = ap.parse_args()
    p = a.project
    W, H = map(int, a.size.lower().split('x'))
    vertical = H > W
    voice = next((os.path.join(p, f) for f in ('voice.wav', 'voice.mp3', 'voice.m4a') if os.path.exists(os.path.join(p, f))), None)
    if not voice:
        sys.exit('voice.wav / voice.mp3 missing')
    enc = ['-c:v', 'h264_nvenc', '-preset', 'p5', '-cq', '20'] if a.gpu else ['-c:v', 'libx264', '-preset', 'veryfast', '-crf', '20']
    wk = os.path.join(p, '_work'); seg = os.path.join(wk, 'seg'); os.makedirs(seg, exist_ok=True)
    qa = os.path.join(p, 'qa'); os.makedirs(qa, exist_ok=True)
    rep = []

    words = load_words(p)
    if not a.no_snap:
        sh = snap(words, voice)
        if sh:
            rep.append(f'snap: {len(sh)} sentences moved, mean |shift| {sum(abs(x) for x in sh) / len(sh):.2f}s, max {max(abs(x) for x in sh):.2f}s')
    beats = load_beats(p, words)

    print(f'{len(beats)} beats, {len(words)} words'); sys.stdout.flush()
    parts = []
    for b in beats:
        out = os.path.join(seg, f'{b["n"]:02d}.mp4')
        tmp = out + '.tmp.mp4'
        segment(p, b, W, H, enc, tmp); os.replace(tmp, out)
        parts.append(out); print('  beat', b['n'], f'{b["e"] - b["s"]:.2f}s', b['type']); sys.stdout.flush()
    lst = os.path.join(wk, 'concat.txt')
    with open(lst, 'w', encoding='utf-8') as fh:
        fh.writelines(f"file '{os.path.abspath(x)}'\n" for x in parts)
    base = os.path.join(wk, 'base.mp4')
    run(['ffmpeg', '-y', '-f', 'concat', '-safe', '0', '-i', lst, '-c', 'copy', base])

    # audio: static gain to target LUFS + soft limiter (no loudnorm pumping), optional sfx
    m = re.search(r'I:\s+(-?[\d.]+) LUFS', run(['ffmpeg', '-hide_banner', '-i', voice, '-af', 'ebur128', '-f', 'null', '-'])[-3000:])
    gain = a.lufs - float(m.group(1)) if m else 0
    ins, fl, mix = ['-i', voice], [f'[0:a]volume={gain:.2f}dB[v]'], ['[v]']
    for b in beats:
        s = find(p, 'sfx', b['n'], ['.wav', '.mp3', '.ogg'])
        if s:
            k = len(ins) // 2
            ins += ['-i', s]; ms = int(max(b['s'], 0) * 1000)
            fl.append(f'[{k}:a]adelay={ms}|{ms},volume=-12dB[s{k}]'); mix.append(f'[s{k}]')
    fl.append(''.join(mix) + f'amix=inputs={len(mix)}:normalize=0:duration=first,alimiter=limit=0.84:attack=5:release=50[a]')
    audio = os.path.join(wk, 'audio.wav')
    run(['ffmpeg', '-y'] + ins + ['-filter_complex', ';'.join(fl), '-map', '[a]', '-ar', '48000', audio])

    out = os.path.join(p, 'final.mp4')
    vdur = beats[-1]['e']
    if a.no_captions:
        run(['ffmpeg', '-y', '-i', base, '-i', audio, '-map', '0:v', '-map', '1:a', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k',
             '-af', 'apad', '-t', f'{vdur:.3f}', out])
    else:
        caps, bh = render_captions(p, words, W, H, vertical)
        y = int(H * 0.62) if vertical else int(H * 0.80)
        fc = f'[1:v]format=rgba,fps={FPS}[c];[0:v][c]overlay=0:{y}:eof_action=pass:format=auto,format=yuv420p[v]'
        run(['ffmpeg', '-y', '-i', base, '-f', 'concat', '-safe', '0', '-i', caps, '-i', audio, '-filter_complex', fc,
             '-map', '[v]', '-map', '2:a'] + enc + ['-c:a', 'aac', '-b:a', '192k', '-af', 'apad', '-t', f'{vdur:.3f}',
             '-movflags', '+faststart', out])

    # QA
    fd, ad = duration(out), duration(voice)
    rep.append(f'video {fd:.2f}s, voice {ad:.2f}s, last word ends {words[-1]["e"]:.2f}s -> ' + ('OK' if fd >= words[-1]['e'] + 0.3 else 'TOO SHORT'))
    m = re.search(r'I:\s+(-?[\d.]+) LUFS', run(['ffmpeg', '-hide_banner', '-i', out, '-af', 'ebur128', '-f', 'null', '-'])[-3000:])
    rep.append(f'loudness {m.group(1) if m else "?"} LUFS (target {a.lufs})')
    for k, i in enumerate(sorted(set([0, len(words) // 3, 2 * len(words) // 3, len(words) - 1]))):
        tt = (words[i]['s'] + words[i]['e']) / 2
        run(['ffmpeg', '-y', '-ss', f'{tt:.2f}', '-i', out, '-frames:v', '1', '-vf', f'scale={W // 3}:-2', os.path.join(qa, f'still_{k}_{tt:.1f}s.jpg')])
    rep.append('check qa/still_*.jpg: Arabic letters joined, right-to-left, highlighted word = spoken word')
    open(os.path.join(qa, 'report.txt'), 'w', encoding='utf-8').write('\n'.join(rep) + '\n')
    print('\n'.join(rep)); print('->', out)


if __name__ == '__main__':
    main()
