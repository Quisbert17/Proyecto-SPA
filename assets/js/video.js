/* =====================================
   VIDEO SECTION (TikTok embed) — Sara Spa
   Archivo independiente: si se elimina la
   sección del HTML, este script se puede
   quitar sin afectar el resto del sitio.
===================================== */

document.addEventListener('DOMContentLoaded', function () {
    const wrapper = document.getElementById('videoWrapper');
    const loading = document.getElementById('videoLoading');

    if (!wrapper || !loading) return;

    // El script de TikTok reemplaza el <blockquote> por un <iframe> cuando termina de cargar.
    // Usamos un observer para detectar ese momento y ocultar el mensaje "Cargando...".
    const observer = new MutationObserver(function () {
        const iframe = wrapper.querySelector('iframe');
        if (iframe) {
            loading.style.display = 'none';
            observer.disconnect();
        }
    });

    observer.observe(wrapper, { childList: true, subtree: true });

    // Por si el video no carga (ej. sin conexión, video privado o eliminado),
    // ocultamos el mensaje de "cargando" después de 8 segundos para no dejarlo pegado.
    setTimeout(function () {
        loading.style.display = 'none';
    }, 8000);
});