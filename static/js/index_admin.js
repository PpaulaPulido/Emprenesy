document.addEventListener('DOMContentLoaded', () => {
    menu_lateral();
    subirPublicacionEven();
    subirPublicacionEmprende();

    user_sesion().then(() => {
        inicializarBuscador();
    }).catch(error => console.error('Error al inicializar sesión con administrador:', error));

});

function subirPublicacionEven() {
    fetch('/evento/dashEvento')
        .then(response => response.json())  // Parsear la respuesta como JSON
        .then(datos => {
            const containerEven = document.getElementById('pub_eventos');
            containerEven.innerHTML = "";

            if (datos.length == 0) {
                estadoVacio(containerEven, 'eventos', 'bi', 'bi-calendar-check');

            } else {
                estadoContenido(datos, containerEven, {
                    titulo: "Mis eventos",
                    idEven : 'idEven',
                    nombreCampo: 'nombreeven',
                    tipoCampo: 'tipoevento',
                    imgAlt: 'logo del evento',
                    logo: 'logo'
                });
            }
        })
        .catch(error => {
            const containerEven = document.getElementById('pub_eventos');
            containerEven.innerHTML = "Error el cargar los registros de publicaciones eventos"
            console.log(error);

        })
}

function subirPublicacionEmprende() {
    fetch('/emprende/dashEmprende')
        .then(response => response.json())  // Parsear la respuesta como JSON
        .then(datosEm => {
            const containerEm = document.getElementById('pub_emprende');
            containerEm.innerHTML = "";

            if (datosEm.length == 0) {
                estadoVacio(containerEm, 'emprendimientos', 'fa-solid', 'fa-building');

            } else {
                estadoContenido(datosEm, containerEm, {
                    titulo: "Mis emprendimientos",
                    idEmpre : 'idEmpre',
                    nombreCampo: 'nombreEmpre',
                    tipoCampo: 'tipoEmpre',
                    imgAlt: 'logo del emprendimiento',
                    logo: 'logo'
                });
            }
        })
        .catch(error => {
            const containerEm = document.getElementById('pub_emprende');
            containerEm.innerHTML = "Error el cargar los registros de publicaciones de emprendimientos"
            console.log(error);

        })
}

function estadoContenido(datos, container, config) {

    const divContainer = document.createElement("div");
    divContainer.classList.add('containerPub');

    const tituloE = document.createElement("h2");
    tituloE.textContent = config.titulo;
    tituloE.classList.add("tituloE");

    datos.forEach(publicacion => {

        const publicacionIndex = document.createElement("div");
        publicacionIndex.classList.add("publicacionIndex");
        publicacionIndex.setAttribute('data-id', publicacion[config.idEven]);

        const tituloPub = document.createElement("h3");
        tituloPub.classList.add("publicacionTitle");
        tituloPub.textContent = publicacion[config.nombreCampo];

        const tipoEvent = document.createElement("p");
        tipoEvent.classList.add("publicacionTipoIndex");
        tipoEvent.textContent = publicacion[config.tipoCampo];

        const divImg = document.createElement("div");
        divImg.classList.add("divImgPub");

        const imgPub = document.createElement("img");
        imgPub.alt = config.imgAlt;
        imgPub.src = publicacion[config.logo];

        const divBotones = document.createElement('div');
        divBotones.classList.add("divBotonesPub");

        const botonV = document.createElement('a');
        botonV.classList.add("btnEdit", "botonesPub");
        botonV.textContent = "Editar";

        const botonE = document.createElement('a');
        botonE.classList.add("btnEli", "botonesPub");
        botonE.textContent = "Eliminar";

        divBotones.appendChild(botonV);
        divBotones.appendChild(botonE);

        divImg.appendChild(imgPub);
        publicacionIndex.appendChild(tituloPub);
        publicacionIndex.appendChild(tipoEvent);
        publicacionIndex.appendChild(divImg);
        publicacionIndex.appendChild(divBotones)

        divContainer.appendChild(publicacionIndex);
        container.appendChild(tituloE);
        container.appendChild(divContainer);
    })
}

function estadoPublicaciones() {

    const pubEventos = document.getElementById('pub_eventos');
    const pubRes = document.getElementById('pub_res');
    const pubEmprende = document.getElementById('pub_emprende');

    estadoVacio(pubEventos, 'eventos', 'bi', 'bi-calendar-check');
    estadoVacio(pubRes, 'restaurantes', 'fa-solid', 'fa-utensils');
    estadoVacio(pubEmprende, 'emprendimientos', 'fa-solid', 'fa-building');
}

function estadoVacio(contenedor, message, icon1, icon2) {

    const div_vacío = document.createElement('div');
    div_vacío.classList.add('container_vac');

    const div_icon = document.createElement('div');
    div_icon.classList.add('div_icon');

    const icon = document.createElement('i');
    icon.classList.add(`${icon1}`, `${icon2}`, 'icon');

    const titulo = document.createElement('h2');
    titulo.textContent = `Aún no tienes publicaciones de ${message}`;

    div_icon.appendChild(icon);
    div_vacío.appendChild(div_icon);
    div_vacío.appendChild(titulo);
    contenedor.appendChild(div_vacío);

}