function fadeOut() {
    const loaderContainer = document.querySelector(".loader-container");
    loaderContainer.style.opacity = 1;
  
    const fadeEffect = setInterval(function () {
      if (!loaderContainer.style.opacity) {
        loaderContainer.style.opacity = 1;
      }
      if (loaderContainer.style.opacity > 0) {
        loaderContainer.style.opacity -= 0.1;
      } else {
        clearInterval(fadeEffect);
        loaderContainer.remove();
      }
    }, 30); // Ajusta la velocidad de desvanecimiento modificando el valor de intervalo
  }
  
  window.onload = function () {
    setTimeout(fadeOut, 2000);
  };

  document.addEventListener("DOMContentLoaded", function() {

    var pantallaCarga = document.querySelectorAll(".loader-container");
  
    var escogido = Math.floor(Math.random() * pantallaCarga.length);
  
    pantallaCarga[escogido].style.display = "flex";
    pantallaCarga[escogido].style.position = "none";
    pantallaCarga[escogido].style.animation = "desvanecer 5s ease-in-out forwards";
  
    
  });

//-----------------------------------------------------------------------------------------------------------
function fadeOut2() {
    const loaderContainer = document.querySelector(".loader-conta");
    loaderContainer.style.opacity = 1;
  
    const fadeEffect = setInterval(function () {
      if (!loaderContainer.style.opacity) {
        loaderContainer.style.opacity = 1;
      }
      if (loaderContainer.style.opacity > 0) {
        loaderContainer.style.opacity -= 0.1;
      } else {
        clearInterval(fadeEffect);
        loaderContainer.remove();
      }
    }, 30); // Ajusta la velocidad de desvanecimiento modificando el valor de intervalo
  }
  
  window.onload = function () {
    setTimeout(fadeOut, 2000);
  };

  document.addEventListener("DOMContentLoaded", function() {

    var pantallaCarga = document.querySelectorAll(".loader-conta");
  
    var escogido = Math.floor(Math.random() * pantallaCarga.length);
  
    pantallaCarga[escogido].style.display = "flex";
    pantallaCarga[escogido].style.position = "none";
    pantallaCarga[escogido].style.animation = "desvanecer 5s ease-in-out forwards";
  
    
  });