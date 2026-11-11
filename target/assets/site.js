// Menu mobile
const toggle = document.querySelector('.nav-toggle');
const menu = document.getElementById('nav-menu');
toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
});
menu.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
        menu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
    }
});

// En-tête : ombre au défilement et rubrique courante surlignée dans le menu
const header = document.querySelector('.site-header');
const navLinks = [...menu.querySelectorAll('a[href^="#"]')];
const navTargets = navLinks.map((a) => document.getElementById(a.hash.slice(1)));
function syncHeader() {
    header.classList.toggle('scrolled', window.scrollY > 8);
    const line = window.scrollY + header.offsetHeight + window.innerHeight * 0.25;
    // la rubrique la plus basse déjà atteinte l'emporte
    let best = -1, bestTop = -Infinity;
    navTargets.forEach((el, i) => {
        if (!el) return;
        const top = el.getBoundingClientRect().top + window.scrollY;
        if (top <= line && top > bestTop) { best = i; bestTop = top; }
    });
    navLinks.forEach((a, i) => a.classList.toggle('active', i === best));
}
window.addEventListener('scroll', syncHeader, { passive: true });
window.addEventListener('resize', syncHeader);
syncHeader();

// Vidéos YouTube : seule la miniature est chargée, le lecteur n'arrive qu'au clic
document.querySelectorAll('.yt').forEach((btn) => {
    const id = btn.dataset.id;
    const title = btn.parentElement.querySelector('figcaption').textContent;
    const img = document.createElement('img');
    img.src = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
    img.loading = 'lazy';
    img.alt = '';
    btn.prepend(img);
    btn.addEventListener('click', () => {
        const frame = document.createElement('iframe');
        frame.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1`;
        frame.title = title;
        frame.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
        frame.allowFullscreen = true;
        btn.replaceWith(frame);
    });
});

// Galerie : visionneuse
const lightbox = document.getElementById('lightbox');
const lbImg = lightbox.querySelector('img');
const photos = [...document.querySelectorAll('.gallery a')];
let current = 0;

function show(i) {
    current = (i + photos.length) % photos.length;
    lbImg.src = photos[current].href;
    lbImg.alt = photos[current].querySelector('img').alt;
}

photos.forEach((a, i) => {
    a.addEventListener('click', (e) => {
        e.preventDefault();
        show(i);
        lightbox.showModal();
    });
});
lightbox.querySelector('.lb-close').addEventListener('click', () => lightbox.close());
lightbox.querySelector('.lb-prev').addEventListener('click', () => show(current - 1));
lightbox.querySelector('.lb-next').addEventListener('click', () => show(current + 1));
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) lightbox.close();
});
lightbox.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') show(current - 1);
    if (e.key === 'ArrowRight') show(current + 1);
});

// Parcours : rubriques en accordéon sur petit écran, toujours dépliées sur ordinateur
const small = window.matchMedia('(max-width: 860px)');
const rubriques = [...document.querySelectorAll('details.cv-block')];
function syncRubriques() {
    rubriques.forEach((d) => {
        d.open = !small.matches;
        d.querySelector('summary').tabIndex = small.matches ? 0 : -1;
    });
}
rubriques.forEach((d) => {
    d.querySelector('summary').addEventListener('click', (e) => {
        if (!small.matches) e.preventDefault();
    });
});
small.addEventListener('change', syncRubriques);
syncRubriques();

// Un lien interne vers une rubrique repliée la déplie avant d'y défiler
function openTarget() {
    const cible = document.getElementById(location.hash.slice(1));
    if (cible && cible.matches('details')) {
        cible.open = true;
        cible.scrollIntoView();
    }
}
window.addEventListener('hashchange', openTarget);
openTarget();

// Vidéos et galerie : on n'affiche que les premiers éléments, le reste à la demande
document.querySelectorAll('[data-collapse]').forEach((box) => {
    const rest = [...box.children].slice(Number(box.dataset.collapse));
    if (!rest.length) return;
    rest.forEach((el) => { el.hidden = true; });
    const more = document.createElement('p');
    more.className = 'more';
    const btn = document.createElement('button');
    btn.className = 'btn show-more';
    btn.textContent = `Afficher les ${rest.length} autres ${box.dataset.collapseLabel}`;
    btn.addEventListener('click', () => {
        rest.forEach((el) => { el.hidden = false; });
        more.remove();
    });
    more.append(btn);
    box.after(more);
});

document.getElementById('annee').textContent = new Date().getFullYear();
