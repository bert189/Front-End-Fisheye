// flouter + rendre net l'arrière-plan d'une modale

const header = document.querySelector('header');
const main = document.querySelector('main');
const likesFeeWrapper = document.querySelector(".likes-fee-wrapper");

export function blurBg() {
    header.classList.add('blur');
    main.classList.add('blur');
    likesFeeWrapper.classList.add('blur');
}

export function clearBg() {
    header.classList.remove('blur');
    main.classList.remove('blur');
    likesFeeWrapper.classList.remove('blur');
}