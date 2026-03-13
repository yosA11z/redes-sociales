// Tech data
const techs = [
    { c: 't-html5', l: 'ESTRUCTURA', n: 'HTML5', d: 'Semántica pura, accesibilidad y rendimiento sin compromisos.', i: 'code-2' },
    { c: 't-css3', l: 'ESTILO', n: 'CSS3', d: 'Diseño atómico, variables, grid y animaciones nativas de alto nivel.', i: 'sparkles' },
    { c: 't-js', l: 'LÓGICA', n: 'JavaScript', d: 'ES6+, DOM maestro y experiencias interactivas sin límites.', i: 'zap' },
    { c: 't-gsap', l: 'ANIMACIÓN', n: 'GSAP 3', d: 'El motor de animación más poderoso del planeta. Punto.', i: 'flame' },
    { c: 't-st', l: 'SCROLL', n: 'ScrollTrigger', d: 'Animaciones sincronizadas con el scroll como nunca antes.', i: 'arrow-down' },
    { c: 't-tw', l: 'FRAMEWORK', n: 'Tailwind CSS', d: 'Utility-first. Rapidez inhumana. Diseño sin CSS custom.', i: 'atom' },
    { c: 't-unsplash', l: 'IMAGEN', n: 'Unsplash', d: 'Fotografía profesional gratuita que eleva la narrativa visual.', i: 'image' },
    { c: 't-gfonts', l: 'TIPOGRAFÍA', n: 'Google Fonts', d: 'Fuentes variables optimizadas para legibilidad extrema.', i: 'type' },
    { c: 't-wiki', l: 'CONOCIMIENTO', n: 'Wikimedia', d: 'Fuente inagotable de datos históricos y culturales.', i: 'book-open' }
];

// Bibliography data with links
const biblios = [
    { cat: 'Neurobiología', class: 'cat-neuro', t: 'Social Media Addiction — Harvard', s: 'MCLEAN HOSPITAL', d: 'Análisis del circuito de recompensa y la dopamina en el scroll infinito.', i: 'brain', link: 'https://www.mcleanhospital.org/insight/dopamine-social-media-addiction' },
    { cat: 'Psicología', class: 'cat-psic', t: 'Dismorfia del Filtro', s: 'MIT TECHNOLOGY REVIEW', d: 'Cómo los filtros están redefiniendo la percepción de belleza real.', i: 'smile', link: 'https://www.technologyreview.com/2023/06/15/1073492/filter-dysmorphia-social-media-self-image' },
    { cat: 'Ética Digital', class: 'cat-etic', t: 'The Social Dilemma', s: 'CENTER FOR HUMANE TECH', d: 'El diseño persuasivo como arma de manipulación masiva.', i: 'shield', link: 'https://www.thesocialdilemma.com/' },
    { cat: 'Sociedad', class: 'cat-soc', t: 'Cámaras de Eco', s: 'OXFORD INTERNET INSTITUTE', d: 'Cómo los algoritmos segregan la información y destruyen el debate público.', i: 'users', link: 'https://www.oii.ox.ac.uk/research/projects/echo-chambers-and-filter-bubbles/' },
    { cat: 'Estadística', class: 'cat-data', t: 'Digital 2024 Global', s: 'WE ARE SOCIAL', d: 'Métricas mundiales sobre el consumo de redes y tiempo de pantalla.', i: 'bar-chart-2', link: 'https://www.wearesocial.com/digital-2024-global-overview/' },
    { cat: 'Neurobiología', class: 'cat-neuro', t: 'Neural Plasticity', s: 'OXFORD ACADEMIC', d: 'Efectos de la multitarea digital en la corteza prefrontal.', i: 'activity', link: 'https://academic.oup.com/brain' },
    { cat: 'Psicología', class: 'cat-psic', t: 'FOMO & Anxiety', s: 'UNIVERSITY OF UTAH', d: 'Vínculo entre la necesidad de validación y trastornos de ansiedad.', i: 'heart-pulse', link: 'https://psychology.utah.edu/research/fomo-anxiety-study' },
    { cat: 'Sociedad', class: 'cat-soc', t: 'Digital Identity', s: 'ONTSI GOBIERNO', d: 'Construcción de la personalidad en entornos hiperconectados.', i: 'user', link: 'https://www.ontsi.gob.es/digital-identity-2024' },
    { cat: 'Ciencia', class: 'cat-data', t: 'Blue Light & Sleep', s: 'SLEEP FOUNDATION', d: 'Impacto de la luz azul en la supresión de la melatonina.', i: 'moon', link: 'https://www.sleepfoundation.org/articles/blue-light-and-sleep' },
    { cat: 'Ética Digital', class: 'cat-etic', t: 'Algorithmic Bias', s: 'AI NOW INSTITUTE', d: 'Discriminación y sesgos en los sistemas de recomendación.', i: 'alert-circle', link: 'https://ainowinstitute.org/algorithmic-bias-2024' },
    { cat: 'Neurobiología', class: 'cat-neuro', t: 'Attention Span Study', s: 'MICROSOFT RESEARCH', d: 'La degradación de la atención sostenida en la era del micro-contenido.', i: 'eye', link: 'https://www.microsoft.com/en-us/research/project/attention-span-study/' },
    { cat: 'Psicología', class: 'cat-psic', t: 'Cyberbullying Effects', s: 'UNICEF DATA', d: 'Consecuencias a largo plazo del acoso en entornos digitales.', i: 'frown', link: 'https://data.unicef.org/topic/child-protection/cyberbullying/' },
    { cat: 'Sociedad', class: 'cat-soc', t: 'Social Comparison', s: 'PSYCHOLOGY TODAY', d: 'El impacto de las vidas idealizadas en la autoestima del usuario común.', i: 'share-2', link: 'https://www.psychologytoday.com/us/basics/social-comparison' },
    { cat: 'Ética Digital', class: 'cat-etic', t: 'Data Privacy 2024', s: 'EFF ORGANIZATION', d: 'Análisis sobre la monetización de la conducta humana.', i: 'lock', link: 'https://www.eff.org/deeplinks/2024/03/data-privacy-trends-2024' },
    { cat: 'Estadística', class: 'cat-data', t: 'Gen Z Screen Time', s: 'PEW RESEARCH', d: 'Hábitos de consumo y dependencia digital en la nueva generación.', i: 'clock', link: 'https://www.pewresearch.org/internet/2024/04/15/gen-z-screen-time-report/' }
];

// Counter animation function
function animateCounter(id, target, duration = 2.5) {
    gsap.to({ val: 0 }, {
        val: target,
        duration: duration,
        ease: 'power2.out',
        onUpdate: function () {
            document.getElementById(id).innerText = Math.round(this.targets()[0].val);
        }
    });
}

// Initialize on load
window.addEventListener('load', () => {
    // Render tech cards
    const techContainer = document.getElementById('techContainer');
    techs.forEach(tech => {
        techContainer.innerHTML += `
                    <div class="tech-card ${tech.c} opacity-0 translate-y-20">
                        <span class="tech-label">${tech.l}</span>
                        <h3 class="tech-name">${tech.n}</h3>
                        <p class="tech-desc">${tech.d}</p>
                        <i data-lucide="${tech.i}" class="tech-icon" size="68"></i>
                    </div>
                `;
    });

    // Render bibliography cards
    const bibContainer = document.getElementById('bibContainer');
    biblios.forEach(bib => {
        bibContainer.innerHTML += `
                    <a href="${bib.link}" target="_blank" rel="noopener noreferrer" class="bib-card ${bib.class} opacity-0 translate-y-20">
                        <span class="bib-tag">${bib.cat}</span>
                        <h3 class="bib-title">${bib.t}</h3>
                        <p class="bib-desc">${bib.d}</p>
                        <div class="bib-footer">
                            <span class="bib-source">${bib.s}</span>
                            <div class="bib-icon">
                                <i data-lucide="${bib.i}" size="16"></i>
                            </div>
                        </div>
                    </a>
                `;
    });

    // Initialize icons
    lucide.createIcons();

    // Animate tech cards
    gsap.to('.tech-card', {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.12,
        ease: 'back.out(1.7)'
    });

    // Animate bibliography cards on scroll
    gsap.to('.bib-card', {
        scrollTrigger: {
            trigger: '#bibContainer',
            start: 'top 75%',
            toggleActions: 'play none none none'
        },
        opacity: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: 'power3.out'
    });

    // Animate counters
    animateCounter('count-bib', 15);
    animateCounter('count-tech', 9);
    animateCounter('count-cat', 5);
});

// GSAP ScrollTrigger registration
gsap.registerPlugin(ScrollTrigger);