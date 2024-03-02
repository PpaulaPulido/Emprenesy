const sliderTarjetas = document.querySelector('.slider_tarjetas');
const btn_anterior = document.querySelector('.button_anterior');
const btn_siguiente = document.querySelector('.button_siguiente');
const contenedorDots = document.querySelector('.dots');

document.addEventListener('DOMContentLoaded', function () {

  function cntSliderTarjetas() {

    // Índice inicial del conjunto de tarjetas que se muestra en el html
    let contador = 0;
    // Función para mostrar las tarjetas
    function mostrarTarjeta(index) {
      // Elimina todas las tarjetas existentes dentro del contenedor
      sliderTarjetas.innerHTML = '';
      // Muestra las tarjetas desde el índice hasta el índice + 3
      for (let i = index; i < index + 3 && i < datosTarjetas.length; i++) {
        const tarjeta = crearCarta(datosTarjetas[i]);
        sliderTarjetas.appendChild(tarjeta);
      }
    }

    // Función para mostrar los puntos indicadores
    // Crear puntos indicadores dinámicamente
    for (let i = 0; i < datosTarjetas.length-2; i++) {
      const dot = document.createElement('span');
      dot.classList.add('dot');
      contenedorDots.appendChild(dot);
    }
    // Volver a seleccionar los puntos indicadores después de crearlos
    function mostrarDot(index) {
      const dots2 = document.querySelectorAll('.dot'); // Vuelve a seleccionar los puntos indicadores
      dots2.forEach((dot, i) => {
        if (i === index) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    }
    

    // Función para el botón de slide anterior
    function slide_anterior() {
      contador--;
      if (contador < 0) {
        contador = Math.max(0, datosTarjetas.length - 3);
      }
      mostrarTarjeta(contador);
      mostrarDot(contador);
    }

    // Función para el botón de slide siguiente
    function slide_siguiente() {
      contador++;
      if (contador > Math.max(0, datosTarjetas.length - 3)) {
        contador = 0;
      }
      mostrarTarjeta(contador);
      mostrarDot(contador);
    }

    btn_anterior.addEventListener('click', slide_anterior);
    btn_siguiente.addEventListener('click', slide_siguiente);
    mostrarTarjeta(contador);
    mostrarDot(contador)
  };

  cntSliderTarjetas();
});

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
