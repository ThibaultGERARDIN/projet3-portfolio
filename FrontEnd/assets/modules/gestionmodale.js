import { addWorks } from "./addworks.js";
import { fetchCategories } from "./fetchcategories.js";

// Partie concernant la modal (ouverture et fermeture)

const dialog = document.querySelector("dialog");
const modif = document.getElementById("modif");
const modalGallery = document.getElementById("modal-gallery");
const modalAdd = document.getElementById("modal-add");

export function showmodalGallery() {
    // ouverture de la modal 
    modif.addEventListener("click", (event) => {
        event.preventDefault();
        dialog.showModal();
        // réinitialise l'affichage des modals 
        modalGallery.style.display = 'flex';
        modalAdd.style.display = 'none';
        back.style.visibility = 'hidden';

        // ferme la modal si on clique en dehors
        dialog.addEventListener('click', (event) => {
            // récupère la classe de l'élément cliqué
            const target = event.target.getAttribute("class")
            // si l'élément cliqué n'a pas de class (donc en dehors de la modal) ferme la modal
            if (target === null) {
                dialog.close();
            }
        })


        const closeModal = document.getElementById("close")
        // Ferme la modal au click sur le bouton X
        closeModal.addEventListener("click", (event) => {
            event.preventDefault();
            dialog.close();
        })

    })


}


//  Changement de contenu de la modal pour afficher le formulaire d'ajout

const addProj = document.getElementById("btn-add");
const catproject = document.getElementById("cat-project");
const formAdd = document.getElementById("add-project");
const projectTitle = document.getElementById("project-title");
const showAdd = document.querySelector(".show-add");
const showpreview = document.querySelector(".show-preview");
const addImg = document.getElementById("add-img-project");
const previewImg = document.querySelector(".preview");
const changeImg = document.querySelector(".change-img");

export async function showmodalAdd() {
    // récupère les catégories depuis l'API pour générer le champ select
    const categories = await fetchCategories();
    addProj.addEventListener('click', function (e) {
        e.preventDefault();
        // remplace la modale galerie par la modal ajout
        modalGallery.style.display = 'none';
        modalAdd.style.display = 'flex';
        showAdd.style.display = 'flex';
        showpreview.style.display = 'none';

        // rempli le champ select avec les catégories récupérées sur l'API (+ une catégorie vide pour l'affichage au début)
        catproject.innerHTML = `<option value="" class="cat-option" disabled selected></option>`
        categories.forEach(function (e) {
            // génère une balise option
            let option = document.createElement("option");
            // rempli l'attribut value de la balise avec l'ID de la catégorie
            option.value = e.id;
            // donne la class "cat-option" 
            option.className = "cat-option";
            // rempli le texte par le nom de la catégorie
            option.innerText = e.name;
            // rajoute la balise au champ select
            catproject.append(option);
        })

        // vide le champ title
        projectTitle.value = "";

        // affichage de l'preview de la photo lors de l'ajout
        addImg.addEventListener('change', () => {
            // cache l'input d'ajout et affiche l'image à la place
            showAdd.style.display = 'none';
            showpreview.style.display = 'flex';
            // récupère l'URL pour afficher l'image
            previewImg.src = URL.createObjectURL(addImg.files[0]);
            previewImg.alt = addImg.name;

        })

        // Possibilité de changer de photo en cliquand sur le bouton
        changeImg.addEventListener('click', () => {
            // reset l'image pour un ajout ultérieur
            previewImg.src = "";
            previewImg.alt = "";
            // cache la div d'affichage de l'preview et affiche l'input pour ajouter image
            showAdd.style.display = 'flex';
            showpreview.style.display = 'none';
        })

    })

    // desactive le bouton valider tant que l'ensemble du formulaire n'est pas rempli
    const btnValider = document.getElementById("btn-valider")
    btnValider.disabled = true;
    formAdd.addEventListener('change', () => {
        if (formAdd.reportValidity() === false) {
            btnValider.disabled = true;
        } else {
            btnValider.disabled = false;
        }
    })

    // comportement du bouton Valider au click (récupère les infos et envoie la demande POST)
    btnValider.addEventListener('click', (e) => {
        e.preventDefault();
        // récupère les valeurs dans le formulaire d'ajout de projet
        const newTitle = projectTitle.value;
        const newImage = addImg.files[0];
        const newCategoryid = Number(catproject.value);
        // construit l'objet formData à partir des valeurs ci-dessus
        const formData = new FormData();
        formData.append("image", newImage);
        formData.append("title", newTitle);
        formData.append("category", newCategoryid);
        // appel de la fonction pour ajouter le projet
        addWorks(formData);
        // repasse la modal sur la partie gallerie
        modalGallery.style.display = 'flex';
        modalAdd.style.display = 'none';
    })


    // Retour à la modale galerie au click sur le bouton fleche
    const back2 = document.getElementById("back2")
    back2.addEventListener("click", (event) => {
        event.preventDefault();
        // réinitialise l'affichage des modals 
        modalGallery.style.display = 'flex';
        modalAdd.style.display = 'none';
    })


    // Ferme la modale au click sur le bouton X
    const closeModal = document.getElementById("close2")
    closeModal.addEventListener("click", (event) => {
        event.preventDefault();
        dialog.close();
    })
}
