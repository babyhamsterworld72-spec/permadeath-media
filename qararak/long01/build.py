import subprocess,os
Q='/home/user/permadeath-media/qararak'
os.makedirs('seg',exist_ok=True)
ENC=['-c:v','libx264','-preset','medium','-crf','19','-pix_fmt','yuv420p','-r','30','-c:a','aac','-b:a','192k','-ar','48000','-ac','2']
def run(a): subprocess.run(['ffmpeg','-v','error','-y']+a,check=True)
def dur(f): return float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',f]))
def card(out,png,vo,bed,pre=.6,post=1.4,hold=0):
    d=pre+dur(vo)+post+hold
    vf=f"scale=2112:1188,zoompan=z='1+0.06*on/({d}*30)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=1:s=1920x1080:fps=30,fade=t=in:d=0.35,fade=t=out:st={d-0.35:.3f}:d=0.35,format=yuv420p"
    af=(f"[1:a]adelay={int(pre*1000)}|{int(pre*1000)},apad[v];[2:a]aloop=loop=-1:size=2000000000,atrim=0:{d},volume=.32,afade=t=in:d=0.6,afade=t=out:st={d-0.8:.3f}:d=0.8[b];"
        f"[v][b]amix=inputs=2:duration=longest:normalize=0,atrim=0:{d}[a]")
    run(['-loop','1','-framerate','30','-t',str(d),'-i',png,'-i',vo,'-i',bed,'-filter_complex',f"[0:v]{vf}[vv];{af}",'-map','[vv]','-map','[a]','-t',str(d)]+ENC+[out])
def part(out,ep,frame,cut):
    src=f'{Q}/ep0{ep}/ep0{ep}_final.mp4'
    fc=(f"[1:v]trim=0:{cut},setpts=PTS-STARTPTS,scale=608:1080[s];[0:v][s]overlay=656:0,fade=t=in:d=0.3,fade=t=out:st={cut-.4}:d=0.4,format=yuv420p[vv];"
        f"[1:a]atrim=0:{cut},asetpts=PTS-STARTPTS,aresample=48000,aformat=channel_layouts=stereo,afade=t=out:st={cut-.5}:d=0.5[a]")
    run(['-loop','1','-framerate','30','-t',str(cut),'-i',frame,'-i',src,'-filter_complex',fc,'-map','[vv]','-map','[a]','-t',str(cut)]+ENC+[out])
G='gfx';V='vo';B6=f'{Q}/engine/bed6.wav';B7=f'{Q}/engine/bed7.wav'
segs=[]
def S(n): segs.append(f'seg/{n}.mp4'); return f'seg/{n}.mp4'
card(S('00_intro'),f'{G}/intro0.png',f'{V}/v0.wav',B6)
cuts={1:31.3,3:40.4,4:48.45,5:36.0,6:29.45,7:32.45}
order=[1,3,4,5,6]
for k,ep in enumerate(order):
    part(S(f'1{k}_part'),ep,f'{G}/frame{k}.png',cuts[ep])
    if k<4: card(S(f'1{k}_bridge'),f'{G}/bridge{k}.png',f'{V}/v{k+1}.wav',B6)
card(S('20_final'),f'{G}/final0.png',f'{V}/v5.wav',B6)
part(S('21_ep07'),7,f'{G}/frame70.png',cuts[7])
card(S('22_outro'),f'{G}/outro0.png',f'{V}/v6.wav',B7,hold=12)
open('list.txt','w').write(''.join(f"file '{s}'\n" for s in segs))
run(['-f','concat','-safe','0','-i','list.txt','-c','copy','raw.mp4'])
run(['-i','raw.mp4','-c:v','copy','-af','loudnorm=I=-14:TP=-1.5:LRA=11','-c:a','aac','-b:a','192k','-ar','48000','-movflags','+faststart','long01_final.mp4'])
t=0
for s in segs: print(f'{t:7.2f} {s}'); t+=dur(s)
print('total',t)
