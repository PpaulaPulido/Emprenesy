document.addEventListener("DOMContentLoaded", () => {
    const btn_dir = document.getElementById("btn_dir");
    const container_ub = document.querySelector(".container_ubicacion");
    let ubicaciones = [];

    btn_dir.addEventListener("click", function () {
        const inputs_direccion = container_ub.querySelectorAll(".address");
        let emptyInput = false;

        inputs_direccion.forEach(input_dir => {
            const direccion = input_dir.value.trim();
            if (direccion === "") {
                emptyInput = true;
            }
        });

        if (!emptyInput) {
            // Crear un nuevo campo de entrada
            const div_detalle = document.createElement("div");
            div_detalle.classList.add("detalle__sitio");

            const input_detalle = document.createElement("input");
            input_detalle.classList.add("address");
            input_detalle.type = "text";
            input_detalle.placeholder = "Ingresar dirección";

            div_detalle.appendChild(input_detalle);
            container_ub.appendChild(div_detalle);

            // Recopilar todas las direcciones
            ubicaciones = [];
            inputs_direccion.forEach(input_dir => {
                const direccion = input_dir.value.trim();
                if (direccion !== "") {
                    ubicaciones.push(direccion);
                }
            });

            // Mostrar las direcciones en la consola
            console.log(ubicaciones);
        }else{
            const message = document.querySelector('.message');
            const mensaje = document.createElement('p');
            mensaje.textContent = 'Campo vacio';
            message.appendChild(mensaje);


        }
    });
});
