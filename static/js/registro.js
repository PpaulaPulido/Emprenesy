<<<<<<< HEAD
<<<<<<< HEAD
=======
function verificacionContrasenas() {
=======
function verificacionContrasenas(event) {
  event.preventDefault(); // Evita el envío del formulario inmediatamente
>>>>>>> natalia

  const contrasena = document.getElementById('contrasena').value;
  const confirmarContrasena = document.getElementById('confirmar_contrasena').value;

  if (contrasena !== confirmarContrasena) {
    Swal.fire({
      title: "Las contraseñas no coinciden",
      showClass: {
        popup: `
                  animate__animated
                  animate__fadeInUp
                  animate__faster
              `
      },
      hideClass: {
        popup: `
                  animate__animated
                  animate__fadeOutDown
                  animate__faster
              `
      },
      customClass: {
        popup: 'border-blue',
        icon: 'success-icon',
      }
    });

    return false; // Detiene el envío del formulario
  }
<<<<<<< HEAD
  return true; // Permite el envío del formulario si todo está correcto
}
>>>>>>> 02b80ffa1aa79af4752f2ebb51de06581313a599
=======

  // Mostrar mensaje de éxito
  Swal.fire({
    position: "center",
    icon: "success",
    title: "Registro exitoso",
    showConfirmButton: false,
    timer: 1500,
    customClass: {
      popup: 'border-blue', 
      icon: 'success-icon',
    }
  }).then(() => {
    // Enviar el formulario después de mostrar el mensaje de éxito
    document.getElementById('registroForm').submit();
  });

  return true;
}
>>>>>>> natalia
