
// construction d'une card photographer (page index)

function getPhotographerCardDOM(photographer) {

    // object destructuring
    const { name, id, city, country, tagline, price, portrait } = photographer;

    const urlPortrait = `assets/photographers/${portrait}`;

    const a = document.createElement('a');
    a.href = `photographer.html?id=${id}`;

    const article = document.createElement( 'article' );
    a.appendChild(article);

    const img = document.createElement( 'img' );
    img.setAttribute("src", urlPortrait);

    const h2 = document.createElement( 'h2' );
    h2.textContent = name;

    const location = document.createElement('p');
    location.textContent = `${city}, ${country}`;

    const catchPhrase = document.createElement('p');
    catchPhrase.textContent = tagline;

    const hourlyFee = document.createElement('p');
    hourlyFee.textContent = `${price}€/jour`;

    article.appendChild(img);
    article.appendChild(h2);
    article.appendChild(location);
    article.appendChild(catchPhrase);
    article.appendChild(hourlyFee);

    return (a);
}


// construction des 3 parties du profil photographe (page photographer)

function getProfileCardsDOM(photographer) {

    const { name, id, city, country, tagline, price, portrait } = photographer;

    const urlPortrait = `assets/photographers/${portrait}`;

    // 1. profil : nom + localité + phrase d'accroche
    const profile = document.createElement('div');

    const h2 = document.createElement( 'h2' );
    h2.textContent = name;

    const location = document.createElement('p');
    location.textContent = `${city}, ${country}`;

    const catchPhrase = document.createElement('p');
    catchPhrase.textContent = tagline;

    profile.appendChild(h2);
    profile.appendChild(location);
    profile.appendChild(catchPhrase);

    // 2. image portrait
    const img = document.createElement( 'img' );
    img.setAttribute("src", urlPortrait);

    // 3. tarif horaire
    const fee = document.createElement('div');
    fee.textContent = `${price}€ / jour`;


    return { profile, img, fee };

}

// factory photographe

export function photographerFactory(photographer) {

    // récupération de l'url de la page

    const pathName = window.location.pathname;

    if (pathName === '/photographer.html') {
        return getProfileCardsDOM(photographer);
    }
    else if (pathName === '/') {
        return getPhotographerCardDOM(photographer);
    }
    else {
        return null
    }
    

}