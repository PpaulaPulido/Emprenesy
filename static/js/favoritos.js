document.addEventListener('DOMContentLoaded', function () {
    // Obtener los eventos favoritos del localStorage
    const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    console.log(favoritos);
    // Iterar sobre los eventos favoritos y mostrarlos en la interfaz de usuario
    favoritos.forEach(function (eventoId) {
        // Buscar el evento correspondiente en window.datosEventos
        const idNumero = parseInt(eventoId);
        const evento = window.datosEventos.find(e => e.id === idNumero);
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
});
