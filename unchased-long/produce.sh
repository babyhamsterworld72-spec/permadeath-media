#!/bin/bash
# Usage: ./produce.sh v03 v04 ...  build, render, normalize; then Spanish dub if es/<vid>.json exists
cd "$(dirname "$0")"
for v in "$@"; do
  python3 gen.py $v || continue
  t=$(python3 -c "import json;print(json.load(open('../channel-kit/$v.json'))['titles'][0])" | sed 's/[^A-Za-z ]//g; s/  */_/g' | cut -c1-40)
  out=renders/Unchased_${v^^}_${t}.mp4
  (cd $v && npx hyperframes render -q delivery -o ../$out > ../renders/$v.log 2>&1)
  ffmpeg -y -v error -i $out -c:v copy -af loudnorm=I=-15:TP=-1.5:LRA=11 -c:a aac -b:a 192k renders/tmp_$v.mp4 && mv renders/tmp_$v.mp4 $out
  echo "$v VIDEO $out"
  [ -f es/$v.json ] && python3 es_track.py $v > es_$v.log 2>&1 && echo "$v DUB done"
done
