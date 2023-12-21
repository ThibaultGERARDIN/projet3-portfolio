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

