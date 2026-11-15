---
name: stickman-studio
description: Plan and produce a complete stickman animated story video (YouTube long-form or Shorts) using only free AI tools, from a niche to a finished, captioned MP4. Covers ideas, script in any dialect/language, voice, beat sheet timed to the real voice, character sheet, image prompts, animation prompts, thumbnails, and an AI edit that replaces CapCut (a ready ffmpeg script that runs inside Claude). Use when the user wants a stickman / stick figure story video, a "faceless" animated channel episode, or says "stickman", "ستيك مان", "قصة أنيميشن مجانية".
---

# Stickman Studio v3 — free AI story pipeline

You run a small studio that turns one idea into a finished stickman video with free tools.
Talk to the user in their language. Everything that goes INTO an image/video model is English.

## Save messages (free plans run out fast)
A free Claude plan allows only a handful of messages per window (tested: the limit hit after ~8 messages, around State 5). So:
- **Compact by default:** merge States 4 + 5 + 6 + 7 into ONE reply (beat sheet, character/style locks, sheet prompt, all scene prompts, animation prompts). Step-by-step only if the user asks.
- Put long outputs in **files** (`beats.csv`, `prompts.md`) instead of long chat text; keep the chat reply short.
- Don't search the web unless the story has factual claims; don't re-print earlier outputs.
- Say once, early: "if the limit hits, nothing is lost — come back after it resets (or upload the files to a new chat) and say «continue from State N»".
- **«auto»** = run every state back to back, picking the best option yourself; stop only before images.

## State 0 — Setup (ask once, all in one message)
1. **Niche** — or offer 6: history mysteries · science "what if" · money lessons · psychology tricks · tech stories · moral fables. Or "suggest from my channel".
2. **Language/voice dialect** — MSA · Saudi/Gulf · Egyptian · Levantine · English · other. Never assume.
3. **Format** — Long 16:9 (3–10 min) or Short 9:16 (40–90 s).
4. **Music** — none (SFX + ambience only) or allowed. Default: none.
5. **Video credits today** — how many free video credits they have (Google Flow free = 50/day ≈ 5 Veo Lite clips). Default 5 clips.
6. **Mode** — compact (default) · step-by-step · auto.
7. **Character look** — show the 3 looks as numbered options (one line each) and let them pick:
   - **1 Classic** — thin black stick lines, round white head, dot eyes, ONE color prop (default: red scarf). The viral doodle look.
   - **2 Dressed** — same round head and face, but a full cartoon body in clothes (default: grey hoodie, dark jeans, white sneakers) + the same color prop.
   - **3 Silhouette** — the famous solid black stickman: filled black head and body, thick rounded strokes, only two white oval eyes + the same color prop.
   Default: 1. Tell them they can switch look later without redoing the story (State 5 → "Switch look").

## State 1 — Ideas
Give **12 ideas**, each one line: title · the hook (first sentence the viewer hears) · why it holds attention. No two share a structure; at least 3 based on real events; mark ⚠ the ones that need fact-checking.
Then: pick a number, mix two, "more like #N", or "you choose" (then pick one and say why in one line).

## State 2 — Script
- **Length from the real TTS pace, first time right.** words = seconds × rate / 60. Measured rates (words/min): **Arabic MSA calm narration (AI Studio Charon, ElevenLabs) ≈ 95–105** · Arabic dialect conversational 115–130 · English 145–160. A 50–60 s Arabic short ≈ 85–95 words — not 140. Print the word count and the estimated seconds under the script.
- Structure: **Hook (0–3 s, the most shocking moment first)** → setup → 2–3 escalations ending on open questions → twist → payoff → one-line takeaway → soft CTA.
- Write for the ear: short sentences, one idea each, numbers spelled as spoken, no stage directions in the voice text.
- **Real events/science:** a «Sources» list with reliable links for every factual claim; mark uncertain; never invent quotes.
- Output: script in one copy block + word count + a pronunciation list (risky words with full tashkeel / TTS-friendly spelling).

## State 3 — Voice + word timings (free)
**Voice**, one full take, no speed-up:
- **Google AI Studio → Generate speech** (free): one speaker, paste the script, put a short English *style* prompt in the Style box (write it for them: tone, pace, pauses, "do not add words, no background sound"). Try 2 voices (e.g. Charon) and keep the better.
- Or **ElevenLabs** (free monthly credits), or their own recording.

**Word timings** — give the user this exact prompt for **AI Studio (Chat)**, with the audio uploaded:
```
Align this Arabic audio to the exact script below. Output an SRT file with ONE word per subtitle entry and precise start/end timestamps (HH:MM:SS,mmm) taken from the audio. Use the script's words exactly as written, in order, with no changes. Output only the SRT inside one code block.

SCRIPT:
<paste script>
```
(Change "Arabic" to the script's language.) They save it as `voice.srt`. Tell them honestly: AI timings drift ~0.4 s; the edit script snaps every sentence onto the real pauses in the audio (tested: error halved), good enough for word captions. If WhisperX/whisper is available locally, prefer it (`words.json`).
From here on, **all timing comes from the real audio**.

## State 4 — Beat sheet → `beats.csv`
One beat = one visual idea, **3–5 s (Shorts 2–3 s)**; never cut a word or sentence in half.
Write `beats.csv` (UTF-8) with exactly these columns:
`beat,start,end,dur,type,voice_text,camera,sfx`
- `voice_text` = the exact words of that beat, in order — **all beats together must contain every word of the script exactly once** (the edit re-times beats from the words).
- `type` = `still` or `animate`. **Animate at most the number of clips the user can afford today** (State 0 #5, default 5) — the strongest action peaks. Everything else is a still with a camera move.
- `camera` words the edit understands: `wide`, `medium`, `close`, `push-in`, `pull-out`, `pan`.

## State 5 — Character & world sheet
1 main + up to 3 side characters, each a **CHAR LOCK** ≤40 words (head, line weight, ONE identifying color/prop). Recurring props get a lock too (e.g. EARTH LOCK).
One **STYLE LOCK** ≤50 words, from the look chosen in State 0 #7 (the background part stays the same for all three):
- **1 Classic:** hand-drawn doodle stickman, perfectly round white head, thin black ink stick limbs, simple dot eyes and line mouth, off-white paper background, flat minimal colors, soft shadow under feet, no text, no logos, no watermark.
- **2 Dressed:** hand-drawn doodle character with a perfectly round white head, dot eyes and line mouth, full slim cartoon body wearing clothes, loose black ink outlines, off-white paper background, flat minimal colors, soft shadow under feet, no text, no logos, no watermark.
- **3 Silhouette:** hand-drawn classic solid black stickman, filled black round head and body, thick smooth rounded strokes, only two white oval eyes, off-white paper background, flat minimal colors, soft shadow under feet, no text, no logos, no watermark.
The CHAR LOCK names the clothes (look 2) and the ONE color prop (all looks) so it never changes between scenes.

Then one **character sheet prompt** (all characters + props side by side, front / 3/4 / side, plain light background). The user generates it first, picks the best, and **attaches it as the reference image for every scene** — this is what keeps the face identical.

**Switch look (any time, no new story):** write a new sheet prompt in the new look, attaching the old sheet ("same character, same color prop, change only the body style to …"). Then re-make each scene image as an EDIT of the old image, attaching the scene first and the new sheet second:
```
Edit the first image. Replace only the character with the character from the second image (the character sheet). Keep everything else exactly the same: the same pose, body angle, gesture, head direction, position, size and framing, the same background, objects, colors and paper texture. Keep the color prop in the same shape and direction. Same framing, nothing cropped, no text.
```
Because pose and framing stay identical, the same edit can cut between looks on the exact same frame (great for a "3 looks" short or an A/B test).

## State 6 — Scene image prompts
Per beat: `[STYLE LOCK] + [CHAR LOCK of who is present] + scene: <setting, ONE action, emotion, framing>, vertical 9:16 | 16:9`. Main subject large and centered, **no text in images**.
Output in `prompts.md`:
1. **One batch prompt for Google Flow's agent** (fastest — paste once with the sheet attached):
   `Use the attached character sheet as the reference for every image. Make N separate images, one per numbered scene, aspect 9:16, same character and style in all. Scenes: 1) … 2) … N) …`
2. The same prompts one by one, numbered = beat number (for re-doing a single image).
Tell them: download all images, name them `img/01.png … img/NN.png` (or zip them — the edit maps by number/order).

## State 7 — Animation prompts (only `animate` beats)
Per beat: `start frame = img/NN` + one action, camera move, "keep style and character exactly as the start frame, no new characters, no text, no cut". Ask for 4–8 s; the edit trims to the beat.
Use the cheapest video model (Flow: Veo Lite ≈ 10 credits per clip). Stills cost little; video eats the credits. Clips are saved as `clips/NN.mp4` (NN = beat). If credits run out: keep that beat a still (the camera move hides it) or finish the next day.

## State 8 — Thumbnails
3 concepts: scene (character with an exaggerated emotion + one bold object) + **text to add later** (2–4 words). No text inside image prompts.

## State 9 — AI edit (replaces CapCut)
**A. Ready script (default — works inside claude.ai with "Create and edit files" on, and in Claude Code):**
1. Ask the user to upload: voice file, `voice.srt` (or `words.json`), the images (zip is fine), the clips.
2. Put everything in one project folder: `voice.wav|mp3`, `voice.srt`, `beats.csv`, `img/NN.png|jpg`, `clips/NN.mp4` (rename downloads to beat numbers — match each clip to its beat by its prompt/filename), optional `sfx/NN.wav`.
3. Run: `python scripts/auto_edit.py <project> --size 1080x1920` (16:9: `--size 1920x1080`; add `--gpu` on an NVIDIA machine).
   It does: snaps timings to the real pauses, re-times beats, smooth Ken-Burns camera on stills (sub-pixel, eased — no zoom stutter), clips trimmed/frozen to the beat, **Arabic word-by-word captions that render correctly without any extra library** (letters joined, right-to-left, current word yellow, no stray punctuation), static-gain audio + limiter (≈ −15 LUFS), last word protected, QA stills.
4. Open `qa/still_*.jpg` and `qa/report.txt` yourself; fix and re-run only if something is wrong. Then give the user `final.mp4`.
Don't rewrite the edit from scratch — the script already solves RTL text, timing drift and loudness (doing it by hand took ~18 min in testing).
Details and options: `references/auto_edit.md`.

**B. Browser-only editor** — Clipchamp (free 1080p, auto-captions) or Flow's scene builder: give an import order + durations table from `beats.csv`.

Always finish with QA: last word audible, captions match the voice, no garbled text in images, same character in every beat, no black frames.

## State 10 — Package
Title (3 options), description with chapters (long) or hashtags, tags, pinned comment, and for a 16:9 video the best 45–60 s for a short.

## Honest free-tier rules
- Free tiers change often: tell the user to check current limits; never promise "unlimited".
- Tested limits (Nov 2026): free Claude ≈ 8 messages per window · Google Flow 50 credits/day ≈ 5 Veo Lite clips · AI Studio TTS free. With one free account a full short takes ~2 sittings.
- **Never** suggest creating extra accounts/emails to farm free credits.
- Respect content policies; no real public figures' faces in defamatory scenes.
