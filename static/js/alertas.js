document.addEventListener('DOMContentLoaded', () => {
    publicacion();
})

function publicacion() {

    const formulario = document.getElementById('formularioLocation');
    const redireccionar = document.getElementById('form_url').getAttribute('data-url');

    formulario.addEventListener('submit', (e) => {
        e.preventDefault();
    
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Registro de publicación exitosa",
            showConfirmButton: false,
            timer: 3500,
            customClass: {
                popup: 'border-blue',// Clase CSS para el borde del SweetAlert
                icon: 'success-icon',
            },
            willClose: () => {
                window.location.href = redireccionar;
            }
        });
    });


}