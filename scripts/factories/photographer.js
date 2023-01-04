function photographerFactory(data) {
    const { name, id, city, country, tagline, price, portrait } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {

        const a = document.createElement('a');
        a.href = `photographer.html?id=${id}`;
        
        const article = document.createElement( 'article' );
        a.appendChild(article);

        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);

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
    return { name, picture, getUserCardDOM };
}