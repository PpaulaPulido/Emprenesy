document.addEventListener('DOMContentLoaded', function () {

    user_sesion().then(() => {
        inicializarBuscador();
    }).catch(error => console.error('Error al inicializar sesión de usuario:', error));


});