// Script à écrire pour fetch les works sur l'API (http://localhost:5678/api/works) et créer l'HTML pour afficher la page d'accueil dynamiquement

// Cherche si le token de login est présent et passe en mode édition si c'est OK
let token = window.sessionStorage.getItem('token')

// affiche les éléments du mode édition si le token est détecté
if (token !== null) {
    document.querySelector('.edition').style.display = 'flex'
    document.querySelector('.filtres').style.display = 'none'
    document.getElementById('logout-link').style.display = 'flex'
    document.getElementById('login-link').style.display = 'none'
    document.getElementById('modif').style.display = 'flex'

}

// comportement du lien logout 
const logout = document.getElementById('logout-link')
logout.addEventListener('click', function () {
    // supprime le token du localstorage
    sessionStorage.removeItem('token')

})


// fonction pour récupérer les travaux sur l'API

async function fetchWorks() {
    const reponse = await fetch('http://localhost:5678/api/works');
    works = await reponse.json();
    return works
}


// récupération des catégories depuis l'API
async function fetchCategories() {
    const reponse = await fetch('http://localhost:5678/api/categories');
    categories = await reponse.json();
    return categories
}

// fonction qui créer les vignettes sur un "lieu" donné (page d'accueil => gallery ou modale => mini-galery )
async function createFigure(catId, lieu) {

    // récupère les projets sur l'API et les stocke dans une variable
    const getWorks = await fetchWorks()
    let works
    // selectionne les projets à faire apparaitre en fonction de la catégorie selectionnée (null si tout)
    if (catId !== null) {
        works = getWorks.filter(function (getWorks) {
            return getWorks.category.id === catId
        })
    } else {
        works = getWorks
    }

    // récupère l'endroit où doit être créée la galerie et retire tout élément déjà présent
    const location = document.querySelector(`.${lieu}`)
    location.innerHTML = ""

    // créé les éléments HTML et les rempli avec les données récupérées grâce à l'API
    for (let i = 0; i < works.length; i++) {

        const vignette = works[i]

        // création de l'image avec les attributs nécessaires
        const imgVignette = document.createElement("img")
        imgVignette.src = vignette.imageUrl
        imgVignette.alt = vignette.title
        imgVignette.className = 'works-img'
        imgVignette.id = vignette.id
        
        // idem pour le conteneur de l'image
        const figure = document.createElement("figure")
        figure.id = vignette.id

        // vérifie l'emplacement choisi et créé les éléments en fonction
        if (location.className === `mini-gallery`) {
            // si dans la modale : ajout d'un bouton poubelle avec les attributs nécessaires
            const trash = document.createElement("button")
            trash.className = 'btn-trash'
            trash.id = vignette.id
            trash.alt = vignette.title
            trash.innerHTML = '<i class="fa-solid fa-trash-can"></i>'

            // génère les éléments dans le code html
            location.append(figure)
            figure.append(imgVignette)
            figure.append(trash)
        } else {
            // si dans la galerie : rajoute un caption aux images des projets
            const captionVignette = document.createElement("figcaption")
            captionVignette.innerText = vignette.title
            // génère les éléments dans le code html
            location.append(figure)
            figure.append(imgVignette)
            figure.append(captionVignette)
        }
    }
}

// appel de la fonction pour remplir les galeries
createFigure(null, 'gallery')
createFigure(null, 'mini-gallery')


// Utilisation du filtre Objets pour retourner les travaux avec la catégorie Objets uniquement
const boutonObjets = document.getElementById("objets");

boutonObjets.addEventListener("click", function () {
    createFigure(1, 'gallery')
})

// Utilisation du filtre Appartements pour retourner les travaux avec la catégorie Appartements uniquement
const boutonAppartements = document.getElementById("appartements");

boutonAppartements.addEventListener("click", function () {
    createFigure(2, 'gallery')
})

// Utilisation du filtre Hotels et restaurants pour retourner les travaux avec la catégorie Hotels et restaurants uniquement
const boutonHotelsetresto = document.getElementById("hotelsetresto");

boutonHotelsetresto.addEventListener("click", function () {
    createFigure(3, 'gallery')
})

// Filtre tous pour reset

const boutonTous = document.getElementById("tous");

boutonTous.addEventListener("click", function () {
    createFigure(null, 'gallery')
})


// Partie concernant la modale (ouverture et fermeture)

const dialog = document.querySelector("dialog")
const modif = document.getElementById("modif")
const fermer = document.getElementById("close")
const retour = document.getElementById("retour")
const modaleGallery = document.getElementById("modale-gallery")
const modaleAjout = document.getElementById("modale-ajout")

// ouverture de la modale 
modif.addEventListener("click", (event) => {
    event.preventDefault()
    dialog.showModal()
    // réinitialise l'affichage des modales 
    modaleGallery.style.display = 'flex'
    modaleAjout.style.display = 'none'
    retour.style.visibility = 'hidden'

           // selection des boutons poubelle + appel fonction delete sur l'ID correspondant
        
           dialog.querySelectorAll(".btn-trash").forEach(function (e) {
            e.addEventListener("click", () => {
                // Demande de validation avant suppression de l'élément
                let validation = confirm(`Êtes-vous sûr(e) de vouloir supprimer le projet ${e.id} : ${e.alt}?`)
                // procède à la suppression si validé
                if (validation === true) {
                    deleteWorks(e.id)
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



// Ferme la modale au click sur le bouton X
fermer.addEventListener("click", (event) => {
    event.preventDefault()
    dialog.close()
})

// Retour à la modale galerie au click sur le bouton fleche
retour.addEventListener("click", (event) => {
    event.preventDefault()
    // réinitialise l'affichage des modales 
    modaleGallery.style.display = 'flex'
    modaleAjout.style.display = 'none'
    retour.style.visibility = 'hidden'
})

//   fonction pour supprimer les projets de la base de donnée en fonction de l'id indiquée
async function deleteWorks(id) {
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

ajouterProj.addEventListener('click', function(e) {
    e.preventDefault()
    // remplace la modale galerie par la modale ajout
    modaleGallery.style.display = 'none'
    modaleAjout.style.display = 'flex'
    afficheAjout.style.display = 'flex'
    afficheAppercu.style.display = 'none'
    // génère le choix des catégories (à rendre dynamique depuis l'API plus tard) 
    // première option vide et disabled 
    catProjet.innerHTML =`<option value="" class="cat-option" disabled selected></option>
    <option value="1" class="cat-option">Objets</option>
    <option value="2" class="cat-option">Appartements</option>
    <option value="3" class="cat-option">Hotels & restaurants</option>`
    titreProjet.value=""



// affichage de l'appercu de la photo lors de l'ajout
ajouterImg.addEventListener('change', () => {
    // cache l'input d'ajout et affiche l'image à la place
    afficheAjout.style.display = 'none'
    afficheAppercu.style.display = 'flex'
    // récupère l'URL pour afficher l'image
    appercuImg.src = `${URL.createObjectURL(ajouterImg.files[0])}`
    appercuImg.alt = `${ajouterImg.name}`

})

// Possibilité de changer de photo en cliquand sur le bouton
changerImg.addEventListener('click', () => {
    // reset l'image pour un ajout ultérieur
    appercuImg.src =""
    appercuImg.alt =""
    // cache la div d'affichage de l'appercu et affiche l'input pour ajouter image
    afficheAjout.style.display = 'flex'
    afficheAppercu.style.display = 'none'
})

})

// fonction fetch en POST pour ajouter un projet avec le bouton valider du formulaire d'ajout
// récupère les infos du formulaire pour compléter la requète

const btnValider = document.getElementById("btn-valider")
btnValider.disabled = true

formAjout.addEventListener('change', ()=> {
    if (formAjout.reportValidity() === false) {
        btnValider.disabled = true
        console.log(btnValider.disabled)
    } else {
        btnValider.disabled = false
    }
})

