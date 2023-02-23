// imports

import { getAPI } from "../api/api.js";
import { photographerFactory } from "../factories/photographerFactory.js";
import { mediaFactory } from "../factories/mediaFactory.js";
import { enableLightbox } from "../utils/lightbox.js";
import { enableLikes } from "../utils/likes.js";
import { preventTabOut } from "../utils/preventTabOut.js";


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
        
    const dailyFee = document.querySelector('.daily-fee');
    dailyFee.appendChild(fee);
}

// boucle d'affichage des médias

function displayMedias(medias, name) {
    const mediasContainer = document.querySelector(".medias-container");
    const mediasNodeList = mediasContainer.querySelectorAll('article'); // NodeList
    const existingMedias = Array.from(mediasNodeList);

    medias.forEach((media) => {
        const existingMediaCard = existingMedias.find(m => parseInt(m.id) === media.id);
        // si l'article éxiste déjà, pas besoin de le recréer via la mediaFactory
        // et SURTOUT ça permet de conserver le statut 'liked' après tri
        if (existingMediaCard) { // s'éxécute après un choix de tri
            mediasContainer.appendChild(existingMediaCard);
        }
        else { // s'éxécute au lancement init()
            const mediaCard = mediaFactory({...media, name: name}); // spread operator
            mediasContainer.appendChild(mediaCard);
        }
    });
}


// TRI AFFICHAGE MEDIAS

const options = document.querySelectorAll(".option");
const possibleOptions = document.querySelectorAll(".option:not(:first-of-type)");

// DROPDOWN : interactions et rendus visuels

const dropdown = document.querySelector(".dropdown");
const selectedOption = document.querySelector(".option:first-of-type");
const chevronDown = document.querySelector(".fa-chevron-down");
const chevronUp = document.querySelector(".fa-chevron-up");

// fonctions gérant le display du dropdown (et des chevrons)

function displayOptions() {
    possibleOptions.forEach(function(option) {
        option.style.display = 'flex';
        option.setAttribute('aria-hidden', "false");
        option.setAttribute('aria-expanded', "true");
    });
    chevronDown.style.display = 'none';
    chevronUp.style.display = 'block';
    preventTabOut(dropdown); // navigation par tabindex
}

function closeOptions() {
    possibleOptions.forEach(function(option) {
        option.style.display = 'none';
        option.setAttribute('aria-hidden', "true");
        option.setAttribute('aria-expanded', "false");
    });
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

// ouverture + réduction du dropdown au clavier 

selectedOption.addEventListener('keydown', function(event) {
    if (event.key === "Enter") {
        if (chevronUp.style.display === 'block') {
            closeOptions();
        } else {
            displayOptions();
        }
    }
})


// navigation au clavier à l'intérieur du dropdown

const optionsArray = Array.from(options);
let optionIndex = null;

optionsArray.forEach(option => {
    option.addEventListener('keydown', function(event) {
        optionIndex = optionsArray.indexOf(option);
        switch (event.key) {
            case "Escape" :
                closeOptions(); // réduction dropdown
                break;
            case "ArrowDown" :
                event.preventDefault();
                optionsArray[(optionIndex + 1) % optionsArray.length].focus();
                break;
            case "ArrowUp" :
                event.preventDefault(); 
                optionsArray[(optionIndex + (optionsArray.length - 1)) % optionsArray.length].focus(); // sens inverse
                break;
        }
    })
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

function sortMedias(medias) {
    
    // au clic sur une nouvelle option :
    possibleOptions.forEach((option) => option.addEventListener('click', function() {

        let sortedMedias = [];

        // trier les images en fonction de l'option cliquée
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

        // afficher les médias dans l'ordre choisi
        displayMedias(sortedMedias);

        // inverser le texte des options
        swapOptions(option);
        
        // réduire le dropdown en css
        closeOptions();                
    }))

    // à l'event keydown 'Enter' sur une nouvelle option :

    possibleOptions.forEach((option) => option.addEventListener('keydown', function(event) {

        if (event.key === "Enter") {

            let sortedMedias = [];

            // trier les images en fonction de l'option cliquée
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

            // afficher les médias dans l'ordre choisi
            displayMedias(sortedMedias);

            // inverser le texte des options
            swapOptions(option);
            
            // réduire le dropdown en css
            closeOptions();
        }  
    }))


    
}


// execution au chargement de la page photographer.html?id=photographerId :
//   1. récupération datas API
//   2. constitution array photographe
//   3. constitution array medias du photographe
//   4. affichage datas profil photographe
//   5. affichage medias du photographe
//   6. autoriser la fonction de tri
//   7. autoriser la fonction lightbox modale
//   8. autoriser la fonction 'like'

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

    // tri médias, va appeller displayMedias(),
    // l'argument name n'est plus nécéssaire vu qu'on se servira des <article> média affichés
    sortMedias(mediasPhotographer);
    
    // permettre l'affichage des medias dans modale lightbox
    enableLightbox();

    // permettre la possibilité de "liker"
    enableLikes();

}


init(photographerId);

