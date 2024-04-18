document.addEventListener('DOMContentLoaded',function(){

    const hard_favorites = document.querySelectorAll('.bi-heart-fill');
    let listaFavoritos = [];
    hard_favorites.forEach(function (hard_favorite) {
        hard_favorite.addEventListener('click', function () {
            if (!hard_favorite.classList.contains('checked')) {
                hard_favorite.classList.add('checked');
                const eventId = hard_favorite.getAttribute('data-event-id');
                //console.log(eventId);
                listaFavoritos.push(eventId)
                console.log(listaFavoritos);
                //guardo la lista de favoritos en el local storage
                localStorage.setItem('favoritos', JSON.stringify(listaFavoritos));

            } else {
                hard_favorite.classList.remove('checked');
            }
        });
    });
    
})