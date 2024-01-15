import { fetchWorks } from "./fetchworks.js";
import { deleteWorks } from "./deleteworks.js";

// fonction qui créer les vignettes sur un "lieu" donné (page d'accueil => gallery ou modal => mini-galery )
export async function createFigure(catId, lieu) {

    // récupère les projets sur l'API et les stocke dans une variable
    const getWorks = await fetchWorks();
    let works;
    // selectionne les projets à faire apparaitre en fonction de la catégorie selectionnée (null si tout)
    if (catId !== null) {
        works = getWorks.filter(function (getWorks) {
            return getWorks.category.id === catId;
        })
    } else {
        works = getWorks;
    }

    // récupère l'endroit où doit être créée la galerie et retire tout élément déjà présent
    const location = document.querySelector(`.${lieu}`);
    location.innerHTML = "";

    // créé les éléments HTML et les rempli avec les données récupérées grâce à l'API
    for (let i = 0; i < works.length; i++) {

        const vignette = works[i];

        // création de l'image avec les attributs nécessaires
        const imgVignette = document.createElement("img");
        imgVignette.src = vignette.imageUrl;
        imgVignette.alt = vignette.title;
        imgVignette.className = "works-img";
        imgVignette.id = vignette.id;

        // idem pour le conteneur de l'image
        const figure = document.createElement("figure");
        figure.id = vignette.id;

        // vérifie l'emplacement choisi et créé les éléments en fonction
        if (location.className === `mini-gallery`) {
            // si dans la modal : ajout d'un bouton poubelle avec les attributs nécessaires
            const trash = document.createElement("button");
            trash.className = "btn-trash";
            trash.id = `trash${vignette.id}`;
            trash.alt = vignette.title;
            trash.innerHTML = '<i class="fa-solid fa-trash-can"></i>';

            // génère les éléments dans le code html
            location.append(figure);
            figure.append(imgVignette);
            figure.append(trash);

        } else {
            // si dans la galerie : rajoute un caption aux images des projets
            const captionVignette = document.createElement("figcaption");
            captionVignette.innerText = vignette.title;
            // génère les éléments dans le code html
            location.append(figure);
            figure.append(imgVignette);
            figure.append(captionVignette);
        }
    }

    // selection des boutons poubelle + appel fonction delete sur l'ID correspondant
    const trash = document.querySelectorAll(".btn-trash");
    trash.forEach(function (e) {
        e.addEventListener("click", () => {
            // extrait l'Id du projet depuis l'Id du bouton trash
            const delId = e.id.replace("trash", "");
            // Demande de validation avant suppression de l'élément
            let validation = confirm(`Êtes-vous sûr(e) de vouloir supprimer le projet ${delId} : ${e.alt}?`);
            // procède à la suppression si validé
            if (validation === true) {
                deleteWorks(delId);
            }
        })
    })
}