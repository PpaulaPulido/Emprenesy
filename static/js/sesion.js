document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Evita el envío del formulario por defecto

    // Captura los datos del formulario
    var correo = document.getElementById("usuario").value;
    var contrasena = document.getElementById("contrasena").value;
    var rol = document.querySelector('input[name="rol"]:checked').value;

    // Guarda los datos en el almacenamiento local
    localStorage.setItem("correo", correo);
    localStorage.setItem("contrasena", contrasena);
    localStorage.setItem("rol", rol);

    // Muestra un mensaje de éxito
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
        localStorage.setItem('usuarioRegistrado', 'true');
        if (rol === 'usuario') {
            window.location.href = '{{ url_for("usuarios.perfil_usuario") }}';
        } else if (rol === 'Administrador') {
            window.location.href = '{{ url_for("usuarios.perfil_admin") }}';
        }
    });
});