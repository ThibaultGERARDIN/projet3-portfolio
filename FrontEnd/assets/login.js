// Page js pour la fonction post qui va permettre de se login


function login(email, mdp) {
    fetch('http://localhost:5678/api/users/login', {
        method : "POST",
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
    // rajouter le localstorage pour "sauvegarder" le fait d'etre logged in
    .then((data) => {
        let tokenValue = JSON.stringify(data['token']) 
        let userIdvalue = data['userId']
        if (data.error) {
          alert("Utilisateur ou mot de passe non reconnu")
        } else {
            // reste à trouver comment selectionner sur index.html

        sessionStorage.setItem('token', tokenValue)
        sessionStorage.setItem('userId', userIdvalue);

        location.href = "index.html"      

        }
      })
    .catch((err) => {
      console.log(err);
     });
    
}




const submit = document.getElementById("btn-submit")

submit.addEventListener("click", (event) => {
    event.preventDefault()
    const email = document.getElementById("login-email").value
    const mdp = document.getElementById("mdp").value
    if (email === "sophie.bluel@test.tld" && mdp ==="S0phie") {
      login(email, mdp)
    } else {
      alert("Utilisateur non reconnu")
    }
    
})