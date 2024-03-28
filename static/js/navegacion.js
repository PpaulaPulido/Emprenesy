export function no_user(){
    const header = document.querySelector('#cabecera');
    const nav = document.querySelector('#cabeza');

    const links = [
        { text: 'Sobre Nosotros', href: '/html/MVQ.html', class: 'link' },
        { text: 'Inicio', href: '/html/index.html', class: 'link' },
        { text: 'Iniciar Sesion', href: '/html/iniciar_sesion.html', class: 'link' },
        { text: 'Crear Cuenta', href: '/html/registro.html', class: 'link1' }
    ];

    const menu = document.createElement('nav');
    menu.setAttribute('id', 'menu');
    menu.setAttribute('class', 'barraedit');

    links.forEach(function (link) {
        let aElemento = document.createElement('a');
        aElemento.setAttribute('class', link.class);
        aElemento.setAttribute('href', link.href);
        aElemento.textContent = link.text;
        menu.appendChild(aElemento);
    });

    const barra = document.createElement('div')
    barra.setAttribute('id', 'barra');
    barra.appendChild(menu);
    nav.appendChild(barra);

    const input = document.createElement('input');
    const ctn_bars = document.createElement('div');
    const ctn_icon = document.createElement('div');
    const icon = document.createElement('i');
    const container_input = document.createElement('div');
    const lista = document.createElement('ul');
    const cover = document.createElement('div');
    const buscador = document.createElement('div');

    buscador.setAttribute('class', 'container_buscador');
    cover.setAttribute('id', 'cover-ctn-search');
    lista.setAttribute('id', 'box-search');
    container_input.setAttribute('class', 'container_input');
    icon.setAttribute('id', 'icon-search');
    icon.setAttribute('class', 'fas fa-search');
    ctn_icon.setAttribute('id', 'ctn-icon-search');
    ctn_bars.setAttribute('id', 'ctn-bars-search');
    input.setAttribute('type', 'text');
    input.setAttribute('id', 'inputSearch');
    input.setAttribute('placeholder', '¿Qué deseas buscar?');
    ctn_bars.appendChild(input);
    ctn_icon.appendChild(icon);
    container_input.appendChild(ctn_bars);
    container_input.appendChild(ctn_icon);
    container_input.appendChild(lista);
    container_input.appendChild(cover);
    buscador.appendChild(container_input);
    header.appendChild(buscador);

}

