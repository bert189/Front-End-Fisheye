// Désactive le scroll de la page web

export function disableScroll() {

    // Enregistre la position actuelle de la page
    let scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

    // Applique la position actuelle de la page à la fenêtre
    window.onscroll = function() {
        window.scrollTo(0, scrollPosition);
    };
}
  
// Réactive le scroll de la page web

export function enableScroll() {

    // Restaure la fonction de défilement par défaut de la fenêtre
    window.onscroll = function() {};
}
  