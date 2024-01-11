// récupération des catégories depuis l'API
export async function fetchCategories() {
    const reponse = await fetch('http://localhost:5678/api/categories');
    let categories = await reponse.json();
    return categories;
}

