document.addEventListener('DOMContentLoaded', () => {

    user_sesion().then(() => {
        inicializarBuscador();
    }).catch(error => console.error('Error al inicializar sesión de usuario:', error));

    const urlParams = new URLSearchParams(window.location.search);
    const tipo = urlParams.get('tipo');
    
    if (tipo) {
        filterByType("/publicacion/tipoEmprendimiento", tipo, 'emprendimientoContenedor', 'emprendimiento');
    }

});

function filterByType(api, tipo, contenedor, nombrePublicacion) {
    fetch(`${api}?tipo=${tipo}`)
        .then(response => response.json())
        .then(data => {
            const contenedorPub = document.getElementById(contenedor);
            if (!contenedorPub) {
                console.error(`No se encontró el contenedor con ID: ${contenedor}`);
                return;
            }

            contenedorPub.innerHTML = '';

            tarjetasPublicacion(data, contenedorPub, nombrePublicacion, 'logo del emprendimiento', '/emprende/EmprendeDetalleServidor', {
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