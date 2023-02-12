// imports

import {createElement} from "./createElement.js";

// cadrage offset + haut des images orientées portrait
// permet de voir les visages des personnes, en affichage carré

function portraitImgOffsetTop(img) {
    if (img.naturalHeight > img.naturalWidth) {
        img.classList.add("offset-top");
    }
}

// création de la card img

function getImageCardDOM(media) {

    const urlImage = `assets/medias/${media.name}/${media.image}`;
    const article = createElement('article', {id: media.id}); // id afin de conserver l'article liké après tri 
    const img = createElement('img', { src: urlImage, class: "media"});
    const title = createElement('div', { class: "title-wrapper" });
    const h3 = createElement('h3', {}, media.title);
    const likes = createElement('div', { class: "likes" });
    likes.innerHTML = `<span>${media.likes}</span><i class="fa-solid fa-heart"></i><i class="fa-solid fa-heart-circle-check display-none"></i>`;

    title.appendChild(h3);
    title.appendChild(likes);

    portraitImgOffsetTop(img);

    article.appendChild(img);
    article.appendChild(title);

    return article;
}


// création de la card video

function getVideoCardDOM(media) {
    
    const urlVideo = `assets/medias/${media.name}/${media.video}`;
    const article = createElement('article', {id: media.id}); // id afin de conserver l'article liké après tri 
    const video = createElement('video', { src: urlVideo, class: "media" });
    const title = createElement('div', { class: "title-wrapper" });
    const h3 = createElement('h3', {}, media.title);
    const likes = createElement('div', { class: "likes" });
    likes.innerHTML = `<span>${media.likes}</span><i class="fa-solid fa-heart"></i><i class="fa-solid fa-heart-circle-check display-none">`;

    title.appendChild(h3);
    title.appendChild(likes);

    article.appendChild(video);
    article.appendChild(title);

    return article;

}

// media factory, usine à cards en fonction du média

export function mediaFactory(media) {

    if (media.image) {
        return getImageCardDOM(media);
    }
    else if (media.video) {
        return getVideoCardDOM(media);
    }
    else {
        return null;
    } 
}
