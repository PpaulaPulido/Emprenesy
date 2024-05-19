document.addEventListener('DOMContentLoaded', () => {

    user_sesion().then(() => {
        inicializarBuscador();
    }).catch(error => console.error('Error al inicializar sesión de usuario:', error));

    const urlParams = new URLSearchParams(window.location.search);
    const tipo = urlParams.get('tipo');
    console.log(tipo);
    if (tipo) {
        filterByType(tipo);
       
    }

});

function filterByType(tipo) {
    fetch(`/publicacion/tipoRestaurante?tipo=${tipo}`)
        .then(response => response.json())
        .then(data => {
            const contenedorRes = document.getElementById('resturanteContenedor')
            const nombreRes = 'restaurante'
            contenedorRes.innerHTML = '';

            tarjetasRes(data,contenedorRes,nombreRes, {
                id: 'id',
                nombre: 'nombre',
                logo: 'logo',
                tipo: 'tipo',
            });
        })
        .catch(error => {
            console.error('Error al cargar los registros:', error);
        });
}

function tarjetasRes(data, contenedor,nombreResTipo, config) {
    //const contenedorRes = document.querySelector('#containerRes');

    data.forEach(tarjeta => {
        const divTarjeta = document.createElement('div');
        divTarjeta.classList.add('container_tarjeta');

        const divImagen = document.createElement('div');
        divImagen.classList.add('tipo_imagen');

        const imagen = document.createElement('img');
        imagen.src = tarjeta[config.logo];
        imagen.alt = "logo del restaurante";

        const divContenido = document.createElement('div');
        divContenido.classList.add('contenido_texto');

        const nombreRes = document.createElement('p');
        nombreRes.textContent = tarjeta[config.nombre];

        const divContainer = document.createElement('div');
        divContainer.classList.add('container');

        const divRating = document.createElement('div');
        divRating.classList.add('rating');

        for (let i = 0; i < 5; i++) {
            const estrella = document.createElement('input');
            estrella.type = 'radio';
            estrella.name = 'clr1';
            estrella.setAttribute('style', '--c: #ff9933');
            divRating.appendChild(estrella);
        }

        const divBoton = document.createElement('div');
        divBoton.classList.add('container_btn');

        const enlace = document.createElement('a');
        enlace.href = `/res/restauranteDetalleServidor?id=${tarjeta[config.id]}&tipo=${nombreResTipo}`;

        
        const boton = document.createElement('button');
        boton.classList.add('btn');

        const span1 = document.createElement('span');
        span1.classList.add('btn-text-one');
        span1.textContent = "te interesa";

        const span2 = document.createElement('span');
        span2.classList.add('btn-text-two');
        span2.textContent = "mira mas!";

        boton.appendChild(span1);
        boton.appendChild(span2);
        enlace.appendChild(boton); // Aquí añadimos el botón al enlace
        divBoton.appendChild(enlace); // Aquí añadimos el enlace al contenedor del botón

        divContainer.appendChild(divRating);

        divContenido.appendChild(nombreRes);
        divContenido.appendChild(divContainer);
        divContenido.appendChild(divBoton);

        divImagen.appendChild(imagen);
        divTarjeta.appendChild(divImagen);
        divTarjeta.appendChild(divContenido);

        contenedor.appendChild(divTarjeta);
    });
}
