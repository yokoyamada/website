// Smooth scrolling for navigation
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply to sections
document.querySelectorAll('section > .container').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(section);
});

// Gallery tabs
function showGallery(category) {
    // Hide all gallery contents
    document.querySelectorAll('.gallery-content').forEach(content => {
        content.classList.remove('active');
    });
    // Remove active from all buttons
    document.querySelectorAll('.tab-button').forEach(button => {
        button.classList.remove('active');
    });
    // Show selected category
    document.getElementById(category).classList.add('active');
    // Add active to clicked button
    event.target.classList.add('active');
}

// Lightbox functionality
let currentZoom = 1;
let isDragging = false;
let startX, startY, initialX, initialY;

function openLightbox(src) {
    const lightbox = document.getElementById('lightbox');
    const img = document.getElementById('lightbox-img');
    img.src = src;
    img.style.transform = 'scale(1) translate(0, 0)';
    currentZoom = 1;
    document.getElementById('zoom-slider').value = 100;
    document.getElementById('zoom-level').textContent = '100%';
    lightbox.classList.add('active');
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
}

function updateZoom() {
    const slider = document.getElementById('zoom-slider');
    currentZoom = slider.value / 100;
    document.getElementById('zoom-level').textContent = slider.value + '%';
    const img = document.getElementById('lightbox-img');
    img.style.transform = `scale(${currentZoom}) translate(${img.dataset.translateX || 0}px, ${img.dataset.translateY || 0}px)`;
}

// Add click event to gallery images
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.gallery-grid img').forEach(img => {
        img.addEventListener('click', function() {
            openLightbox(this.src);
        });
    });

    // Lightbox image interactions
    const lightboxImg = document.getElementById('lightbox-img');
    
    // Mouse wheel zoom
    lightboxImg.addEventListener('wheel', function(e) {
        e.preventDefault();
        const zoomStep = 0.1;
        if (e.deltaY < 0) {
            currentZoom = Math.min(currentZoom + zoomStep, 3);
        } else {
            currentZoom = Math.max(currentZoom - zoomStep, 0.5);
        }
        document.getElementById('zoom-slider').value = currentZoom * 100;
        document.getElementById('zoom-level').textContent = Math.round(currentZoom * 100) + '%';
        this.style.transform = `scale(${currentZoom}) translate(${this.dataset.translateX || 0}px, ${this.dataset.translateY || 0}px)`;
    });

    // Drag functionality
    lightboxImg.addEventListener('mousedown', function(e) {
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        initialX = parseFloat(this.dataset.translateX || 0);
        initialY = parseFloat(this.dataset.translateY || 0);
        this.style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', function(e) {
        if (isDragging) {
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;
            lightboxImg.dataset.translateX = initialX + dx;
            lightboxImg.dataset.translateY = initialY + dy;
            lightboxImg.style.transform = `scale(${currentZoom}) translate(${lightboxImg.dataset.translateX}px, ${lightboxImg.dataset.translateY}px)`;
        }
    });

    document.addEventListener('mouseup', function() {
        isDragging = false;
        lightboxImg.style.cursor = 'grab';
    });

    // Touch events for mobile
    let initialDistance = 0;
    let initialZoom = 1;

    lightboxImg.addEventListener('touchstart', function(e) {
        if (e.touches.length === 2) {
            initialDistance = getDistance(e.touches[0], e.touches[1]);
            initialZoom = currentZoom;
        }
    });

    lightboxImg.addEventListener('touchmove', function(e) {
        if (e.touches.length === 2) {
            e.preventDefault();
            const distance = getDistance(e.touches[0], e.touches[1]);
            const scale = distance / initialDistance;
            currentZoom = Math.max(0.5, Math.min(3, initialZoom * scale));
            document.getElementById('zoom-slider').value = currentZoom * 100;
            document.getElementById('zoom-level').textContent = Math.round(currentZoom * 100) + '%';
            this.style.transform = `scale(${currentZoom}) translate(${this.dataset.translateX || 0}px, ${this.dataset.translateY || 0}px)`;
        }
    });

    // Close on background click
    document.getElementById('lightbox').addEventListener('click', function(e) {
        if (e.target === this) {
            closeLightbox();
        }
    });
});

function getDistance(touch1, touch2) {
    const dx = touch1.clientX - touch2.clientX;
    const dy = touch1.clientY - touch2.clientY;
    return Math.sqrt(dx * dx + dy * dy);
}

// Add CSS for piano keys
const style = document.createElement('style');
style.textContent = `
    .piano-keys {
        position: fixed;
        bottom: 20px;
        right: 20px;
        display: flex;
        opacity: 0.3;
        z-index: -1;
    }
    
    .white-key, .black-key {
        width: 20px;
        height: 60px;
        background: #fff;
        border: 1px solid #ccc;
        margin-right: 2px;
    }
    
    .black-key {
        background: #000;
        width: 15px;
        height: 40px;
        position: relative;
        left: -8px;
        z-index: 1;
    }
    
    @keyframes keyPress {
        0% { transform: scaleY(1); }
        50% { transform: scaleY(0.9); }
        100% { transform: scaleY(1); }
    }
`;
document.head.appendChild(style);