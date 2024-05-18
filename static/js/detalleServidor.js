document.addEventListener('DOMContentLoaded', () => {
    generarDatos();
    slider_tarjetas();
    galeria();
});

function galeria(){
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    fetch(`/publicacion/galeriaImagenes/${id}`) 
            .then(response => response.json())
            .then(data => {
                // Obtener el contenedor donde se mostrarán las imágenes
                const galeria = document.getElementById('galeria');

                // Iterar sobre las imágenes y crear elementos <img> para mostrarlas
                data.imagenes.forEach(imagenUrl => {
                    const imagen = document.createElement('img');
                    imagen.src = imagenUrl;
                    imagen.alt = 'Imagen de la galería'; // Puedes agregar un texto alternativo apropiado
                    galeria.appendChild(imagen); // Agregar la imagen al contenedor
                });
            })
            .catch(error => {
                console.error('Error al obtener las imágenes:', error);
            });
}

function Categoria(typeEvento, id) {

    // Obtener el contenedor donde se agregarán las imágenes
    const carouselInner = document.querySelector('.carousel-inner');


    // Buscar los datos correspondientes al ID e window.datosEventos
    const datosEventos = typeEvento.find(tarjeta => tarjeta.id === parseInt(id));

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
    }
}
function generarDatos() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    fetch(`/res/restauranteDetalleJson/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }
            return response.json();
        })
        .then(data => {
            if (data.error) {
                console.error(data.error);
                return;
            }
            console.log(data);  // Ver los datos obtenidos en la consola
            mostrarDatos(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function mostrarDatos(data) {
    document.getElementById('title').textContent = data.nombreresta;
    document.querySelector('#horario').textContent = data.horario;
    document.querySelector('#contacto').textContent = data.telresta;
    document.querySelector('#comidas').textContent = data.tiporesta;
    document.querySelector('#correo').textContent = data.correoresta || 'No aplica';

    const sitio_web = document.querySelector('#web');
    sitio_web.href = data.paginaresta;
    sitio_web.target = '_blank';

    const redes = data.redes_sociales ? data.redes_sociales.split('; ') : [];
    const enlace = document.querySelector('#red1');
    if (redes[0]) {
        enlace.href = redes[0].split(': ')[1];
        enlace.target = "_blank";
    } else {
        enlace.style.display = 'none';
    }

    const enlace2 = document.querySelector('#red2');
    if (redes[1]) {
        enlace2.href = redes[1].split(': ')[1];
        enlace2.target = "_blank";
    } else {
        enlace2.style.display = 'none';
    }

    const location_lista = document.getElementById("location");
    const ubicaciones = data.ubicaciones_restaurante ? data.ubicaciones_restaurante.split('; ') : [];
    ubicaciones.forEach(ubicacion => {
        const nuevaLi = document.createElement("li");
        nuevaLi.textContent = ubicacion;
        location_lista.appendChild(nuevaLi);
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
