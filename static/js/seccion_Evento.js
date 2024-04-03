var swiper = new Swiper(".mySwiper", {
    slidesPerView: 3,
    spaceBetween: 30,
    slidesPerGroup: 3,
    loop: true,
    loopFillGroupWithBlank: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});

document.addEventListener('DOMContentLoaded', function () {

    const swiper = document.getElementById('swiper');

    datosTarjetas.forEach(function(dato){

        const card_swiper = document.createElement("div");
        card_swiper.classList.add("swiper-slide","card");

        const card_content = document.createElement("div");
        card_content.classList.add("card-content");

        const card_imagen = document.createElement("div");
        card_imagen.classList.add("swiper_img");

        const card_img = document.createElement("img");
        card_img.classList.add("card_img");
        card_img.src = dato.imagen;
        card_img.alt = "imagen restaurante";

        const card_title = document.createElement("h2");
        card_title.classList.add("content_title");
        card_title.textContent = dato.titulo;
        
        const rating = document.createElement('div');
        rating.classList.add("rating");

        for(let i = 0; i < 5; i++){
            const star =  document.createElement('i');
            star.classList.add("bi", "bi-star-fill", "star");
            rating.appendChild(star);
        }
        
        card_imagen.appendChild(card_img);
        card_content.appendChild(card_imagen);
        card_content.appendChild(card_title);
        card_content.appendChild(rating);
        card_swiper.appendChild(card_content);
        swiper.appendChild(card_swiper);
    });


}) 