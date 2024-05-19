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
function Categoria(datos, contenedor) {
    // Verificar si se encontraron los datos
    if (datos) {
        // Limpiar el contenido actual del contenedor
        contenedor.innerHTML = '';

        // Iterar sobre la galería de imágenes y crear los elementos <img>
        datos.imagenes.forEach((imagenSrc, index) => {
            // Crear el elemento <img>
            const imagen = document.createElement('img');
            imagen.src = imagenSrc;
            imagen.alt = `Imagen ${index + 1} de ${datos.titulo}`;

            // Crear el elemento div con la clase block
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
            contenedor.appendChild(itemCarousel);
        });
    }
}
function galeria(urlFetch){
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    fetch(`/${urlFetch}/${id}`) 
            .then(response => response.json())
            .then(data => {
                const carouselInner = document.querySelector('.carousel-inner');
                Categoria(data, carouselInner);
                slider_tarjetas();
            })
            .catch(error => {
                console.error('Error al obtener las imágenes:', error);
            });
}