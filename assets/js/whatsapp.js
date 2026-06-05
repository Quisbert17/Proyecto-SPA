/* =============================================
   WHATSAPP.JS — Sara Spa
   → Formulario envía datos al WhatsApp
   → Botón flotante con mensaje simple
============================================= */


/* =============================================
   CONFIGURACIÓN
   Cambia solo este número por el de Sara Spa
============================================= */

const NUMERO_WHATSAPP = '59163379391'; // Formato: código país + número, sin + ni espacios


/* =============================================
   BOTÓN FLOTANTE — Mensaje simple
============================================= */

const botonFlotante = document.querySelector('.whatsapp-float');

if (botonFlotante) {
    const mensajeFlotante = '¡Hola! Quisiera obtener más información sobre los servicios de Sara Spa.';
    const urlFlotante = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(mensajeFlotante)}`;
    botonFlotante.href = urlFlotante;
    botonFlotante.target = '_blank';
    botonFlotante.rel = 'noopener noreferrer';
}


/* =============================================
   FORMULARIO — Envío con datos del cliente
============================================= */

const formulario = document.getElementById('whatsappForm');

if (formulario) {
    formulario.addEventListener('submit', function (e) {
        e.preventDefault();

        // Recoger datos
        const nombre = document.getElementById('name').value.trim();
        const telefono = document.getElementById('phone').value.trim();
        const servicio = document.getElementById('service').value;
        const fecha = document.getElementById('date').value;
        const hora = document.getElementById('time').value;

        // Validación básica
        if (!nombre || !telefono || !fecha || !hora) {
            alert('Por favor completa todos los campos antes de continuar.');
            return;
        }

        // Formatear fecha legible (2026-06-04 → 04/06/2026)
        const [anio, mes, dia] = fecha.split('-');
        const fechaFormateada = `${dia}/${mes}/${anio}`;

        // Formatear hora legible (14:30 → 2:30 PM)
        const [hh, mm] = hora.split(':');
        const horaObj = new Date();
        horaObj.setHours(hh, mm);
        const horaFormateada = horaObj.toLocaleTimeString('es-BO', { hour: '2-digit', minute: '2-digit', hour12: true });

        // Armar mensaje
        const mensaje = `¡Hola Sara Spa!  Quisiera reservar una cita:

*Nombre:* ${nombre}
*Teléfono:* ${telefono}
*Servicio:* ${servicio}
*Fecha:* ${fechaFormateada}
*Hora:* ${horaFormateada}

Quedo a la espera de su confirmación. ¡Gracias! `;

        // Abrir WhatsApp
        const url = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(mensaje)}`;
        window.open(url, '_blank');

        // Limpiar formulario
        formulario.reset();
    });
}