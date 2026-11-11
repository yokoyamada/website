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

document.getElementById('annee').textContent = new Date().getFullYear();
