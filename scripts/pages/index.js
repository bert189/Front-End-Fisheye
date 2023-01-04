

const api_url = "data/photographers.json";

async function getPhotographers(url) {    
    const response = await fetch(url);
    const data = await response.json();
    const photographers = data.photographers;
    console.log(photographers);
    displayData(photographers);
}

getPhotographers(api_url);


async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
};







