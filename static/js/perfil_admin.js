document.addEventListener('DOMContentLoaded', () => {
    menu_lateral();

    user_sesion().then(() => {
        inicializarBuscador();
    }).catch(error => console.error('Error al inicializar sesión de administrador:', error));

    galeryMin();
    Myphotos();

})

function galeryMin() {
    fetch('/admin/galeriaAdmin')
        .then(response => response.json())  // Parsear la respuesta como JSON
        .then(fotos => {
            const galeria = document.getElementById('galeria');

            // Limpiar el contenido anterior de la galería
            galeria.innerHTML = '';

            if (fotos.length === 0) {
                // No hay fotos, mostrar un mensaje
                galeria.style.display = 'block';

                const containerPhoto = document.createElement('div');
                containerPhoto.classList.add('containerPhoto');

                const containerIcon = document.createElement('div');
                containerIcon.classList.add('iconContainer');

                const iconPhoto = document.createElement('i');
                iconPhoto.classList.add('fa-solid', 'fa-camera-retro');

                const textPhoto = document.createElement('p');
                textPhoto.className = "textPhoto";
                textPhoto.textContent = "No hay fotos para mostrar";

                containerIcon.appendChild(iconPhoto);
                containerPhoto.appendChild(containerIcon);
                containerPhoto.appendChild(textPhoto);

                galeria.appendChild(containerPhoto);

            } else {
                // Hay fotos, mostrarlas
                galeria.style.display = 'grid';
                fotos.forEach(foto => {
                    const imgGaleria = document.createElement('img');
                    imgGaleria.src = foto.ruta_foto;
                    imgGaleria.alt = 'Foto ' + foto.tipo_foto;
                    imgGaleria.classList.add('imgGaleria');
                    galeria.appendChild(imgGaleria);
                });
            }
        })
        .catch(error => {
            console.error('Error al cargar las fotos:', error);
        });
}

function Myphotos(){

    fetch('/admin/MisFotos')
        .then(response => response.json())  // Parsear la respuesta como JSON
        .then(fotos => {

            const photo = document.getElementById('opciones__resultado');

            // Limpiar el contenido anterior de la galería
            photo.innerHTML = '';

            if (fotos.length === 0) {
                // No hay fotos, mostrar un mensaje
                photo.style.display = 'block';

                const containerPhoto = document.createElement('div');
                containerPhoto.classList.add('containerMyPhotos');

                const containerImg = document.createElement('div');
                containerImg.classList.add('MyphotosImg');

                const img = document.createElement('img');
                img.className =  "imgPhoto"
                img.src = "/static/img/camara.png";

                const textPhoto = document.createElement('p');
                textPhoto.className = "textPhotoImg";
                textPhoto.textContent = "No hay fotos para mostrar";

                containerImg.appendChild(img);
                containerPhoto.appendChild(containerImg);
                containerPhoto.appendChild(textPhoto);

                photo.appendChild(containerPhoto);

            } else {
                // Hay fotos, mostrarlas
                photo.style.display = 'grid';
                fotos.forEach(foto => {

                    const divImg = document.createElement('div');
                    divImg.classList.add('divImgPhotos');

                    const imgGaleria = document.createElement('img');
                    imgGaleria.src = foto.ruta_foto;
                    imgGaleria.alt = 'Foto ' + foto.tipo_foto;
                    imgGaleria.classList.add('imgPhotos');

                    divImg.appendChild(imgGaleria);
                    photo.appendChild(divImg);
                });
                
            }
        })
        .catch(error => {
            console.error('Error al cargar las fotos:', error);
        });
}