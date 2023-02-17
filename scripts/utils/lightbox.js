// imports
import { createElement } from "../factories/createElement.js";
import { blurBg, clearBg } from "./blurBg.js";
import { disableScroll, enableScroll} from "./scroll.js";


// fonctions HELPERS

const lightboxContainer = document.querySelector("#lightbox-container");
const mediaTitleContainer = document.querySelector(".media-title-container");

function createMediaLightbox(media) {
    if (media.nodeName === "IMG") {
        return createElement('img', {src: media.src, class: "media-lightbox"});
    }
    else {
        return createElement('video', {src: media.src, controls: true, class: "media-lightbox", tabindex: "0"});
    }
}

function lightboxMediaCardDOM(media) {
    const title = media.nextSibling.firstChild.textContent;    
    const titleLightbox = createElement('h3', {class: "title-lightbox"}, title);
    
    mediaTitleContainer.appendChild(createMediaLightbox(media));
    mediaTitleContainer.appendChild(titleLightbox);
}

// navigation clavier 'focus tabindex' à l'intérieur de la lightbox
    
const closeX = document.querySelector(".fa-times");
const leftChevron = document.querySelector(".fa-chevron-left");
const rightChevron = document.querySelector(".fa-chevron-right");

function preventTabOutLightbox() {
    closeX.focus();        
    closeX.addEventListener('keydown', function(event) {
        // event.preventDefault();
        if (event.key === "Tab" && event.shiftKey) {
            rightChevron.focus(); // bug : saute ce focus
        }
    })
    rightChevron.addEventListener('keydown', function(event) {
        event.preventDefault();
        if (event.key === "Tab") {
            closeX.focus();
        }
    })
}

// ouvre la lightbox

function openLightbox(media) {
    lightboxContainer.style.display = 'block';
    lightboxMediaCardDOM(media);
    blurBg();
    disableScroll();
    preventTabOutLightbox();
}

// ferme la lightbox

function closeLightbox() {
    lightboxContainer.style.display = 'none';
    mediaTitleContainer.innerHTML = "";
    clearBg();
    enableScroll();
}

// update de l'affichage du media

function updateLightbox(media) {
    mediaTitleContainer.innerHTML = "";
    lightboxMediaCardDOM(media);
}

// function export de mise en route de la lightbox

export function enableLightbox() {
    
    // variables
    
    const mediasNodeList = document.querySelectorAll('.media'); // NodeList
    const medias = Array.from(mediasNodeList); // Array
    let currentMediaIndex = null;

    
    // au clic sur un media (ouvre la lightbox)
    
    medias.forEach(function(media) {
        media.addEventListener('click', function() {          
            openLightbox(media);
            currentMediaIndex = medias.indexOf(media);
        })
        
        // même chose pour navigation au clavier
        
        media.addEventListener('keydown', function(event) {
            if (event.key === "Enter") {
                openLightbox(media);
                currentMediaIndex = medias.indexOf(media);
            }
        })
    })    
    
    // affiche le média précédent
    
    function previousMedia() {
        if (currentMediaIndex === 0) {
            currentMediaIndex = medias.length - 1;
        } else {
            currentMediaIndex -= 1;
        }
        updateLightbox(medias[currentMediaIndex]);
    }

    // affiche le média suivant
    
    function nextMedia() {
        if (currentMediaIndex === medias.length - 1) {
            currentMediaIndex = 0;
        } else {
            currentMediaIndex += 1;
        }
        updateLightbox(medias[currentMediaIndex]);
    }

    // au clic sur les chevrons (passage d'un média au précedent ou suivant)

    leftChevron.addEventListener('click', previousMedia);
    rightChevron.addEventListener('click', nextMedia);

    // même chose pour la navigation au clavier

    leftChevron.addEventListener('keydown', function(event) {
        if (event.key === "Enter") {
            previousMedia();
        }
    })

    rightChevron.addEventListener('keydown', function(event) {
        if (event.key === "Enter") {
            nextMedia();
        }
    })
    
    // au clic ET keydown 'Enter' sur la croix X (ferme la lightbox)
    
    closeX.addEventListener('click', closeLightbox);
    closeX.addEventListener('keydown', function(event) {
        if (event.key === "Enter") {
            closeLightbox();
        }
    })
    
    // autre touches actives pour navigation clavier lightbox ouverte

    window.addEventListener('keydown', function(event) {

        if (event.key === "Escape") {
            closeLightbox();
        }

        if (event.key === "ArrowLeft") {
            previousMedia();
        }

        if (event.key === "ArrowRight" || event.key === "Spacebar" || event.key === " ") {
            event.preventDefault();
            nextMedia();
        }

    })
}










