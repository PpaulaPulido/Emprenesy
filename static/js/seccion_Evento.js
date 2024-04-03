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

    const datos = ["hola","como,estas?","que onda?","hii"]; 
    const swiper = document.getElementById('swiper');

    datos.forEach(function(dato){

        const card_swiper = document.createElement("div");
        card_swiper.classList.add("swiper-slide","card");

        const card_content = document.createElement("div");
        card_content.classList.add("card-content");

        const rating = document.createElement('div');
        rating.classList.add("rating");

        for(let i = 0; i < 5; i++){
            const star =  document.createElement('i');
            star.classList.add("bi", "bi-star-fill", "star");
            rating.appendChild(star);
        }

        card_content.appendChild(rating);
        card_swiper.appendChild(card_content);
        swiper.appendChild(card_swiper);
    });


}) 