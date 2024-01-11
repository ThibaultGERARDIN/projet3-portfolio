// récupère le token de login
let token = window.sessionStorage.getItem('token');

import { createFigure } from "./createfigure.js";


//   fonction pour supprimer les projets de la base de donnée en fonction de l'id indiquée
export async function deleteWorks(id) {
    const response = await fetch(`http://localhost:5678/api/works/${id}`, {
        method: 'DELETE',
        headers: {
            accept: "*/*",
            Authorization: `Bearer ${token.replace(/^"(.+(?="$))"$/, '$1')}`,
        },
        body: id,
    })
    if (response.ok) {
        console.log("Le projet a bien été supprimé")
        // recréé les galeries sans le projet qui a été supprimé
        createFigure(null, 'gallery')
        createFigure(null, 'mini-gallery')
    } else {
        alert("Echec de suppression");
    }
}