document.addEventListener('DOMContentLoaded', function () {
    const track = document.getElementById('servTrack');
    const prevBtn = document.getElementById('servPrev');
    const nextBtn = document.getElementById('servNext');

    if (!track || !prevBtn || !nextBtn) return;

    // Cuánto se mueve por click: el ancho de una tarjeta + el gap
    function getScrollAmount() {
        const firstSlide = track.querySelector('.service-slide');
        return firstSlide ? firstSlide.offsetWidth + 24 : 280;
    }

    prevBtn.addEventListener('click', function () {
        track.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', function () {
        track.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
    });
});