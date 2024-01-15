// récupère le token de login
let token = window.sessionStorage.getItem('token');

//   fonction pour supprimer les projets de la base de donnée en fonction de l'id indiquée
export async function deleteWorks(id) {

    // récupère les éléments "figure" avec l'ID correspondant dans le DOM
    const figureGallery = document.querySelector(`.gallery figure[id="${id}"]`);
    const figureModal = document.querySelector(`.mini-gallery figure[id="${id}"]`);

    const response = await fetch(`http://localhost:5678/api/works/${id}`, {
        method: 'DELETE',
        headers: {
            accept: "*/*",
            Authorization: `Bearer ${token.replace(/^"(.+(?="$))"$/, '$1')}`,
        },
        body: id,
    })
    if (response.ok) {
        console.log("Le projet a bien été supprimé");
        // supprime du DOM les figures avec l'ID correspondant pour mettre à jour l'affichage des galeries
        figureGallery.remove();
        figureModal.remove();
    } else {
        alert("Echec de suppression");
    }
}