const state = { hearts: 3, score: 0, answered: { 1: false, 2: false, 3: false } };
const correctMsgs = [
    ["Correcto", "Sabías exactamente de qué va el asunto"],
    ["Exacto", "Esa fue pan comido"],
    ["Brillante", "Tu cerebro es una enciclopedia"]
];
const wrongMsgs = [
    ["No fue esta vez", "La respuesta correcta está resaltada en verde"],
    ["Casi", "Recuerda la respuesta para la próxima"],
    ["Hmm, no", "Las redes guardan bien sus secretos"]
];
let msgIdx = 0;

function setProgress(pct) {
    document.getElementById('progressFill').style.width = pct + '%';
}

function updateHearts() {
    for (let i = 1; i <= 3; i++) {
        const el = document.getElementById('h' + i);
        if (i > state.hearts) {
            el.innerHTML = '<use href="#ic-heart-empty"/>';
            el.classList.add('lost');
        }
    }
}

function handleOption(btn, qNum) {
    if (state.answered[qNum]) return;
    state.answered[qNum] = true;
    const opts = document.querySelectorAll(`[data-q="${qNum}"]`);
    opts.forEach(b => b.disabled = true);

    const isCorrect = btn.dataset.correct === 'true';
    const correctBtn = [...opts].find(b => b.dataset.correct === 'true');
    const fbEl = document.getElementById(`fb${qNum}`);
    const contEl = document.getElementById(`cont${qNum}`);
    const iconEl = document.getElementById(`fbIcon${qNum}`);
    const [title, sub] = isCorrect ? correctMsgs[msgIdx] : wrongMsgs[msgIdx];
    msgIdx++;

    if (isCorrect) {
        btn.classList.add('correct');
        fbEl.classList.add('correct');
        iconEl.innerHTML = '<use href="#ic-check"/>';
        state.score++;
        contEl.className = 'continue-btn green';
        contEl.textContent = qNum === 3 ? 'Ver resultados' : 'Continuar';
    } else {
        btn.classList.add('wrong');
        correctBtn.classList.add('correct');
        fbEl.classList.add('wrong');
        iconEl.innerHTML = '<use href="#ic-xmark"/>';
        state.hearts = Math.max(0, state.hearts - 1);
        updateHearts();
        contEl.className = 'continue-btn red';
        contEl.textContent = 'Continuar';
        gsap.to(opts, { x: [-10, 10, -8, 8, -5, 5, 0], duration: 0.5, ease: "power2.inOut" });
    }

    document.getElementById(`fbTitle${qNum}`).textContent = title;
    document.getElementById(`fbSub${qNum}`).textContent = sub;
    gsap.to(fbEl, { opacity: 1, y: 0, duration: 0.4, ease: 'back.out(1.4)' });
    gsap.to(contEl, { opacity: 1, duration: 0.3, delay: 0.1 });
    contEl.classList.add('visible');
}

function transitionTo(fromId, toId, pct) {
    const from = document.getElementById(fromId);
    const to = document.getElementById(toId);
    gsap.to(from, {
        x: -80, opacity: 0, duration: 0.35, ease: 'power2.in',
        onComplete: () => {
            from.classList.remove('active');
            gsap.set(from, { x: 0, opacity: 0 });
            to.classList.add('active');
            gsap.fromTo(to, { x: 80, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: 'power2.out' });
        }
    });
    setProgress(pct);
}

document.querySelectorAll('.option-btn').forEach(btn => {
    btn.addEventListener('click', () => handleOption(btn, parseInt(btn.dataset.q)));
});

document.getElementById('cont1').addEventListener('click', () => transitionTo('screen1', 'screen2', 33));

document.getElementById('cont2').addEventListener('click', () => {
    transitionTo('screen2', 'screenMid', 66);
    setTimeout(() => {
        gsap.from('#screenMid .mid-icon-anim', { scale: 0, rotation: -20, duration: 0.6, ease: 'back.out(1.7)', delay: 0.3 });
        gsap.from('#screenMid .mid-badge', { y: 20, opacity: 0, duration: 0.4, delay: 0.5 });
        gsap.from('#screenMid .mid-title', { y: 20, opacity: 0, duration: 0.4, delay: 0.6 });
        gsap.from('#screenMid .mid-sub', { y: 20, opacity: 0, duration: 0.4, delay: 0.7 });
        gsap.from('#screenMid .stat-box', { scale: 0, duration: 0.4, stagger: 0.1, ease: 'back.out(1.5)', delay: 0.8 });
        gsap.from('#screenMid .mid-btn', { y: 20, opacity: 0, duration: 0.4, delay: 1.0 });
    }, 100);
});

document.getElementById('midContinue').addEventListener('click', () => transitionTo('screenMid', 'screen3', 66));

document.getElementById('cont3').addEventListener('click', () => {
    setProgress(100);
    document.getElementById('scoreNum').textContent = state.score + '/3';
    document.getElementById('xpNum').textContent = '+' + (state.score * 10);
    const subs = [
        'Buen intento. Con práctica se puede llegar al 100%.',
        'Muy bien hecho. Casi perfecto — solo una te escapó.',
        '¡Perfecto! No erraste ni una. Definitivamente sabes de redes sociales.'
    ];
    document.getElementById('finalSub').textContent = subs[Math.min(state.score === 3 ? 2 : state.score === 2 ? 1 : 0, 2)];

    transitionTo('screen3', 'screenFinal', 100);
    setTimeout(() => {
        launchConfetti();
        gsap.from('#screenFinal .trophy-wrap', { scale: 0, duration: 0.7, ease: 'back.out(2)', delay: 0.3 });
        gsap.from('#screenFinal .mid-badge', { y: -20, opacity: 0, duration: 0.4, delay: 0.7 });
        gsap.from('#screenFinal .final-title', { y: 20, opacity: 0, duration: 0.4, delay: 0.8 });
        gsap.from('#screenFinal .final-sub', { y: 20, opacity: 0, duration: 0.4, delay: 0.9 });
        gsap.from('#screenFinal .fstat', { scale: 0, duration: 0.4, stagger: 0.1, ease: 'back.out(1.5)', delay: 1.0 });
        gsap.from('#screenFinal .restart-btn', { y: 20, opacity: 0, duration: 0.4, delay: 1.3 });
        gsap.from('#screenFinal .restart-outline', { y: 20, opacity: 0, duration: 0.4, delay: 1.4 });
    }, 100);
});

function launchConfetti() {
    const container = document.getElementById('confetti');
    container.innerHTML = '';
    const colors = ['#58cc02', '#ffc800', '#ff4b4b', '#1cb0f6', '#ce82ff', '#ff9500'];
    for (let i = 0; i < 80; i++) {
        const p = document.createElement('div');
        p.className = 'confetti-piece';
        p.style.cssText = `left:${Math.random() * 100}vw;background:${colors[Math.floor(Math.random() * colors.length)]};width:${6 + Math.random() * 10}px;height:${6 + Math.random() * 10}px;border-radius:${Math.random() > .5 ? '50%' : '2px'};top:-20px;`;
        container.appendChild(p);
        gsap.to(p, {
            y: `${80 + Math.random() * 40}vh`, x: `${-60 + Math.random() * 120}px`,
            rotation: Math.random() * 720, opacity: 0,
            duration: 1.5 + Math.random() * 1.5, delay: Math.random() * 0.8,
            ease: 'power1.out', onComplete: () => p.remove()
        });
    }
}

document.getElementById('restartBtn').addEventListener('click', () => location.reload());

// Funny fake share button
const shareMsgs = [
    { icon: '#ic-share', text: 'Enviando a tus 3 seguidores...', sub: null },
    { icon: '#ic-share', text: 'Subiendo a la nube...', sub: '17%' },
    { icon: '#ic-share', text: 'Subiendo a la nube...', sub: '43%' },
    { icon: '#ic-share', text: 'Subiendo a la nube...', sub: '99%' },
    { icon: '#ic-share', text: 'Cargando al 100%... error de red', sub: null },
    { icon: '#ic-share', text: 'Reintentando con paloma mensajera', sub: null },
    { icon: '#ic-check', text: '¡Compartido con éxito!', sub: 'Tu ex ya lo vio' },
];
let shareStep = 0;
let shareTimer = null;

// build toast
const toast = document.createElement('div');
toast.id = 'share-toast';
toast.style.cssText = `
    position:fixed; bottom:32px; left:50%; transform:translateX(-50%) translateY(80px);
    background:#3c3c3c; color:white; border-radius:14px; padding:14px 22px;
    font-family:'Nunito',sans-serif; font-size:15px; font-weight:700;
    display:flex; align-items:center; gap:10px; z-index:999;
    box-shadow:0 8px 24px rgba(0,0,0,0.2); white-space:nowrap; opacity:0;
    min-width:220px;
  `;
toast.innerHTML = `<svg width="20" height="20" id="toastIcon"><use href="#ic-share"/></svg><span id="toastText"></span>`;
document.body.appendChild(toast);

function showToast(msg) {
    document.getElementById('toastIcon').innerHTML = `<use href="${msg.icon}"/>`;
    document.getElementById('toastText').textContent = msg.text + (msg.sub ? ` ${msg.sub}` : '');
    if (msg.icon === '#ic-check') toast.style.background = '#58cc02';
    else toast.style.background = '#3c3c3c';
    gsap.to(toast, {
        opacity: 1, y: 0, duration: 0.3, ease: 'back.out(1.5)',
        onComplete: () => {
            if (shareStep < shareMsgs.length - 1) {
                shareTimer = setTimeout(() => {
                    shareStep++;
                    showToast(shareMsgs[shareStep]);
                }, shareStep < 4 ? 700 : 1000);
            } else {
                setTimeout(() => gsap.to(toast, { opacity: 0, y: 40, duration: 0.4, delay: 1.5 }), 0);
                shareStep = 0;
            }
        }
    });
    gsap.set(toast, { y: 40 });
}

document.getElementById('shareBtn').addEventListener('click', () => {
    if (shareTimer) clearTimeout(shareTimer);
    shareStep = 0;
    gsap.to(toast, { opacity: 0, duration: 0.1, onComplete: () => showToast(shareMsgs[0]) });
});

// Init animations
setProgress(0);
gsap.from('#screen1 .mascot-svg', { scale: 0, rotation: -15, duration: 0.7, ease: 'back.out(1.7)', delay: 0.2 });
gsap.from('#screen1 .question-text', { y: 20, opacity: 0, duration: 0.5, delay: 0.4 });
gsap.from('.option-btn', { y: 30, opacity: 0, duration: 0.4, stagger: 0.07, delay: 0.5 });