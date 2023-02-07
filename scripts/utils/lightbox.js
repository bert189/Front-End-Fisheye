// imports
import { createElement } from "../factories/createElement.js";
import { blurBg, clearBg } from "./blurBg.js";

// fonctions HELPERS

const lightboxContainer = document.querySelector("#lightbox-container");
const mediaTitleContainer = document.querySelector(".media-title-container");

function createMediaLightbox(media) {
    if (media.nodeName === "IMG") {
        return createElement('img', {src: media.src, class: "media-lightbox"});
    }
    else {
        return createElement('video', {src: media.src, controls: true, class: "media-lightbox"});
    }
}

function lightboxMediaCardDOM (media) {
    const title = media.nextSibling.firstChild.textContent;    
    const titleLightbox = createElement('h3', {class: "title-lightbox"}, title);
    
    mediaTitleContainer.appendChild(createMediaLightbox(media));
    mediaTitleContainer.appendChild(titleLightbox);
}

// ouvre la lightbox

function openLightbox(media) {
    lightboxContainer.style.display = 'block';
    lightboxMediaCardDOM(media);
}

// ferme la lightbox

function closeLightbox() {
    lightboxContainer.style.display = 'none';
    mediaTitleContainer.innerHTML = "";
    clearBg();
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
    
    // au clic sur un media (ouvre la lightbox)

    const medias = Array.from(mediasNodeList);
    let currentMediaIndex = null;

    medias.forEach(function(media) {
        media.addEventListener('click', function() {          
            openLightbox(media);
            blurBg();
            currentMediaIndex = medias.indexOf(media);
        })
    })

    // au clic sur les chevrons (passage d'un média au précedent ou suivant)

    const leftChevron = document.querySelector(".fa-chevron-left");
    const rightChevron = document.querySelector(".fa-chevron-right");

    leftChevron.addEventListener('click', function() {
        if (currentMediaIndex === 0) {
            currentMediaIndex = medias.length - 1;
        } else {
            currentMediaIndex -= 1;
        }
        updateLightbox(medias[currentMediaIndex]);
    })

    rightChevron.addEventListener('click', function() {
        if (currentMediaIndex === medias.length - 1) {
            currentMediaIndex = 0;
        } else {
            currentMediaIndex += 1;
        }
        updateLightbox(medias[currentMediaIndex]);
    })

    // au clic sur la croix X (ferme la lightbox)

    const closeX = document.querySelector(".fa-times");
    closeX.addEventListener('click', closeLightbox);
}







