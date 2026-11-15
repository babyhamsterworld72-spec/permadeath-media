"""Builds Unchased_12_Videos_Publish_Kit.html: the channel kit updated with the 12 finished videos
(real chapters, real SRT, file names, Spanish dub script + Spanish title/description/SRT).

Run: python3 build_final_kit.py   (from anywhere)
"""
import json, os, re, glob, subprocess, importlib, sys
import soundfile as sf

HERE = os.path.dirname(os.path.abspath(__file__))
LONG = os.path.join(HERE, '..', 'unchased-long')
sys.path.insert(0, LONG)
src = open(os.path.join(HERE, 'Unchased_Channel_Kit.html'), encoding='utf-8').read()
m = re.search(r'(<script type="application/json" id="data">)(.*?)(</script>)', src, re.S)
D = json.loads(m.group(2))

ES_TITLE = {
 '01': 'Psicología de los hombres que la dejan ir (y nunca miran atrás)',
 '02': 'Por qué ella te nota en el momento en que dejas de perseguirla',
 '03': 'Por qué cada vez más hombres eligen en silencio quedarse solteros',
 '04': 'La psicología de los hombres que nunca ruegan por amor',
 '05': 'Cuando alguien ya no te quiere en su vida, muestra estas 7 señales',
 '06': '6 señales de que eres más atractivo de lo que crees (hombres)',
 '07': '5 comportamientos silenciosos que hacen que se arrepientan de haberte herido',
 '08': 'Por qué las mujeres actúan raro contigo (pero nunca se acercan)',
 '09': '7 rasgos de un hombre poco común (que la mayoría nunca construye)',
 '10': 'Cuando alguien te hace daño y actúa como si nada, recuerda estas 5 cosas',
 '11': '8 pequeños hábitos que te están costando respeto en silencio',
 '12': '7 señales de que alguien está poniendo a prueba qué tan débil eres',
}
ES_INTRO = {
 '01': 'No bloqueó su número. No discutió. No mandó el mensaje largo. Un día simplemente se detuvo. Este video explica lo que pasa de verdad dentro de un hombre que suelta en silencio, y por qué los que se van de la forma más limpia suelen ser los que más quisieron.',
 '02': 'Le escribiste durante semanas. Lo intentaste todo. Nada. Y el día que por fin paraste, ella te escribió primero. No es una broma cruel: es psicología documentada, y la última pieza es una trampa en la que casi todos caen.',
 '03': 'Nadie lo anunció. Millones de hombres simplemente pararon: borraron las aplicaciones, dejaron de invitar y llenaron el espacio con trabajo, gimnasio y silencio. Cinco razones reales, y una frase honesta que casi nadie dice.',
 '04': 'Ella dijo que necesitaba espacio. Él dijo vale. Una sola palabra. Seis cosas pasan dentro de un hombre que nunca ruega, y la quinta explica por qué ningún consejo habitual funciona.',
 '05': 'Casi nadie anuncia el final. En su lugar hay siete pequeños cambios, y cada uno es fácil de justificar por separado. Cuéntalos con honestidad, y fíjate en la número seis.',
 '06': 'En un estudio de Cornell y Harvard, todos gustaban más de lo que creían. Seis señales de que te está pasando a ti, y la sexta casi no tiene nada que ver con tu cara.',
 '07': 'Vengarse no funciona: quien se venga se siente peor. Cinco comportamientos silenciosos que sí funcionan cuando alguien te hizo daño, y una trampa en la que casi todos caen creyéndose por encima de ella.',
 '08': 'En mil novecientos ochenta y cinco, una investigadora catalogó cincuenta y dos señales con las que las mujeres muestran interés sin decir una palabra. Por qué casi nunca se acercan, y lo único que un hombre puede hacer.',
 '09': 'Sesenta y siete por ciento de los hombres se dio una descarga eléctrica antes que quedarse quieto quince minutos a solas. Siete rasgos de un hombre poco común, y el séptimo no se puede fingir más de un mes.',
 '10': 'Hicieron algo que cambió cómo los ves, y ellos actúan como si nada. La psicología detrás de esa brecha, y cinco cosas que recordar, la quinta es la única que de verdad lo termina.',
 '11': 'Nadie pierde el respeto en un solo momento. Se va escapando por ocho pequeños hábitos que se sienten educados e inofensivos. Vas a reconocer al menos tres, y el octavo está debajo de todos los demás.',
 '12': 'Los que se aprovechan de otros no eligen al azar: primero leen, y cuando la lectura no está clara, te ponen a prueba. Siete pruebas y qué hacer con cada una, con calma y sin convertirte en alguien paranoico.',
}
ES_CH = {k: v for k, v in {
 'Intro': 'Introducción', 'Absent': 'Los ausentes', 'Alone': 'A solas', 'Asking Twice': 'Piden dos veces', 'Attachment': 'Apego',
 'Available': 'Siempre disponible', 'Awkward': 'La incomodidad', 'Close': 'Cierre', 'Closure': 'El cierre', 'Cold Or Quiet': 'Frío o callado',
 'Contempt': 'Desprecio', 'Control': 'Autocontrol', 'Desire': 'Deseo', 'Dissonance': 'Disonancia', 'Explaining': 'Explicar',
 'Favors': 'Favores', 'Filling': 'Llenar silencios', 'Five': 'Cinco', 'Forgetting': 'Olvidos', 'Grieved First': 'Primero el duelo',
 'Habituation': 'Habituación', 'Helplessness': 'Indefensión', 'Instead': 'En cambio', 'Investment': 'Inversión', 'Jokes': 'Los chistes',
 'Look Away': 'La mirada', 'Mimicry': 'Imitación', 'Misreading': 'Malas lecturas', 'Moore': 'El estudio de Moore', 'Nerves': 'Nervios',
 'No Fighting': 'Sin peleas', 'No Villain': 'Sin villano', 'Peace': 'Paz', 'Preempting': 'Disculparse antes', 'Promises': 'Promesas',
 'Rejection': 'Rechazo', 'Reverse': 'Marcha atrás', 'Running Away': 'Huir', 'Same Room': 'La misma persona', 'Seven': 'Siete',
 'Small Favor': 'El pequeño favor', 'Sorry': 'Perdón', 'Sunk Cost': 'Costo hundido', 'Talking Over': 'Hablar encima',
 'The Bids': 'Las llamadas de atención', 'The Brain': 'El cerebro', 'The Cost': 'El costo', 'The Fifth': 'La quinta', 'The Flame': 'La llama',
 'The Gap': 'La brecha', 'The Jar': 'El tarro', 'The Joke': 'El chiste', 'The Line': 'La frase honesta', 'The Numbers': 'Los números',
 'The Other Side': 'El otro lado', 'The Phone': 'El teléfono', 'The Price': 'El precio', 'The Replies': 'Las respuestas',
 'The Response': 'La respuesta', 'The Rule': 'La regla', 'The Seventh': 'La séptima', 'The Signals': 'Las señales', 'The Silence': 'El silencio',
 'The Sixth': 'La sexta', 'The Trap': 'La trampa', 'The Vote': 'La votación', 'The Word': 'La palabra', 'Two Events': 'Dos hechos',
 'Uncertainty': 'Incertidumbre', 'Unfinished': 'Sin terminar', 'Waiting': 'Esperar', 'Warm Cold': 'Cálida, luego fría',
 'What Changes': 'Lo que cambia', 'What To Do': 'Qué hacer', 'Why Not Approach': 'Por qué no se acerca', 'Wrong': 'Equivocado',
 'Your Credit': 'Tu mérito'}.items()}
ES_TAGS = '#Psicología #PsicologíaMasculina #Relaciones #RespetoPropio #ConductaHumana #Unchased'


def split_sentences(text):
    parts = re.split(r'(?<=[.!?])\s+', text.strip())
    out = []
    for p in parts:
        if len(p) > 95 and ',' in p:
            a = p.rfind(',', 0, len(p) // 2 + 25)
            out += [p[:a + 1], p[a + 2:]] if a > 0 else [p]
        else:
            out.append(p)
    return out


def ts(t):
    t = max(t, 0); h = int(t // 3600); m_ = int(t % 3600 // 60); s = int(t % 60); ms = int(round((t - int(t)) * 1000))
    if ms == 1000: s += 1; ms = 0
    return f'{h:02d}:{m_:02d}:{s:02d},{ms:03d}'


def srt(cues):
    return '\n'.join(f'{i}\n{ts(a)} --> {ts(b)}\n{t}\n' for i, (a, b, t) in enumerate(cues, 1))


def mmss(t): t = int(round(t)); return f'{t // 60}:{t % 60:02d}'


vids = sorted(glob.glob(os.path.join(LONG, 'renders', 'Unchased_V??_*.mp4')))
vfile = {os.path.basename(f)[10:12]: os.path.basename(f) for f in vids}

for v in D['v']:
    vid = 'v' + v['id']
    spec = importlib.import_module('spec_' + vid).S
    es = json.load(open(os.path.join(LONG, 'es', vid + '.json'), encoding='utf-8'))
    assert len(es) == len(v['scenes'])
    t = 0.3; en, sp = [], []
    for x, line in zip(v['scenes'], es):
        a = sf.info(os.path.join(LONG, vid, 'assets', 'vo', f"s{x['n']:02d}.wav")).duration
        title = spec[x['n']][2] == 'title'
        pre, post = (0.35, 0.75) if title else (0.12, 0.38)
        vs = t + pre; ve = vs + a; slot_end = t + pre + a + post - 0.08
        for lang, text, end, out in (('en', x['vo'], ve, en), ('es', line, slot_end, sp)):
            sents = split_sentences(text); tot = sum(len(s) for s in sents); c = vs
            for s_ in sents:
                d_ = (end - vs) * len(s_) / tot; out.append((round(c, 2), round(c + d_ - 0.04, 2), s_)); c += d_
        x['st'] = round(t, 2)
        t += pre + a + post
    real = json.load(open(os.devnull)) if False else None
    dur = float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', os.path.join(LONG, 'renders', vfile[v['id']])], capture_output=True, text=True).stdout)
    chapters = [l.strip() for l in open(os.path.join(LONG, vid + '_chapters.txt')) if l.strip()]
    v['dur'] = dur
    v['srt'] = srt(en)
    v['srt_es'] = srt(sp)
    v['es'] = es
    v['es_title'] = ES_TITLE[v['id']]
    ch_es = []
    for l in chapters:
        tm, name = l.split(' ', 1); ch_es.append(f'{tm} {ES_CH.get(name, name)}')
    v['es_desc'] = (f"{ES_TITLE[v['id']]}\n\n{ES_INTRO[v['id']]}\n\n📌 CAPÍTULOS:\n" + '\n'.join(ch_es) +
                    "\n\nEste video es para educación y reflexión personal. No es terapia ni consejería de pareja.\n\n"
                    f"🔔 Suscríbete a Unchased: psicología para hombres que dejaron de perseguir.\n\n{ES_TAGS}")
    v['files'] = {'video': vfile[v['id']], 'dub': f"Unchased_V{v['id']}_Spanish_dub.mp3"}
    new = re.sub(r'(⏱️ CHAPTERS:\n).*?(\n\n)', lambda mm: mm.group(1) + '\n'.join(chapters) + mm.group(2), v['desc'], count=1, flags=re.S)
    assert new != v['desc'] or chapters == []
    v['desc'] = new
    print(v['id'], mmss(dur), len(chapters), 'chapters', len(en), 'cues')

out = src[:m.start(2)] + json.dumps(D, ensure_ascii=False) + src[m.end(2):]


def rep(old, new, count=1):
    global out
    assert old in out, old[:60]
    out = out.replace(old, new, count)


rep('<title>Unchased Channel Kit</title>', '<title>Unchased: 12 فيديو جاهز للنشر</title>')
rep('<p>محتوى الشهر الأول: 12 فيديو، ثلاثة كل أسبوع</p>', '<p>12 فيديو طويل جاهز للنشر، كل فيديو مع التغليف الكامل ودبلجة إسبانية</p>')
rep("const SECS=[['pack','التغليف'],['voice','التعليق الصوتي'],['scenes','برومتات المشاهد'],['anim','التحريك'],['srt','الترجمة SRT']];",
    "const SECS=[['pack','التغليف'],['files','الملفات'],['voice','التعليق الصوتي'],['es','الدبلجة الإسبانية'],['srt','الترجمة SRT'],['scenes','برومتات المشاهد'],['anim','التحريك']];")
rep('<p class="note">الفصول محسوبة على سرعة تعليق تقديرية. راجعها بعد تسجيل الصوت.</p>',
    '<p class="note">الفصول محسوبة من توقيت الفيديو النهائي نفسه. انسخ الوصف كما هو، فالفصل الأول يبدأ من 0:00 وكل فصل أطول من 10 ثوانٍ كما يشترط YouTube.</p>')
rep("} else h+=`<p class=\"note\">توقيت تقديري، وكل سطر يطابق مشهدًا. عدّله على الصوت الفعلي بعد التسجيل.</p>${pre(v.srt)}`;",
    """} else if(S==='files'){
    h+=`<h3>ملفات جاهزة للرفع</h3><div class="cards"><article class="card"><header><b>الفيديو</b><span class="ov ltr">${esc(v.files.video)}</span></header><p class="ar">فيديو أفقي 1920×1080 بتعليق إنجليزي وترجمة على الشاشة ومستوى صوت مضبوط للمنصات. مدته ${mmss(v.dur)}.</p></article><article class="card"><header><b>الدبلجة الإسبانية</b><span class="ov ltr">${esc(v.files.dub)}</span></header><p class="ar">ملف MP3 بنفس طول الفيديو، يُرفع مسارًا صوتيًا إضافيًا: YouTube Studio ← اللغات ← إضافة لغة ← الإسبانية ← مسار صوتي.</p></article></div><p class="note">الملفات في مجلد unchased-long/renders داخل المستودع، وقد أُرسلت لك في المحادثة أيضًا.</p>`;
  } else if(S==='es'){
    h+=`<h3>العنوان بالإسبانية</h3>${pre(v.es_title)}<h3>الوصف بالإسبانية (للترجمة في YouTube)</h3>${pre(v.es_desc)}<p class="note">يُضاف من YouTube Studio ← اللغات ← إضافة لغة ← الإسبانية ← العنوان والوصف.</p><h3>نص الدبلجة (جملة لكل مشهد)</h3>${pre(v.es.join('\\n\\n'))}<h3>ترجمة SRT إسبانية</h3>${pre(v.srt_es)}`;
  } else h+=`<p class="note">توقيت مأخوذ من الفيديو النهائي نفسه، وكل سطر يطابق ما يظهر على الشاشة. جاهز للرفع ملف ترجمة SRT إنجليزي.</p>${pre(v.srt)}`;""")
open(os.path.join(HERE, 'Unchased_12_Videos_Publish_Kit.html'), 'w', encoding='utf-8').write(out)
print('wrote', len(out) // 1024, 'KB')
