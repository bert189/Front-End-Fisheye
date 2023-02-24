// flouter + rendre net l'arrière-plan d'une modale

const header = document.querySelector("header");
const main = document.querySelector("main");
const likesFeeWrapper = document.querySelector(".likes-fee-wrapper");

export function blurBg() {
	header.classList.add("blur");
	main.classList.add("blur");
	likesFeeWrapper.classList.add("blur");

	header.setAttribute("aria-hidden", "true");
	main.setAttribute("aria-hidden", "true");
	likesFeeWrapper.setAttribute("aria-hidden", "true");
}

export function clearBg() {
	header.classList.remove("blur");
	main.classList.remove("blur");
	likesFeeWrapper.classList.remove("blur");

	header.setAttribute("aria-hidden", "false");
	main.setAttribute("aria-hidden", "false");
	likesFeeWrapper.setAttribute("aria-hidden", "false");
}