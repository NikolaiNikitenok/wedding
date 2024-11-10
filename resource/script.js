document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    const fadeElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(el => observer.observe(el));

    const form = document.getElementById('rsvp-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('СПАСИБО ЗА ПОДТВЕРЖДЕНИЕ! МЫ ЖДЕМ ВАС НА НАШЕЙ СВАДЬБЕ.');
    });

    // Плавная прокрутка
    sections.forEach((section, index) => {
        section.addEventListener('wheel', (e) => {
            e.preventDefault();
            const delta = Math.sign(e.deltaY);
            const nextSection = sections[index + delta];
            if (nextSection) {
                nextSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});