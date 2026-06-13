/* =============================================
   MAIN.JS — Sara Spa
   → Navbar al hacer scroll
   → Scroll reveal (animaciones)
   → Año dinámico en footer
   → Fecha mínima en formulario (hoy)
============================================= */

const heroSection = document.getElementById('inicio');
const heroImage = new Image();

heroImage.src = 'assets/images/hero/spa-hero.jpg';

heroImage.onload = () => {
    heroSection.classList.add('hero-loaded');
};

// Por si ya estaba en caché
if (heroImage.complete) {
    heroSection.classList.add('hero-loaded');
}


document.addEventListener('DOMContentLoaded', () => {


    /* =============================================
       1. NAVBAR — Se vuelve blanca al bajar
    ============================================= */

    const navbar = document.querySelector('.navbar-spa');

    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }


    /* =============================================
       2. CERRAR MENÚ MÓVIL al hacer clic en enlace
    ============================================= */

    const navLinks = document.querySelectorAll('.nav-link');
    const menuCollapse = document.getElementById('menuSpa');

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (menuCollapse && menuCollapse.classList.contains('show')) {
                const bsCollapse = bootstrap.Collapse.getInstance(menuCollapse);
                if (bsCollapse) bsCollapse.hide();
            }
        });
    });


    /* =============================================
       3. SCROLL REVEAL — Animaciones al hacer scroll
    ============================================= */

    const reveals = document.querySelectorAll('.reveal');

    if (reveals.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target); // Solo se anima una vez
                }
            });
        }, { threshold: 0.15 });

        reveals.forEach(el => observer.observe(el));
    }


    /* =============================================
       4. AÑO DINÁMICO en el footer
    ============================================= */

    const yearEl = document.querySelector('.footer-bottom');

    if (yearEl) {
        const anio = new Date().getFullYear();
        yearEl.innerHTML = yearEl.innerHTML.replace(/\d{4}/, anio);
    }


    /* =============================================
       5. FECHA MÍNIMA en el formulario (no permite fechas pasadas)
    ============================================= */

    const inputFecha = document.getElementById('date');

    if (inputFecha) {
        const hoy = new Date().toISOString().split('T')[0];
        inputFecha.min = hoy;
    }


});