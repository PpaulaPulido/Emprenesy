// Array de rutas de las imágenes
const images = [
    "../img/bogota_noche.png",
    "https://i.pravatar.cc/150?img=6",
    "https://i.pravatar.cc/150?img=2",
    "https://i.pravatar.cc/150?img=3",
    "https://i.pravatar.cc/150?img=5",
    "https://i.pravatar.cc/150?img=4",
    "https://i.pravatar.cc/150?img=3",
];

function addImages() {
    const scrollerInner = document.getElementById("dynamicImages");
    images.forEach((imageSrc) => {
        const img = document.createElement("img");
        img.src = imageSrc;
        img.alt = "";
        scrollerInner.appendChild(img);
    });
}

// Llamar a la función para agregar las imágenes al cargar la página
window.addEventListener("load", addImages);

// Seleccionar todos los elementos con la clase "scroller"
const scrollers = document.querySelectorAll(".scroller");

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    addAnimation();
}

// Función para agregar animación a los elementos "scroller"
function addAnimation() {
    scrollers.forEach((scroller) => {
        // Añadir el atributo "data-animated"
        scroller.setAttribute("data-animated", true);

        // Obtener el contenedor interno de cada "scroller"
        const scrollerInner = scroller.querySelector(".scroller__inner");

        // Calcular la anchura total de las imágenes
        const totalWidth = scrollerInner.scrollWidth;
        let currentPosition = 0;
        let direction = "right";
        let step = 1; // Variable para controlar la velocidad del desplazamiento

        // Función para animar el desplazamiento
        function animateScroll() {
            if (direction === "right") {
                currentPosition += step;
                scrollerInner.style.transform = `translateX(-${currentPosition}px)`;

                if (currentPosition >= totalWidth) {
                    direction = "left";
                }
            } else if (direction === "left") {
                currentPosition -= step;
                scrollerInner.style.transform = `translateX(-${currentPosition}px)`;

                if (currentPosition <= 0) {
                    direction = "right";
                }
            }

            requestAnimationFrame(animateScroll);
        }

        // Llamar a la función de animación
        animateScroll();
    });
}

