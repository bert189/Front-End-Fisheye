// imports

import { getAPI } from "../api/api.js";
import { photographerFactory } from "../factories/photographer.js";


//  url API

const api_url = "data/photographers.json";


// boucle l'affichage des cards photographe

function displayPhotographers(photographers) {
    const photographersSection = document.querySelector(".photographers_section");

    photographers.forEach((photographer) => {
        const photographerCard = photographerFactory(photographer);
        photographersSection.appendChild(photographerCard);
    });
};


// init() s'execute au chargement de la page :
//   1. récupération data API
//   2. création array photographers
//   3. affichage photographes

async function init() {
    const data = await getAPI(api_url);
    const photographers = await data.photographers;
    displayPhotographers(photographers);
}

init();







