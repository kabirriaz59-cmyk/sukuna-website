function activateMalevolentShrine() {
    // Select the domain section so slashes stay inside it
    const domainSection = document.querySelector('.domain-info-section');
    
    // Start the screen shake on the section
    domainSection.classList.add('shake-screen');
    
    // Spawn 70 slashes for a more chaotic "Malevolent Shrine" feel
    for (let i = 0; i < 70; i++) {
        setTimeout(() => {
            createSlash(domainSection);
        }, i * 15); 
    }

    // Stop shaking after 1.5 seconds
    setTimeout(() => {
        domainSection.classList.remove('shake-screen');
    }, 1500);
}

function createSlash(container) {
    const slash = document.createElement('div');
    slash.className = 'dynamic-slash';
    
    // Randomize size: a mix of small and very large slashes
    const length = Math.random() * 800 + 400 + "px"; 
    const thickness = Math.random() * 3 + 1 + "px"; 
    
    // Position relative to the container (Domain Section)
    const top = Math.random() * 100 + "%";
    const left = Math.random() * 100 + "%";
    
    // Full 360-degree rotation creates vertical, horizontal, and diagonal slashes
    const rotate = Math.random() * 360 + "deg";

    slash.style.width = length;
    slash.style.height = thickness;
    slash.style.top = top;
    slash.style.left = left;
    // translate(-50%, -50%) ensures they rotate from their center
    slash.style.transform = `translate(-50%, -50%) rotate(${rotate})`;

    container.appendChild(slash);

    // Remove from DOM after animation
    setTimeout(() => {
        slash.style.opacity = '0';
        setTimeout(() => slash.remove(), 100);
    }, 250);
}
// Intersection Observer to trigger reveal on scroll
const observerOptions = {
    threshold: 0.2 // Triggers when 20% of the section is visible
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Find the content box inside this section and add the active class
            const contentBox = entry.target.querySelector('.content-box');
            if (contentBox) {
                contentBox.classList.add('reveal-active');
            }
            // Stop observing once the animation has played
            revealObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Start watching the domain info section
document.addEventListener('DOMContentLoaded', () => {
    const domainSection = document.querySelector('.domain-info-section');
    if (domainSection) {
        revealObserver.observe(domainSection);
    }
});
// This script reveals the content box when the section snaps into view
const revealOptions = {
    threshold: 0.3 // Triggers when 30% of the section is visible
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const box = entry.target.querySelector('.content-box');
            if (box) {
                box.classList.add('reveal-active');
            }
        }
    });
}, revealOptions);

// Initialize after the page loads
document.addEventListener('DOMContentLoaded', () => {
    const domainSection = document.querySelector('.domain-info-section');
    if (domainSection) {
        observer.observe(domainSection);
    }
});
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let particlesArray;
let mouse = {
    x: null,
    y: null,
    radius: 150 // Distance where particles start reacting to mouse
};

// Track mouse movement
window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
});

// Resize canvas to fill the screen
function initCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        // Cursed energy colors: mix of crimson and deep purple/black
        this.color = Math.random() > 0.5 ? '#8B0000' : '#1a0000';
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Interaction with mouse (push particles away)
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < mouse.radius) {
            if (mouse.x < this.x && this.x < canvas.width - this.size * 10) this.x += 10;
            if (mouse.x > this.x && this.x > this.size * 10) this.x -= 10;
            if (mouse.y < this.y && this.y < canvas.height - this.size * 10) this.y += 10;
            if (mouse.y > this.y && this.y > this.size * 10) this.y -= 10;
        }

        // Screen wrap
        if (this.x > canvas.width) this.x = 0;
        else if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        else if (this.y < 0) this.y = canvas.height;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particlesArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / 9000;
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

window.addEventListener('resize', () => {
    initCanvas();
    initParticles();
});

// Start the effect
initCanvas();
initParticles();
animateParticles();
// Add this to your existing Intersection Observer in script.js
document.addEventListener('DOMContentLoaded', () => {
    const domainSection = document.querySelector('.domain-info-section');
    const fightSection = document.querySelector('.fight-section'); // New target
    
    if (domainSection) observer.observe(domainSection);
    if (fightSection) observer.observe(fightSection);
});
function triggerUltimateClash() {
    const fightSection = document.querySelector('.fight-section');
    
    // Add a massive screen shake
    fightSection.classList.add('shake-screen');
    
    // Spawn Purple and Red particles rapidly at the center
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            createClashParticle(fightSection);
        }, i * 5);
    }

    setTimeout(() => {
        fightSection.classList.remove('shake-screen');
    }, 1000);
}

function createClashParticle(container) {
    const p = document.createElement('div');
    p.className = 'dynamic-slash'; // Reuse your slash styling for speed
    
    // Randomize colors between Purple (Gojo) and Red (Sukuna)
    const color = Math.random() > 0.5 ? '#8000ff' : '#ff0000';
    
    p.style.width = Math.random() * 200 + 100 + "px";
    p.style.height = "4px";
    p.style.background = color;
    p.style.boxShadow = `0 0 20px ${color}`;
    
    // Position exactly at the center "VS" point
    p.style.top = "50%";
    p.style.left = "50%";
    
    // Explode outwards in all directions
    const rotate = Math.random() * 360 + "deg";
    p.style.transform = `translate(-50%, -50%) rotate(${rotate})`;

    container.appendChild(p);

    // Faster removal for the explosion effect
    setTimeout(() => {
        p.style.opacity = '0';
        setTimeout(() => p.remove(), 100);
    }, 400);
}
document.addEventListener('DOMContentLoaded', () => {
    const sections = [
        document.querySelector('.domain-info-section'),
        document.querySelector('.fight-section'),
        document.querySelector('.heian-section') // Add this line
    ];
    
    sections.forEach(sec => {
        if (sec) observer.observe(sec);
    });
});
// Add this to your DOMContentLoaded listener
const heianBg = document.querySelector('.heian-section');
if (heianBg) {
    window.addEventListener('scroll', () => {
        let scrollValue = window.scrollY;
        // Subtle parallax zoom based on scroll
        heianBg.style.backgroundSize = `${100 + scrollValue / 50}%`;
    });
}
// Add touch support for particles
window.addEventListener('touchstart', (event) => {
    mouse.x = event.touches[0].clientX;
    mouse.y = event.touches[0].clientY;
});

window.addEventListener('touchend', () => {
    mouse.x = null;
    mouse.y = null;
});

// Update the reveal observer for mobile 
// Lower the threshold so animations trigger sooner on small screens
const mobileOptions = {
    threshold: 0.1 
};
