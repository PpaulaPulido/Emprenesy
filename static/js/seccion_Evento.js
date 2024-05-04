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

    user_sesion().then(() => {
        inicializarBuscador();
    }).catch(error => console.error('Error al inicializar sesión de usuario:', error));
    
    tarjetas_swiper(datosEventos, swiper);
    tarjetas_swiper(eventosTecnologicos, swiper2);
    manejarFavoritos('favoritos');

})

