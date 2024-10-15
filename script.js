function mostrarDetalle(id) {
    var elemento = document.getElementById(id);
    if (elemento.style.display === "none") {
        elemento.style.display = "block";
    } else {
        elemento.style.display = "none";
    }
}

// NO FUNCIONA EN CHROME
// Variable para almacenar si se está reproduciendo audio o video
// var reproduciendo = false;

// function reproducirExplicacion(textId, videoId) {
//     var video = document.getElementById(videoId);
//     var militarVideo = document.getElementById('militar-video');
    
//     if (reproduciendo) {
//         // Si está reproduciendo, cancela la reproducción
//         window.speechSynthesis.cancel(); // Detiene el audio
//         video.pause(); // Pausa el video
//         video.currentTime = 0; // Reinicia el video al principio
        
//         // Pausa y oculta el video militar
//         militarVideo.pause();
//         militarVideo.style.display = "none";

//         reproduciendo = false;
//     } else {
//         var elemento = document.getElementById(textId); // Obtiene el div con el contenido del texto
//         var texto = elemento.textContent || elemento.innerText; // Extrae el texto

//         // Reproduce el video
//         video.play();
        
//         // Muestra y reproduce el video militar
//         militarVideo.style.display = "block";
//         militarVideo.play();
        
//         // Configura Speech Synthesis para leer el texto
//         var utterance = new SpeechSynthesisUtterance(texto);
//         utterance.lang = 'es-ES'; // Idioma español

//         // Reproduce el texto en voz alta
//         window.speechSynthesis.speak(utterance);
        
//         reproduciendo = true;
        
//         // Detecta cuando el audio finaliza para actualizar la variable
//         utterance.onend = function() {
//             reproduciendo = false;
//             militarVideo.style.display = "none";
//         };
        
//         // Detecta cuando el video principal finaliza para actualizar la variable
//         video.onended = function() {
//             reproduciendo = false;
//         };

//         // Detecta cuando el video militar finaliza para ocultarlo
//         video.onended = function() {
//             militarVideo.style.display = "none";
//         };
//     }
// }

// FUNCIONA EN CHROME
// Variable para almacenar si se está reproduciendo audio o video
var reproduciendo = false;
function reproducirExplicacion(textId, videoId) {
    var video = document.getElementById(videoId);
    var militarVideo = document.getElementById('militar-video');
    var elemento = document.getElementById(textId);
    var texto = elemento.textContent || elemento.innerText;

    // Pausa video si ya se está reproduciendo
    if (reproduciendo) {
        window.speechSynthesis.cancel();
        video.pause();
        video.currentTime = 0; // Reinicia el video al principio

        // Pausa y oculta el video militar
        militarVideo.pause();
        militarVideo.style.display = "none";
        reproduciendo = false;
    } else {
        video.play();
        militarVideo.style.display = "block";
        militarVideo.play();

        // Divide el texto en fragmentos si es muy largo
        var fragmentos = texto.match(/.{1,100}/g); // Divide en fragmentos de 200 caracteres
        function hablarFragmento(i) {
            if (i < fragmentos.length) {
                var utterance = new SpeechSynthesisUtterance(fragmentos[i]);
                utterance.lang = 'es-ES';
                utterance.rate = 0.95; // Ajusta la velocidad a 90% de la normal (opcional)
                window.speechSynthesis.speak(utterance);

                utterance.onend = function() {
                    hablarFragmento(i + 1); // Reproduce el siguiente fragmento
                };
            } else {
                reproduciendo = false;
                militarVideo.style.display = "none";
            }
        }

        hablarFragmento(0);
        reproduciendo = true;

        video.onended = function() {
            reproduciendo = false;
            militarVideo.style.display = "none";
        };
    }
}


// NO FUNCIONA EN CHROME
// Función para reproducir el texto oculto en audio
// function reproducirAudio(id) {

//     var militarVideo = document.getElementById('militar-video');

//     if (reproduciendo) {
//         window.speechSynthesis.cancel(); // Detiene el audio
//         reproduciendo = false;

//         // Pausa y oculta el video militar
//         militarVideo.pause();
//         militarVideo.style.display = "none";

//     }else{

//         var elemento = document.getElementById(id); // Obtiene el div con el contenido del texto
//         var texto = elemento.textContent || elemento.innerText; // Extrae el texto
        
//         // Configura Speech Synthesis
//         var utterance = new SpeechSynthesisUtterance(texto);
//         utterance.lang = 'es-ES'; // Idioma español
        
//         // Reproduce el texto
//         window.speechSynthesis.speak(utterance);

//         // Muestra y reproduce el video militar
//         militarVideo.style.display = "block";
//         militarVideo.play();

//         reproduciendo = true;

//         // Detecta cuando el audio finaliza para actualizar la variable
//         utterance.onend = function() {
//             reproduciendo = false;
//             militarVideo.style.display = "none";
//         };
//     }
// }

// FUNCIONA EN CHROME
// Función para reproducir el texto oculto en audio
function reproducirAudio(id) {
    var militarVideo = document.getElementById('militar-video');
    var elemento = document.getElementById(id); // Obtiene el div con el contenido del texto
    var texto = elemento.textContent || elemento.innerText; // Extrae el texto

    // Pausa si ya se está reproduciendo
    if (reproduciendo) {
        window.speechSynthesis.cancel(); // Detiene el audio
        reproduciendo = false;

        // Pausa y oculta el video militar
        militarVideo.pause();
        militarVideo.style.display = "none";
    } else {
        // Divide el texto en fragmentos de hasta 200 caracteres
        var fragmentos = texto.match(/.{1,100}/g);

        // Función para reproducir cada fragmento de texto secuencialmente
        function hablarFragmento(i) {
            if (i < fragmentos.length) {
                var utterance = new SpeechSynthesisUtterance(fragmentos[i]);
                utterance.lang = 'es-ES'; // Idioma español
                utterance.rate = 0.9; // Ajusta la velocidad a 90% de la normal (opcional)
                
                // Reproduce el fragmento
                window.speechSynthesis.speak(utterance);

                // Cuando el fragmento termina, reproduce el siguiente
                utterance.onend = function() {
                    hablarFragmento(i + 1); // Reproduce el siguiente fragmento
                };
            } else {
                reproduciendo = false;
                militarVideo.style.display = "none";
            }
        }

        // Inicia la reproducción desde el primer fragmento
        hablarFragmento(0);

        // Muestra y reproduce el video militar
        militarVideo.style.display = "block";
        militarVideo.play();

        reproduciendo = true;

        // Detecta cuando el video militar termina para ocultarlo
        militarVideo.onended = function() {
            militarVideo.style.display = "none";
        };
    }
}



document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll("section");
    const menuItems = document.querySelectorAll(".sidebar ul li");

    // Función para quitar la clase activa de todos los elementos del menú
    function clearActiveItems() {
        menuItems.forEach(item => {
            item.classList.remove('active');
            const img = item.querySelector('img');
            if (img) {
                img.remove(); // Eliminar la imagen si está presente
            }
        });
    }

    // Función para activar un elemento del menú
    function activateMenuItem(id) {
        const activeItem = document.querySelector(`.sidebar ul li a[href="#${id}"]`);
        if (activeItem) {
            clearActiveItems();
            activeItem.parentElement.classList.add('active');

            // Añadir la imagen del tanque al lado del texto
            const imgTanque = document.createElement('img');
            imgTanque.src = 'pictures/Tanque.png';
            activeItem.appendChild(imgTanque);
        }
    }

    // Configuración de IntersectionObserver
    const observerOptions = {
        root: null, // Usa el viewport como el contenedor de referencia
        rootMargin: "0px",
        threshold: 0.6 // Se considera visible cuando al menos el 60% de la sección está en pantalla
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute("id");
                activateMenuItem(sectionId);
            }
        });
    }, observerOptions);

    // Observar todas las secciones
    sections.forEach(section => {
        observer.observe(section);
    });
});


function buscarContenido() {
    const input = document.getElementById('searchInput');
    const filter = input.value.toLowerCase();
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const title = section.querySelector('h2').innerText.toLowerCase();
        const content = section.innerText.toLowerCase();

        if (title.includes(filter) || content.includes(filter)) {
            section.style.display = ''; // Mostrar la sección si hay coincidencia
        } else {
            section.style.display = 'none'; // Ocultar si no hay coincidencia
        }
    });
}

// Lista de imágenes disponibles
const imagenesCabecera = [
    'pictures/ImagenCabecera1.png',
    'pictures/ImagenCabecera2.png',
    'pictures/ImagenCabecera3.png',
    'pictures/ImagenCabecera4.png',
    'pictures/ImagenCabecera5.png',
    'pictures/ImagenCabecera6.png',
    'pictures/ImagenCabecera7.png',
    'pictures/ImagenCabecera8.png',
    'pictures/ImagenCabecera9.png'
];

// Función para asignar una imagen aleatoria a cada paso
// function asignarImagenAleatoria(pasoId, imgId) {
//     const imagenAleatoria = imagenesCabecera[Math.floor(Math.random() * imagenesCabecera.length)];
//     document.getElementById(imgId).src = imagenAleatoria;
// }

// Asignar eventos a las imágenes aleatorias
function asignarImagenAleatoria(pasoId, imgId) {
    const imagenAleatoria = imagenesCabecera[Math.floor(Math.random() * imagenesCabecera.length)];
    const imgElement = document.getElementById(imgId);
    imgElement.src = imagenAleatoria;

    // Añadir evento de clic para mostrar la imagen en pantalla completa
    imgElement.onclick = mostrarImagenPantallaCompleta;
}


// Función para abrir la imagen en pantalla completa
function mostrarImagenPantallaCompleta() {
    const fullscreenContainer = document.getElementById('fullscreen-container');
    fullscreenContainer.style.display = 'flex'; // Mostrar el contenedor en pantalla completa
}

// Función para cerrar la imagen en pantalla completa
function cerrarImagenPantallaCompleta() {
    const fullscreenContainer = document.getElementById('fullscreen-container');
    fullscreenContainer.style.display = 'none'; // Ocultar el contenedor
}

// Asignar imágenes aleatorias a cada paso
window.onload = function() {
    asignarImagenAleatoria('paso-1', 'img-paso-1');
    asignarImagenAleatoria('paso-2', 'img-paso-2');
    asignarImagenAleatoria('paso-3', 'img-paso-3');
    asignarImagenAleatoria('paso-4', 'img-paso-4');
    asignarImagenAleatoria('paso-5', 'img-paso-5');
    asignarImagenAleatoria('paso-6', 'img-paso-6');
    asignarImagenAleatoria('paso-7', 'img-paso-7');
    asignarImagenAleatoria('paso-8', 'img-paso-8');
    asignarImagenAleatoria('paso-9', 'img-paso-9');
    asignarImagenAleatoria('paso-10', 'img-paso-10');
    asignarImagenAleatoria('paso-11', 'img-paso-11');
    asignarImagenAleatoria('paso-12', 'img-paso-12');
    asignarImagenAleatoria('paso-13', 'img-paso-13');
    asignarImagenAleatoria('paso-14', 'img-paso-14');
    asignarImagenAleatoria('paso-15', 'img-paso-15');
    asignarImagenAleatoria('paso-16', 'img-paso-16');

     // Asignar evento al botón de cierre
     document.getElementById('close-button').onclick = cerrarImagenPantallaCompleta;
};

// Maneja el video inicial y el botón de "Reproducir intro"
document.addEventListener("DOMContentLoaded", function() {
    var videoPopup = document.getElementById("video-popup");
    var closeButton = document.getElementById("close-video");
    var video = document.getElementById("motivacion-video");
    var introButton = document.getElementById("reproducir-intro"); // Botón "Reproducir intro"

    // Mostrar el video emergente al cargar la página
    videoPopup.style.display = "flex";

    // Cerrar el video emergente cuando se haga clic en el botón de cerrar
    closeButton.addEventListener("click", function() {
        videoPopup.style.display = "none";
        video.pause();
        video.currentTime = 0; // Reiniciar el video
    });

    // Mostrar el video emergente al hacer clic en el botón "Reproducir intro"
    introButton.addEventListener("click", function() {
        videoPopup.style.display = "flex";
        video.play(); // Iniciar la reproducción del video
    });
});
