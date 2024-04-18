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


    function tarjetas_swiper(tarjeta, contenedor) {

        tarjeta.forEach(function (dato) {

            const card_swiper = document.createElement("div");
            card_swiper.classList.add("swiper-slide", "card");

            const card_content = document.createElement("div");
            card_content.classList.add("card-content");

            const content_title = document.createElement('div');
            content_title.classList.add('title_contenedor');

            const card_title = document.createElement("h2");
            card_title.classList.add("content_title");
            card_title.textContent = dato.titulo;

            const card_imagen = document.createElement("div");
            card_imagen.classList.add("swiper_img");

            const card_img = document.createElement("img");
            card_img.classList.add("card_img");
            card_img.src = dato.galeria[3];
            card_img.alt = "imagen evento";

            const container_div = document.createElement("div");
            container_div.classList.add("swiper_conta_img");

            const favorite = document.createElement('i');
            favorite.classList.add("bi", "bi-heart-fill", "favorite");
            favorite.setAttribute('data-event-id', dato.id);

            const rating = document.createElement('div');
            rating.classList.add("rating");

            let a = document.createElement("a");
            a.classList.add('swiper_button');
            a.href = `${dato.enlace}?id=${dato.id}`;
            a.textContent = "Ver más";

            for (let i = 0; i < 5; i++) {
                const star = document.createElement('i');
                star.classList.add("bi", "bi-star-fill", "star");
                rating.appendChild(star);
            }

            card_imagen.appendChild(card_img);
            container_div.appendChild(card_imagen);
            container_div.appendChild(favorite);

            card_content.appendChild(container_div);
            content_title.appendChild(card_title);
            card_content.appendChild(content_title);
            card_content.appendChild(rating);
            card_content.appendChild(a);
            card_swiper.appendChild(card_content);
            contenedor.appendChild(card_swiper);

        });
    }
    tarjetas_swiper(datosEventos, swiper);
    tarjetas_swiper(eventosTecnologicos, swiper2);

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
