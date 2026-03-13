let pageInitialized = false;
gsap.registerPlugin(ScrollTrigger);

/* =============================================
   LOADER LOGIC
============================================= */
(function runLoader() {
    const logo = document.getElementById('loaderLogo');
    const barWrap = document.getElementById('loaderBarWrap');
    const bar = document.getElementById('loaderBar');
    const statusEl = document.getElementById('loaderStatus');
    const loaderEl = document.getElementById('loader-screen');
    const welcomeEl = document.getElementById('welcome-screen');
    const welcomeWord = document.getElementById('welcomeWord');
    const pageEl = document.getElementById('page-content');

    // Track real resource loading
    let resourcesDone = false;
    let timelineDone = false;

    // Helper: set status text
    function setStatus(txt) {
        statusEl.textContent = txt;
    }

    // Helper: animate bar to a target %
    function barTo(pct, dur, ease, onDone) {
        gsap.to(bar, {
            width: pct + '%',
            duration: dur,
            ease: ease || 'power1.inOut',
            onComplete: onDone || null
        });
    }

    /* ---- PHASE 1: logo fade-in ---- */
    const tl = gsap.timeline();

    tl.to(logo, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power3.out'
    });

    tl.to([barWrap, statusEl], {
        opacity: 1,
        duration: 0.3,
        stagger: 0.1,
        ease: 'power2.out'
    }, '-=0.2');

    /* ---- PHASE 2: progress steps ---- */
    tl.call(() => { setStatus('Cargando estructura...'); barTo(30, 0.4, 'power1.inOut'); });
    tl.call(() => { setStatus('Cargando recursos...'); barTo(60, 0.5, 'power1.inOut'); }, null, '+=0.1');
    tl.call(() => { setStatus('Preparando contenido...'); barTo(85, 0.4, 'power1.inOut'); }, null, '+=0.1');
    tl.call(() => { setStatus('Optimizando experiencia...'); barTo(95, 0.3, 'power1.inOut'); }, null, '+=0.1');

    /* ---- Wait for real load + min timer ---- */
    const minLoaderTime = 2000; // 2 segundos mínimo
    const startTime = performance.now();

    tl.call(() => {
        timelineDone = true;
        if (resourcesDone) finalize();
    });

    window.addEventListener('load', () => {
        resourcesDone = true;
        if (timelineDone) finalize();
    });

    setTimeout(() => {
        resourcesDone = true;
        if (timelineDone) finalize();
    }, 2500);

    /* ---- FINALIZE: 100% then welcome ---- */
    function finalize() {
        const elapsed = performance.now() - startTime;
        const remaining = Math.max(0, minLoaderTime - elapsed);

        setTimeout(() => {
            setStatus('Listo.');
            gsap.to(bar, { width: '100%', duration: 0.3, ease: 'power4.out', onComplete: showWelcome });
        }, remaining);
    }

    function showWelcome() {
        gsap.timeline()
            .to(loaderEl, { opacity: 0, duration: 0.3, ease: 'power2.in', onComplete: () => { loaderEl.style.display = 'none'; } })
            .set(welcomeEl, { opacity: 1 })
            .to(welcomeWord, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.1')
            .to({}, { duration: 0.3 })
            .to(welcomeWord, { opacity: 0, y: -20, letterSpacing: '0.2em', duration: 0.3, ease: 'power3.in' })
            .to(welcomeEl, { backgroundColor: '#ffffff', duration: 0.15, ease: 'none' }, '-=0.1')
            .call(() => { pageEl.style.opacity = '1'; pageEl.style.pointerEvents = 'auto'; initPage(); })
            .to(welcomeEl, { opacity: 0, duration: 0.3, ease: 'power2.out', onComplete: () => { welcomeEl.style.display = 'none'; } });
    }
})();


/* =============================================
   PAGE INIT (runs AFTER loader)
============================================= */
function initPage() {
    if (pageInitialized) return;  // si ya se ejecutó, no hace nada
    pageInitialized = true;

    lucide.createIcons();

    const data = [
        { year: "1997", name: "Six Degrees", desc: "La primera red social moderna. Permitió crear perfiles y listas de amigos. Cerró en 2001, pero sentó las bases de todo lo que vino después.", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/SixDegrees.com_logo.png/250px-SixDegrees.com_logo.png", color: "#ff6600" },
        { year: "2002", name: "Friendster", desc: "Pionera en conectar amigos de amigos. Su éxito masivo colapsó servidores y reveló los retos de manejar redes sociales a gran escala.", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Friendster_logo.svg/640px-Friendster_logo.svg.png", color: "#00ccff" },
        { year: "2003", name: "MySpace", desc: "Dominó el mundo con música y personalización HTML. Fue el lugar de las bandas y los perfiles extravagantes, hasta que Facebook empezó a crecer.", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Myspace.svg/640px-Myspace.svg.png", color: "#003399" },
        { year: "2004", name: "Taringa!", desc: "La inteligencia colectiva latina. Marcó una era de contenido compartido en español, con relevancia máxima entre 2004 y 2012.", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Taringa_vectorlogo.svg/640px-Taringa_vectorlogo.svg.png", color: "#54b42c" },
        { year: "2004", name: "Facebook", desc: "De una red universitaria en Harvard a conectar a miles de millones. Abierta al público en 2006, redefinió la forma en que compartimos información en la web.", logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg", color: "#1877F2" },
        { year: "2005", name: "YouTube", desc: "El televisor del mundo. Transformó a los usuarios en creadores de contenido, y su adquisición por Google en 2006 aceleró su expansión.", logo: "https://upload.wikimedia.org/wikipedia/commons/e/ef/Youtube_logo.png", color: "#FF0000" },
        { year: "2006", name: "Twitter (hoy X)", desc: "El pulso del mundo en tiempo real. 140 caracteres que cambiaron la política y la comunicación global (ampliados a 280 en 2017).", logo: "https://upload.wikimedia.org/wikipedia/commons/5/57/X_logo_2023_%28white%29.png", color: "#1DA1F2" },
        { year: "2010", name: "Instagram", desc: "La era visual. Filtros, fotos cuadradas y el nacimiento de los influencers que dominarían las redes en la década siguiente.", logo: "https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg", color: "#E4405F" },
        { year: "2011", name: "Snapchat", desc: "Introdujo el contenido efímero y las Stories. La privacidad se volvió divertida y creó un formato que muchas redes imitarían.", logo: "https://cdn-icons-png.flaticon.com/128/1409/1409941.png", color: "#FFFC00" },
        { year: "2016", name: "Douyin / 2018 TikTok", desc: "Douyin llegó en China en 2016; TikTok global se lanzó en 2018 tras fusionarse con Musical.ly. Vídeos cortos y algoritmos que aprenden tus gustos en segundos. Es la red social popular más reciente.", logo: "https://upload.wikimedia.org/wikipedia/en/a/a9/TikTok_logo.svg", color: "#00f2ea" },
        { year: "2023", name: "Threads", desc: "La respuesta de Meta al microblogging. Integración masiva con Instagram y búsqueda de rivalizar con X.", logo: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Threads_%28app%29_logo.svg", color: "#000000" }
    ];

    const container = document.getElementById('timelineContent');
    data.forEach(item => {
        const div = document.createElement('div');
        div.className = 'event-wrapper';
        div.innerHTML = `
            <div class="dot"></div>
            <div class="w-full md:w-[45%] opacity-0 anim-text translate-y-10">
                <span class="text-blue-500 font-bold text-lg tracking-tighter">${item.year}</span>
                <h2 class="text-4xl md:text-6xl font-extrabold tracking-tighter my-4 text-white">${item.name}</h2>
                <p class="text-lg text-gray-500 font-medium leading-relaxed">${item.desc}</p>
            </div>
            <div class="w-full md:w-[40%] flex justify-center">
                <div class="logo-card anim-logo" style="border-bottom:4px solid ${item.color}">
                    <img src="${item.logo}" class="max-w-[120px] h-auto brightness-90 grayscale hover:grayscale-0 transition-all duration-500">
                </div>
            </div>
        `;
        container.appendChild(div);
    });

    // animaciones y scroll triggers
    gsap.timeline()
        .fromTo("#mainNav", { y: -100, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: "expo.out" })
        .to("#heroTitle", { opacity: 1, y: 0, duration: 1.5, ease: "power4.out" }, "-=0.8")
        .to("#heroSub", { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" }, "-=1.2");

    setupScrollTriggers();
}

function setupScrollTriggers() {
    const nav = document.getElementById('mainNav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 120) nav.classList.replace('expanded', 'compact');
        else nav.classList.replace('compact', 'expanded');
    });

    gsap.to("#progressBar", {
        height: "100%", ease: "none",
        scrollTrigger: { trigger: "#timelineContent", start: "top 50%", end: "bottom 50%", scrub: true }
    });

    gsap.utils.toArray('.event-wrapper').forEach(w => {
        gsap.timeline({ scrollTrigger: { trigger: w, start: "top 85%" } })
            .to(w.querySelector('.dot'), { scale: 1, borderColor: "#0a84ff", duration: 0.5 })
            .to(w.querySelector('.anim-text'), { opacity: 1, y: 0, duration: 1 }, "-=0.3")
            .to(w.querySelector('.anim-logo'), { opacity: 1, scale: 1, duration: 1.2, ease: "back.out(1.7)" }, "-=0.8");
    });
}