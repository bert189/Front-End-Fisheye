// imports

import {createElement} from "./createElement.js";


// construction d'une card photographer (page index)

function getPhotographerCardDOM(photographer) {

    // object destructuring
    const { name, id, city, country, tagline, price, portrait } = photographer;

    const a = createElement('a', { href: `photographer.html?id=${id}` });
    const article = createElement('article', { role: "link listitem", 'aria-label': `lien vers la page photographe de ${name}` });
    const img = createElement('img', { src: `assets/photographers/${portrait}`, alt: `portrait de ${name}` });
    const h2 = createElement('h2', {}, name);
    const location = createElement('p', {'aria-label': `lieu de résidence de ${name}`}, `${city}, ${country}`);
    const catchPhrase = createElement('p', {'aria-label': `slogan de ${name}`}, tagline);
    const dailyFee = createElement('p', {'aria-label': `tarif journalier de ${name}`}, `${price}€/jour`);

    a.appendChild(article);
    article.append(img, h2, location, catchPhrase, dailyFee);

    return a;
}


// construction des 3 parties du profil photographe (page photographer)

function getProfileCardsDOM(photographer) {

    const { name, city, country, tagline, price, portrait } = photographer;

    // 1. profil : nom + localité + phrase d'accroche
    const profile = createElement('div', {}, null);
    const h2 = createElement('h2', {}, name);
    const location = createElement('p', {'aria-label': `lieu de résidence de ${name}`}, `${city}, ${country}`);
    const catchPhrase = createElement('p', {'aria-label': `slogan de ${name}`}, tagline);

    profile.append(h2, location, catchPhrase);

    // 2. image portrait
    const img = createElement('img', { src: `assets/photographers/${portrait}`, alt: `portrait de ${name}` });
    
    // 3. tarif horaire
    const fee = createElement('div', {'aria-label': `tarif journalier de ${name}`}, `${price}€ / jour`);

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