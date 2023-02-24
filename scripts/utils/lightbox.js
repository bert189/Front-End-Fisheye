// imports
import { createElement } from "../factories/createElement.js";
import { blurBg, clearBg } from "./blurBg.js";
import { disableScroll, enableScroll} from "./scroll.js";
import { preventTabOut } from "./preventTabOut.js";


// fonctions HELPERS

const lightboxContainer = document.querySelector("#lightbox-container");
const mediaTitleContainer = document.querySelector(".media-title-container");

function createMediaLightbox(media) {
    if (media.nodeName === "IMG") {
        return createElement('img', {src: media.src, class: "media-lightbox", alt: media.alt, 'aria-label': "vue agrandie de la photo"});
    }
    else {
        return createElement('video', {src: media.src, controls: true, class: "media-lightbox", alt: media.alt, 'aria-label': "vue agrandie de la video", tabindex: "0"});
    }
}

function lightboxMediaCardDOM(media) {
    const title = media.nextSibling.firstChild.textContent;    
    const titleLightbox = createElement('h3', {class: "title-lightbox"}, title);
    
    mediaTitleContainer.appendChild(createMediaLightbox(media));
    mediaTitleContainer.appendChild(titleLightbox);
}

// navigation clavier 'focus tabindex' à l'intérieur de la lightbox

const lightbox = document.querySelector(".lightbox");    
const closeX = document.querySelector(".fa-times");
const leftChevron = document.querySelector(".fa-chevron-left");
const rightChevron = document.querySelector(".fa-chevron-right");

// ouvre la lightbox

function openLightbox(media) {
    lightboxContainer.style.display = 'block';
    lightboxContainer.setAttribute('aria-hidden', 'false');
    lightboxMediaCardDOM(media);
    blurBg();
    disableScroll();
    closeX.focus();
    preventTabOut(lightbox);
}

// ferme la lightbox

function closeLightbox() {
    lightboxContainer.style.display = 'none';
    lightboxContainer.setAttribute('aria-hidden', 'true');
    mediaTitleContainer.innerHTML = "";
    clearBg();
    enableScroll();
    document.querySelector('.contact_button').focus(); // choix temporaire à défaut de mieux
}

// update de l'affichage du media

function updateLightbox(media) {
    mediaTitleContainer.innerHTML = "";
    lightboxMediaCardDOM(media);
    preventTabOut(lightbox); // relancer pour l'exception video tabindex
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

    lightbox.addEventListener('keydown', function(event) {

        if (event.key === "Escape") {
            if (lightboxContainer.style.display === "block") {
                closeLightbox();
            }                
        }

        if (event.key === "ArrowLeft") {
            if (lightboxContainer.style.display === "block") {
                previousMedia();
            } 
        }

        if (event.key === "ArrowRight" || event.key === "Spacebar" || event.key === " ") {
            if (lightboxContainer.style.display === "block") {
                event.preventDefault();
                nextMedia();
            } 
        }

    })
 
}










