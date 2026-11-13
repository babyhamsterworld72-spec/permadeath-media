# Flat thick-outline icons in the channel style (viewBox 0 0 400 400).
O = '#C8541A'; K = '#17140F'; W = '#FFFFFF'; C = '#FBF8F2'; G = '#2F7D4F'; N = '#26324F'; B = '#6FA8DC'
st = f'stroke="{K}" stroke-width="12" stroke-linejoin="round" stroke-linecap="round"'

I = {
 'door': f'<rect x="110" y="40" width="180" height="320" rx="8" fill="{O}" {st}/><rect x="140" y="80" width="120" height="100" fill="none" {st}/><circle cx="255" cy="215" r="12" fill="{K}"/><path d="M70 360H330" {st}/>',
 'phone': f'<rect x="120" y="30" width="160" height="340" rx="30" fill="{W}" {st}/><rect x="150" y="90" width="90" height="34" rx="14" fill="{O}" {st} stroke-width="8"/><rect x="160" y="160" width="80" height="34" rx="14" fill="#EFE7DA" {st} stroke-width="8"/><rect x="150" y="230" width="60" height="34" rx="14" fill="{O}" {st} stroke-width="8"/><path d="M185 335H215" {st}/>',
 'notebook': f'<rect x="80" y="60" width="240" height="290" rx="14" fill="{W}" {st}/><path d="M110 60V350" {st}/>' + ''.join(f'<path d="M140 {y}H{220+(y*7)%70}" {st} stroke-width="9"/><path d="M290 {y-10}l-12 20" stroke="{O}" stroke-width="9"/>' for y in (120,170,220,270)),
 'chart2': f'<path d="M50 50V350H360" fill="none" {st}/><path d="M70 120L130 300L160 300" fill="none" stroke="{O}" stroke-width="16" stroke-linecap="round"/><path d="M70 110C170 130 250 200 340 320" fill="none" stroke="{N}" stroke-width="16" stroke-linecap="round" stroke-dasharray="2 26"/>',
 'drop': f'<path d="M200 40C200 40 90 180 90 250A110 110 0 0 0 310 250C310 180 200 40 200 40Z" fill="{B}" {st}/><path d="M90 300H310" stroke="{O}" stroke-width="14"/>',
 'heart': f'<path d="M200 350L70 210C20 150 70 60 140 75C170 82 190 105 200 125C210 105 230 82 260 75C330 60 380 150 330 210Z" fill="{O}" {st}/>',
 'brain': f'<path d="M200 70C160 40 100 60 100 110C60 120 50 180 85 205C70 250 110 300 160 290C180 330 230 330 245 300C300 310 340 260 320 220C355 190 340 120 295 115C295 60 235 45 200 70Z" fill="#F4C7B3" {st}/><path d="M200 70V300" {st} stroke-width="9"/><circle cx="150" cy="170" r="30" fill="{O}" {st} stroke-width="8"/><circle cx="255" cy="215" r="30" fill="{O}" {st} stroke-width="8"/>',
 'fire': f'<path d="M200 30C230 110 320 150 310 260A110 110 0 0 1 90 260C85 200 130 180 140 120C165 160 180 170 200 30Z" fill="{O}" {st}/><path d="M200 330A50 50 0 0 1 150 280C150 245 190 230 200 190C215 240 250 250 250 285A50 50 0 0 1 200 330Z" fill="#F2B33D" {st} stroke-width="9"/>',
 'arrows': f'<path d="M60 140H280M240 90L300 140L240 190" fill="none" stroke="{O}" stroke-width="22" stroke-linecap="round" stroke-linejoin="round"/><path d="M100 260H320M280 210L340 260L280 310" fill="none" {st} stroke-width="22"/>',
 'ball': f'<circle cx="200" cy="200" r="120" fill="{O}" {st}/><path d="M90 160Q200 230 310 160M90 240Q200 170 310 240" fill="none" {st} stroke-width="9"/>',
 'rope': f'<path d="M30 200C100 160 140 240 200 200S300 160 370 200" fill="none" stroke="#B5814A" stroke-width="34" stroke-linecap="round"/><path d="M30 200C100 160 140 240 200 200S300 160 370 200" fill="none" stroke="{K}" stroke-width="10" stroke-dasharray="4 26"/><circle cx="200" cy="200" r="40" fill="{O}" {st} opacity=".9"/>',
 'ticket': f'<path d="M50 120H350V170A30 30 0 0 0 350 230V280H50V230A30 30 0 0 0 50 170Z" fill="{O}" {st}/><path d="M260 120V280" {st} stroke-dasharray="14 14" stroke-width="8"/><path d="M90 180H220M90 220H190" stroke="{C}" stroke-width="12" stroke-linecap="round"/>',
 'coins': ''.join(f'<ellipse cx="200" cy="{y}" rx="120" ry="34" fill="#F2B33D" {st}/>' for y in (300,260,220,180,140)),
 'chain': f'<rect x="120" y="230" width="200" height="130" rx="18" fill="#8C8C8C" {st}/><path d="M80 120 Q60 80 100 70 Q140 60 150 100 L190 230" fill="none" {st}/><text x="220" y="310" text-anchor="middle" font-family="League Gothic" font-size="64" fill="{C}">PAST</text><circle cx="90" cy="110" r="40" fill="{N}" {st}/>',
 'file': f'<rect x="90" y="60" width="220" height="290" rx="10" fill="#F2D49B" {st}/><path d="M90 110H200L220 60" fill="none" {st}/><path d="M130 170H270M130 220H270M130 270H230" {st} stroke-width="9"/><circle cx="290" cy="310" r="40" fill="{O}" {st}/><path d="M275 310H305" stroke="{C}" stroke-width="10"/>',
 'cloud': f'<path d="M110 240A60 60 0 0 1 130 125A80 80 0 0 1 280 120A60 60 0 0 1 300 240Z" fill="#8C93A3" {st}/><path d="M150 280L130 330M210 280L190 330M270 280L250 330" stroke="{B}" stroke-width="14" stroke-linecap="round"/>',
 'wall': f'<rect x="40" y="50" width="320" height="300" rx="10" fill="#EFE7DA" {st}/>' + ''.join(f'<rect x="{x}" y="{y}" width="70" height="60" fill="{W}" {st} stroke-width="8"/>' for x, y in ((80,90),(250,100),(160,200),(70,260),(260,250))) + f'<path d="M115 120L285 130L195 230L105 290L295 280" fill="none" stroke="{O}" stroke-width="7"/>',
 'book': f'<rect x="90" y="70" width="220" height="270" rx="12" fill="{N}" {st}/><path d="M120 70V340" {st} stroke-width="9"/><rect x="160" y="130" width="110" height="40" fill="{O}" {st} stroke-width="8"/>',
 'question': f'<path d="M60 300L340 230" {st}/><path d="M200 265V350M150 350H250" {st}/><circle cx="90" cy="200" r="60" fill="{O}" {st}/><text x="90" y="225" text-anchor="middle" font-family="League Gothic" font-size="90" fill="{C}">?</text><rect x="260" y="150" width="90" height="80" fill="{W}" {st}/><rect x="280" y="90" width="70" height="60" fill="{W}" {st}/>',
 'puzzle': ''.join(f'<rect x="{80+i*85}" y="{80+j*85}" width="80" height="80" fill="{W}" {st} stroke-width="8"/>' for i in range(3) for j in range(3)) + f'<rect x="250" y="250" width="80" height="80" fill="{O}" {st} stroke-width="8"/>',
 'tower': ''.join(f'<rect x="70" y="{330-k*50}" width="110" height="46" fill="{O}" {st} stroke-width="8"/>' for k in range(3)) + ''.join(f'<rect x="230" y="{330-k*50}" width="110" height="46" fill="#D9D3C7" {st} stroke-width="8"/>' for k in range(6)),
 'stopwatch': f'<circle cx="200" cy="220" r="140" fill="{W}" {st}/><rect x="175" y="40" width="50" height="40" fill="{O}" {st}/><path d="M200 220V130M200 220L260 250" {st} stroke-width="14"/>',
 'eye': f'<path d="M20 200Q200 30 380 200Q200 370 20 200Z" fill="{W}" {st}/><circle cx="200" cy="200" r="70" fill="{O}" {st}/><circle cx="200" cy="200" r="30" fill="{K}"/>',
 'thermo': f'<circle cx="200" cy="200" r="150" fill="{W}" {st}/><path d="M90 250A120 120 0 1 1 310 250" fill="none" stroke="#D9D3C7" stroke-width="30"/><path d="M90 250A120 120 0 0 1 120 120" fill="none" stroke="{B}" stroke-width="30"/><path d="M200 200L120 140" {st} stroke-width="14"/><circle cx="200" cy="200" r="18" fill="{K}"/>',
 'cage': f'<path d="M80 340H320V170A120 120 0 0 0 80 170Z" fill="#F2D49B" {st}/>' + ''.join(f'<path d="M{x} 340V{120 if 130<x<270 else 180}" {st} stroke-width="9"/>' for x in (120,160,200,240,280)) + f'<circle cx="200" cy="40" r="22" fill="#F2B33D" {st} stroke-width="8"/>',
}


def svg(name, size=420, id_=''):
    return f'<svg {f"id=\"{id_}\"" if id_ else ""} width="{size}" height="{size}" viewBox="0 0 400 400">{I[name]}</svg>'
