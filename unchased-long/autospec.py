"""Heuristic scene spec for videos without a hand-written spec_vNN.py."""
import re

NUM = {'one': '1', 'two': '2', 'three': '3', 'four': '4', 'five': '5', 'six': '6', 'seven': '7', 'eight': '8', 'nine': '9'}
ICON_KEYS = [
    ('brain', 'brain scan neuro mind region circuit nervous'), ('phone', 'text message phone app reply read online screen'),
    ('heart', 'love attract desire romantic heart'), ('door', 'leave door walk exit left gone'),
    ('chart2', 'percent number study data sample statistic maths'), ('stopwatch', 'time hour week month day years minute'),
    ('coins', 'pay price cost spend value money expensive worth'), ('eye', 'notice see watch look visible'),
    ('question', 'question uncertain unknown wonder why'), ('fire', 'anger angry craving hunger pain'),
    ('cloud', 'alone lonely isolat sad guilt fault'), ('book', 'honest truth story rule advice'),
    ('arrows', 'chase effort harder push run'), ('cage', 'trap stuck cage prison'), ('rope', 'hold pull grip'),
    ('puzzle', 'piece missing finish'), ('file', 'proof evidence list case'), ('thermo', 'cold calm warm temperature'),
]
FACES = [('face-sad', 'hurt pain sad lonely alone cry lost grief worn'), ('face-shocked', 'shock never wrong panic worst'),
         ('face-smirk', 'secret smart trick confident'), ('face-surprised', 'suddenly surprise strange later'),
         ('pointing', 'here is test question comments watch first second third ask'), ('walk-away', 'leave walk gone stopped away'),
         ('arms-crossed', 'boundar refuse no standard respect'), ('bench-phone', 'phone text app message')]
CYCLE = ['hero-stand', 'face-calm', 'arms-crossed', 'pointing', 'face-calm', 'hero-stand']


def headline(vo):
    sents = [s.strip().rstrip('.!?') for s in re.split(r'(?<=[.!?])\s+', vo) if s.strip()]
    cands = [s for s in sents if 2 <= len(s.split()) <= 6]
    if cands:
        h = min(cands, key=lambda s: abs(len(s.split()) - 4))
    else:
        h = re.split(r'[,;:]', sents[0])[0]
        h = ' '.join(h.split()[:6])
    w = h.upper().split()
    if len(w) == 1:
        return '{a}', w[0]
    k = 2 if len(w) >= 4 else 1
    return ' '.join(w[:-k]) + ' {a}', ' '.join(w[-k:])


def pick(text, table, default):
    t = text.lower()
    best, score = default, 0
    for name, keys in table:
        s = sum(1 for k in keys.split() if k in t)
        if s > score:
            best, score = name, s
    return best


def build(scenes):
    S, ci = {}, 0
    for x in scenes:
        n, f, vo = x['n'], x['f'], x['vo']
        if f == 'T':
            first = vo.split('.')[0].strip().lower()
            num = NUM.get(first, '')
            title = vo.split('.', 1)[1].strip().rstrip('.') if num else vo.rstrip('.')
            S[n] = (title.upper(), num, 'title', None)
            continue
        head, acc = headline(vo)
        m = re.match(r'In (\d{4}),\s*(.*)', vo)
        if f == 'P' and m:
            names = re.findall(r'\b([A-Z][a-z]+(?:\s(?:and|&)\s[A-Z][a-z]+)?)', m.group(2))
            names = [nm for nm in names if nm not in ('Here', 'The', 'They', 'A', 'In', 'People', 'Researchers')]
            who = ', '.join(names[:3]) or 'Research'
            S[n] = (head, acc, 'cite', (m.group(1), who.replace(' and ', ' & '), pick(vo, ICON_KEYS, 'notebook')))
        elif f == 'P':
            S[n] = (head, acc, 'icon', pick(vo, ICON_KEYS, 'question'))
        else:
            pose = pick(vo, FACES, None)
            if pose is None:
                pose = CYCLE[ci % len(CYCLE)]; ci += 1
            S[n] = (head, acc, 'pose', pose)
    return S
