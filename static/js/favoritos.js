document.addEventListener('DOMContentLoaded', function () {
    // Obtener los eventos favoritos del localStorage
    const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    const favoritosRes = JSON.parse(localStorage.getItem('favoritosRes')) || [];
    const favoritosEm = JSON.parse(localStorage.getItem('favoritosEm')) || [];

    function renderFavorite(lista, type) {
        // Iterar sobre los eventos favoritos y mostrarlos en la interfaz de usuario
        lista.forEach(function (eventoId) {
            // Buscar el evento correspondiente en window.datosEventos
            const idNumero = parseInt(eventoId);
            const evento = type.find(e => e.id === idNumero);
            console.log(evento);
            if (evento) {
                // Crear elementos HTML para mostrar la información del evento
                const container_fav = document.querySelector('#favoritos');

                let cardFavorite = document.createElement('div');
                cardFavorite.classList.add('cardFavorite');

                let content_img = document.createElement('div');
                content_img.classList.add('content-img');

                let imgFavorito = document.createElement('img');
                imgFavorito.src = evento.galeria[3];
                imgFavorito.alt = `Imagen de ${evento.titulo}`;

                const content_favorite = document.createElement('div');
                content_favorite.classList.add('content-favorite');

                const favorite = document.createElement('i');
                favorite.classList.add("bi", "bi-heart-fill", "favorite");
                favorite.setAttribute('data-event-id', evento.id);

                let titulo = document.createElement('h3');
                titulo.textContent = evento.titulo;

                const rating = document.createElement('div');
                rating.classList.add("rating");

                for (let i = 0; i < 5; i++) {
                    const star = document.createElement('i');
                    star.classList.add("bi", "bi-star-fill", "star");
                    rating.appendChild(star);
                }

                let enlace = document.createElement('a');
                enlace.classList.add('enlaceFav');
                enlace.href = `${evento.enlace}?id=${evento.id}`;
                enlace.textContent = 'Ver detalles';

                content_img.appendChild(imgFavorito);
                content_favorite.appendChild(favorite);
                content_img.appendChild(content_favorite);
                cardFavorite.appendChild(content_img);
                cardFavorite.appendChild(titulo);
                cardFavorite.appendChild(rating);
                cardFavorite.appendChild(enlace);
                container_fav.appendChild(cardFavorite);

            }
        });
    }
    renderFavorite(favoritos, window.datosEventos);
    renderFavorite(favoritos, window.eventosTecnologicos);
    renderFavorite(favoritosRes, window.datosTarjetas);
    renderFavorite(favoritosRes, window.restaurantesTematicos);
    renderFavorite(favoritosRes, window.restaurantesVista);
    renderFavorite(favoritosEm, window.datosEmpredimientos);
    renderFavorite(favoritosEm, window.empredimientosArtesania);


});
document.addEventListener('DOMContentLoaded', function () {

    let listaFavoritos = [];
    let listaFavoritosEm = [];
    let listaFavoritosRes = [];

    const getFavoritos = localStorage.getItem('favoritos');
    const getFavoritosEm = localStorage.getItem('favoritosEm');
    const getFavoritosRes = localStorage.getItem('favoritosRes');
     

    if (getFavoritos) {
        listaFavoritos = JSON.parse(getFavoritos);
        favoritelist('favoritos');
    }
    else if (getFavoritosEm) {
        listaFavoritosEm = JSON.parse(getFavoritosEm);
        favoritelist('favoritosEm');
    }
    else if(getFavoritosRes){
        listaFavoritosRes = JSON.parse(getFavoritosRes);
        favoritelist('favoritosRes');
    }else{
        console.log('No se puede obtener favoritos');
    }
    
});

function favoritelist(favoritos) {
    const hard_favorites = document.querySelectorAll('.bi-heart-fill');
    let lista = [];

    const getFavorites = localStorage.getItem(favoritos);
    if (getFavorites) {
        lista = JSON.parse(getFavorites);
    }

    hard_favorites.forEach(function (hard_favorite) {
        const eventId = hard_favorite.getAttribute('data-event-id');

        hard_favorite.classList.add('checked');

        hard_favorite.addEventListener('click', function () {
            if (hard_favorite.classList.contains('checked')) {

                hard_favorite.classList.remove('checked');
                lista = lista.filter(id => id !== eventId);
                //lista.splice(eventId);
                localStorage.setItem(favoritos, JSON.stringify(lista));
                //localStorage.removeItem(`${favorito}_${eventId}`);

                const cardToRemove = hard_favorite.closest('.cardFavorite');
                if (cardToRemove) {
                    cardToRemove.remove();
                }
            }
        });
    });

    // Devolvemos la lista modificada fuera del forEach
    return lista;
}
