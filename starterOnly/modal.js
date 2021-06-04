function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const modalClose = document.querySelector(".close");
const form = document.querySelector("#form");
const submitBtn = document.querySelector("#submit-btn");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal event
modalClose.addEventListener("click", closeModal);

// close modal form
function closeModal() {
  modalbg.style.display = "none";
}

//-------------------V1---------------------------------------------------------------------------

// Inputs
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const email = document.getElementById('email');
const birthdate = document.getElementById('birthdate');
const quantity = document.getElementById('quantity');
const locations = document.getElementsByName('location');
const termsOfUse = document.getElementById('checkbox1');
const newsletter = document.getElementById('checkbox2');

// Booléen qui renverra false si une erreur est rencontrée
let formIsValid = true;

// Affiche un message d'erreur et passe formIsValid sur false
function setError(target, msg) {
  target.parentNode.setAttribute("data-error", msg);
  target.parentNode.setAttribute("data-error-visible", "true");
  formIsValid = false;
}
// Supprime le message d'erreur
function removeErrorMsg(target) {
  target.parentNode.removeAttribute("data-error");
  target.parentNode.removeAttribute("data-error-visible");
}

// Fonctions de validation des champs
function checkName(target) {
  const nameReg = /^[a-z-']+$/i;
  if (target.value.length < 2) return setError(target, "Le champ doit contenir au moins 2 caractères.");
  if (nameReg.test(target.value) == false) return setError(target, "Format incorrect.");
  else return removeErrorMsg(target);  
}
function checkBirthdate() {
  const birthdateReg = /^[0-9]{4}[-][0-9]{2}[-][0-9]{2}$/;
  if (birthdate.value.length === 0) return setError(birthdate, "Veuillez renseigner votre date de naissance.");
  if (!birthdateReg.test(birthdate.value)) return setError(birthdate, "La date de naissance n'est pas au bon format.");
  else return removeErrorMsg(birthdate);
}
function checkMail() {
  const mailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (email.value.length === 0) return setError(email, "Veuillez renseigner votre adresse email.");
  if (!email.checkValidity()) return setError(email, "Ce n'est pas une adresse email valide.");
  return removeErrorMsg(email);
}
function checkTournaments() {
  const quantityReg = /^[0-9]+$/;
  if (!quantityReg.test(quantity.value)) return setError(quantity, "Veuillez entrer un nombre entre 0 et 99.");
  else return removeErrorMsg(quantity);
}
function checkTermsOfUse() {
  if (!termsOfUse.checked) return setError(termsOfUse, "Vous devez accepter les conditions générales d'utilisation.");
  else return removeErrorMsg(termsOfUse);
}
function checkLocation() {
  function countChecked() {
    let count = 0;
    for (let i = 0; i < locations.length; i++) {
      if (locations[i].checked) {
        count++;
      }
    }
    return count;
}
  if (!countChecked() == 1) return setError(locations[0], "Veuillez choisir une option.");
  else return removeErrorMsg(locations[0]);
}
function checkNewsletter() {
  if (newsletter.checked == true) /*inscrit l'utilisateur à la newsletter*/;
} 

// Vérifie tous les inputs
function checkAllInputs() {
  checkName(firstName);
  checkName(lastName);
  checkMail();
  checkBirthdate();
  checkTournaments();
  checkTermsOfUse();
  checkNewsletter();
  checkLocation();
}

//SUBMIT EVENT
form.addEventListener('submit', function(e) {
  formIsValid = true;
  checkAllInputs();
  if (formIsValid === true) {
    e.preventDefault();
    displaySuccessMsg()
  } else {
    e.preventDefault();
    console.log("error");
  }
});

function displaySuccessMsg() {
    let success = document.createElement("p");
    document.querySelector(".content").appendChild(success);
    success.className = "success";
    success.innerHTML = "Merci ! <br> Votre réservation a été reçue.";
}

/*---------------V2---------------------------------------------------------------------------------

// Vérifie tous les inputs de type saisie
document.querySelectorAll("input").forEach((input) => input.onblur = checkInputFields);
function checkInputFields() {
  if (this.value.length === 0) {
    return inputValidation(this.parentNode, "Veuillez renseigner ce champ.");
  }
  switch(this.type){
    case "text": 
      const nameReg = /^[a-z-']+$/i;
      if (this.value.length < 2) return inputValidation(this.parentNode, "Le champ doit contenir au moins 2 caractères.");
      if (!nameReg.test(this.value)) return inputValidation(this.parentNode, "Format incorrect.");
      return inputValidation(this.parentNode);
    case "email":
      if (!this.checkValidity()) return inputValidation(this.parentNode, "Ce n'est pas une adresse email valide.");
      return inputValidation(this.parentNode);
    case "date": 
      const birthdateReg = /^[0-9]{4}[-][0-9]{2}[-][0-9]{2}$/;
      if (!birthdateReg.test(this.value)) return inputValidation(this.parentNode, "Votre année de naissance ne peut contenir que 4 chiffres.");
      return inputValidation(this.parentNode);
    case "number":
      if (!this.checkValidity()) return inputError(this.parentNode, "Veuillez entrer un nombre entre 0 et 99.");
      return inputValidation(this.parentNode);
    default: 
      // Si le type d'input n'est pas un de ceux listé ci-dessus on stoppe la fonction
      break;
  }
}

// Fonction qui vérifie si un champ est valide et affiche un message si ce n'est pas le cas
function inputValidation(target, msg=""){
  const succeed = msg === "" ? true : false;
  target.setAttribute("data-error", msg);
  target.setAttribute("data-error-visible", !succeed);
  return succeed;
}

// Submit event
form.addEventListener('submit', function(e) {
  
  e.preventDefault();
  let errors = 0;
  document.querySelectorAll("input").forEach((input) => {
    if (input.type === "radio " || input.type === "submit" || input.type === "checkbox") return;
    if (!checkInputFields()) errors++;
    console.log(errors);
  });

  const checkbox = document.getElementById("checkbox1");
  if (!checkbox.checked){
    errors++;
    inputValidation(checkbox.parentNode, "vous devez accepter les conditions d'utilisation")
  }
  else inputValidation(checkbox.parentNode);

  if (errors > 0) {
    console.log("error");
  }
});
*/