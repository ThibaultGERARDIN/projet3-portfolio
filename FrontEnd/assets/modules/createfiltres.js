// importe la fonction qui récupère les catégories
import { fetchCategories } from "./fetchcategories.js";
import { createFigure } from "./createfigure.js";

// fonction pour générer automatiquement les filtres par catégorie (sauf le "Tous")
export async function createFiltres() {
    let categories = await fetchCategories()
    for (let i = 0; i < categories.length; i++) {
        // récupère les infos de chaque catégorie et les place dans une variable
        const catProj = categories[i];
        // créé le bouton
        const btnFiltre = document.createElement("button");
        // ajoute les attributs au bouton créé
        btnFiltre.className = "btn-filtres";
        btnFiltre.id = `btn${catProj.id}`;
        btnFiltre.innerText = `${catProj.name}`;
        // place le bouton dans le DOM dans la div filtres
        document.querySelector('.filtres').append(btnFiltre);
    }

    // récupère les boutons créés juste au dessus
    const btnFiltres = document.querySelectorAll(".btn-filtres")
    // Ajoute un eventlistener sur chaque bouton qui permet le tri par catégorie en recréant la gallerie
    btnFiltres.forEach(function (e) {
        e.addEventListener("click", () => {
            // extrait l'Id de la catégorie depuis l'Id du bouton filtre
            let catId = e.id.replace("btn", "");
            // transforme l'Id récupérée en number
            catId = Number(catId);
            // appelle la fonction qui génère la gallerie avec uniquement la catégorie selectionnée
            createFigure(catId, 'gallery');
        })
    })
 }

