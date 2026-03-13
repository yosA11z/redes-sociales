const data = [
    { name: 'Six Degrees', year: '1997', source: 'Wikipedia — SixDegrees.com', url: 'https://es.wikipedia.org/wiki/SixDegrees.com' },
    { name: 'Friendster', year: '2002', source: 'Wikipedia — Friendster', url: 'https://en.wikipedia.org/wiki/Friendster' },
    { name: 'MySpace', year: '2003', source: 'Britannica — MySpace', url: 'https://www.britannica.com/topic/Myspace' },
    { name: 'Taringa!', year: '2004', source: 'taringa.net', url: 'https://www.taringa.net/' },
    { name: 'Facebook', year: '2004', source: 'Meta — Company Info', url: 'https://about.meta.com/company-info/' },
    { name: 'YouTube', year: '2005', source: 'blog.youtube', url: 'https://blog.youtube/' },
    { name: 'Twitter (X)', year: '2006', source: 'Wikipedia — Twitter', url: 'https://en.wikipedia.org/wiki/Twitter' },
    { name: 'Instagram', year: '2010', source: 'about.instagram.com', url: 'https://about.instagram.com/' },
    { name: 'Snapchat', year: '2011', source: 'snap.com', url: 'https://www.snap.com/' },
    { name: 'Douyin / TikTok', year: '2016–18', source: 'tiktok.com/about', url: 'https://www.tiktok.com/about' },
    { name: 'Threads', year: '2023', source: 'Meta News — Threads', url: 'https://about.fb.com/news/2023/07/introducing-threads-a-new-way-to-share-with-text/' },
];

const W = () => window.innerWidth;
const H = () => window.innerHeight;

/* positions: spread nodes naturally avoiding center and edges */
function getPositions() {
    const w = W(), h = H();
    const cx = w / 2, cy = h / 2;
    const positions = [];
    const minDist = Math.min(w, h) * 0.14;
    const padX = 80, padY = 80;

    let attempts = 0;
    while (positions.length < data.length && attempts < 8000) {
        attempts++;
        // fully random across entire screen width
        let x = padX + Math.random() * (w - padX * 2);
        let y = padY + Math.random() * (h - padY * 2);

        // avoid center text area
        const dc = Math.hypot(x - cx, y - cy);
        if (dc < Math.min(w, h) * 0.16) continue;

        let ok = true;
        for (const p of positions) {
            if (Math.hypot(p.x - x, p.y - y) < minDist) { ok = false; break; }
        }
        if (ok) positions.push({ x, y });
    }
    return positions;
}

/* create node elements */
const nodeEls = data.map((d, i) => {
    const el = document.createElement('div');
    el.className = 'node';
    el.innerHTML = `
    <div class="node-label">${d.name}</div>
    <div class="node-dot"></div>
    <div class="node-year">${d.year}</div>
  `;
    document.body.appendChild(el);
    return el;
});

const tooltip = document.getElementById('tooltip');
const ttName = document.getElementById('tooltip-name');
const ttYear = document.getElementById('tooltip-year');
const ttSrcText = document.getElementById('tooltip-src-text');
const instruction = document.getElementById('instruction');

let positions = [];

function layout() {
    positions = getPositions();
    nodeEls.forEach((el, i) => {
        if (!positions[i]) return;
        el.style.left = positions[i].x + 'px';
        el.style.top = positions[i].y + 'px';
    });
}

layout();
window.addEventListener('resize', () => { layout(); drawLines(); });

/* wire up interactions */
nodeEls.forEach((el, i) => {
    const d = data[i];

    el.addEventListener('mouseenter', () => {
        ttName.textContent = d.name;
        ttYear.textContent = d.year;
        ttSrcText.textContent = d.source;

        const rect = el.getBoundingClientRect();
        let tx = rect.left + rect.width / 2;
        let ty = rect.top;

        // flip tooltip below if too close to top
        if (ty < 120) {
            tooltip.style.transform = 'translate(-50%, 20px)';
            tooltip.style.top = (rect.bottom) + 'px';
        } else {
            tooltip.style.transform = 'translate(-50%, calc(-100% - 20px))';
            tooltip.style.top = ty + 'px';
        }
        tooltip.style.left = tx + 'px';

        gsap.to(tooltip, { opacity: 1, duration: 0.25, ease: 'power2.out' });
    });

    el.addEventListener('mouseleave', () => {
        gsap.to(tooltip, { opacity: 0, duration: 0.2 });
    });

    el.addEventListener('click', () => {
        el.classList.add('visited');
        window.open(d.url, '_blank');
    });
});

/* canvas lines connecting nearby nodes */
const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');

function drawLines() {
    canvas.width = W();
    canvas.height = H();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (positions.length < 2) return;

    for (let i = 0; i < positions.length; i++) {
        for (let j = i + 1; j < positions.length; j++) {
            const dist = Math.hypot(positions[i].x - positions[j].x, positions[i].y - positions[j].y);
            const maxDist = Math.max(W(), H()) * 0.6;
            if (dist < maxDist) {
                const alpha = (1 - dist / maxDist) * 0.22;
                ctx.beginPath();
                ctx.moveTo(positions[i].x, positions[i].y);
                ctx.lineTo(positions[j].x, positions[j].y);
                ctx.strokeStyle = `rgba(238,235,229,${alpha})`;
                ctx.lineWidth = 0.7;
                ctx.stroke();
            }
        }
    }
}

/* entrance animation */
gsap.to(instruction, { opacity: 1, duration: 1, delay: 1.5 });

nodeEls.forEach((el, i) => {
    gsap.to(el, {
        opacity: 1,
        duration: 0.7,
        ease: 'power2.out',
        delay: 0.1 + i * 0.09,
        onComplete: () => { if (i === data.length - 1) drawLines(); }
    });
});

// redraw lines after layout settles
setTimeout(drawLines, 800);