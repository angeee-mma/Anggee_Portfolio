// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: "smooth"
                });
            }
        }
        // otherwise allow normal navigation to another page
    });
});

// Interactive cursor glow effect
document.addEventListener('DOMContentLoaded', function() {
    const cursorGlow = document.createElement('div');
    cursorGlow.className = 'cursor-glow';
    document.body.appendChild(cursorGlow);

    let mouseX = 0;
    let mouseY = 0;
    let glowX = 0;
    let glowY = 0;

    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function updateCursorGlow() {
        glowX += (mouseX - glowX) * 0.1;
        glowY += (mouseY - glowY) * 0.1;

        cursorGlow.style.left = glowX - 10 + 'px';
        cursorGlow.style.top = glowY - 10 + 'px';

        requestAnimationFrame(updateCursorGlow);
    }

    updateCursorGlow();

    // Add glow effect on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .project, .card, .skills-grid span');

    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursorGlow.classList.add('active');
        });

        element.addEventListener('mouseleave', () => {
            cursorGlow.classList.remove('active');
        });
    });
});

// Scroll animations
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

// Observe all sections for scroll animations
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(section);
});

// Project cards hover effect with random sparkle
document.querySelectorAll('.project').forEach(project => {
    project.addEventListener('mouseenter', function() {
        const sparkles = ['✨', '⭐', '💫', '🌟'];
        const randomSparkle = sparkles[Math.floor(Math.random() * sparkles.length)];

        // Create floating sparkle effect
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                const sparkle = document.createElement('div');
                sparkle.textContent = randomSparkle;
                sparkle.style.position = 'absolute';
                sparkle.style.left = Math.random() * 100 + '%';
                sparkle.style.top = Math.random() * 100 + '%';
                sparkle.style.fontSize = '20px';
                sparkle.style.pointerEvents = 'none';
                sparkle.style.animation = 'sparkleFloat 2s ease-out forwards';
                sparkle.style.zIndex = '100';

                this.appendChild(sparkle);

                setTimeout(() => {
                    sparkle.remove();
                }, 2000);
            }, i * 200);
        }
    });
});

// Add sparkle animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes sparkleFloat {
        0% {
            transform: translateY(0) scale(0) rotate(0deg);
            opacity: 1;
        }
        50% {
            transform: translateY(-20px) scale(1) rotate(180deg);
            opacity: 0.8;
        }
        100% {
            transform: translateY(-40px) scale(0) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Typing effect for hero text (optional enhancement)
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Add click effects to buttons
document.querySelectorAll('.btn, .btn-outline').forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.3)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s linear';
        ripple.style.left = (e.offsetX - 10) + 'px';
        ripple.style.top = (e.offsetY - 10) + 'px';
        ripple.style.width = '20px';
        ripple.style.height = '20px';

        this.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Parallax effect for floating objects
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;

    document.querySelectorAll('.shape').forEach((shape, index) => {
        const speed = (index + 1) * 0.1;
        shape.style.transform = `translateY(${rate * speed}px)`;
    });
});

// Dynamic gallery loader using manifest file
function loadGalleries() {
    fetch('media/manifest.json')
        .then(res => res.json())
        .then(manifest => {
            const grids = document.querySelectorAll('.gallery-grid[data-folder]');
            console.log('Found', grids.length, 'gallery grids');
            grids.forEach(grid => {
                const folder = grid.getAttribute('data-folder');
                let files = [];
                console.log('Loading gallery from:', folder);
                
                if (folder.includes('videos')) {
                    // Check which video gallery based on page path
                    const path = window.location.pathname;
                    if (path.includes('ai-content')) files = manifest.videos['ai-content'] || [];
                    else if (path.includes('motion-graphics')) files = manifest.videos['motion-graphics'] || [];
                    else files = manifest.videos['video-editing'] || [];
                } else if (folder.includes('images')) {
                    // determine which category based on page
                    const path = window.location.pathname;
                    if (path.includes('graphic-design')) files = manifest.images['graphic-design'] || [];
                    else if (path.includes('2d-assets')) files = manifest.images['2d-assets'] || [];
                    else if (path.includes('3d-assets')) files = manifest.images['3d-assets'] || [];
                    else if (path.includes('ui-ux')) files = manifest.images['ui-ux'] || [];
                    else if (path.includes('web-development')) files = manifest.images['web-development'] || [];
                }
                
                console.log('Found', files.length, 'files to display');
                files.forEach(entry => {
                    // entry may be a string (filename) or object with metadata
                    let filename, title, description, tools;
                    if (typeof entry === 'string') {
                        filename = entry;
                        title = entry.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
                    } else {
                        filename = entry.file;
                        title = entry.title || entry.file.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
                        description = entry.description || '';
                        tools = entry.tools || [];
                    }

                    const item = document.createElement('div');
                    item.className = 'gallery-item';
                    const media = document.createElement('div');
                    media.className = 'gallery-media';
                    
                    const ext = filename.split('.').pop().toLowerCase();
                    
                    if (['mp4', 'webm'].includes(ext)) {
                        const vid = document.createElement('video');
                        vid.setAttribute('width', '100%');
                        vid.setAttribute('height', '300');
                        vid.setAttribute('controls', '');
                        const src = document.createElement('source');
                        src.src = folder + filename;
                        src.type = 'video/' + ext;
                        vid.appendChild(src);
                        media.appendChild(vid);
                    } else {
                        const img = document.createElement('img');
                        img.src = folder + filename;
                        img.alt = title;
                        media.appendChild(img);
                    }
                    
                    item.appendChild(media);
                    const content = document.createElement('div');
                    content.className = 'gallery-content';
                    const h3 = document.createElement('h3');
                    h3.textContent = title;
                    content.appendChild(h3);
                    if (description) {
                        const p = document.createElement('p');
                        p.textContent = description;
                        content.appendChild(p);
                    }
                    if (tools && tools.length) {
                        const toolsDiv = document.createElement('div');
                        toolsDiv.className = 'tools-used';
                        tools.forEach(tool => {
                            const span = document.createElement('span');
                            span.textContent = tool;
                            toolsDiv.appendChild(span);
                        });
                        content.appendChild(toolsDiv);
                    }
                    item.appendChild(content);
                    grid.appendChild(item);
                });
            });
        })
        .catch(err => console.error('Manifest load error:', err));
}

// Run loader when DOM is ready or immediately if already ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadGalleries);
} else {
    loadGalleries();
}

// Random color change for skills on hover
document.querySelectorAll('.skills-grid span').forEach(skill => {
    const colors = ['#ef4444', '#dc2626', '#b91c1c', '#991b1b', '#7f1d1d'];
    let currentColorIndex = 0;

    skill.addEventListener('mouseenter', function() {
        const interval = setInterval(() => {
            this.style.background = colors[currentColorIndex];
            currentColorIndex = (currentColorIndex + 1) % colors.length;
        }, 100);

        skill.addEventListener('mouseleave', function() {
            clearInterval(interval);
            this.style.background = 'rgba(239, 68, 68, 0.1)';
        }, { once: true });
    });
});
