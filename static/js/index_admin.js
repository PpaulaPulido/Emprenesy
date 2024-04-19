document.addEventListener('DOMContentLoaded', () => {
    menu_lateral();
    estadoPublicaciones();
});
user_sesion();
function user_sesion() {

    const menuItems = [
        { text: '<img src="../img/perfil_user.png" alt="perfil">', href: '#', class: 'link1', hasSubMenu: true }
    ];

    // Elementos del submenu
    const subMenuItems = [
        { text: 'Ver perfil', href: '#' },
        { text: 'Notificaciones', href: '#' },
        { text: 'Configuración', href: '#' },
        { text: 'Cerrar sesión', href: '#' }
    ];


    const nav_user = document.createElement('nav');
    nav_user.className = 'barra_nav';

    const nav_list = document.createElement('ul');
    nav_list.className = 'nav_list';

    // Crear elemento li para el buscador
    const buscador_li = document.createElement('li');
    buscador_li.innerHTML = `
        <div class="header_buscador">
            <div class="buscador_input">
                <div id="ctn-bars-search">
                    <input type="text" id="inputSearch" placeholder="¿Qué deseas buscar?">
                </div>
                <div id="ctn-icon-search">
                    <i class="fas fa-search" id="icon-search"></i>
                </div>
            </div>
            <ul id="box-search"></ul>
            <div id="cover-ctn-search"></div>
        </div>`;
    nav_list.appendChild(buscador_li);

    const icon_a = document.createElement('a');
    icon_a.classList.add('enlace_icon');
    icon_a.href = '#';

    const icon = document.createElement('i');
    icon.classList.add('bi', 'bi-bell-fill');

    icon_a.appendChild(icon);
    nav_list.appendChild(icon_a);

    // Crear elementos li y a para el menú principal
    menuItems.forEach(item => {
        const liElement = document.createElement('li');
        if (item.hasSubMenu) {
            const aElement = document.createElement('a');
            aElement.className = item.class;
            aElement.href = item.href;
            aElement.innerHTML = item.text;
            liElement.appendChild(aElement);
            const subMenu = document.createElement('ul');
            subMenu.className = 'perfil_list';
            subMenuItems.forEach(subItem => {
                const subLiElement = document.createElement('li');
                const subAElement = document.createElement('a');
                subAElement.href = subItem.href;
                subAElement.textContent = subItem.text;
                subLiElement.appendChild(subAElement);
                subMenu.appendChild(subLiElement);
            });
            liElement.appendChild(subMenu);

        } else {
            const aElement = document.createElement('a');
            aElement.className = item.class;
            aElement.href = item.href;
            aElement.textContent = item.text;
            liElement.appendChild(aElement);
        }
        nav_list.appendChild(liElement);
    });

    nav_user.appendChild(nav_list);

    const header_barra = document.createElement('div');
    header_barra.id = "header_barra";
    header_barra.appendChild(nav_user);

    const header = document.querySelector('#cabeza');
    header.appendChild(header_barra);

}
function menu_lateral() {
    // sidebar toggle
    const btnToggle = document.querySelector('.toggle-btn');

    btnToggle.addEventListener('click', function () {
        document.getElementById('sidebar').classList.toggle('active');
        document.getElementById('publicaciones').classList.toggle('active');
        console.log(document.getElementById('sidebar'))
    });
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