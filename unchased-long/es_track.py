"""Usage: python3 es_track.py v01 -> renders/<vid>_ES.wav, a Spanish voice track aligned to the English video's scenes.

Each Spanish line starts where its English scene's narration starts; a line longer than its slot is sped up (max 1.35x).
"""
import json, os, subprocess, sys, importlib
import numpy as np, soundfile as sf

VID = sys.argv[1]
B = os.path.dirname(os.path.abspath(__file__)); P = os.path.join(B, VID)
S = importlib.import_module('spec_' + VID).S
kit = json.load(open(os.path.join(B, '..', 'channel-kit', VID + '.json')))
lines = json.load(open(os.path.join(B, 'es', VID + '.json')))
assert len(lines) == len(kit['scenes']), (len(lines), len(kit['scenes']))
od = os.path.join(P, 'assets', 'vo_es'); os.makedirs(od, exist_ok=True)

# same clock as gen.py
t = 0.3; slots = []
for x in kit['scenes']:
    a = sf.info(os.path.join(P, f"assets/vo/s{x['n']:02d}.wav")).duration
    title = S[x['n']][2] == 'title'
    pre, post = (0.35, 0.75) if title else (0.12, 0.38)
    vs = t + pre; dur = pre + a + post
    slots.append((vs, t + dur - 0.08)); t += dur
total = t + 3.0
sr = 24000; out = np.zeros(int(total * sr) + sr)
for x, line, (vs, ve) in zip(kit['scenes'], lines, slots):
    p = os.path.join(od, f"s{x['n']:02d}.wav")
    if not os.path.exists(p):
        subprocess.run(['npx', 'hyperframes', 'tts', line, '-v', 'em_alex', '-l', 'es', '-o', p, '--json'], capture_output=True, check=True)
    a, sr = sf.read(p)
    room = ve - vs; d = len(a) / sr
    if d > room:
        f = min(d / room, 1.35)
        q = p.replace('.wav', '_fit.wav')
        subprocess.run(['ffmpeg', '-y', '-v', 'error', '-i', p, '-filter:a', f'atempo={f:.4f}', q], check=True)
        a, sr = sf.read(q)
    i = int(vs * sr); out[i:i + len(a)] += a[:len(out) - i]
out = out[:int(total * sr)]; out = out / np.abs(out).max() * 0.89
os.makedirs(os.path.join(B, 'renders'), exist_ok=True)
dst = os.path.join(B, 'renders', f'{VID}_ES.wav'); sf.write(dst, out, sr)
mp3 = os.path.join(B, 'renders', f'Unchased_{VID.upper()}_Spanish_dub.mp3')
subprocess.run(['ffmpeg', '-y', '-v', 'error', '-i', dst, '-af', 'loudnorm=I=-16:TP=-1.5', '-b:a', '192k', mp3], check=True); os.remove(dst)
print('wrote', mp3, round(total, 2), 's')
