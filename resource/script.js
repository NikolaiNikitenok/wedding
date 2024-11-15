document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    const fadeElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');

    function checkBlocksVisibility() {
        let windowHeight = window.innerHeight;
 
        sections.forEach(section => {
            let sectionPosition = section.getBoundingClientRect().top;
 
            if (sectionPosition => windowHeight - 100) {
                section.style.opacity = "1";
                section.style.transform = "translateY(0)";
            }
        });
    }

    checkBlocksVisibility();
 
    window.addEventListener('scroll', function() {
        checkBlocksVisibility();
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    fadeElements.forEach(el => observer.observe(el));

    const form = document.getElementById('rsvp-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Спасибо за подтверждение! Мы ждем вас на нашей свадьбе.');
    });

    // Плавная прокрутка
    let isScrolling = false;
    let currentSectionIndex = 0;

    const scrollToSection = (index) => {
        sections[index].scrollIntoView({ behavior: 'smooth' });
    };

    const handleScroll = (e) => {
        if (isScrolling) return;

        isScrolling = true;
        const delta = Math.sign(e.deltaY);
        const nextSectionIndex = currentSectionIndex + delta;

        if (nextSectionIndex >= 0 && nextSectionIndex < sections.length) {
            currentSectionIndex = nextSectionIndex;
            scrollToSection(currentSectionIndex);
        }

        setTimeout(() => {
            isScrolling = false;
        }, 1000); // Задержка в 1 секунду
    };

    window.addEventListener('wheel', handleScroll, { passive: false });

    // Адаптивность для мобильных устройств
    const handleTouchScroll = (e) => {
        if (isScrolling) return;

        isScrolling = true;
        const delta = e.deltaY > 0 ? 1 : -1;
        const nextSectionIndex = currentSectionIndex + delta;

        if (nextSectionIndex >= 0 && nextSectionIndex < sections.length) {
            currentSectionIndex = nextSectionIndex;
            scrollToSection(currentSectionIndex);
        }

        setTimeout(() => {
            isScrolling = false;
        }, 1000); // Задержка в 1 секунду
    };

    window.addEventListener('touchmove', handleTouchScroll, { passive: false });
});