<<<<<<< HEAD
<<<<<<< HEAD
=======
function verificacionContrasenas() {
=======
$(document).ready(function () {
  $('form').on('submit', function (event) {
    event.preventDefault();
>>>>>>> paula

    var formData = $(this).serialize();

    $.ajax({
      type: 'POST',
      url: '/usuarios/registrarUser',
      data: formData,
      dataType: 'json',
      success: function (response) {
        if (response.success) {
          if (response.registrado) {
            popupRegistro("Oops...", response.message, true); // True indica redirigir
          } else {
            popRegistroExitoso("Registro Exitoso", true);
          }

        } else {
          popupRegistro("Error", response.message, false); // False indica no redirigir
        }
      },
      error: function (error) {
        console.error('Error en la solicitud AJAX:', error);
        popupRegistro("Error", "Hubo un problema al procesar la solicitud.", false); // False indica no redirigir
      }
    });
  });
});

<<<<<<< HEAD
    return false; // Detiene el envío del formulario
  }
  return true; // Permite el envío del formulario si todo está correcto
}
>>>>>>> 02b80ffa1aa79af4752f2ebb51de06581313a599
=======
function popupRegistro(titulo, mensaje, redirigir) {
  Swal.fire({
    icon: "error",
    title: titulo,
    text: mensaje,
    showClass: {
      popup: 'animate__animated animate__fadeInUp animate__faster'
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOutDown animate__faster'
    },
    customClass: {
      confirmButton: 'btn-blue',
      popup: 'border-blue',
      title: 'title-swal',
      icon: 'icon-swal',
    }
  }).then(() => {
    if (redirigir) {
      window.location.href = "http://127.0.0.1:3036/usuarios/login";
    }
  });
}

function popRegistroExitoso(titulo, redirigir) {
  Swal.fire({
    icon: "success",
    title: titulo,
    showConfirmButton: false,
    timer: 1500,
    customClass: {
      confirmButton: 'btn-red',
      popup: 'border-blue',
      title: 'title-swal',
      icon: 'icon-swal',
      container: 'custom-container'
    }
  }).then(() => {
    if (redirigir) {
      window.location.href = "http://127.0.0.1:3036/usuarios/login";
    }
  });
}
>>>>>>> paula
