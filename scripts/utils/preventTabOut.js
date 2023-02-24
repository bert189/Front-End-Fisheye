
export function preventTabOut(modal) {

	const tabindexArray = Array.from(modal.querySelectorAll("[tabindex=\"0\"]"));

	const firstTabindex = tabindexArray[0];
	const secondTabindex = tabindexArray[1];
	const lastTabindex = tabindexArray[tabindexArray.length - 1];
	const secondToLastTabindex = tabindexArray[tabindexArray.length - 2];

	function firstTabindexBehaviour(event) {
		event.preventDefault();
		if (!event.shiftKey && event.key === "Tab") {
			secondTabindex.focus();
		}
		else if (event.key === "Tab" && event.shiftKey) {
			lastTabindex.focus();
		} 
	}

	function lastTabindexBehaviour(event) {
		event.preventDefault();
		if (!event.shiftKey && event.key === "Tab") {
			firstTabindex.focus();
		}
		else if (event.shiftKey && event.key === "Tab"){
			secondToLastTabindex.focus();
		}
	}

	firstTabindex.addEventListener("keydown", firstTabindexBehaviour);
	lastTabindex.addEventListener("keydown", lastTabindexBehaviour);


	// désactivation de l'event.preventDefault lorsque la modale est fermée
	// à l'aide d'un 'observer' de changement de display (merci chatgpt) 

	const observer = new MutationObserver(function(mutations) {
		mutations.forEach(function(mutation) {
			if (mutation.attributeName === "style") {
				// Le style de l'élément a changé
				if (lastTabindex.style.display === "none") {      
					firstTabindex.removeEventListener("keydown", firstTabindexBehaviour);
				}
			}
		});  
	});
      
	// Configuration de l'observateur : surveiller les modifications d'attribut style
	const config = { attributes: true, attributeFilter: ["style"] };
    
	// Démarrer l'observateur en passant l'élément cible et la configuration
	observer.observe(lastTabindex, config);


    
}



