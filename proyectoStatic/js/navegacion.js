function no_user() {
    const header = document.querySelector('#cabecera');
    const nav = document.querySelector('#cabeza');

    const links = [
        { text: 'Sobre Nosotros', href: './MVQ.html', class: 'link' },
        { text: 'Inicio', href: './index.html', class: 'link' },
        { text: 'Iniciar Sesión', href: './iniciar_sesion.html', class: 'link' },
        { text: 'Crear Cuenta', href: './registro.html', class: 'link1' }
    ];

    const menu = document.createElement('nav');
    menu.setAttribute('id', 'menu');
    menu.setAttribute('class', 'barraedit');

    links.forEach(link => {
        const aElemento = document.createElement('a');
        aElemento.setAttribute('class', link.class);
        aElemento.setAttribute('href', link.href);
        aElemento.textContent = link.text;
        menu.appendChild(aElemento);
    });

    const barra = document.createElement('div');
    barra.setAttribute('id', 'barra');
    barra.appendChild(menu);
    nav.appendChild(barra);

    const buscador = document.createElement('div');
    buscador.setAttribute('class', 'container_buscador');

    const container_input = document.createElement('div');
    container_input.setAttribute('class', 'container_input');

    const ctn_bars = document.createElement('div');
    ctn_bars.setAttribute('id', 'ctn-bars-search');

    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('id', 'inputSearch');
    input.setAttribute('placeholder', '¿Qué deseas buscar?');

    const ctn_icon = document.createElement('div');
    ctn_icon.setAttribute('id', 'ctn-icon-search');

    const icon = document.createElement('i');
    icon.setAttribute('id', 'icon-search');
    icon.setAttribute('class', 'fas fa-search');

    const lista_ul = document.createElement('ul');
    lista_ul.setAttribute('id', 'box-search');

    const div_box = document.createElement('div');
    div_box.setAttribute('id','cover-ctn-search');

    ctn_bars.appendChild(input);
    ctn_icon.appendChild(icon);
    container_input.appendChild(ctn_bars);
    container_input.appendChild(ctn_icon);
    
    buscador.appendChild(container_input);
    buscador.appendChild(lista_ul);
    buscador.appendChild(div_box);
    header.appendChild(buscador);
}


no_user();