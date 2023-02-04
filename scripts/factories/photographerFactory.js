// imports

import {createElement} from "./createElement.js";


// construction d'une card photographer (page index)

function getPhotographerCardDOM(photographer) {

    // object destructuring
    const { name, id, city, country, tagline, price, portrait } = photographer;

    const a = createElement('a', { href: `photographer.html?id=${id}` });
    const article = createElement('article');
    const img = createElement('img', { src: `assets/photographers/${portrait}` });    
    const h2 = createElement('h2', {}, name);
    const location = createElement('p', {}, `${city}, ${country}`);
    const catchPhrase = createElement('p', {}, tagline);
    const hourlyFee = createElement('p', {}, `${price}€/jour`);

    a.appendChild(article);
    article.append(img, h2, location, catchPhrase, hourlyFee);

    return a;
}


// construction des 3 parties du profil photographe (page photographer)

function getProfileCardsDOM(photographer) {

    const { name, city, country, tagline, price, portrait } = photographer;

    // 1. profil : nom + localité + phrase d'accroche
    const profile = createElement('div', {}, null);
    const h2 = createElement('h2', {}, name);
    const location = createElement('p', {}, `${city}, ${country}`);
    const catchPhrase = createElement('p', {}, tagline);

    profile.append(h2, location, catchPhrase);

    // 2. image portrait
    const img = createElement('img', { src: `assets/photographers/${portrait}` });
    
    // 3. tarif horaire
    const fee = createElement('div', {}, `${price}€ / jour`);

    return { profile, img, fee };

}

// factory photographe

export function photographerFactory(photographer) {

    switch (photographer.page) {
        case 'index':
            return getPhotographerCardDOM(photographer);    
        case 'photographer':
            return getProfileCardsDOM(photographer);
        default:
            break;
    }    

}