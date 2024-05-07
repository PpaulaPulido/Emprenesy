document.addEventListener('DOMContentLoaded', () => {
    menu_lateral();
    estadoPublicaciones();
    
    user_sesion().then(() => {
        inicializarBuscador();
    }).catch(error => console.error('Error al inicializar sesión de usuario:', error));
    
});
function subirPublicacionEven(){
    fetch('/dashEvento')
    .then(response => response.json())  // Parsear la respuesta como JSON
    .then(datos => {
        const containerEven = document.getElementById('pub_eventos');
        containerEven.innerHTML = "";


        if(datos.length === 0){
            estadoVacio(containerEven,'eventos','bi','bi-calendar-check');

        }else{
            const divContainer = document.createElement("div");
            divContainer.classList.add('containerPubEven');

            datos.forEach(publicacion =>{

                const pubEvento = document.createElement("div");
                pubEvento.classList.add("pubEvento");

                const evenTitle = document.createElement("h3");
                evenTitle.classList.add("evenTitle");
                evenTitle.textContent = publicacion.nombreeven;
                
                const tipoEvent = document.createElement();
                const divImg = document.createElement("div");
                divImg.classList.add("divImgEvento");

                const imgEvent = document.createElement("img");
                imgEvent.alt = "logo del evento";
                imgEvent.src = publicacion.logo || "static/img/notFound.png";
                
                divImg.appendChild(imgEvent);
                pubEvento.appendChild(evenTitle);
                pubEvento.appendChild(divImg);

            })
        }
    })
    .catch(error =>{
        const containerEven = document.getElementById('pub_eventos');
        containerEven.innerHTML = "Error el cargar los registros de publicaciones eventos"
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