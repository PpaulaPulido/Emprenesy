document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('formularioLocation');
    const btnRegresar = document.getElementById('btn_regresar');
    const redireccionar = document.getElementById('index').getAttribute('data-url');
    const redireccionarForm = document.getElementById('form_evento').getAttribute('data-url');

    const formularioEm = document.getElementById('formularioLocationEm');
    const btnRegresarEm = document.getElementById('btn_regresarEm');
    const redireccionarFormEm = document.getElementById('form_emprendimiento').getAttribute('data-url');


    alertaPu(formulario,redireccionar)
    alertaPu(formularioEm,redireccionar)

    regresarForm(btnRegresar,redireccionarForm)
    regresarForm(btnRegresarEm,redireccionarFormEm)
        

});

function regresarForm(btnRegresar,redireccionarForm){
    btnRegresar.addEventListener('click', () => {
        Swal.fire({
            title: "¿Estás seguro de que deseas regresar?",
            text: "Si regresas, podrías tener que reingresar algunos datos.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, deseo regresar!",
            cancelButtonText: "Cancelar",
            customClass: {
                popup: 'border-blue',
                icon: 'success-icon',
            }
        }).then((result) => {
            if (result.isConfirmed) {
                // Si el usuario confirma, redirigir a la página especificada
                Swal.fire({
                    title: "Volviste al formulario anterior",
                    text: "Verifica los datos antes de continuar",
                    icon: "info",
                    timer: 4000,
                    customClass: {
                        popup: 'border-blue',
                        icon: 'success-icon',
                    }
                }).then(() => {

                    window.location.href = redireccionarForm;
                });

            } else {
                // Si el usuario cancela, simplemente cerrar la alerta y permanecer en la página
                Swal.fire({
                    title: "Cancelado",
                    text: "Continúa con el formulario actual.",
                    icon: "info",
                    timer: 2000,
                    customClass: {
                        popup: 'border-blue',
                        icon: 'success-icon',
                    }
                });
            }
        });
    });

}
function alertaPu(formulario,redireccionar){
    formulario.addEventListener('submit', (e) => {
        //e.preventDefault();
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Registro de publicación exitosa",
            showConfirmButton: false,
            timer: 4000,
            customClass: {
                popup: 'border-blue', // Clase CSS para el borde del SweetAlert
                icon: 'success-icon',
            }
        }).then(() => {
            // Después de que la alerta se cierre, redirigir a la página especificada
            window.location.href = redireccionar;
        });
    });

}