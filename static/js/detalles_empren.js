document.addEventListener('DOMContentLoaded', function () {
    // Obtener el parámetro 'id' de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get('id');

    function empredeCategoria(typeEmprended, id) {
        // Obtener el contenedor donde se agregarán las imágenes
        const carouselInner = document.querySelector('.carousel-inner');

        // Buscar los datos correspondientes al ID en window.datosTarjetas
        const datosEmprende = typeEmprended.find(tarjeta => tarjeta.id === parseInt(id));

        // Verificar si se encontraron los datos
        if (datosEmprende) {
            // Limpiar el contenido actual del carrusel
            carouselInner.innerHTML = '';

            // Iterar sobre la galería de imágenes y crear los elementos <img>
            datosEmprende.galeria.forEach((imagenSrc, index) => {
                // Crear el elemento <img>
                const imagen = document.createElement('img');
                imagen.src = imagenSrc;
                imagen.alt = `Imagen ${index + 1} de ${datosEmprende.titulo}`;

                //crear elemendo div con la clase blck
                const block = document.createElement('div');
                block.classList.add('block', 'img-responsive');
                block.appendChild(imagen);

                // Crear el elemento <div class="carousel-col"> y agregar la imagen
                const carouselCol = document.createElement('div');
                carouselCol.classList.add('carousel-col');
                carouselCol.appendChild(block);

                // Crear el elemento <div class="item"> y agregar la columna del carrusel
                const itemCarousel = document.createElement('div');
                itemCarousel.classList.add('item');
                if (index === 0) {
                    itemCarousel.classList.add('active'); // Marcar el primer elemento como activo
                }
                itemCarousel.appendChild(carouselCol);

                // Agregar el elemento <div class="item"> al contenedor principal del carrusel
                carouselInner.appendChild(itemCarousel);
            });
        }

    }

    empredeCategoria(window.datosEmpredimientos, idParam);
    empredeCategoria(window.empredimientosArtesania, idParam);
    slider_tarjetas();
    generarDatos();
});

function slider_tarjetas() {
    $('.carousel[data-type="multi"] .item').each(function () {
        var next = $(this).next();
        if (!next.length) {
            next = $(this).siblings(':first');
        }
        next.children(':first-child').clone().appendTo($(this));

        for (var i = 0; i < 2; i++) {
            next = next.next();
            if (!next.length) {
                next = $(this).siblings(':first');
            }

            next.children(':first-child').clone().appendTo($(this));
        }
    });
}
function generarDatos() {
    // Obtiene el ID del evento desde la URL
    const urlParams = new URLSearchParams(window.location.search);
    const restaId = parseInt(urlParams.get('id')); // Convierte el ID a un número entero

    function obtenerDatos(typeEmprended, id) {

        // Busca el evento correspondiente en window.datosEventos por su ID
        const negocio = typeEmprended.find(negocio => negocio.id === id);

        // Verifica si se encontró el evento correspondiente
        if (negocio) {

            document.getElementById('title').textContent = negocio.titulo;
            document.querySelector('#negocio').textContent = negocio.negocio;
            document.querySelector('#horario').textContent = negocio.horario;
            document.querySelector('#contacto').textContent = negocio.contacto;
            document.querySelector('#correo').textContent = negocio.correo;


            sitio_web = document.querySelector('#web');
            sitio_web.href = negocio.pagina;
            sitio_web.target = '_blank';

            enlace = document.querySelector('#red1');

            if (negocio.redes[0] !== "") {
                enlace.href = negocio.redes[0];
                enlace.target = "_blank";
            } else {
                enlace.style.display = 'none';
            }

            enlace2 = document.querySelector('#red2');

            if (negocio.redes[1] !== "") {
                enlace2.href = negocio.redes[1];
                enlace2.target = "_blank";
            } else {
                enlace2.style.display = 'none';
            }

            const location_lista = document.getElementById("location");
            negocio.ubicacion.forEach(ubicacion => {
                const nuevaLi = document.createElement("li");
                nuevaLi.textContent = ubicacion;
                location_lista.appendChild(nuevaLi);
            });

        }
    }
    obtenerDatos(window.datosEmpredimientos, restaId);
    obtenerDatos(window.empredimientosArtesania, restaId);

}

function popup_emprendimientos() {
    const urlParams = new URLSearchParams(window.location.search);
    const restaId = parseInt(urlParams.get('id'));
    popupEmprendimientos(restaId);
}

function popupEmprendimientos(idEmpren) {
    let emprendimientos;

    if (idEmpren >= 1 && idEmpren <= window.datosEmpredimientos.length) {
        emprendimientos = window.datosEmpredimientos.find(emprendimiento => emprendimiento.id === idEmpren);
    } else if (idEmpren > window.datosEmpredimientos.length && idEmpren <= window.datosEmpredimientos.length + window.empredimientosArtesania.length) {
        const emprenIndex = idEmpren - window.datosEmpredimientos.length - 1;
        emprendimientos = window.empredimientosArtesania[emprenIndex];
    } else {
        console.error('ID de emprendimiento no encontrado');
        return; // Termina la ejecución si el ID de emprendimiento no es válido
    }

    Swal.fire({
        title: `<span class="custom-title">${emprendimientos.titulo}</span>`,
        html: `
              <div class="div-swal">
              <img src="${emprendimientos.imagen}" alt="imagen emprendimiento" class="imagenEmprendimiento"/>
              <p class="text_swal">${emprendimientos.descripcion}</p>
              <button class="btn_productos"><a href="${emprendimientos.productos}" target="_blank">Ver Productos</a></button>
              </div>
            `,
        customClass: {
            confirmButton: 'btn-red',
            popup: 'border-blue', // Clase CSS para el borde del SweetAlert
            title: 'title-swal',
            icon: 'icon-swal',
            container: 'custom-container'
        }
    });
}
