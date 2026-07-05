/* =========================================
   SpeakSmart Landing — Interactivity
   Author: MiniMax Agent
   ========================================= */

(function () {
    'use strict';

    // ============== Footer Year ==============
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // ============== Mobile Navigation ==============
    const navToggle = document.getElementById('navToggle');
    const navLinks  = document.getElementById('navLinks');
    const navOverlay = document.getElementById('navOverlay');
    const navbar = document.getElementById('navbar');

    function openMenu() {
        navToggle.classList.add('active');
        navLinks.classList.add('active');
        navOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    function closeMenu() {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
        navOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) closeMenu();
            else openMenu();
        });
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMenu);
        });
        if (navOverlay) {
            navOverlay.addEventListener('click', closeMenu);
        }
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) closeMenu();
        });
    }

    // ============== Navbar scroll style ==============
    function handleScroll() {
        if (!navbar) return;
        if (window.scrollY > 12) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // ============== FAQ Accordion ==============
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (!question) return;
        question.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');
            faqItems.forEach(other => {
                if (other !== item) {
                    other.classList.remove('open');
                    const q = other.querySelector('.faq-question');
                    if (q) q.setAttribute('aria-expanded', 'false');
                }
            });
            if (isOpen) {
                item.classList.remove('open');
                question.setAttribute('aria-expanded', 'false');
            } else {
                item.classList.add('open');
                question.setAttribute('aria-expanded', 'true');
            }
        });
    });

    // ============== Scroll-Reveal Animations ==============
    const revealEls = document.querySelectorAll('.reveal');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

        revealEls.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                el.classList.add('visible');
            } else {
                observer.observe(el);
            }
        });
    } else {
        revealEls.forEach(el => el.classList.add('visible'));
    }

    // ============== Smooth Scroll (with offset for fixed nav) ==============
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (!href || href === '#') return;
            const target = document.querySelector(href);
            if (!target) return;
            e.preventDefault();
            const offset = navbar ? navbar.offsetHeight + 8 : 0;
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        });
    });
})();