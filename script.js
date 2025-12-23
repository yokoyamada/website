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