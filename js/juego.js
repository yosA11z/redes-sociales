// ── STATE ──
let phase = 'intro';
let postCount = 0;
let startTime = null;
let timerInterval = null;
let revelationTriggered = false;

// ── POST DATA ──
const avatarColors = ['#c8a070', '#70a8c8', '#a870c8', '#c87090', '#70c890', '#c8b870'];
const usernames = ['sofía_m', 'andres.vl', 'travelwith_lu', 'the.real.pedro', 'maria_k_', 'juanpablo.f', 'claramontoya', 'diego__rc', 'valentina.ar', 'sebastian_mg', 'isabella.tw', 'camilo.dev'];
const locations = ['Bogotá, Colombia', 'Ciudad de México', 'Buenos Aires', 'Madrid, España', 'Medellín', 'Barcelona', 'Lima, Perú', 'Cartagena', 'Santiago de Chile', 'Cali'];
const captions = [
    ['El mejor amanecer del año. No puedo creer que casi me lo pierdo.', '12,483'],
    ['Nada como estar aquí arriba. Sin señal, sin notificaciones.', '8,921'],
    ['Finalmente aprendí la receta de mi abuela. Tardé años en pedirla.', '5,344'],
    ['Tres años soñando con volver a este lugar.', '22,118'],
    ['Mi ritual de cada mañana. El único momento que es sólo mío.', '7,600'],
    ['Esta ciudad nunca para. Tampoco yo.', '3,891'],
    ['Once años juntos. Cada día sigue siendo el primero.', '41,233'],
    ['La primavera llegó sin avisar.', '9,102'],
    ['Terminé este libro en un vuelo. Lloré dos veces.', '2,844'],
    ['Algunas cosas no necesitan caption.', '18,756'],
    ['Primer domingo sin el celular en meses. Lo recomiendo.', '6,312'],
    ['Mi abuelo hoy cumplió 80. Me enseñó más que cualquier escuela.', '33,091'],
];
const commentCounts = ['142', '389', '58', '1,204', '23', '792', '1,841', '316', '97', '2,403', '61', '538'];
const timeLabels = ['hace 2 min', 'hace 8 min', 'hace 15 min', 'hace 34 min', 'hace 1 hora', 'hace 2 horas', 'hace 3 horas'];

// ── SVG ILLUSTRATIONS ──
function getIllustration(i) {
    const pp = [
        ['#2d4a3e', '#3d6e52', '#5a9a6a', '#8ec8a0'],
        ['#1a2d4a', '#2a4870', '#4a78b0', '#80aad8'],
        ['#4a2d1a', '#7a4a2a', '#b87845', '#d8aa80'],
        ['#3a1a4a', '#5a2a78', '#8a50b8', '#c090e0'],
        ['#1a3a2a', '#2a6048', '#50a878', '#90d8b0'],
        ['#4a3a1a', '#786028', '#b89848', '#e0cc90'],
    ];
    const p = pp[i % pp.length];
    const t = i % 12;
    const s = [
        `<svg viewBox="0 0 380 285" xmlns="
        "><rect width="380" height="285" fill="${p[0]}"/><rect y="168" width="380" height="117" fill="${p[1]}"/><ellipse cx="190" cy="170" rx="195" ry="68" fill="${p[2]}" opacity="0.5"/><circle cx="190" cy="146" r="46" fill="rgba(255,240,180,0.65)"/><circle cx="190" cy="146" r="30" fill="rgba(255,250,220,0.8)"/></svg>`,
        `<svg viewBox="0 0 380 285" xmlns="http://www.w3.org/2000/svg"><rect width="380" height="285" fill="${p[0]}"/><polygon points="0,285 148,68 296,285" fill="${p[1]}"/><polygon points="88,285 258,46 380,285" fill="${p[2]}"/><polygon points="222,74 258,46 294,74" fill="rgba(255,255,255,0.42)"/><rect width="380" height="88" fill="${p[0]}" opacity="0.32"/></svg>`,
        `<svg viewBox="0 0 380 285" xmlns="http://www.w3.org/2000/svg"><rect width="380" height="285" fill="${p[0]}"/><ellipse cx="190" cy="178" rx="138" ry="90" fill="${p[1]}"/><ellipse cx="190" cy="178" rx="106" ry="68" fill="${p[2]}"/><ellipse cx="190" cy="178" rx="68" ry="44" fill="${p[3]}" opacity="0.82"/><circle cx="160" cy="164" r="17" fill="${p[1]}"/><circle cx="218" cy="174" r="13" fill="${p[0]}" opacity="0.78"/></svg>`,
        `<svg viewBox="0 0 380 285" xmlns="http://www.w3.org/2000/svg"><rect width="380" height="285" fill="${p[0]}"/><rect y="0" width="380" height="163" fill="${p[1]}"/><ellipse cx="190" cy="166" rx="238" ry="70" fill="${p[2]}" opacity="0.78"/><rect y="188" width="380" height="97" fill="${p[3]}" opacity="0.52"/><circle cx="308" cy="50" r="25" fill="rgba(255,240,140,0.52)"/></svg>`,
        `<svg viewBox="0 0 380 285" xmlns="http://www.w3.org/2000/svg"><rect width="380" height="285" fill="${p[0]}"/><rect x="90" y="224" width="200" height="13" rx="5" fill="${p[1]}"/><path d="M116 130 Q190 120 264 130 L254 224 Q190 234 126 224 Z" fill="${p[2]}"/><ellipse cx="190" cy="130" rx="74" ry="17" fill="${p[3]}"/><ellipse cx="190" cy="134" rx="59" ry="12" fill="${p[1]}" opacity="0.72"/><path d="M264 163 Q300 156 300 184 Q300 212 264 212" stroke="${p[3]}" stroke-width="11" fill="none" stroke-linecap="round"/></svg>`,
        `<svg viewBox="0 0 380 285" xmlns="http://www.w3.org/2000/svg"><rect width="380" height="285" fill="${p[0]}"/><rect x="16" y="108" width="52" height="177" fill="${p[1]}"/><rect x="78" y="70" width="44" height="215" fill="${p[2]}"/><rect x="134" y="90" width="60" height="195" fill="${p[1]}" opacity="0.88"/><rect x="206" y="53" width="48" height="232" fill="${p[2]}" opacity="0.82"/><rect x="266" y="80" width="56" height="205" fill="${p[1]}"/><rect x="333" y="118" width="44" height="167" fill="${p[2]}" opacity="0.68"/></svg>`,
        `<svg viewBox="0 0 380 285" xmlns="http://www.w3.org/2000/svg"><rect width="380" height="285" fill="${p[0]}"/><ellipse cx="190" cy="208" rx="98" ry="70" fill="${p[2]}"/><circle cx="190" cy="146" r="62" fill="${p[2]}"/><ellipse cx="140" cy="106" rx="24" ry="34" fill="${p[2]}" transform="rotate(-18 140 106)"/><ellipse cx="240" cy="106" rx="24" ry="34" fill="${p[2]}" transform="rotate(18 240 106)"/><ellipse cx="140" cy="108" rx="13" ry="23" fill="${p[3]}" transform="rotate(-18 140 108)" opacity="0.68"/><ellipse cx="240" cy="108" rx="13" ry="23" fill="${p[3]}" transform="rotate(18 240 108)" opacity="0.68"/><circle cx="172" cy="138" r="11" fill="${p[0]}"/><circle cx="208" cy="138" r="11" fill="${p[0]}"/><circle cx="174" cy="136" r="6.5" fill="${p[1]}"/><circle cx="210" cy="136" r="6.5" fill="${p[1]}"/><ellipse cx="190" cy="164" rx="13" ry="9" fill="${p[3]}" opacity="0.78"/></svg>`,
        `<svg viewBox="0 0 380 285" xmlns="http://www.w3.org/2000/svg"><rect width="380" height="285" fill="${p[0]}"/>${[0, 60, 120, 180, 240, 300].map(a => `<ellipse cx="${190 + Math.cos(a * Math.PI / 180) * 50}" cy="${143 + Math.sin(a * Math.PI / 180) * 50}" rx="25" ry="33" fill="${p[3]}" opacity="0.86" transform="rotate(${a} ${190 + Math.cos(a * Math.PI / 180) * 50} ${143 + Math.sin(a * Math.PI / 180) * 50})"/>`).join('')}<circle cx="190" cy="143" r="29" fill="${p[2]}"/><circle cx="190" cy="143" r="15" fill="${p[3]}" opacity="0.88"/></svg>`,
        `<svg viewBox="0 0 380 285" xmlns="http://www.w3.org/2000/svg"><rect width="380" height="285" fill="${p[0]}"/><rect x="100" y="50" width="180" height="218" rx="7" fill="${p[1]}"/><rect x="105" y="50" width="15" height="218" rx="4" fill="${p[2]}" opacity="0.52"/><rect x="130" y="80" width="132" height="7" rx="2" fill="${p[3]}" opacity="0.42"/><rect x="130" y="98" width="108" height="5" rx="2" fill="${p[3]}" opacity="0.28"/><rect x="130" y="118" width="130" height="4" rx="2" fill="${p[3]}" opacity="0.2"/><rect x="130" y="132" width="116" height="4" rx="2" fill="${p[3]}" opacity="0.2"/></svg>`,
        `<svg viewBox="0 0 380 285" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="sg${i}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="${p[0]}"/><stop offset="55%" stop-color="${p[2]}" stop-opacity="0.72"/><stop offset="100%" stop-color="${p[3]}" stop-opacity="0.38"/></linearGradient></defs><rect width="380" height="285" fill="url(#sg${i})"/><ellipse cx="190" cy="213" rx="238" ry="34" fill="${p[1]}" opacity="0.62"/><circle cx="190" cy="193" r="38" fill="rgba(255,200,80,0.62)"/><ellipse cx="190" cy="193" rx="72" ry="17" fill="rgba(255,140,40,0.26)"/></svg>`,
        `<svg viewBox="0 0 380 285" xmlns="http://www.w3.org/2000/svg"><rect width="380" height="285" fill="${p[0]}"/><rect y="202" width="380" height="83" fill="${p[1]}"/><rect x="80" y="106" width="12" height="112" rx="3" fill="${p[2]}" opacity="0.62"/><circle cx="86" cy="96" r="40" fill="${p[2]}" opacity="0.72"/><rect x="283" y="86" width="13" height="132" rx="3" fill="${p[2]}" opacity="0.52"/><circle cx="289" cy="74" r="48" fill="${p[2]}" opacity="0.62"/><rect x="180" y="126" width="10" height="90" rx="3" fill="${p[2]}" opacity="0.48"/><circle cx="185" cy="116" r="32" fill="${p[2]}" opacity="0.58"/></svg>`,
        `<svg viewBox="0 0 380 285" xmlns="http://www.w3.org/2000/svg"><rect width="380" height="285" fill="${p[0]}"/><rect x="152" y="186" width="70" height="99" rx="8" fill="${p[2]}" opacity="0.78"/><circle cx="187" cy="156" r="48" fill="${p[2]}" opacity="0.88"/><ellipse cx="187" cy="116" rx="48" ry="24" fill="${p[1]}"/><ellipse cx="142" cy="138" rx="15" ry="26" fill="${p[1]}" opacity="0.82"/><ellipse cx="232" cy="138" rx="15" ry="26" fill="${p[1]}" opacity="0.82"/><ellipse cx="176" cy="153" rx="7.5" ry="5.5" fill="${p[0]}" opacity="0.48"/><ellipse cx="198" cy="153" rx="7.5" ry="5.5" fill="${p[0]}" opacity="0.48"/></svg>`,
    ];
    return s[t] || s[0];
}

// ── CREATE POST ──
function createPost(idx) {
    const cap = captions[idx % captions.length];
    const u = usernames[idx % usernames.length];
    const loc = locations[idx % locations.length];
    const col = avatarColors[idx % avatarColors.length];
    const comments = commentCounts[idx % commentCounts.length];
    const time = timeLabels[idx % timeLabels.length];

    const post = document.createElement('div');
    post.className = 'post';
    post.innerHTML = `
    <div class="post-header">
      <div class="avatar">
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <rect width="32" height="32" fill="${col}"/>
          <circle cx="16" cy="12" r="5.5" fill="rgba(255,255,255,0.36)"/>
          <ellipse cx="16" cy="28" rx="9.5" ry="7.5" fill="rgba(255,255,255,0.26)"/>
        </svg>
      </div>
      <div class="post-meta">
        <div class="post-username">${u}</div>
        <div class="post-location">${loc}</div>
      </div>
      <div class="post-more">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="#999"><circle cx="12" cy="5" r="1.4"/><circle cx="12" cy="12" r="1.4"/><circle cx="12" cy="19" r="1.4"/></svg>
      </div>
    </div>
    <div class="post-image">${getIllustration(idx)}</div>
    <div class="post-actions">
      <button class="action-btn" onclick="this.querySelector('svg').style.fill='#d4522a';this.querySelector('svg').style.stroke='#d4522a'">
        <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        ${cap[1]}
      </button>
      <button class="action-btn">
        <svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        ${comments}
      </button>
      <button class="action-btn">
        <svg viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
      </button>
      <button class="action-btn" style="margin-left:auto">
        <svg viewBox="0 0 24 24"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
      </button>
    </div>
    <div class="post-likes">${cap[1]} me gusta</div>
    <div class="post-caption"><strong>${u}</strong> ${cap[0]}</div>
    <div class="post-time">${time}</div>
  `;
    return post;
}

// ── TYPEWRITER ──
function typeInto(el, text, speed) {
    return new Promise(resolve => {
        el.innerHTML = '';
        const cursor = document.createElement('span');
        cursor.className = 'tw-cursor';
        el.appendChild(cursor);
        let i = 0;
        const iv = setInterval(() => {
            if (i < text.length) {
                const c = text[i];
                cursor.before(c === '\n' ? document.createElement('br') : document.createTextNode(c));
                i++;
            } else {
                clearInterval(iv);
                setTimeout(() => cursor.remove(), 700);
                resolve();
            }
        }, speed);
    });
}

// ── SIDE SLOT SWITCH ──
function showSlot(slotId, textId, text, speed) {
    const slot = document.getElementById(slotId);
    const panel = slot.closest('.side-panel');

    // Fade out other active slots in this panel
    panel.querySelectorAll('.side-slot').forEach(s => {
        if (s.id !== slotId && parseFloat(getComputedStyle(s).opacity) > 0.05) {
            gsap.to(s, { opacity: 0, y: -18, duration: 0.45, ease: 'power2.in' });
        }
    });

    // Bring in new slot
    gsap.fromTo(slot,
        { opacity: 0, y: 26 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.2, ease: 'power3.out' }
    );

    if (textId) {
        const el = document.getElementById(textId);
        if (el) setTimeout(() => typeInto(el, text, speed), 300);
    }
}

// ── SIDE SEQUENCE ──
const sideSeq = [
    { at: 4, left: true, slot: 'sl-l1', tid: 'tw-l1', text: '¿Cuándo fue\nla última vez\nque miraste\npor una ventana?', spd: 44 },
    { at: 7, left: false, slot: 'sl-r1', tid: 'tw-r1', text: 'El scroll\nno termina.\nTú decides\ncuándo parar.', spd: 40 },
    { at: 10, left: true, slot: 'sl-l2', tid: 'tw-l2', text: 'Cada\npublicación\nduró 2 segundos\nen tu mente.', spd: 40 },
    { at: 13, left: false, slot: 'sl-r2', tid: 'tw-r2', text: 'Afuera\nalguien\nte está\nesperando.', spd: 42 },
    { at: 16, left: true, slot: 'sl-l3', tid: 'tw-l3', text: '¿Recuerdas\nla primera\npublicación\nque viste?', spd: 40 },
    { at: 19, left: false, slot: 'sl-r3', tid: 'tw-r3', text: 'El feed\nsiempre\ntendrá más.', spd: 40 },
];
const shownAt = new Set();

function checkSide() {
    for (const s of sideSeq) {
        if (postCount >= s.at && !shownAt.has(s.at)) {
            shownAt.add(s.at);
            showSlot(s.slot, s.tid, s.text, s.spd);
        }
    }
}

// ── TIMER ──
function tick() {
    if (!startTime) return;
    const sec = Math.floor((Date.now() - startTime) / 1000);
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    document.getElementById('live-timer').textContent = `${m}:${s.toString().padStart(2, '0')}`;
}

// ── START FEED ──
function startFeed() {
    if (phase !== 'intro') return;
    phase = 'feed';
    startTime = Date.now();

    gsap.to('#intro', {
        opacity: 0, duration: 0.55,
        onComplete: () => { document.getElementById('intro').style.display = 'none'; }
    });

    document.getElementById('feed-stage').classList.add('visible');

    setTimeout(() => {
        showSlot('sl-count', null, '', 0);
        setTimeout(() => showSlot('sl-timer', null, '', 0), 200);
    }, 900);

    timerInterval = setInterval(tick, 1000);

    for (let i = 0; i < 5; i++) addPost();
    document.getElementById('feed-scroll').addEventListener('scroll', onScroll);
}

function addPost() {
    const c = document.getElementById('feed-container');
    const post = createPost(postCount);
    c.appendChild(post);
    postCount++;
    document.getElementById('live-count').textContent = postCount;
    setTimeout(() => post.classList.add('visible'), 50);
    checkSide();
}

function onScroll() {
    if (phase !== 'feed') return;
    const fs = document.getElementById('feed-scroll');
    if (fs.scrollTop + fs.clientHeight >= fs.scrollHeight - 160) {
        addPost(); addPost();
    }
    if (postCount >= 20 && !revelationTriggered) {
        revelationTriggered = true;
        triggerRevelation();
    }
}

// ── REVELATION ──
function triggerRevelation() {
    phase = 'revelation';
    clearInterval(timerInterval);

    gsap.to('#feed-stage', { opacity: 0, duration: 1.1, ease: 'power2.inOut' });

    setTimeout(() => {
        const il = document.getElementById('interlude');
        il.classList.add('active');
        gsap.to(il, { opacity: 1, duration: 0.9, ease: 'power2.out' });

        gsap.to({ n: 0 }, {
            n: postCount,
            duration: 2,
            ease: 'power2.out',
            onUpdate: function () {
                document.getElementById('int-count').textContent = Math.round(this.targets()[0].n);
            },
            onComplete: () => setTimeout(triggerRecap, 3000)
        });
    }, 900);
}

// ── RECAP ──
function triggerRecap() {
    phase = 'recap';
    const elapsed = Math.max(1, Math.round((Date.now() - startTime) / 60000));
    document.getElementById('sc-posts').textContent = postCount;
    document.getElementById('sc-time').innerHTML = `${elapsed}<em> min</em>`;

    const il = document.getElementById('interlude');
    const recap = document.getElementById('recap');

    gsap.to(il, {
        opacity: 0, duration: 0.7,
        onComplete: () => il.classList.remove('active')
    });

    recap.classList.add('active');
    gsap.to(recap, { opacity: 1, duration: 0.9, delay: 0.3, ease: 'power2.out' });

    // Intersection observer for staggered items
    const io = new IntersectionObserver(entries => {
        entries.forEach((e, idx) => {
            if (e.isIntersecting) {
                setTimeout(() => e.target.classList.add('appear'), idx * 80);
                io.unobserve(e.target);
            }
        });
    }, { threshold: 0.12 });

    document.querySelectorAll('.stat-cell, .moment-item').forEach(el => io.observe(el));

    const codaIo = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                document.getElementById('coda-main').classList.add('appear');
                setTimeout(() => document.getElementById('coda-sub').classList.add('appear'), 700);
                codaIo.disconnect();
            }
        });
    }, { threshold: 0.25 });
    codaIo.observe(document.querySelector('.recap-coda'));
}

// ── INIT ──
let started = false;
function go() { if (!started) { started = true; startFeed(); } }

window.addEventListener('wheel', go, { passive: true });
window.addEventListener('touchmove', go, { passive: true });
window.addEventListener('keydown', e => { if (e.key === 'ArrowDown' || e.key === ' ') go(); });
document.getElementById('scroll-cta').addEventListener('click', go);

// Intro entrance
gsap.from('#intro .intro-eyebrow', { opacity: 0, y: 16, duration: 0.85, delay: 0.4 });
gsap.from('#intro .intro-title', { opacity: 0, y: 26, duration: 1.05, delay: 0.6, ease: 'power3.out' });
gsap.from('#intro .intro-sub', { opacity: 0, y: 14, duration: 0.85, delay: 1.0 });
gsap.from('#intro .scroll-cta', { opacity: 0, y: 8, duration: 0.7, delay: 1.4 });