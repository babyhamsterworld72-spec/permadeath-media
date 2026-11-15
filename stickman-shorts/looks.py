from PIL import Image, ImageDraw, ImageFont
import random
W,H=1920,1080; BG=(248,244,234); K=(23,20,15); RED=(205,52,40); WH=(255,255,255)
F='/home/user/permadeath-media/.claude/skills/stickman-studio/assets/Cairo-ExtraBold.ttf'
im=Image.new('RGB',(W,H),BG); d=ImageDraw.Draw(im); r=random.Random(3)
for _ in range(6000):
    x,y=r.randrange(W),r.randrange(H); c=r.randint(228,240); d.point((x,y),(c,c-3,c-12))
def cap(p,w): d.ellipse([p[0]-w/2,p[1]-w/2,p[0]+w/2,p[1]+w/2],fill=K)
def ln(a,b,w): d.line([a,b],fill=K,width=w); cap(a,w); cap(b,w)
def scarf(x,ny):
    d.polygon([(x-50,ny-6),(x+50,ny-6),(x+46,ny+28),(x-46,ny+28)],fill=RED,outline=K)
    d.polygon([(x+18,ny+22),(x+48,ny+22),(x+62,ny+125),(x+30,ny+122)],fill=RED,outline=K)
def figure(x,look):
    y=900; hr=72; hy=y-470
    d.ellipse([x-120,y-12,x+120,y+20],fill=(225,220,208))
    sh=(x,hy+hr+40); hip=(x,y-170)
    if look==1:
        ln((x,hy+hr),hip,12); ln(sh,(x-90,y-230),12); ln(sh,(x+90,y-230),12)
        ln(hip,(x-70,y),12); ln(hip,(x+70,y),12)
    elif look==2:
        # jeans
        d.polygon([(x-58,hip[1]-10),(x+58,hip[1]-10),(x+72,y-14),(x+18,y-14),(x,hip[1]+40),(x-18,y-14),(x-72,y-14)],fill=(52,64,92),outline=K,width=7)
        # sneakers
        for sx in (-1,1): d.rounded_rectangle([x+sx*45-38,y-24,x+sx*45+38,y+4],12,fill=WH,outline=K,width=6)
        # hoodie
        d.rounded_rectangle([x-78,hy+hr+8,x+78,hip[1]+10],38,fill=(150,150,152),outline=K,width=8)
        for sx in (-1,1): d.line([(x+sx*70,hy+hr+40),(x+sx*112,y-215)],fill=K,width=44); d.line([(x+sx*70,hy+hr+40),(x+sx*112,y-215)],fill=(150,150,152),width=32)
        d.rounded_rectangle([x-48,hip[1]-70,x+48,hip[1]-20],14,outline=K,width=6)
        for sx in (-1,1): d.ellipse([x+sx*112-17,y-232,x+sx*112+17,y-198],fill=WH,outline=K,width=6)
    else:
        ln((x,hy+hr),hip,30); ln(sh,(x-95,y-230),28); ln(sh,(x+95,y-230),28)
        ln(hip,(x-72,y),28); ln(hip,(x+72,y),28)
    if look==3: d.ellipse([x-hr,hy-hr,x+hr,hy+hr],fill=K)
    else: d.ellipse([x-hr,hy-hr,x+hr,hy+hr],fill=WH,outline=K,width=10)
    if look==3:
        for sx in (-1,1): d.ellipse([x+sx*24-11,hy-26,x+sx*24+11,hy+6],fill=WH)
    else:
        for sx in (-1,1): d.ellipse([x+sx*22-8,hy-18,x+sx*22+8,hy-2],fill=K)
        d.line([x-18,hy+28,x+18,hy+28],fill=K,width=7)
    scarf(x,hy+hr)
titles=[('1  CLASSIC','Thin black stick lines, white head, dot eyes'),('2  DRESSED','Same head, cartoon body in clothes'),('3  SILHOUETTE','Solid black body, two white oval eyes')]
ft=ImageFont.truetype(F,64); fs=ImageFont.truetype(F,30)
for i,(t,s) in enumerate(titles):
    x=320+i*640; figure(x,i+1)
    d.text((x,120),t,font=ft,fill=K,anchor='mm'); d.text((x,190),s,font=fs,fill=(90,85,78),anchor='mm')
    if i: d.line([(x-320,90),(x-320,1000)],fill=(210,204,192),width=4)
d.text((W/2,1040),'All three share: off-white paper, flat colors, soft shadow, ONE color prop (red scarf)',font=fs,fill=(90,85,78),anchor='mm')
im.save('stickman_looks.png')
