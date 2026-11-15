# Auto edit — `scripts/auto_edit.py`

Runs anywhere with Python 3.8+, Pillow and ffmpeg (claude.ai code execution has all three; no internet needed). Tested on a real 56 s Arabic short: 23 beats, 7 clips, ~35 s on a laptop CPU.

## Project folder
```
voice.wav | voice.mp3      the full take, uncut
voice.srt | words.json     ONE word per SRT cue, or [{"w":"…","s":0.12,"e":0.48}, …]
beats.csv                  beat,start,end,dur,type,voice_text,camera,sfx
img/NN.png|jpg             one image per beat (01, 02, …)
clips/NN.mp4               optional, for `animate` beats
sfx/NN.wav|mp3             optional, placed at the start of beat NN (−12 dB)
```

## Run
```
python scripts/auto_edit.py <project> --size 1080x1920        # vertical short
python scripts/auto_edit.py <project> --size 1920x1080 --gpu  # long 16:9 on NVIDIA
```
Options: `--no-snap` (timings already exact, e.g. WhisperX) · `--no-captions` · `--lufs -14`.
Output: `<project>/final.mp4`, `<project>/qa/report.txt`, `<project>/qa/still_*.jpg`. Work files in `<project>/_work/`.

## What it does (and why)
1. **Timing snap** — AI-made SRTs drift (~0.4 s average, up to 1 s). Speech after a pause starts exactly where a silence ends (`silencedetect`), so each sentence is shifted onto the nearest silence end within ±0.7 s. Tested vs WhisperX: mean error 0.41 → 0.22 s.
2. **Beats re-timed from words** — beat N starts 0.12 s before its first word; ends where the next starts; the last beat ends 0.8 s after the last word. `voice_text` must cover every script word exactly once.
3. **Segments** — stills: smooth Ken-Burns drawn frame by frame with Pillow (sub-pixel crop + ease-in-out; push-in default, `pull-out`, `pan` understood). Not ffmpeg `zoompan`: it rounds to whole pixels, so slow zooms stutter (measured jerk 0.57 px/frame vs 0.02). Clips: cover-crop, trimmed to the beat, last frame frozen if short, clip audio dropped. All same size/fps → concat with `-c copy`.
4. **Arabic captions without raqm/HarfBuzz** — libass and plain Pillow print Arabic as separate reversed letters. The script shapes words itself (Unicode presentation forms, lam-alef ligatures, isolated letters kept as base letters because many fonts lack those glyphs), orders words right-to-left, strips tashkeel and punctuation (fixes «؟فجأة»), highlights the spoken word in yellow with a black stroke. If Pillow has raqm it uses that instead. Font: bundled `assets/Cairo-ExtraBold.ttf` (SIL OFL). Captions are a PNG sequence on an absolute timeline (no drift) overlaid at 62 % height (9:16) / 80 % (16:9).
5. **Audio** — measures the voice, applies one static gain to the target (−15 LUFS), mixes optional SFX, soft limiter at −1.5 dB. No loudnorm/sidechain (they pump and can clip the last word). The video is cut to the last beat, which already ends 0.8 s after the last word.
6. **QA** — report with durations, last-word check and loudness; 4 stills at caption moments. Look at them: letters joined, right order, highlighted word = spoken word.

## If something breaks
- `missing image for beat N` → name images by beat number (`img/07.png`).
- Captions late/early everywhere → the SRT is offset; run once with `--no-snap` and compare, or use WhisperX `words.json`.
- Wrong beat lengths → a `voice_text` cell is missing or repeating words; fix `beats.csv`.
- No Arabic font on the machine is fine — the font ships with the skill.
