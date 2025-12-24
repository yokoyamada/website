// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    const navUl = document.querySelector('nav ul');

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navUl.classList.toggle('active');
            menuToggle.classList.toggle('active');

            // Animate hamburger icon
            const spans = menuToggle.querySelectorAll('span');
            if (menuToggle.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // Close mobile menu when clicking on navigation links (exclude social icons)
    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navUl.classList.remove('active');
                menuToggle.classList.remove('active');

                const spans = menuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    });

    // Social icons should work normally - no special handling needed
    // They are now positioned fixed on mobile, so they don't interfere with menu
});

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

// Lightbox functionality
let currentZoom = 1;
let isDragging = false;
let startX, startY, initialX, initialY;
let currentImageIndex = 0;
let galleryImages = [];

function openLightbox(src) {
    const lightbox = document.getElementById('lightbox');
    const img = document.getElementById('lightbox-img');

    // Find the index of the clicked image
    galleryImages = Array.from(document.querySelectorAll('.gallery-grid img'));
    currentImageIndex = galleryImages.findIndex(image => image.src.includes(src.split('/').pop()));

    img.src = src;
    img.style.transform = 'scale(1) translate(0, 0)';
    currentZoom = 1;
    document.getElementById('zoom-slider').value = 100;
    document.getElementById('zoom-level').textContent = '100%';
    lightbox.classList.add('active');

    updateLightboxNavigation();

    // Add keyboard navigation
    document.addEventListener('keydown', handleKeydown);
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');

    // Remove keyboard navigation
    document.removeEventListener('keydown', handleKeydown);
}

function handleKeydown(e) {
    if (e.key === 'ArrowLeft') {
        e.preventDefault();
        navigateLightbox(-1);
    } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        navigateLightbox(1);
    } else if (e.key === 'Escape') {
        e.preventDefault();
        closeLightbox();
    }
}

function navigateLightbox(direction) {
    const newIndex = currentImageIndex + direction;
    if (newIndex >= 0 && newIndex < galleryImages.length) {
        currentImageIndex = newIndex;
        const img = document.getElementById('lightbox-img');
        img.src = galleryImages[currentImageIndex].src;
        img.style.transform = 'scale(1) translate(0, 0)';
        currentZoom = 1;
        document.getElementById('zoom-slider').value = 100;
        document.getElementById('zoom-level').textContent = '100%';
        updateLightboxNavigation();
    }
}

function updateLightboxNavigation() {
    const prevBtn = document.querySelector('.lightbox-nav.prev');
    const nextBtn = document.querySelector('.lightbox-nav.next');

    prevBtn.style.opacity = currentImageIndex === 0 ? '0.3' : '1';
    nextBtn.style.opacity = currentImageIndex === galleryImages.length - 1 ? '0.3' : '1';
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

    // Touch/swipe navigation in lightbox
    let touchStartX = 0;
    let touchEndX = 0;

    lightboxImg.addEventListener('touchstart', function(e) {
        touchStartX = e.touches[0].clientX;
    });

    lightboxImg.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].clientX;
        const diffX = touchStartX - touchEndX;
        const threshold = 50;

        if (Math.abs(diffX) > threshold) {
            if (diffX > 0) {
                navigateLightbox(1); // Swipe left -> next image
            } else {
                navigateLightbox(-1); // Swipe right -> previous image
            }
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