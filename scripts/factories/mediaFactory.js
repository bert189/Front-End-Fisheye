// imports

import {createElement} from "./createElement.js";

// offset top cadrage des images portrait

function portraitImgOffsetTop(img) {
    if (img.naturalHeight > img.naturalWidth) {
        console.log('yes')
        img.classList.add("offset-top");
    }
}

// création de la card img

function getImageCardDOM(media) {

    const urlImage = `assets/medias/${media.name}/${media.image}`;
    const article = createElement('article');
    const img = createElement('img', { src: urlImage });
    const title = createElement('div', { class: "title-wrapper" });
    const h3 = createElement('h3', {}, media.title);
    const likes = createElement('div', { class: "likes" });
    likes.innerHTML = `${media.likes}&nbsp;&#10084;`;

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
    const article = createElement('article');
    const video = createElement('video', { src: urlVideo, controls: true });
    const title = createElement('div', { class: "title-wrapper" });
    const h3 = createElement('h3', {}, media.title);
    const likes = createElement('div', { class: "likes" });
    likes.innerHTML = `${media.likes}&nbsp;&#10084;`;

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
