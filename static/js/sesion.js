function verificacionContrasenas(event) {
    event.preventDefault(); // Evita el envío del formulario inmediatamente
  
    const contrasena = document.getElementById('contrasena').value;
    const email = document.getElementById('usuario').value;
    const tipoRol = document.getElementById('rol').value;
  
    if (contrasena === '' || email === '' || tipoRol === '') {
      Swal.fire({
        title: "Todos los campos son obligatorios",
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
  
    // Mostrar mensaje de éxito
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Bienvenido a Emprenesy",
      showConfirmButton: false,
      timer: 1500,
      customClass: {
        popup: 'border-blue', 
        icon: 'success-icon',
      }
    }).then(() => {
      // Enviar el formulario después de mostrar el mensaje de éxito
      document.getElementById('loginForm').submit();
    });
  
    return true;
  }