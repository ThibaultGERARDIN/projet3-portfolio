// Script à écrire pour fetch les works sur l'API (http://localhost:5678/api/works) et créer l'HTML pour afficher la page d'accueil dynamiquement



let works = window.localStorage.getItem('works');

if (works === null) {
async function fetchWorks() {
    // Récupération des pièces depuis l'API
    const reponse = await fetch('http://localhost:5678/api/works');
    works = await reponse.json();
    // Transformation des works en JSON
    const valeurWorks = JSON.stringify(works);
    // Stockage des informations dans le localStorage
    window.localStorage.setItem("works", valeurWorks);
}
} else {
    works = JSON.parse(works)
}

console.log(works)
// fonction qui créer les vignettes sur la page d'accueil en fonction des données récupérées sur l'API
function createFigure(works) {
    // clear the gallery
    const gallery = document.querySelector(".gallery")
    gallery.innerHTML=""
    
    for (let i=0; i < works.length; i++) {

        const vignette = works[i]

        const imgVignette = document.createElement("img")
        imgVignette.src = vignette.imageUrl
        imgVignette.alt = vignette.title
        const captionVignette = document.createElement("figcaption")
        captionVignette.innerText = vignette.title
        const figure = document.createElement("figure")
        gallery.append(figure)
        figure.append(imgVignette)
        figure.append(captionVignette)
   
}
}

createFigure(works)


// Utilisation du filtre Objets pour retourner les travaux avec la catégorie Objets uniquement
const boutonObjets = document.getElementById("objets");

boutonObjets.addEventListener("click", function () {
    const worksObjet = works.filter(function (works) {
        return works.category.id === 1;
    });
    createFigure(worksObjet);
});

// Utilisation du filtre Appartements pour retourner les travaux avec la catégorie Appartements uniquement
const boutonAppartements = document.getElementById("appartements");

boutonAppartements.addEventListener("click", function () {
    const worksApparttements = works.filter(function (works) {
        return works.category.id === 2;
    });
    createFigure(worksApparttements);
});

// Utilisation du filtre Hotels et restaurants pour retourner les travaux avec la catégorie Hotels et restaurants uniquement
const boutonHotelsetresto = document.getElementById("hotelsetresto");

boutonHotelsetresto.addEventListener("click", function () {
    const worksHotelsetresto = works.filter(function (works) {
        return works.category.id === 3;
    });
    createFigure(worksHotelsetresto);
});

// Filtre tous pour reset

const boutonTous = document.getElementById("tous");

boutonTous.addEventListener("click", function () {
    createFigure(works);
});