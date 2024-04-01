document.addEventListener('DOMContentLoaded', function () {
    // Obtener el parámetro 'id' de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');


    // Obtener el contenedor donde se agregarán las imágenes
    const carouselInner = document.querySelector('.carousel-inner');

    // Buscar los datos correspondientes al ID en window.datosTarjetas
    const datosTarjeta = window.datosTarjetas.find(tarjeta => tarjeta.id === parseInt(id));

    // Verificar si se encontraron los datos
    if (datosTarjeta) {
        // Limpiar el contenido actual del carrusel
        carouselInner.innerHTML = '';

        // Iterar sobre la galería de imágenes y crear los elementos <img>
        datosTarjeta.galeria.forEach((imagenSrc, index) => {
            // Crear el elemento <img>
            const imagen = document.createElement('img');
            imagen.src = imagenSrc;
            imagen.alt = `Imagen ${index + 1} de ${datosTarjeta.titulo}`;

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
    const type_resta = window.datosTarjetas.find(type_resta => type_resta.id === restaId);

    // Verifica si se encontró el evento correspondiente
    if (type_resta) {

        document.getElementById('title').textContent = type_resta.titulo;
        document.querySelector('#horario').textContent = type_resta.horario;
        document.querySelector('#contacto').textContent = type_resta.contacto;
        document.querySelector('#comidas').textContent = type_resta.comida;
        document.querySelector('#correo').textContent = type_resta.correo;

        sitio_web = document.querySelector('#web');
        sitio_web.href = type_resta.pagina;
        sitio_web.target = 'blank'


        enlace = document.querySelector('#red1');
        enlace.href = type_resta.redes[0];
        enlace.target = "_blank";

        enlace2 = document.querySelector('#red2');
        enlace2.href = type_resta.redes[1];
        enlace.target = "_blank";

        const location_lista = document.getElementById("location");
        type_resta.ubicacion.forEach(ubicacion => {
            const nuevaLi = document.createElement("li");
            nuevaLi.textContent = ubicacion;
            location_lista.appendChild(nuevaLi);

        });

    
    } else {
        // Si no se encontró el evento correspondiente, muestra un mensaje de error
        console.error('Evento no encontrado');
    }
}

function popup_menu() {

    const urlParams = new URLSearchParams(window.location.search);
    const restaId = parseInt(urlParams.get('id')); // Convierte el ID a un número entero

    // Busca el evento correspondiente en window.datosEventos por su ID
    const type_resta = window.datosTarjetas.find(type_resta => type_resta.id === restaId);

    let menuHtml = '<h3>Nuestro Menú</h3>';
    let i =1;
    if(type_resta.menu.length >= 2){
        type_resta.menu.forEach(menuItem => {
            menuHtml += `<h4>Conoce el menú ${i}</h4>`
            menuHtml += `<p class="screen"> 🍽️<a href="${menuItem}" target="_blank">Ver Menú</a></p>`;
            i++;
        });
    }else{
        type_resta.menu.forEach(menuItem => {
            menuHtml += `<p class="screen"> 🍽️<a href="${menuItem}" target="_blank">Ver Menú</a></p>`;
            i++;
        });
    }
    

    Swal.fire({
        title: `<span class="custom-title">${type_resta.titulo}</span>`,
        html: `
              <div class = "div-swal">${menuHtml}</div>
            `,
        icon: 'info',
        confirmButtonText: 'Cerrar',
        customClass: {
            confirmButton: 'btn-red',
            popup: 'border-blue',// Clase CSS para el borde del SweetAlert
            titlle: 'title-swal',
            icon: 'icon-swal',
            container: 'custom-container'
        }

    });
}

function popup_nosotros(){

    const urlParams = new URLSearchParams(window.location.search);
    const restaId = parseInt(urlParams.get('id'));
    const type_resta = window.datosTarjetas.find(type_resta => type_resta.id === restaId);

    Swal.fire({
        title: `<span class="custom-title">${type_resta.titulo}</span>`,
        html: `
              <div class = "div-swal">
              <img src="${type_resta.imagen}" alt="imagen restaurante" class=imagenRestaurante/>
              <p class="text_swal">${type_resta.nosotros}</p>
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