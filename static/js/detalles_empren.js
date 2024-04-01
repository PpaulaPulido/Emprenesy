document.addEventListener('DOMContentLoaded', function () {
    // Obtener el parámetro 'id' de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    // Obtener el contenedor donde se agregarán las imágenes
    const carouselInner = document.querySelector('.carousel-inner');

    // Buscar los datos correspondientes al ID en window.datosTarjetas
    const datosEmprende = window.datosEmpredimientos.find(tarjeta => tarjeta.id === parseInt(id));

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
    } else {
        console.error(`No se encontraron datos para el ID ${id}`);
    }
});

document.addEventListener('DOMContentLoaded', function () {

    generarDatos();
    slider_tarjetas();
})

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

    // Busca el evento correspondiente en window.datosEventos por su ID
    const negocio = window.datosEmpredimientos.find(negocio => negocio.id === restaId);


    // Verifica si se encontró el evento correspondiente
    if (negocio) {

        document.getElementById('title').textContent = negocio.titulo;
        document.querySelector('#negocio').textContent = negocio.negocio;
        document.querySelector('#horario').textContent = negocio.horario;
        document.querySelector('#web').textContent = negocio.pagina;
        document.querySelector('#contacto').textContent = negocio.contacto;
        document.querySelector('#correo').textContent = negocio.correo;

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

    } else {
        // Si no se encontró el evento correspondiente, muestra un mensaje de error
        console.error('Evento no encontrado');
    }

}