document.addEventListener('DOMContentLoaded', function () {
    // Obtener los eventos favoritos del localStorage
    const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    const favoritosRes = JSON.parse(localStorage.getItem('favoritosRes')) || [];
    const favoritosEm = JSON.parse(localStorage.getItem('favoritosEm')) || [];

    function renderFavorite(lista,type) {
        // Iterar sobre los eventos favoritos y mostrarlos en la interfaz de usuario
        lista.forEach(function (eventoId) {
            // Buscar el evento correspondiente en window.datosEventos
            const idNumero = parseInt(eventoId);
            const evento = type.find(e => e.id === idNumero);
            console.log(evento);
            if (evento) {
                // Crear elementos HTML para mostrar la información del evento
                const container_fav = document.querySelector('#favoritos');
                let card = document.createElement('div');
                let titulo = document.createElement('h5');
                titulo.textContent = evento.titulo;
                card.appendChild(titulo);
                container_fav.appendChild(card);
            }
        });
    }
    renderFavorite(favoritos,window.datosEventos);
    renderFavorite(favoritos,window.eventosTecnologicos);
    renderFavorite(favoritosRes,window.datosTarjetas);
    renderFavorite(favoritosRes,window.restaurantesTematicos);
    renderFavorite(favoritosRes,window.restaurantesVista);
    renderFavorite(favoritosEm,window.datosEmpredimientos);
    renderFavorite(favoritosEm,window.empredimientosArtesania);
});
