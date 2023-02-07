const hearts = document.getElementsByClassName("fa-heart");
const heartsChecked = document.getElementsByClassName("fa-heart-circle-check");
const likes = document.getElementsByClassName("likes");
const totalLikes = document.querySelector(".total-likes");

// affichage de la somme des likes

function renderTotalLikes() {

    let sumLikes = 0;

    Array.from(likes).forEach(function(like) {
        sumLikes += parseInt(like.textContent);
    })

    totalLikes.innerHTML = `${sumLikes}&nbsp;<i class="fa-solid fa-heart"></i>`;
}

// fonctionnement du système de Likes

export function enableLikes() {    

    renderTotalLikes();

    Array.from(hearts).forEach(function(heart) {   
        
        heart.addEventListener('click', function() {

            heart.classList.add("display-none");
            heart.nextElementSibling.classList.remove("display-none");

            const like = heart.previousElementSibling;
            like.textContent = parseInt(like.textContent) + 1;

            renderTotalLikes();
        })
    })

    Array.from(heartsChecked).forEach(function(heartChecked) {

        heartChecked.addEventListener('click', function() {
            const heart = heartChecked.previousElementSibling;

            heartChecked.classList.add("display-none");
            heart.classList.remove("display-none");
            
            const like = heart.previousElementSibling;
            like.textContent = parseInt(like.textContent) - 1;

            renderTotalLikes();
        })
    })
}