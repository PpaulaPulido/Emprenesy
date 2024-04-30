document.addEventListener('DOMContentLoaded', () => {

    menu_form();
   
    user_sesion().then(() => {
        inicializarBuscador();
    }).catch(error => console.error('Error al inicializar sesión de usuario:', error));

    const btnRegresar = document.getElementById('btn_regresar');
    if (btnRegresar) {
        btnRegresar.addEventListener('click', () => {
            window.location = '../templates/publicacionRes.html';
        });
    } else {
        console.log('Botón de regreso no encontrado.');
    }
})


