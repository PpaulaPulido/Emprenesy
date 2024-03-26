function iniciar_sesion() {
  Swal.fire({
    position: "center",
    icon: "success",
    title: "Has iniciado sesión correctamente",
    showConfirmButton: false,
    timer: 2000,
    customClass: {
      popup: 'border-blue',// Clase CSS para el borde del SweetAlert
      icon: 'success-icon',
    }

  }).then(function () {
    window.location.href = '../html/index_user.html';
  })
}