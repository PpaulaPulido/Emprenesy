var swiper = new Swiper(".mySwiper", {
    slidesPerView: 3,
    spaceBetween: 20,
    slidesPerGroup: 1,
    loop: true,
    loopFillGroupWithBlank: false,
    navigation: {
        prevEl: ".swiper-button-prev",
        nextEl: ".swiper-button-next",
    },
});


document.addEventListener('DOMContentLoaded', function () {

    const swiper = document.getElementById('swiper');
    const swiper2 = document.getElementById('swiper2');
    const swiper3 = document.getElementById('swiper3');

    const detalleResUrl = document.getElementById('detalle-res-url').getAttribute('data-url');

    user_sesion().then(() => {
        inicializarBuscador();
    }).catch(error => console.error('Error al inicializar sesión de usuario:', error));

    
    tarjetas_swiper(datosTarjetas, swiper,detalleResUrl);
    tarjetas_swiper(restaurantesTematicos, swiper2,detalleResUrl);
    tarjetas_swiper(restaurantesVista, swiper3,detalleResUrl);
    manejarFavoritos('favoritosRes');

})

