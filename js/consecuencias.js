window.onload = () => {
    lucide.createIcons();
    gsap.registerPlugin(ScrollTrigger);

    // Animación de Entrada
    gsap.to("#main-title", { opacity: 1, y: 0, duration: 1.5, ease: "expo.out" });

    // Revelado de Secciones
    gsap.utils.toArray(".glass-card, .insight-card").forEach(el => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: "top 90%",
                toggleActions: "play none none none"
            },
            y: 40,
            opacity: 0,
            duration: 1.2,
            ease: "power4.out"
        });
    });

    createDopamineParticles();
    handleNavScroll();
};

function createDopamineParticles() {
    const canvas = document.getElementById('dopamine-canvas');
    const counter = document.getElementById('particle-count');
    let count = 0;

    setInterval(() => {
        const p = document.createElement('div');
        const size = Math.random() * 12 + 4;
        p.className = 'particle';
        p.style.width = `${size}px`;
        p.style.height = `${size}px`;
        p.style.left = `50%`;
        p.style.top = `50%`;
        canvas.appendChild(p);

        count++;
        counter.innerText = count;

        gsap.to(p, {
            x: (Math.random() - 0.5) * 600,
            y: (Math.random() - 0.5) * 600,
            opacity: 0,
            scale: 0,
            duration: 2.5,
            ease: "power1.out",
            onComplete: () => {
                p.remove();
                count--;
                counter.innerText = count;
            }
        });
    }, 120);
}

function handleNavScroll() {
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-item');

    window.addEventListener('scroll', () => {
        let current = "";
        sections.forEach(s => {
            if (pageYOffset >= s.offsetTop - 300) current = s.getAttribute('id');
        });
        navItems.forEach(item => {
            item.classList.toggle('active', item.getAttribute('href') === `#${current}`);
        });
    });
}