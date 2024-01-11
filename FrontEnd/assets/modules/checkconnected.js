// fonction qui vérifie l'existence du token et qui affiche le mode édition si OK

export function checkConnected(token) {
    // affiche les éléments du mode édition si le token est détecté
if (token !== null) {
    document.querySelector('.edition').style.display = 'flex';
    document.querySelector('.filtres').style.display = 'none';
    document.getElementById('logout-link').style.display = 'flex';
    document.getElementById('login-link').style.display = 'none';
    document.getElementById('modif').style.display = 'flex';
} 
}