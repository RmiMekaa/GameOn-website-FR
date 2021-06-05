function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalBody = document.getElementsByClassName('modal-body')[0];
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const modalClose = document.querySelector(".close");
const form = document.querySelector("#form");
const submitBtn = document.querySelector("#submit-btn");
const closeBtn = document.getElementById("close-btn");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

//-------------------V1---------------------------------------------------------------------------

// Inputs
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const email = document.getElementById('email');
const birthdate = document.getElementById('birthdate');
const tournaments = document.getElementById('quantity');
const locations = document.getElementsByName('location');
const termsOfUse = document.getElementById('checkbox1');
const newsletter = document.getElementById('checkbox2');

// Set error message and assigns false to formIsValid to avoid the submit
function setError(target, msg) {
  target.parentNode.setAttribute("data-error", msg);
  target.parentNode.setAttribute("data-error-visible", "true");
  formIsValid = false;
}
// Remove error message
function removeErrorMsg(target) {
  target.parentNode.removeAttribute("data-error");
  target.parentNode.removeAttribute("data-error-visible");
}

// Inputs validation functions
function checkIfEmpty() {
  document.querySelectorAll("input").forEach((input) => {
    if (input.value.length === 0) return setError(input, "Veuillez renseigner ce champ.");
    else return removeErrorMsg(input);
  });
}
function checkName(target) {
  const nameReg = /^[a-z-']+$/i;
  if (target.value.length < 2) return setError(target, "Le champ doit contenir au moins 2 caractères.");
  if (nameReg.test(target.value) == false) return setError(target, "Format incorrect.");
  else return removeErrorMsg(target);  
}
function checkBirthdate() {
  const birthdateReg = /^[0-9]{4}[-][0-9]{2}[-][0-9]{2}$/;
  if (!birthdateReg.test(birthdate.value)) return setError(birthdate, "La date de naissance n'est pas au bon format.");
  else return removeErrorMsg(birthdate);
}
function checkMail() {
  if (!email.checkValidity()) return setError(email, "Ce n'est pas une adresse email valide.");
  return removeErrorMsg(email);
}
function checkTournaments() {
  if (!tournaments.checkValidity()) return setError(tournaments, "Veuillez entrer un nombre entre 0 et 99.");
  else return removeErrorMsg(tournaments);
}
function checkTermsOfUse() {
  if (!termsOfUse.checked) return setError(termsOfUse, "Vous devez accepter les conditions générales d'utilisation.");
  else return removeErrorMsg(termsOfUse);
}
function checkLocation() {
  let count = 0;
  for (let i = 0; i < locations.length; i++) {
    if (locations[i].checked) {
      count++;
    }
  }
  if (!count== 1) return setError(locations[0], "Veuillez choisir une option.");
  else return removeErrorMsg(locations[0]);
}

// Check input when it loses focus
firstName.addEventListener('change', function() {checkName(firstName)});
lastName.addEventListener('change', function() {checkName(lastName)});
email.addEventListener('change', checkMail);
birthdate.addEventListener('change', checkBirthdate);
tournaments.addEventListener('change', checkTournaments);
termsOfUse.addEventListener('change', checkTermsOfUse);

// On Submit
let formIsValid = true;
form.addEventListener('submit', function(e) {
  formIsValid = true;
  checkAllInputs();
  if (!formIsValid) {
    e.preventDefault(); 
    console.log("Error - Invalid form");
  } else {
    e.preventDefault();
    displaySuccess();
  }
});

function checkAllInputs() {
  checkName(firstName);
  checkName(lastName);
  checkMail();
  checkBirthdate();
  checkTournaments();
  checkIfEmpty();
  checkLocation();
  checkTermsOfUse();
}

function displaySuccess() {
    let success = document.createElement("p");
    document.querySelector(".content").appendChild(success);
    success.className = "success";
    success.innerHTML = "Merci ! <br> Votre réservation a été reçue.";
    closeBtn.style.display = "block";
}

// Close modal event
modalClose.addEventListener("click", closeModal);
closeBtn.addEventListener('click', closeModal);

// Close modal function
function closeModal() {
  modalbg.style.display = "none";
}

/*---------------V2---------------------------------------------------------------------------------

// Vérifie tous les inputs de type saisie
document.querySelectorAll("input").forEach((input) => input.onblur = checkInputFields);
function checkInputFields(input = this) {
  if (input.value.length === 0) {
    return inputValidation(input.parentNode, "Veuillez renseigner ce champ.");
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
    if (!checkInputFields(inputValidation)) errors++;
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