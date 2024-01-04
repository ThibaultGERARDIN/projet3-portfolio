// Script à écrire pour fetch les works sur l'API (http://localhost:5678/api/works) et créer l'HTML pour afficher la page d'accueil dynamiquement

// Cherche si le token de login est présent et passe en mode édition si c'est OK
let token = window.localStorage.getItem('token')

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
    window.localStorage.clear()
    // recharge la page après le "reset" mais ne fonctionne pas pour le moment ?
    window.location.reload()
})




// let works = window.localStorage.getItem('works')

// if (works === null) {
async function fetchWorks() {
    // Récupération des pièces depuis l'API
    const reponse = await fetch('http://localhost:5678/api/works');
    works = await reponse.json();
    // Transformation des works en JSON
    const valeurWorks = JSON.stringify(works);
    // Stockage des informations dans le localStorage
    window.localStorage.setItem('works', valeurWorks);
}
// } else {
//     works = JSON.parse(works)
// }

fetchWorks()

let works = window.localStorage.getItem('works')

works = JSON.parse(works)


// fonction qui créer les vignettes sur un "lieu" donné (page d'accueil => gallery ou modale => mini-galery )
function createFigure(works, lieu) {
    // clear l'endroit où vont apparaitre les images
    const location = document.querySelector(`.${lieu}`)
    location.innerHTML=""
    
   
    for (let i=0; i < works.length; i++) {

        const vignette = works[i]

        const imgVignette = document.createElement("img")
        imgVignette.src = vignette.imageUrl
        imgVignette.alt = vignette.title
       
        const figure = document.createElement("figure")
        console.log(location)
        // comportement si fonction lancée dans la modale pour ajout bouton supprimer et retrait du caption
        if (location.className === `mini-gallery`) {
            const trash = document.createElement("button")
            trash.className = 'btn-trash'
            trash.innerHTML = '<i class="fa-solid fa-trash-can"></i>'
            location.append(figure)
            figure.append(imgVignette)    
            figure.append(trash)
        } else {
            const captionVignette = document.createElement("figcaption")
            captionVignette.innerText = vignette.title  
            location.append(figure)
            figure.append(imgVignette)      
            figure.append(captionVignette)        
        }
}
}

createFigure(works, 'gallery')


// Utilisation du filtre Objets pour retourner les travaux avec la catégorie Objets uniquement
const boutonObjets = document.getElementById("objets");

boutonObjets.addEventListener("click", function () {
    const worksObjet = works.filter(function (works) {
        return works.category.id === 1
    })
    createFigure(worksObjet, 'gallery')
})

// Utilisation du filtre Appartements pour retourner les travaux avec la catégorie Appartements uniquement
const boutonAppartements = document.getElementById("appartements");

boutonAppartements.addEventListener("click", function () {
    const worksApparttements = works.filter(function (works) {
        return works.category.id === 2
    })
    createFigure(worksApparttements, 'gallery')
})

// Utilisation du filtre Hotels et restaurants pour retourner les travaux avec la catégorie Hotels et restaurants uniquement
const boutonHotelsetresto = document.getElementById("hotelsetresto");

boutonHotelsetresto.addEventListener("click", function () {
    const worksHotelsetresto = works.filter(function (works) {
        return works.category.id === 3
    })
    createFigure(worksHotelsetresto, 'gallery')
})

// Filtre tous pour reset

const boutonTous = document.getElementById("tous");

boutonTous.addEventListener("click", function () {
    createFigure(works, 'gallery')
})

// ouverture de la modale

const dialog = document.querySelector("dialog")
const modif = document.getElementById("modif")
const close = document.getElementById("close")

modif.addEventListener("click", (event) => {
    event.preventDefault()
    dialog.showModal()
    createFigure(works, 'mini-gallery')
  })

  close.addEventListener("click", (event) => {
    event.preventDefault()
    dialog.close()
  })