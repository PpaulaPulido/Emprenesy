const tarjetas = document.querySelector('.slider_tarjetas');
const tarjeta_list = document.querySelectorAll('.tarjetas');
const dots = document.querySelectorAll('.dot');
const btn_anterior = document.querySelector('.button_anterior');
const btn_siguiente = document.querySelector('.button_siguiente');

// Índice inicial del conjunto de tarjetas que se muestra en el html
let contador = 0;

function mostrarTarjeta(index) {
    tarjeta_list.forEach((tarjeta, i) => {
    // Muestra las tarjetas desde el índice hasta el índice + 3
    if (i >= index && i < index + 3) {
      tarjeta.style.display = 'flex';
    } else {
      tarjeta.style.display = 'none';
    }
  });
}

function mostrarDot(index) {
  dots.forEach((dot, i) => {
    if (i === index) {
      // Agrega la clase 'active' al punto indicador actual
      dot.classList.add('active');
    } else {
    // Elimina la clase 'active' de los demás puntos indicadores
      dot.classList.remove('active');
    }
  });
}

function slide_anterior() {
  contador--;
  if (contador < 0) {
    contador= tarjeta_list.length - 3;
  }
  mostrarTarjeta(contador)
  mostrarDot(contador)
}

function slide_siguiente() {
  contador++;
  if (contador > tarjeta_list.length - 3) {
    contador = 0;
  }
  mostrarTarjeta(contador)
  mostrarDot(contador)
}

btn_anterior.addEventListener('click', slide_anterior);
btn_siguiente.addEventListener('click', slide_siguiente);

mostrarTarjeta(contador)
mostrarDot(contador)
