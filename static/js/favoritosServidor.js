document.addEventListener('DOMContentLoaded', () => {
    // Recuperar los favoritos del usuario al cargar la página
    fetch('/usuarios/obtener_favoritos/usuario')
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error(data.error);
                return;
            }
            const favoritos = data;
            console.log(data);
            favoritos.forEach(fav => {

                // Seleccionar el icono del corazón por su id de entidad y tipo de entidad
                const favIcon = document.querySelector(`.favorite[data-id="${fav.entidad_id}"][data-type="${fav.entidad_tipo}"]`);

                console.log(favIcon);
                if (favIcon) {
                    favIcon.style.color = 'red';
                    favIcon.classList.add('active');
                }
            });
        })
        .catch(error => {
            console.error('Error al obtener los favoritos:', error);
        });
    // Manejar el clic en los íconos de favoritos
    $(document).on('click', '.favorite', function () {
        const $iconHeart = $(this);
        const entityId = $iconHeart.data('id');
        const entityType = $iconHeart.data('type');

        if ($iconHeart.hasClass('active')) {
            // Eliminar de favoritos
            $.post('/usuarios/remover_favorito/usuario', { id: entityId, tipo: entityType }, function (data) {
                if (data.success) {
                    $iconHeart.removeClass('active');
                    $iconHeart.css('color', '#cecbcb');
                }
                console.log(data.message);
            }).fail(function () {
                alert('Error al intentar remover el favorito.');
            });
        } else {
            // Agregar a favoritos
            $.post('/usuarios/agregar_favorito/usuario', { id: entityId, tipo: entityType }, function (data) {
                if (data.success) {
                    $iconHeart.addClass('active');
                    $iconHeart.css('color', 'red');
                }
                console.log(data.message);
            }).fail(function () {
                alert('Error al intentar agregar el favorito.');
            });

        }
    });
});
