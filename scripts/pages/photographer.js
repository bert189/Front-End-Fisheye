// imports

import { getAPI } from "../api/api.js";
import { mediaFactory } from "../factories/media.js"
import { photographerFactory } from "../factories/photographer.js";


//  url API

const api_url = "data/photographers.json";


// récupération de l'id du photographe depuis l'url de la page

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
// console.log(typeof urlParams.get('id')); // string !!!
const photographerId = parseInt(urlParams.get('id'));


// affichage datas profil photographe
//   1. fabrique 3 éléments HTML du profil
//   2. display des 3 parties du profil

function displayPhotographer(datasPhotographer) {    
    
    // object destructuring
    const { profile, img, fee } = photographerFactory(datasPhotographer, 'photographer');

    const profilePhotographer = document.querySelector('.profile-photographer');
    profilePhotographer.appendChild(profile);
    
    const portraitPhotographer = document.querySelector('.portrait-photographer');
    portraitPhotographer.appendChild(img);
        
    const hourlyFee = document.querySelector('.hourly-fee');
    hourlyFee.appendChild(fee);

}

// boucle d'affichage des médias

function displayMedias(medias, photographerName) {
    const mediasContainer = document.querySelector(".medias-container");

    medias.forEach((media) => {
        const mediaCard = mediaFactory({...media, photographerName: photographerName}); // spread operator
        mediasContainer.appendChild(mediaCard);
    });
}


// execution au chargement :
//   1. récupération datas API
//   2. constitution array photographe
//   3. constitution array medias du photographe
//   4. affichage datas photographe
//   5. affichage medias du photographe


// async function init(photographerId) {
    
//     const data = await getAPI(api_url);
//     const photographers = await data.photographers;
//     const medias = await data.media;

//     let datasPhotographer = [];

//     photographers.forEach(photographer => {
//         if (photographer.id === photographerId) {
//             datasPhotographer = photographer;
//         }
//     });   

//     let mediasPhotographer = [];

//     medias.forEach(media => {
//         if (media.photographerId === photographerId) {
//             mediasPhotographer.push(media);
//         }
//     });
   
//     const name = datasPhotographer.name;
    
//     displayPhotographer(datasPhotographer);
//     displayMedias(mediasPhotographer, name);
// }

async function init(photographerId) {
    const {photographers, media} = await getAPI(api_url);

    // find() retourne le 1er objet qui répond à la condition, et s'arrête
    const photographer = photographers.find(p => p.id === photographerId);
    
    // filter() retourne tous les objets qui répondent à la condition
    const medias = media.filter(m => m.photographerId === photographerId);
    
    displayPhotographer(photographer);

    // passer le nom pour du photographe pour l'url de son dossier medias
    displayMedias(medias, photographer.name);
}

init(photographerId);

