// récupère le token de login
let token = window.sessionStorage.getItem('token');

import { createFigure } from "./createfigure.js";

// fonction fetch en POST pour ajouter le projet dans la base de donnée
export async function addWorks(formData) {
    const response = await fetch('http://localhost:5678/api/works', {
        method: 'POST',
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${token.replace(/^"(.+(?="$))"$/, '$1')}`,
        },
        body: formData
    })
    if (response.ok) {
        console.log("Le projet a bien été ajouté");
        // recréé les galeries avec le projet qui a été ajouté
        createFigure(0, 'gallery');
        createFigure(0, 'mini-gallery');
    } else {
        alert("Echec de l'ajout");
    }
}
