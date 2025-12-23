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

// Piano key animation effect (subtle)
function createPianoKeys() {
    const keys = document.createElement('div');
    keys.className = 'piano-keys';
    keys.innerHTML = `
        <div class="white-key"></div>
        <div class="black-key"></div>
        <div class="white-key"></div>
        <div class="black-key"></div>
        <div class="white-key"></div>
        <div class="white-key"></div>
        <div class="black-key"></div>
        <div class="white-key"></div>
        <div class="black-key"></div>
        <div class="white-key"></div>
        <div class="black-key"></div>
        <div class="white-key"></div>
    `;
    document.body.appendChild(keys);
    
    // Animate keys occasionally
    setInterval(() => {
        const randomKey = keys.children[Math.floor(Math.random() * keys.children.length)];
        randomKey.style.animation = 'keyPress 0.3s ease';
        setTimeout(() => {
            randomKey.style.animation = '';
        }, 300);
    }, 5000);
}

// Add piano keys to hero
document.addEventListener('DOMContentLoaded', createPianoKeys);

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
document.head.appendChild(style);</content>
<parameter name="filePath">c:\Users\HULULWABURHAN\yoko\script.js