/* ==========================================
   AVILIANI PORTFOLIO — JavaScript
   ========================================== */
document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // PRELOADER
    // ==========================================
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => preloader.classList.add('hidden'), 2400);
    });
    // Fallback
    setTimeout(() => preloader.classList.add('hidden'), 4000);

    // ==========================================
    // CUSTOM CURSOR
    // ==========================================
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursorFollower');
    let mouseX = 0, mouseY = 0, posX = 0, posY = 0;

    document.addEventListener('mousemove', e => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });

    function animateCursor() {
        posX += (mouseX - posX) * 0.1;
        posY += (mouseY - posY) * 0.1;
        follower.style.left = posX + 'px';
        follower.style.top = posY + 'px';
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    document.querySelectorAll('a, button, .project-image-wrap, .skill-card').forEach(el => {
        el.addEventListener('mouseenter', () => { cursor.classList.add('active'); follower.classList.add('active'); });
        el.addEventListener('mouseleave', () => { cursor.classList.remove('active'); follower.classList.remove('active'); });
    });

    // ==========================================
    // NAVIGATION
    // ==========================================
    const nav = document.getElementById('nav');
    const navToggle = document.getElementById('navToggle');
    const mobileMenu = document.getElementById('mobileMenu');

    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 60);
    });

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    document.querySelectorAll('.mobile-link, .nav-link').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                navToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ==========================================
    // SCROLL REVEAL
    // ==========================================
    const revealElements = document.querySelectorAll('.scroll-reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    revealElements.forEach(el => revealObserver.observe(el));

    // ==========================================
    // STAT COUNTER ANIMATION
    // ==========================================
    const statNumbers = document.querySelectorAll('.stat-number[data-count]');
    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.dataset.count);
                let current = 0;
                const step = Math.ceil(target / 30);
                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) { current = target; clearInterval(timer); }
                    el.textContent = current;
                }, 50);
                statObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => statObserver.observe(el));

    // ==========================================
    // SKILL BAR ANIMATION
    // ==========================================
    const skillCards = document.querySelectorAll('.skill-card');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target.querySelector('.skill-bar');
                if (bar) {
                    bar.style.setProperty('--bar-width', bar.dataset.width + '%');
                    entry.target.classList.add('animated');
                }
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    skillCards.forEach(el => skillObserver.observe(el));

    // ==========================================
    // PARALLAX ON HERO ORBS
    // ==========================================
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const orb1 = document.querySelector('.hero-orb-1');
        const orb2 = document.querySelector('.hero-orb-2');
        if (orb1) orb1.style.transform = `translate(${scrolled * 0.05}px, ${scrolled * 0.15}px)`;
        if (orb2) orb2.style.transform = `translate(-${scrolled * 0.08}px, -${scrolled * 0.1}px)`;
    });

    // ==========================================
    // MAGNETIC EFFECT ON NAV LOGO
    // ==========================================
    const logo = document.getElementById('navLogo');
    if (logo) {
        logo.addEventListener('mousemove', e => {
            const rect = logo.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
            const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
            logo.style.transform = `translate(${x}px, ${y}px)`;
        });
        logo.addEventListener('mouseleave', () => {
            logo.style.transform = 'translate(0, 0)';
            logo.style.transition = 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)';
        });
        logo.addEventListener('mouseenter', () => {
            logo.style.transition = 'none';
        });
    }

    // ==========================================
    // TILT EFFECT ON PROJECT IMAGES
    // ==========================================
    document.querySelectorAll('.project-image-wrap').forEach(wrap => {
        wrap.addEventListener('mousemove', e => {
            const rect = wrap.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            wrap.style.transform = `perspective(1000px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
        });
        wrap.addEventListener('mouseleave', () => {
            wrap.style.transform = 'perspective(1000px) rotateY(0) rotateX(0)';
            wrap.style.transition = 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)';
        });
        wrap.addEventListener('mouseenter', () => {
            wrap.style.transition = 'none';
        });
    });

    // ==========================================
    // SMOOTH SECTION NUMBER PARALLAX
    // ==========================================
    document.querySelectorAll('.project-number').forEach(num => {
        window.addEventListener('scroll', () => {
            const rect = num.parentElement.getBoundingClientRect();
            const offset = (window.innerHeight - rect.top) * 0.08;
            num.style.transform = `translateY(${offset}px)`;
        });
    });

    // ==========================================
    // CONTACT LINK HOVER RIPPLE
    // ==========================================
    document.querySelectorAll('.contact-link').forEach(link => {
        link.addEventListener('mouseenter', function(e) {
            const rect = this.getBoundingClientRect();
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position:absolute;left:${e.clientX - rect.left}px;top:${e.clientY - rect.top}px;
                width:0;height:0;border-radius:50%;background:rgba(124,92,252,.06);
                transform:translate(-50%,-50%);pointer-events:none;
                animation:rippleOut .6s ease forwards;
            `;
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Add ripple keyframe
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `@keyframes rippleOut{to{width:400px;height:400px;opacity:0}}`;
    document.head.appendChild(rippleStyle);

    // ==========================================
    // PAGE VISIBILITY — TITLE CHANGE
    // ==========================================
    const originalTitle = document.title;
    document.addEventListener('visibilitychange', () => {
        document.title = document.hidden ? 'Come back! 👋 — Aviliani' : originalTitle;
    });

    console.log('%cAviliani Portfolio', 'color:#7c5cfc;font-size:20px;font-weight:bold;');
});