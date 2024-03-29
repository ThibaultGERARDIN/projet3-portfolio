// import des modules

import { checkConnected } from "./modules/checkconnected.js";
import { createFigure } from "./modules/createfigure.js";
import { createFiltres } from "./modules/createfiltres.js";
import { showmodalGallery, showmodalAdd } from "./modules/gestionmodale.js";

// récupère le token de login
let token = window.sessionStorage.getItem('token');

// appel de la fonction qui passe en mode édition si l'utilisateur est connecté
checkConnected(token);

// comportement du lien logout 
const logout = document.getElementById('logout-link');
logout.addEventListener('click', function () {
    // supprime le token du localstorage
    sessionStorage.removeItem('token');

})

// appel de la fonction pour remplir les galeries
createFigure(0, 'gallery');
createFigure(0, 'mini-gallery');



// appel de la fonction qui gère les filtres
createFiltres();


// appel des fonctions qui gèrent la modal

showmodalAdd();
showmodalGallery();
