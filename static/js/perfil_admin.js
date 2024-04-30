document.addEventListener('DOMContentLoaded',()=>{
    menu_lateral();
    user_sesion().then(() => {
        inicializarBuscador();
    }).catch(error => console.error('Error al inicializar sesión de usuario:', error));
})
