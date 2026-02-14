window.addEventListener('load', function () {
    const splash = document.getElementById('splash-screen');
    const audio = document.getElementById('splash-audio');

    // تشغيل الصوت مع أول تفاعل
    function tryPlay() {
        audio.play().catch(() => { });
    }

    // محاولة تلقائية
    tryPlay();

    // تشغيل مع أول كليك
    document.addEventListener('click', tryPlay, { once: true });

    // إخفاء الشاشة بعد 7 ثواني
    setTimeout(() => {
        // خفض الصوت
        let vol = 1;
        const fade = setInterval(() => {
            vol -= 0.1;
            if (vol <= 0) {
                audio.pause();
                clearInterval(fade);
            } else {
                audio.volume = vol;
            }
        }, 100);

        // إخفاء الشاشة
        splash.classList.add('fade-out');
        setTimeout(() => {
            splash.style.display = 'none';
        }, 1500);
    }, 7000);
});

// ========== تأثيرات 3D تتبع الماوس ==========
document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        card.addEventListener('mousemove', function (e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            card.style.transform = `
                translateY(-15px) 
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg) 
                scale(1.05)
            `;
        });

        card.addEventListener('mouseleave', function () {
            card.style.transform = '';
        });
    });
});

// ========== جزيئات ذهبية متحركة إضافية ==========
function createFloatingParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'floating-particles';
    particlesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9999;
        overflow: hidden;
    `;

    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: radial-gradient(circle, #d4af37, #bfa36a);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: floatParticle ${Math.random() * 10 + 10}s linear infinite;
            animation-delay: ${Math.random() * 5}s;
            opacity: ${Math.random() * 0.5 + 0.3};
            box-shadow: 0 0 10px rgba(191, 163, 106, 0.5);
        `;
        particlesContainer.appendChild(particle);
    }

    document.body.appendChild(particlesContainer);
}

// إضافة CSS للأنيميشن
const style = document.createElement('style');
style.textContent = `
    @keyframes floatParticle {
        0% {
            transform: translateY(0) translateX(0) rotate(0deg);
        }
        50% {
            transform: translateY(-50vh) translateX(${Math.random() * 100 - 50}px) rotate(180deg);
        }
        100% {
            transform: translateY(-100vh) translateX(0) rotate(360deg);
        }
    }
`;
document.head.appendChild(style);

// تشغيل الجزيئات بعد تحميل الصفحة
window.addEventListener('load', createFloatingParticles);

// ========== سكرول ناعم للأقسام ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========== تأثير موجة عند الضغط ==========
document.addEventListener('click', function (e) {
    const ripple = document.createElement('div');
    ripple.style.cssText = `
        position: fixed;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(191, 163, 106, 0.6), transparent);
        left: ${e.clientX - 15}px;
        top: ${e.clientY - 15}px;
        pointer-events: none;
        animation: rippleEffect 0.8s ease-out;
        z-index: 10000;
    `;

    document.body.appendChild(ripple);

    setTimeout(() => ripple.remove(), 800);
});

const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes rippleEffect {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);