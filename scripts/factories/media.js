// cration de la card img

function getImageCardDOM(media) {
    
    const urlImage = `assets/medias/${media.photographerName}/${media.image}`;

    const article = document.createElement( 'article' );

    const img = document.createElement( 'img' );
    img.setAttribute("src", urlImage);

    const title = document.createElement( 'h3' );
    title.textContent = media.title;

    const likes = document.createElement('div');
    likes.innerHTML = `${media.likes}&nbsp;&#10084;`;

    article.appendChild(img);
    article.appendChild(title);
    article.appendChild(likes);

    return (article);      

}

// création de la card video

function getVideoCardDOM(media) {
    
    const urlVideo = `assets/medias/${media.photographerName}/${media.video}`;

    const article = document.createElement( 'article' );
    
    const video = document.createElement( 'video' );
    video.setAttribute("src", urlVideo);

    const title = document.createElement( 'h3' );
    title.textContent = media.title;

    const likes = document.createElement('div');
    likes.innerHTML = `${media.likes}&nbsp;&#10084;`;

    article.appendChild(video);
    article.appendChild(title);
    article.appendChild(likes);

    return (article);    

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
