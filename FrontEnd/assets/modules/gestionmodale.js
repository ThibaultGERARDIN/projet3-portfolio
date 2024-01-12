import { deleteWorks } from "./deleteworks.js"
import { addWorks } from "./addworks.js"
import { fetchCategories } from "./fetchcategories.js"

// Partie concernant la modale (ouverture et fermeture)

const dialog = document.querySelector("dialog")
const modif = document.getElementById("modif")
const modaleGallery = document.getElementById("modale-gallery")
const modaleAjout = document.getElementById("modale-ajout")

export function modalGallery() {
    // ouverture de la modale 
    modif.addEventListener("click", (event) => {
        event.preventDefault()
        dialog.showModal()
        // réinitialise l'affichage des modales 
        modaleGallery.style.display = 'flex'
        modaleAjout.style.display = 'none'
        back.style.visibility = 'hidden'

        // selection des boutons poubelle + appel fonction delete sur l'ID correspondant
        const trash = document.querySelectorAll(".btn-trash")
       
        console.log(trash)
        trash.forEach(function (e) {
            e.addEventListener("click", () => {
                // extrait l'Id du projet depuis l'Id du bouton trash
                const delId = e.id.replace("trash", "")
                // Demande de validation avant suppression de l'élément
                let validation = confirm(`Êtes-vous sûr(e) de vouloir supprimer le projet ${delId} : ${e.alt}?`)
                // procède à la suppression si validé
                if (validation === true) {
                    deleteWorks(delId)
                }
            })
        })
    })


    // ferme la modale si on clique en dehors
    dialog.addEventListener('click', (event) => {
        // récupère la classe de l'élément cliqué
        const target = event.target.getAttribute("class")
        // si l'élément cliqué n'a pas de class (donc en dehors de la modale) ferme la modale
        if (target === null) {
            dialog.close();
        }
    })


    const fermer = document.getElementById("close")
    // Ferme la modale au click sur le bouton X
    fermer.addEventListener("click", (event) => {
        event.preventDefault()
        dialog.close()
    })
}





//  Changement de contenu de la modale pour afficher le formulaire d'ajout

const ajouterProj = document.getElementById("btn-ajouter")
const catProjet = document.getElementById("cat-projet")
const formAjout = document.getElementById("ajout-projet")
const titreProjet = document.getElementById("titre-projet")
const afficheAjout = document.querySelector(".affiche-ajout")
const afficheAppercu = document.querySelector(".affiche-appercu")
const ajouterImg = document.getElementById("ajout-img-projet")
const appercuImg = document.querySelector(".appercu")
const changerImg = document.querySelector(".changer-img")

export async function modalAdd() {
    // récupère les catégories depuis l'API pour générer le champ select
    const categories = await fetchCategories()
    ajouterProj.addEventListener('click', function (e) {
        e.preventDefault()
        // remplace la modale galerie par la modale ajout
        modaleGallery.style.display = 'none'
        modaleAjout.style.display = 'flex'
        afficheAjout.style.display = 'flex'
        afficheAppercu.style.display = 'none'
        
        // rempli le champ select avec les catégories récupérées sur l'API (+ une catégorie vide pour l'affichage au début)
        catProjet.innerHTML = `<option value="" class="cat-option" disabled selected></option>`
        categories.forEach(function (e) {
            // génère une balise option
            let option = document.createElement("option")
            // rempli l'attribut value de la balise avec l'ID de la catégorie
            option.value=e.id
            // donne la class "cat-option" 
            option.className="cat-option"
            // rempli le texte par le nom de la catégorie
            option.innerText=e.name
            // rajoute la balise au cahmp select
            catProjet.append(option)
        }) 

        // vide le champ titre
        titreProjet.value = ""

        // affichage de l'appercu de la photo lors de l'ajout
        ajouterImg.addEventListener('change', () => {
            // cache l'input d'ajout et affiche l'image à la place
            afficheAjout.style.display = 'none'
            afficheAppercu.style.display = 'flex'
            // récupère l'URL pour afficher l'image
            appercuImg.src = URL.createObjectURL(ajouterImg.files[0])
            appercuImg.alt = ajouterImg.name

        })

        // Possibilité de changer de photo en cliquand sur le bouton
        changerImg.addEventListener('click', () => {
            // reset l'image pour un ajout ultérieur
            appercuImg.src = ""
            appercuImg.alt = ""
            // cache la div d'affichage de l'appercu et affiche l'input pour ajouter image
            afficheAjout.style.display = 'flex'
            afficheAppercu.style.display = 'none'
        })

    })

    // desactive le bouton valider tant que l'ensemble du formulaire n'est pas rempli
    const btnValider = document.getElementById("btn-valider")
    btnValider.disabled = true
    formAjout.addEventListener('change', () => {
        if (formAjout.reportValidity() === false) {
            btnValider.disabled = true
            console.log(btnValider.disabled)
        } else {
            btnValider.disabled = false
        }
    })

    // comportement du bouton Valider au click (récupère les infos et envoie la demande POST)
    btnValider.addEventListener('click', (e) => {
        e.preventDefault()
        // récupère les valeurs dans le formulaire d'ajout de projet
        const newTitle = titreProjet.value
        const newImage = ajouterImg.files[0]
        const newCategoryid = Number(catProjet.value)
        // construit l'objet formData à partir des valeurs ci-dessus
        const formData = new FormData()
        formData.append("image", newImage)
        formData.append("title", newTitle)
        formData.append("category", newCategoryid)
        // appel de la fonction pour ajouter le projet
        addWorks(formData)
        // repasse la modale sur la partie gallerie
        modaleGallery.style.display = 'flex'
        modaleAjout.style.display = 'none'
    })

        
        // Retour à la modale galerie au click sur le bouton fleche
        const back2 = document.getElementById("back2")
        back2.addEventListener("click", (event) => {
            event.preventDefault()
            // réinitialise l'affichage des modales 
            modaleGallery.style.display = 'flex'
            modaleAjout.style.display = 'none'
        })
    
        
        // Ferme la modale au click sur le bouton X
        const fermer = document.getElementById("close2")
        fermer.addEventListener("click", (event) => {
            event.preventDefault()
            dialog.close()
        })
}
