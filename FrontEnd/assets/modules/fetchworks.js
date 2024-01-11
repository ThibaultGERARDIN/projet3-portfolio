// fonction pour récupérer les travaux sur l'API

export async function fetchWorks() {
    const reponse = await fetch('http://localhost:5678/api/works');
    let works = await reponse.json();
    return works;
}
