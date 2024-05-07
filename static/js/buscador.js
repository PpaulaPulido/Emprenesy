function inicializarBuscador() {
    let bars_search = document.getElementById("ctn-bars-search");
    let cover_ctn_search = document.getElementById("cover-ctn-search");
    let inputSearch = document.getElementById("inputSearch");
    let box_search = document.getElementById("box-search");

    if (!box_search) {
        console.error('El elemento ul #box-search no existe en el DOM en el momento de la ejecución del script.');
        return;
    }

    const listaDatos = [
        "Próximos eventos", "Restaurantes", "Comida Rápida", "Emprendimientos",
        "Eventos", "Negocios de ropa", "Tienda de artesanía"
    ];

    listaDatos.forEach(function (item) {
        let liElement = document.createElement("li");
        let aElement = document.createElement("a");

        if (item === 'Restaurantes') {
            aElement.href = "./seccion_res.html";
        } else if (item === 'Eventos') {
            aElement.href = "./seccion_Evento.html";
        }

        aElement.textContent = item;
        let icono = document.createElement("i");
        icono.className = "fas fa-search";
        aElement.prepend(icono);
        liElement.appendChild(aElement);
        box_search.appendChild(liElement);
    });

    document.getElementById("icon-search").addEventListener("click", mostrar_buscador);
    document.getElementById("cover-ctn-search").addEventListener("click", ocultar_buscador);

    function mostrar_buscador() {
        bars_search.style.top = "80px";
        cover_ctn_search.style.display = "block";
        inputSearch.focus();

        if (inputSearch.value === "") {
            box_search.style.display = "none";
        }
    }

    function ocultar_buscador() {
        bars_search.style.top = "-10px";
        cover_ctn_search.style.display = "none";
        inputSearch.value = "";
        box_search.style.display = "none";
    }

    document.getElementById("inputSearch").addEventListener("keyup", buscador_interno);

    function buscador_interno() {
        let filter = inputSearch.value.toUpperCase();
        let li = box_search.getElementsByTagName("li");

        for (let i = 0; i < li.length; i++) {
            let a = li[i].getElementsByTagName("a")[0];
            let textValue = a.textContent || a.innerText;

            if (textValue.toUpperCase().indexOf(filter) > -1) {
                li[i].style.display = "";
                box_search.style.display = "block";
            } else {
                li[i].style.display = "none";
            }

            if (inputSearch.value === "") {
                box_search.style.display = "none";
            }
        }
    }
}
