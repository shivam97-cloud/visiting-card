// Enhanced hover effects
const card = document.querySelector('.visiting-card');
const cardContainer = document.querySelector('.card-container');

card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
});

card.addEventListener('mouseleave', () => {
    card.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
});

// Click animation
card.addEventListener('click', () => {
    card.style.animation = 'none';
    card.offsetHeight; // Trigger reflow
    card.style.animation = 'cardEntrance 0.8s ease-out';
});

// Dynamic particle generation
function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.width = particle.style.height = (Math.random() * 10 + 5) + 'px';
    particle.style.animationDelay = Math.random() * 6 + 's';
    particle.style.animationDuration = (Math.random() * 3 + 4) + 's';
    
    document.querySelector('.floating-particles').appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, 8000);
}

// Create particles continuously
setInterval(createParticle, 800);

// Logo image error handling and fallback
document.addEventListener('DOMContentLoaded', function() {
    const logoImg = document.querySelector('.logo-image');
    
    logoImg.addEventListener('error', function() {
        // Create fallback logo design if image fails to load
        const fallbackLogo = document.createElement('div');
        fallbackLogo.className = 'logo-fallback';
        fallbackLogo.innerHTML = `
            <div class="fallback-abc">
                <span style="color: #2196F3;">A</span>
                <span style="color: #FF9800;">B</span>
                <span style="color: #4CAF50;">C</span>
            </div>
            <div class="fallback-square">SQUARE</div>
        `;
        
        fallbackLogo.style.cssText = `
            width: 80px;
            height: 80px;
            border-radius: 50%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
            animation: logoFloat 4s ease-in-out infinite;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            border: 3px solid rgba(255, 255, 255, 0.2);
        `;
        
        const style = document.createElement('style');
        style.textContent = `
            .fallback-abc {
                font-size: 16px;
                font-weight: 900;
                text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
            }
            .fallback-square {
                font-size: 8px;
                font-weight: 600;
                margin-top: 2px;
                opacity: 0.9;
            }
        `;
        document.head.appendChild(style);
        
        logoImg.parentNode.replaceChild(fallbackLogo, logoImg);
    });
});

// Add smooth scrolling effect for mobile
if (window.innerWidth <= 768) {
    document.body.style.overflow = 'auto';
}

// Performance optimization - pause animations when not visible
let animationsPaused = false;

document.addEventListener('visibilitychange', function() {
    const elements = document.querySelectorAll('*');
    
    if (document.hidden && !animationsPaused) {
        elements.forEach(el => {
            el.style.animationPlayState = 'paused';
        });
        animationsPaused = true;
    } else if (!document.hidden && animationsPaused) {
        elements.forEach(el => {
            el.style.animationPlayState = 'running';
        });
        animationsPaused = false;
    }
});