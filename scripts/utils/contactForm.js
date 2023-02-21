// imports
import { blurBg, clearBg } from "./blurBg.js";
import { disableScroll, enableScroll} from "./scroll.js";
import { preventTabOut } from "./preventTabOut.js";


// TRAITEMENT DU FORMULAIRE

const firstName = document.getElementById("firstname");
const lastName = document.getElementById("lastname");
const email = document.getElementById("email");
const message = document.getElementById("message");

const sendButton = document.querySelector(".send_button");

// HELPER vider les champs du formumaire et messages d'erreurs

const inputs = document.querySelectorAll('form input');
const inputsArray = Array.from(inputs);
const textArea = document.querySelector('form textarea');
inputsArray.push(textArea);
const errors = document.querySelectorAll('.error');

function clearInputs() {
    inputsArray.forEach(function(input) {
        input.value = "";
        input.classList.remove("warning");
    })
    errors.forEach(error => error.textContent = "");
}

// fonction de traîtement du formulaire

function formProcessing() {
    
    let newContact = {};
    let error = false;
    
    // prénom
    if (/^[a-zA-Z]{1,}[- ']{0,1}[a-zA-Z]{1,}$/.test(firstName.value)) {
        newContact.firstName = firstName.value;
    }
    else {
        firstName.classList.add('warning');
		firstName.nextElementSibling.textContent = "Prénom incorrect";
		error = true;
	}  
    
    // nom
    if (/^[a-zA-Z]{1,}[- ']{0,1}[a-zA-Z]{1,}$/.test(lastName.value)) {
        newContact.lastName = lastName.value;
    }
    else {
        lastName.classList.add('warning');
		lastName.nextElementSibling.textContent = "Nom incorrect";
		error = true;
	}
    
    // email
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)) {
        newContact.email = email.value;
	}
    else {
        email.classList.add('warning');
		email.nextElementSibling.textContent = "L'email n'est pas valide";
		error = true;
	}
    
    // message
    if (message.value.trim()) {
        newContact.message = message.value;
    }
    else {
        message.classList.add('warning');
		message.nextElementSibling.textContent = "Vous devez entrer un message";
		error = true;
	}
    
    // enlever signal d'erreur au clic sur un champs invalide
    
    inputsArray.forEach(function(input) {
        input.addEventListener('focus', function() {
            input.classList.remove('warning');
            input.nextElementSibling.textContent = '';
            error = false;
	    });
    })
    
    // envoi du message
    
    if (error === false) {
        console.log('Données envoyées :');
        console.log(`prénom : ${newContact.firstName}`);
        console.log(`nom : ${newContact.lastName}`);
        console.log(`email : ${newContact.email}`);
        console.log(`message : ${newContact.message}`);
        
        // affichage de confirmation d'envoi
        
        const namePhotographer = document.querySelector('.modal h4').textContent;
        const response = document.querySelector(".response");
        
        confirm.style.display = "flex";
        response.innerHTML = `${namePhotographer} vous répondra prochainement.` ;
        preventTabOutConfirm();
    }
}


// DISPLAY MODALE

const modalContainer = document.getElementById("modal-container");
const confirm = document.querySelector(".confirm");
const contactButton = document.querySelector(".contact_button");
const closeCross = document.querySelector(".close_cross");
const closeButton = document.querySelector(".close_button");

// HELPER navigation clavier, empêche l'utilisateur de sortir 'focus tabindex' de la modale

function preventTabOutConfirm() {
    // focus sur le bouton 'Fermer'
    closeButton.focus();
    closeButton.addEventListener('keydown', function(event) {
        event.preventDefault();
        if (event.key === "Tab" || (event.key === "Tab" && event.shiftKey)) {
            closeCross.focus();
        }
    })
    closeCross.addEventListener('keydown', function(event) {
        event.preventDefault();
        if (event.key === "Tab" || (event.key === "Tab" && event.shiftKey)) {
            closeButton.focus();
        }
    })    
}

// au clic sur bouton "Contactez-moi"

const modal = document.querySelector(".modal");

function displayModal() {   
    // ouverture modale 
	modalContainer.style.display = "block";
    // affichage du nom de photographe à contacter
    document.querySelector('.modal h4').textContent = document.querySelector('.photograph-header h2').textContent;
    // effet background flou
    blurBg();
    // figer le scroll du background
    disableScroll();
    // contenir le focus sur la modale au keydown Tab
    preventTabOut(modal);
    // focus sur le premier champ tabindex de la modale
    firstName.focus();
}

contactButton.addEventListener('click', displayModal);

// au clic (+ au keydown 'Enter') sur X et bouton "Fermer" + keydown Escape

function closeModal() {
    // fermer modale
    modalContainer.style.display = "none";
    // rendre le background net
    clearBg();
    // effacer les champs du formulaire
    clearInputs();
    // fermer la modale de confirmation d'envoi
    confirm.style.display = "none";
    // permettre le scroll de la fenêtre
    enableScroll();
    // laisser le focus sur le bouton de contact
    contactButton.focus();
}

closeCross.addEventListener('click', closeModal);
closeButton.addEventListener('click', closeModal);

closeCross.addEventListener('keydown', function(event) {
    if (event.key === "Enter") {
        closeModal();
    }
})

closeButton.addEventListener('keydown', function(event) {
    if (event.key === "Enter") {
        closeModal();
    }
})

window.addEventListener('keydown', function(event) {
    if (event.key === "Escape") {
        closeModal();
    }
})


// au clic + keydown "Enter" sur bouton "envoyer" : traitement du formulaire

sendButton.addEventListener('click', function(event) {
    event.preventDefault();
    formProcessing();

});

sendButton.addEventListener('keydown', function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        formProcessing();    
    }
})



