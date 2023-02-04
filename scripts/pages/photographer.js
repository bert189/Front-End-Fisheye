// imports

import { getAPI } from "../api/api.js";
import { mediaFactory } from "../factories/mediaFactory.js"
import { photographerFactory } from "../factories/photographerFactory.js";


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
    
    // nous de devons passer la page actuelle en argument pour que
    // la factory crée le format attendu de "profil photographe"
    datasPhotographer = {...datasPhotographer, page : 'photographer'} // spread operator    
    
    const { profile, img, fee } = photographerFactory(datasPhotographer); // object destructuring

    const profilePhotographer = document.querySelector('.profile-photographer');
    profilePhotographer.appendChild(profile);
    
    const portraitPhotographer = document.querySelector('.portrait-photographer');
    portraitPhotographer.appendChild(img);
        
    const hourlyFee = document.querySelector('.hourly-fee');
    hourlyFee.appendChild(fee);

}

// boucle d'affichage des médias

function displayMedias(medias, name) {
    const mediasContainer = document.querySelector(".medias-container");

    medias.forEach((media) => {
        const mediaCard = mediaFactory({...media, name: name}); // spread operator
        mediasContainer.appendChild(mediaCard);
    });
}


// TRI AFFICHAGE MEDIAS

const options = document.querySelectorAll(".option:not(:first-of-type)");

// DROPDOWN : interactions et rendus visuels

const dropdown = document.querySelector(".dropdown");
const selectedOption = document.querySelector(".option:first-of-type");
const chevronDown = document.querySelector(".fa-chevron-down");
const chevronUp = document.querySelector(".fa-chevron-up");

// fonctions gérant le display du dropdown (et des chevrons)

function displayOptions() {
    options.forEach(option => option.style.display = 'flex');
    chevronDown.style.display = 'none';
    chevronUp.style.display = 'block';
}

function closeOptions() {
    options.forEach(option => option.style.display = 'none');
    chevronDown.style.display = 'block';
    chevronUp.style.display = 'none';
}

// recréer l'événement hover sur le dropdown

dropdown.addEventListener("mouseenter", displayOptions);
dropdown.addEventListener("mouseleave", closeOptions);

// réduction/ouverture du dropdown au clic sur l'option déjà selectionnée

selectedOption.addEventListener('click', function() {

    if (chevronUp.style.display === 'block') {
        closeOptions();       
    } else {
        displayOptions();
    }
});


// création des 3 fonctions de tri du array medias

function sortByLikes(medias) {
    medias.sort((a, b) => b.likes - a.likes);
    return medias;
};

function sortByDates(medias) {
    medias.sort((a, b) => new Date(b.date) - new Date(a.date));
    return medias;
};

function sortByTitles(medias) {
    medias.sort((a, b) => {
        const titleA = a.title.toLowerCase();
        const titleB = b.title.toLowerCase();
        if (titleA < titleB) return -1;
        if (titleA > titleB) return 1;
        return 0;
    });
    return medias;
};

// function qui affiche la nouvelle option 'selected'

const selected = document.querySelector('.selected');

function swapOptions(option) {    
    const newOption = option.textContent;
    option.textContent = selected.textContent;
    selected.textContent = newOption;
}

// actions déclenchées par le clic sur une option

function sortMedias(medias, name) {
    
    // au clic sur une nouvelle option :
    options.forEach((option) => option.addEventListener('click', function() {

        let sortedMedias = [];

        //   1. trier les images en fonction de l'option cliquée
        switch (option.textContent) {
            case 'Popularité':
                sortedMedias = sortByLikes(medias);
                break;
            case 'Date':
                sortedMedias = sortByDates(medias);
                break;
            case 'Titre':
                sortedMedias = sortByTitles(medias);
                break;
            default:
                null;
        }

        //   2.effacer médias précedents
        const mediasContainer = document.querySelector(".medias-container");
        mediasContainer.innerHTML = "";

        //   3. afficher les médias dans l'ordre de l'option choisie
        displayMedias(sortedMedias, name);

        //   4. inverser le texte des options
        swapOptions(option);
        
        //   5. réduire le dropdown en css
        options.forEach(option => option.style.display = 'none');   
        
    }))
    
}


// execution au chargement de la page :
//   1. récupération datas API
//   2. constitution array photographe
//   3. constitution array medias du photographe
//   4. affichage datas profil photographe
//   5. affichage medias du photographe
//   6. mise en route de la fonction de tri

async function init(photographerId) {
    const {photographers, medias} = await getAPI(api_url);

    // find() retourne le 1er objet qui répond à la condition, et s'arrête
    const photographer = photographers.find(p => p.id === photographerId);
    
    // filter() retourne tous les objets qui répondent à la condition
    const mediasPhotographer = medias.filter(m => m.photographerId === photographerId);
    
    displayPhotographer(photographer);

    // classer le media photographe par popularité (option par défaut au chargement)
    // passer le nom pour du photographe pour l'url de son dossier medias
    displayMedias(sortByLikes(mediasPhotographer), photographer.name);

    // Tri médias, va appeller displayMedias(), d'ou l'argument name
    sortMedias(mediasPhotographer, photographer.name);

}


init(photographerId);

