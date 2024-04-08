document.addEventListener('DOMContentLoaded', function () {

    // Obtener el parámetro 'id' de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    // Obtener el contenedor donde se agregarán las imágenes
    const carouselInner = document.querySelector('.carousel-inner');

    
    // Buscar los datos correspondientes al ID en window.datosEventos
    const datosEventos = window.datosEventos.find(tarjeta => tarjeta.id === parseInt(id));

    // Verificar si se encontraron los datos
    if (datosEventos) {
        // Limpiar el contenido actual del carrusel
        carouselInner.innerHTML = '';

        // Iterar sobre la galería de imágenes y crear los elementos <img>
        datosEventos.galeria.forEach((imagenSrc, index) => {
            // Crear el elemento <img>
            const imagen = document.createElement('img');
            imagen.src = imagenSrc;
            imagen.alt = `Imagen ${index + 1} de ${datosEventos.titulo}`;

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

    generarBubles();
    slider_tarjetas();
    generarDatos();

});


function generarDatos() {
    // Obtiene el ID del evento desde la URL
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = parseInt(urlParams.get('id')); // Convierte el ID a un número entero

    // Busca el evento correspondiente en window.datosEventos por su ID
    const evento = window.datosEventos.find(evento => evento.id === eventId);


    // Verifica si se encontró el evento correspondiente
    if (evento) {
        // Si se encontró el evento, actualiza el contenido del elemento con id "fecha" con la fecha del evento

        document.getElementById('title').textContent = evento.titulo;
        document.querySelector('#fecha').textContent = evento.fecha;
        document.querySelector('#horario').textContent = evento.horario;
        document.querySelector('#nombres').textContent = evento.organizadores;
        document.querySelector('#contacto').textContent = evento.contacto;
        
        sitio_web = document.querySelector('#web');
        sitio_web.href = evento.pagina;
        sitio_web.target = '_blank';

        enlace = document.querySelector('#red1');
        
        if (evento.redes[0] !== "") {
            enlace.href = evento.redes[0];
            enlace.target = "_blank";
        } else {
            enlace.style.display = 'none';
        }

        enlace2 = document.querySelector('#red2');
        
        if (evento.redes[1] !== "") {
            enlace2.href = evento.redes[1];
            enlace2.target = "_blank";
        } else {
            enlace2.style.display = 'none';
        }

        const location_lista = document.getElementById("location");
        evento.ubicacion.forEach(ubicacion => {
            const nuevaLi = document.createElement("li");
            nuevaLi.textContent = ubicacion;
            location_lista.appendChild(nuevaLi);
        });
    } else {
        // Si no se encontró el evento correspondiente, muestra un mensaje de error
        console.error('Evento no encontrado');
    }
}
function generarBubles() {
    // Obtener el contenedor de burbujas
    const bubblesContainer = document.getElementById('bubblesContainer');

    // Números para los estilos
    const numbers = [11, 12, 24, 10, 14, 23, 18, 16, 19, 20, 22, 25, 18, 21, 15, 13, 27, 17, 13, 28, 11, 12, 24, 10, 14, 23, 18, 16, 19, 20, 22, 25, 18, 21, 15, 13, 27, 17, 13, 28, 12, 24, 10, 14, 23, 18, 16, 19, 20, 22, 25, 18, 21, 15, 13, 27, 17, 13, 28];

    // Generar los span dinámicamente
    numbers.forEach(number => {
        const span = document.createElement('span');
        span.style.setProperty('--i', number);
        bubblesContainer.appendChild(span);
    });

}
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
function popup_descripcion() {

    const urlParams = new URLSearchParams(window.location.search);
    const eventId = parseInt(urlParams.get('id')); 
    const evento = window.datosEventos.find(evento => evento.id === eventId);

    Swal.fire({
        title: `<span class="custom-title">${evento.titulo}</span>`,
        html: `
              <div class = "div-swal">
              <img src="${evento.imagen}" alt="imagen restaurante" class="imagenRestaurante"/>
              <p class="text_swal">${evento.descripcion}</p>
              </div>
            `,
        customClass: {
            confirmButton: 'btn-red',
            popup: 'border-blue',// Clase CSS para el borde del SweetAlert
            titlle: 'title-swal',
            icon: 'icon-swal',
            container: 'custom-container'
        }
    });
}

function popup_information() {
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = parseInt(urlParams.get('id')); 
    const evento = window.datosEventos.find(evento => evento.id === eventId);

    let eventoHTML= '<h3>Información adicional</h3>';
    eventoHTML += '<ul class="popup_list">'; 

    evento.informacion_adicional.forEach(information => {
        eventoHTML+= `<li class = "item_list">${information}</li>`; // Llenar los elementos LI dentro del bucle
    });

    eventoHTML+= '</ul>'; // Cerrar la lista UL
    eventoHTML += '<h3 class="popup_title">Consulta tus entradas</h3>'

    if(evento.boletas.length >=1){
        eventoHTML += `<button class = "btn_boletas" ><a href="${evento.boletas}" target = "_blank">Clic Aquí</a></button>`
    }else{
        eventoHTML += `<button class = " btn_boletas btn_boletasAG" ><a href="#">Agotados</a></button>`
    }
    

    Swal.fire({
        title: `<span class="custom-title">${evento.titulo}</span>`,
        html: `
            <div class="div-swal">${eventoHTML}</div>
        `,
        icon: 'info',
        confirmButtonText: 'Cerrar',
        customClass: {
            confirmButton: 'btn-red',
            popup: 'border-blue',
            title: 'title-swal',
            icon: 'icon-swal',
            container: 'custom-container'
        }
    });
}
