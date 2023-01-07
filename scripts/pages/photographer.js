import { getPhotographers } from "../api/api.js";
import { mediaFactory } from "../factories/media.js"


// récupération de l'id du photographe

const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

const product = urlParams.get('id');
console.log(id);


// profil photographe

