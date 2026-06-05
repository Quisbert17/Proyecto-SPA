/* =============================================
   GALLERY.JS — Sara Spa
   Funciones:
   → Lightbox al hacer clic en imagen
   → Navegación con flechas y teclado
   → Cierre con clic fuera o tecla Escape
   → Fácil de agregar más imágenes
============================================= */


/* =============================================
   1. IMÁGENES DE LA GALERÍA
   Para agregar más: copia un objeto { src, alt }
   dentro del array y listo.
============================================= */

const galeriaImagenes = [
    { src: 'assets/images/gallery/galeria1.png', alt: 'Ambiente Spa 1' },
    { src: 'assets/images/gallery/galeria2.png', alt: 'Ambiente Spa 2' },
    { src: 'assets/images/gallery/galeria3.png', alt: 'Ambiente Spa 3' },
    { src: 'assets/images/gallery/galeria4.png', alt: 'Ambiente Spa 4' },
    { src: 'assets/images/gallery/galeria5.png', alt: 'Ambiente Spa 5' },
    { src: 'assets/images/gallery/galeria6.png', alt: 'Ambiente Spa 6' },
    // { src: 'assets/images/gallery/galeria7.png', alt: 'Ambiente Spa 7' }, ← descomenta para agregar
];


/* =============================================
   2. CREAR EL LIGHTBOX EN EL DOM
============================================= */

function crearLightbox() {
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.innerHTML = `
        <div class="lb-overlay"></div>
        <div class="lb-container">
            <button class="lb-close" aria-label="Cerrar">&times;</button>
            <button class="lb-prev" aria-label="Anterior">&#8249;</button>
            <img class="lb-img" src="" alt="">
            <button class="lb-next" aria-label="Siguiente">&#8250;</button>
            <p class="lb-counter"></p>
        </div>
    `;
    document.body.appendChild(lightbox);
    return lightbox;
}


/* =============================================
   3. INYECTAR ESTILOS DEL LIGHTBOX
============================================= */

function inyectarEstilos() {
    const style = document.createElement('style');
    style.textContent = `
        #lightbox {
            display: none;
            position: fixed;
            inset: 0;
            z-index: 99999;
            align-items: center;
            justify-content: center;
        }

        #lightbox.active {
            display: flex;
        }

        .lb-overlay {
            position: absolute;
            inset: 0;
            background: rgba(0, 0, 0, 0.92);
            backdrop-filter: blur(6px);
        }

        .lb-container {
            position: relative;
            z-index: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 20px;
            padding: 20px;
            max-width: 90vw;
            max-height: 90vh;
        }

        .lb-img {
            max-width: 75vw;
            max-height: 80vh;
            object-fit: contain;
            border-radius: 16px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.5);
            transition: opacity 0.3s ease;
        }

        .lb-img.fade {
            opacity: 0;
        }

        .lb-close {
            position: fixed;
            top: 20px;
            right: 25px;
            background: rgba(255,255,255,0.15);
            border: none;
            color: white;
            font-size: 2rem;
            width: 48px;
            height: 48px;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background 0.2s ease;
            line-height: 1;
        }

        .lb-close:hover {
            background: rgba(255,255,255,0.3);
        }

        .lb-prev,
        .lb-next {
            background: rgba(255,255,255,0.15);
            border: none;
            color: white;
            font-size: 2.5rem;
            width: 52px;
            height: 52px;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background 0.2s ease, transform 0.2s ease;
            flex-shrink: 0;
            line-height: 1;
        }

        .lb-prev:hover,
        .lb-next:hover {
            background: rgba(255,255,255,0.3);
            transform: scale(1.1);
        }

        .lb-counter {
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            color: rgba(255,255,255,0.7);
            font-size: 0.9rem;
            font-family: 'Poppins', sans-serif;
            margin: 0;
        }

        /* Cursor en las imágenes de galería */
        .gallery-container .item {
            cursor: zoom-in;
        }

        @media (max-width: 480px) {
            .lb-img {
                max-width: 90vw;
            }

            .lb-prev,
            .lb-next {
                width: 40px;
                height: 40px;
                font-size: 1.8rem;
            }
        }
    `;
    document.head.appendChild(style);
}


/* =============================================
   4. LÓGICA DEL LIGHTBOX
============================================= */

let indiceActual = 0;

function abrirLightbox(indice) {
    indiceActual = indice;
    const lightbox = document.getElementById('lightbox');
    const img = lightbox.querySelector('.lb-img');
    const counter = lightbox.querySelector('.lb-counter');

    img.src = galeriaImagenes[indiceActual].src;
    img.alt = galeriaImagenes[indiceActual].alt;
    counter.textContent = `${indiceActual + 1} / ${galeriaImagenes.length}`;

    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden'; // Bloquea el scroll
}

function cerrarLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = ''; // Restaura el scroll
}

function cambiarImagen(direccion) {
    const img = document.querySelector('.lb-img');
    const counter = document.querySelector('.lb-counter');

    // Fade out
    img.classList.add('fade');

    setTimeout(() => {
        indiceActual = (indiceActual + direccion + galeriaImagenes.length) % galeriaImagenes.length;
        img.src = galeriaImagenes[indiceActual].src;
        img.alt = galeriaImagenes[indiceActual].alt;
        counter.textContent = `${indiceActual + 1} / ${galeriaImagenes.length}`;

        // Fade in
        img.classList.remove('fade');
    }, 200);
}


/* =============================================
   5. CONSTRUIR LA GALERÍA DINÁMICAMENTE
   Esto reemplaza los divs fijos del HTML
   y hace fácil agregar imágenes al array
============================================= */

function construirGaleria() {
    const contenedor = document.querySelector('.gallery-container');
    if (!contenedor) return;

    // Clases de layout para el grid (se repiten cíclicamente)
    const layouts = ['item-small', 'item-small', 'item-wide', 'item-wide', 'item-small', 'item-small'];

    contenedor.innerHTML = '';

    galeriaImagenes.forEach((imagen, i) => {
        const layoutClass = layouts[i % layouts.length];
        const item = document.createElement('div');
        item.className = `item ${layoutClass}`;
        item.innerHTML = `<img src="${imagen.src}" alt="${imagen.alt}" loading="lazy">`;
        item.addEventListener('click', () => abrirLightbox(i));
        contenedor.appendChild(item);
    });
}


/* =============================================
   6. EVENTOS
============================================= */

function iniciarEventos() {
    const lightbox = document.getElementById('lightbox');

    // Cerrar con clic en overlay
    lightbox.querySelector('.lb-overlay').addEventListener('click', cerrarLightbox);

    // Cerrar con botón X
    lightbox.querySelector('.lb-close').addEventListener('click', cerrarLightbox);

    // Navegar con flechas
    lightbox.querySelector('.lb-prev').addEventListener('click', () => cambiarImagen(-1));
    lightbox.querySelector('.lb-next').addEventListener('click', () => cambiarImagen(1));

    // Navegar con teclado
    document.addEventListener('keydown', (e) => {
        const lightbox = document.getElementById('lightbox');
        if (!lightbox.classList.contains('active')) return;

        if (e.key === 'Escape')     cerrarLightbox();
        if (e.key === 'ArrowLeft')  cambiarImagen(-1);
        if (e.key === 'ArrowRight') cambiarImagen(1);
    });

    // Swipe en móvil
    let touchStartX = 0;
    lightbox.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    });
    lightbox.addEventListener('touchend', (e) => {
        const diff = touchStartX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) cambiarImagen(diff > 0 ? 1 : -1);
    });
}


/* =============================================
   7. INICIAR TODO
============================================= */

document.addEventListener('DOMContentLoaded', () => {
    inyectarEstilos();
    crearLightbox();
    construirGaleria();
    iniciarEventos();
});