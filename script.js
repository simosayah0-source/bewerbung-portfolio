/* ==========================================================================
   Loading Screen
   ========================================================================== */
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 1000); // Zeige Ladescreen für 1 Sekunde
});

/* ==========================================================================
   Custom Cursor
   ========================================================================== */
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

// Nur ausführen, wenn wir nicht auf Touch-Geräten sind
if (window.matchMedia("(pointer: fine)").matches) {
    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        // Weiche Animation für den äußeren Kreis
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });

    // Hover-Effekte für anklickbare Elemente
    const hoverElements = document.querySelectorAll('a, button, .play-overlay, input, textarea, .filter-btn');
    
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            document.body.classList.add('cursor-hover');
        });
        el.addEventListener('mouseleave', () => {
            document.body.classList.remove('cursor-hover');
        });
    });
}

/* ==========================================================================
   Mobile Menu & Navbar Scroll
   ========================================================================== */
const navbar = document.getElementById('navbar');
const mobileBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.padding = '1rem 2rem';
        navbar.style.background = 'rgba(2, 5, 10, 0.9)';
    } else {
        navbar.style.padding = '1.5rem 2rem';
        navbar.style.background = 'rgba(2, 5, 10, 0.7)';
    }
});

mobileBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = mobileBtn.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

navItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = mobileBtn.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

/* ==========================================================================
   Scroll Reveal Animations
   ========================================================================== */
const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const revealOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, revealOptions);

revealElements.forEach(el => {
    revealOnScroll.observe(el);
});

/* ==========================================================================
   Hero Canvas Particles
   ========================================================================== */
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
    }
    draw() {
        ctx.fillStyle = `rgba(212, 175, 55, ${this.opacity})`; // Gold color
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particlesArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / 15000;
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    }
    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
});

/* ==========================================================================
   Document Generation & Filtering (15 Items)
   ========================================================================== */
const documents = [
    {
    title: "Lebenslauf",
    category: "cv",
    desc: "Detaillierter tabellarischer Lebenslauf mit allen wichtigen beruflichen und schulischen Stationen.",
    file: "assets/lebenslauf.pdf"
},

{
    title: "Motivationsschreiben",
    category: "sonstiges",
    desc: "Persönliches Anschreiben an zukünftige Arbeitgeber in Deutschland.",
    file: "assets/motivationsschreiben.pdf"
},

{
    title: "ÖSD-Zertifikat B1",
    category: "zertifikat",
    desc: "Offizieller Nachweis meiner Deutschkenntnisse auf dem B1-Niveau des GER.",
    file: "assets/osd-b1.pdf"
},

{
    title: "Baccalauréat Zeugnis",
    category: "zertifikat",
    desc: "Übersetztes Abschlusszeugnis der fachgebundenen Hochschulreife.",
    file: "assets/baccalaureat.pdf"
},

{
    title: "Fächer- und Notenübersicht",
    category: "zertifikat",
    desc: "Übersicht meiner Schulnoten und Fächer.",
    file: "assets/notenuebersicht.pdf"
},

{
    title: "Praktikumsbescheinigung",
    category: "zertifikat",
    desc: "Bescheinigung über mein Praktikum im Bereich Buchhaltung.",
    file: "assets/praktikum.pdf"
},

{
    title: "Graphic Design Zertifikat",
    category: "zeugnis",
    desc: "Zertifikat über den erfolgreichen Abschluss im Bereich Graphic Design.",
    file: "assets/graphic-design.pdf"
},

{
    title: "Office Computer Zertifikat",
    category: "sonstiges",
    desc: "Nachweis über Kenntnisse in Office Computer und digitalen Anwendungen.",
    file: "assets/office-computer.pdf"
},

{
    title: "ÖSD Zertifikat B1 Lesen",
    category: "zeugnis",
    desc: "Nachweis meiner Deutschkenntnisse im Modul Lesen.",
    file: "assets/b1-lesen.pdf"
},

{
    title: "ÖSD Zertifikat B1 Schreiben",
    category: "sonstiges",
    desc: "Nachweis meiner Deutschkenntnisse im Modul Schreiben.",
    file: "assets/b1-schreiben.pdf"
},

{
    title: "ÖSD Zertifikat B1 Sprechen",
    category: "zeugnis",
    desc: "Nachweis meiner Deutschkenntnisse im Modul Sprechen.",
    file: "assets/b1-sprechen.pdf"
},

{
    title: "ÖSD Zertifikat B1 Hören",
    category: "zeugnis",
    desc: "Nachweis meiner Deutschkenntnisse im Modul Hören.",
    file: "assets/b1-hoeren.pdf"
}
];
const docsContainer = document.getElementById('docs-container');
const searchInput = document.getElementById('doc-search');
const filterBtns = document.querySelectorAll('.filter-btn');

function renderDocuments(docs) {
    docsContainer.innerHTML = '';
     if (docs.length === 0) {
        docsContainer.innerHTML = '<p class="text-center" style="grid-column: 1/-1; color: var(--text-muted);">Keine Dokumente gefunden.</p>';
        return;
    }
 docs.forEach(doc => {
        const card = document.createElement('div');
        card.className = 'doc-card reveal-up active'; // add active so it doesn't wait for scroll
        card.innerHTML = `
    <div class="doc-icon">
        <i class="fas fa-file-pdf"></i>
    </div>
<h3>${doc.title}</h3>
<p>${doc.desc}</p>
<div class="doc-actions">
        <a href="${doc.file}" target="_blank" class="btn btn-outline">
            <i class="fas fa-eye"></i> Öffnen
        </a>
<a href="${doc.file}" download class="btn btn-primary">
            <i class="fas fa-download"></i> Laden
        </a>
    </div>
        `;
        docsContainer.appendChild(card);
    });
}

// Initial render
renderDocuments(documents);

// Filter logic
let currentFilter = 'all';
let currentSearch = '';

function filterAndRender() {
    const filteredDocs = documents.filter(doc => {
        const matchesFilter = currentFilter === 'all' || doc.category === currentFilter;
        const matchesSearch = doc.title.toLowerCase().includes(currentSearch) || 
                              doc.desc.toLowerCase().includes(currentSearch);
        return matchesFilter && matchesSearch;
    });
    renderDocuments(filteredDocs);
}

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active class
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        currentFilter = btn.getAttribute('data-filter');
        filterAndRender();
    });
});

searchInput.addEventListener('input', (e) => {
    currentSearch = e.target.value.toLowerCase();
    filterAndRender();
});

/* ==========================================================================
   Modals Logic
   ========================================================================== */
const videoModal = document.getElementById('video-modal');
const motivationModal = document.getElementById('motivation-modal');
const closeBtns = document.querySelectorAll('.close-modal');

// Hero play button -> Video Modal
document.getElementById('open-intro-video').addEventListener('click', () => openVideoModal());
document.getElementById('hero-play').addEventListener('click', () => openVideoModal());

window.openVideoModal = function() {
    videoModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

window.openMotivationModal = function() {
    motivationModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    videoModal.classList.remove('active');
    motivationModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

closeBtns.forEach(btn => {
    btn.addEventListener('click', closeModal);
});

// Close modal when clicking outside content
window.addEventListener('click', (e) => {
    if (e.target === videoModal || e.target === motivationModal) {
        closeModal();
    }
});

// Escape key to close modals
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

/* ==========================================================================
   Back to Top Button
   ========================================================================== */
const backToTopBtn = document.getElementById('back-to-top');

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
