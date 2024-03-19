const sliderTarjetas = document.querySelector('.slider_tarjetas');
const sliderTarjetas2 = document.querySelector('.slider_tarjetas2');
const sliderTarjetas3 = document.querySelector('.slider_tarjetas3');
const btn_anterior = document.querySelector('.button_anterior');
const btn_siguiente = document.querySelector('.button_siguiente');
const btn_anterior2 = document.querySelector('.button_anterior2');
const btn_siguiente2 = document.querySelector('.button_siguiente2');
const btn_anterior3 = document.querySelector('.button_anterior3');
const btn_siguiente3 = document.querySelector('.button_siguiente3');

document.addEventListener('DOMContentLoaded', function () {

  function cntSliderTarjetas(datos,contenedor_slider,btnAnteior,btnSiguiente) {


    // Función para mostrar las tarjetas
    function mostrarTarjeta(index,cardSlider) {
      // Elimina todas las tarjetas existentes dentro del contenedor
      contenedor_slider.innerHTML = '';
      // Muestra las tarjetas desde el índice hasta el índice + 3
      for (let i = index; i < index + cardSlider && i < datos.length; i++) {
        const tarjeta = crearCarta(datos[i]);
        contenedor_slider.appendChild(tarjeta);
      }
    }
    
    // Función para el botón de slide anterior
    function slide_anterior() {
      contador --;
      if (contador < 0) {
        contador = Math.max(0, datos.length - cardSlider);
      }
      mostrarTarjeta(contador,cardSlider);
      
    }

    // Función para el botón de slide siguiente
    function slide_siguiente() {
      contador ++;
      if (contador > Math.max(0, datos.length - cardSlider)) {
        contador = 0;
      }
      mostrarTarjeta(contador,cardSlider);
    }

    let cardSlider = 3;
    if (window.innerWidth < 1024) {
      cardSlider = 2; 
    }
    // Índice inicial del conjunto de tarjetas que se muestra en el html
    let contador = 0;

    btnAnteior.addEventListener('click', slide_anterior);
    btnSiguiente.addEventListener('click', slide_siguiente);
    mostrarTarjeta(contador,cardSlider);
  

    // Función para crear una tarjeta
    function crearCarta(data) {
      let tarjetasDiv = document.createElement("div");
      tarjetasDiv.className = "tarjetas";

      let cardBoxDiv = document.createElement("div");
      cardBoxDiv.className = "cardBox";

      let cardDiv = document.createElement("div");
      cardDiv.className = "card";

      let frontDiv = document.createElement("div");
      frontDiv.className = "front";

      let frontImagenDiv = document.createElement("div");
      frontImagenDiv.className = "front_imagen";

      let img = document.createElement("img");
      img.src = data.imagen;
      img.alt = "";

      let backDiv = document.createElement("div");
      backDiv.className = "back";

      let h3 = document.createElement("h3");
      h3.textContent = data.titulo;

      let a = document.createElement("a");
      a.href = data.enlace;
      a.textContent = "Button 1";

      frontImagenDiv.appendChild(img);
      frontDiv.appendChild(frontImagenDiv);
      backDiv.appendChild(h3);
      backDiv.appendChild(a);
      cardDiv.appendChild(frontDiv);
      cardDiv.appendChild(backDiv);
      cardBoxDiv.appendChild(cardDiv);
      tarjetasDiv.appendChild(cardBoxDiv);

      return tarjetasDiv;
    }
  };

  cntSliderTarjetas(datosTarjetas,sliderTarjetas,btn_anterior,btn_siguiente);
  cntSliderTarjetas(datosTarjetas,sliderTarjetas2,btn_anterior2,btn_siguiente2);
  cntSliderTarjetas(datosTarjetas,sliderTarjetas3,btn_anterior3,btn_siguiente3);
});



// Función que se ejecuta cuando se hace scroll
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 380 || document.documentElement.scrollTop > 380) {
    document.getElementById("cabeza").style.backgroundColor = "#213859"; // Cambia el color a azul
  } else {
    document.getElementById("cabeza").style.backgroundColor = "transparent"; // Vuelve a ser transparente
  }
}
