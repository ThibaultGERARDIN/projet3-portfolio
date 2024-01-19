// Fonction de login : fetch POST sur l'API à l'adresse login, prend en arguments email et mdp

function login(email, mdp) {
  fetch('http://localhost:5678/api/users/login', {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: mdp,
    }),
  }
  )
    .then((response) => response.json())
    .then((data) => {
      // récupère le token et le transforme en string
      let tokenValue = JSON.stringify(data['token']);

      if (data.error) {
        // si le serveur renvoie une mauvaise réponse
        alert("Utilisateur ou mot de passe non reconnu");
      } else {
        // stocke le token dans le sessionStorage pour rester connecter tant que le navigateur n'est pas fermé
        sessionStorage.setItem('token', tokenValue);
        // renvoie l'utilisateur sur la page index
        location.href = "index.html";
      }
    })
    .catch((err) => {
      console.log(err);
    });

}



// récupère le bouton submit de la page login
const submit = document.getElementById("btn-submit");


submit.addEventListener("click", (event) => {
  event.preventDefault();
  // récupère les infos rentrées dans les champs du login
  const email = document.getElementById("login-email").value;
  const mdp = document.getElementById("mdp").value;
  // check si l'email et le mdp correspondent à ce qui est attendu : si oui lance la fonction, si non envoie une alert
  if (email === "sophie.bluel@test.tld" && mdp === "S0phie") {
    login(email, mdp);
  } else {
    alert("Erreur dans l'identifiant ou le mot de passe");
  }

})