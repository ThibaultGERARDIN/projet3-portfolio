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
    // Utilisation du filtre Objets pour retourner les travaux avec la catégorie Objets uniquement
    const boutonObjets = document.getElementById("btn1");

    boutonObjets.addEventListener("click", function () {
        createFigure(1, 'gallery');
    })

    // Utilisation du filtre Appartements pour retourner les travaux avec la catégorie Appartements uniquement
    const boutonAppartements = document.getElementById("btn2");

    boutonAppartements.addEventListener("click", function () {
        createFigure(2, 'gallery');
    })

    // Utilisation du filtre Hotels et restaurants pour retourner les travaux avec la catégorie Hotels et restaurants uniquement
    const boutonHotelsetresto = document.getElementById("btn3");

    boutonHotelsetresto.addEventListener("click", function () {
        createFigure(3, 'gallery');
    })
    // Filtre tous pour reset
    const boutonTous = document.getElementById("tous");

    boutonTous.addEventListener("click", function () {
        createFigure(null, 'gallery');
    })
}

