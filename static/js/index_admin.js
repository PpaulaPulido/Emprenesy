document.addEventListener('DOMContentLoaded', () => {
    menu_lateral();
    subirPublicacionEven();
    
    user_sesion().then(() => {
        inicializarBuscador();
    }).catch(error => console.error('Error al inicializar sesión con administrador:', error));
    
});
function subirPublicacionEven(){
    fetch('/evento/dashEvento')
    .then(response => response.json())  // Parsear la respuesta como JSON
    .then(datos => {
        const containerEven = document.getElementById('pub_eventos');
        containerEven.innerHTML = "";


        if(datos.length == 0){
            estadoVacio(containerEven,'eventos','bi','bi-calendar-check');

        }else{
            const divContainer = document.createElement("div");
            divContainer.classList.add('containerPubEven');

            const tituloE = document.createElement("h2");
            tituloE.textContent="Mis eventos";
            tituloE.classList.add("tituloE");

            datos.forEach(publicacion =>{

                const pubEvento = document.createElement("div");
                pubEvento.classList.add("pubEvento");

                const evenTitle = document.createElement("h3");
                evenTitle.classList.add("evenTitle");
                evenTitle.textContent = publicacion.nombreeven;
                
                const tipoEvent = document.createElement("p");
                tipoEvent.classList.add("tipoevento");
                tipoEvent.textContent =  publicacion.tipoevento;

                const divImg = document.createElement("div");
                divImg.classList.add("divImgEvento");

                const imgEvent = document.createElement("img");
                imgEvent.alt = "logo del evento";
                imgEvent.src = publicacion.logo;
        
                const divBotones = document.createElement('div');
                divBotones.classList.add("divBotonesPub");


                const botonV = document.createElement('a');
                botonV.classList.add("eventoEdit","botonesPub");
                botonV.textContent = "Editar";

                const botonE = document.createElement('a');
                botonE.classList.add("eventoEli","botonesPub");
                botonE.textContent = "Eliminar";

                divBotones.appendChild(botonV);
                divBotones.appendChild(botonE);

                divImg.appendChild(imgEvent);
                pubEvento.appendChild(evenTitle);
                pubEvento.appendChild(tipoEvent);
                pubEvento.appendChild(divImg);

                divContainer.appendChild(pubEvento);
                divContainer.appendChild(divBotones);
                containerEven.appendChild(tituloE);
                containerEven.appendChild(divContainer);
            })
        }
    })
    .catch(error =>{
        const containerEven = document.getElementById('pub_eventos');
        containerEven.innerHTML = "Error el cargar los registros de publicaciones eventos"
        console.log(error);
        
    })
}
function estadoPublicaciones() {

    const pubEventos = document.getElementById('pub_eventos');
    const pubRes = document.getElementById('pub_res');
    const pubEmprende = document.getElementById('pub_emprende');

    estadoVacio(pubEventos,'eventos','bi','bi-calendar-check');
    estadoVacio(pubRes,'restaurantes','fa-solid','fa-utensils');
    estadoVacio(pubEmprende,'emprendimientos','fa-solid','fa-building');
}

function estadoVacio(contenedor, message,icon1,icon2) {

    const div_vacío = document.createElement('div');
    div_vacío.classList.add('container_vac');

    const div_icon = document.createElement('div');
    div_icon.classList.add('div_icon');

    const icon = document.createElement('i');
    icon.classList.add(`${icon1}`, `${icon2}`,'icon');

    const titulo = document.createElement('h2');
    titulo.textContent = `Aún no tienes publicaciones de ${message}`;

    div_icon.appendChild(icon);
    div_vacío.appendChild(div_icon);
    div_vacío.appendChild(titulo);
    contenedor.appendChild(div_vacío);

}