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

//----------------------------------------------------------------------------------------------------------

/*
// Vérifie si la saisie comporte au moins 2 caractères et affiche un message si non
function validLength(input) {
  return input.length >= 2 ? "" : "Veuillez entrer 2 caractères ou plus pour le champ du nom.";
}

// Vérifie que la saisie ne comporte que des lettres, tiret ou apostrophe et affiche un message si non
function validText(input) {
  const nameReg = /^[a-z-']+$/i;
  return nameReg.test(input) ? "" : "La saisie n'est pas correcte.";
}

// Vérifie la saisie du prénom
let firstNameIsValid;
form.firstName.addEventListener("change", function() {
  let msg ="";
  msg += validLength(this.value);
  msg += validText(this.value);
  if (msg === "") {
    this.closest(".formData").removeAttribute("data-error");
    this.closest(".formData").removeAttribute("data-error-visible");
    firstNameIsValid = true;
  } else {
    this.closest(".formData").setAttribute("data-error", msg);
    this.closest(".formData").setAttribute("data-error-visible", "true");
    firstNameIsValid = false;
  }
});

// Vérifie la saisie du nom
let lastNameIsValid;
form.lastName.addEventListener("change", function() {
  let msg ="";
  msg += validLength(this.value);
  msg += validText(this.value);
  if (msg === "") {
    this.closest(".formData").removeAttribute("data-error");
    this.closest(".formData").removeAttribute("data-error-visible");
    lastNameIsValid = true;
  } else {
    this.closest(".formData").setAttribute("data-error", msg);
    this.closest(".formData").setAttribute("data-error-visible", "true");
    lastNameIsValid = false;
  }
});

// Vérifie la saisie de l'email
let mailIsValid;
form.email.addEventListener("change", function() {
    const mailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (mailReg.test(this.value)) {
      this.closest(".formData").removeAttribute("data-error");
      this.closest(".formData").removeAttribute("data-error-visible");
      mailIsValid = true;
    } else {
      this.closest(".formData").setAttribute("data-error", "Ce n'est pas une adresse email valide");
      this.closest(".formData").setAttribute("data-error-visible", "true");
      mailIsValid = false;
    }
});

// Vérifie la date de naissance
let birthdateIsValid;
form.birthdate.addEventListener("change", function() {
    const dateReg = /^[0-9]{2}[0-9]{2}[0-9]{4}$/;
    if (dateReg.test(this.value)) {
      this.closest(".formData").removeAttribute("data-error");
      this.closest(".formData").removeAttribute("data-error-visible");
      birthdateIsValid = true;
      } else {
      this.closest(".formData").setAttribute("data-error", "Vous devez entrer votre date de naissance.");
      this.closest(".formData").setAttribute("data-error-visible", "true");
      birthdateIsValid = false;
    }
});

// Vérifie la saisie du nombre de tournoi
let quantityIsValid;
form.quantity.addEventListener("change", function() {
  const quantityReg = /^[0-9]+$/;
  if (quantityReg.test(this.value) && this.value > 0) {
    this.closest(".formData").removeAttribute("data-error");
    this.closest(".formData").removeAttribute("data-error-visible");
    quantityIsValid = true;
  } else {
    this.closest(".formData").setAttribute("data-error", "Veuillez entrer un nombre");
    this.closest(".formData").setAttribute("data-error-visible", "true");
    quantityIsValid = false;
  }
});

// Vérifie que les conditions d'utilisations ont été acceptées
let touIsValid = true;
form.tou.addEventListener("change", function() {
  if (this.checked == true) {
    this.closest(".formData").removeAttribute("data-error");
    this.closest(".formData").removeAttribute("data-error-visible");
    touIsValid = true;
  } else {
    this.closest(".formData").setAttribute("data-error", "Vous devez vérifier que vous acceptez les termes et conditions.");
    this.closest(".formData").setAttribute("data-error-visible", "true");
    touIsValid = false;
  }
});

// Vérifie qu'une option est cochée lors de l'envoi du formulaire
let locationIsValid;
document.querySelector("#submit-btn").addEventListener("click",function(e) {
    if (countChecked() == 0) {
      e.preventDefault();
      document.getElementById("locations").setAttribute("data-error", "Veuillez choisir une option.");
      document.getElementById("locations").setAttribute("data-error-visible", "true");
      locationIsValid = false;
    } else {
      document.getElementById("locations").removeAttribute("data-error");
      document.getElementById("locations").removeAttribute("data-error-visible");  
      locationIsValid = true;
    }
});

 // renvoie 0 si aucune option n'a été cochée
function countChecked() {
    let locations = form.elements["location"];
    let count = 0;
    for (let i = 0; i < locations.length; i++) {
      if (locations[i].checked) {
        count++;
      }
    }
    return count;
}


// Empêche l'envoi d'un formulaire si un champ n'est pas conforme
function validation() {
  if (firstNameIsValid && lastNameIsValid && mailIsValid && quantityIsValid && touIsValid && locationIsValid) {
    console.log("success");
    return true;
  } else {
    e.preventDefault();
    console.log("erreur");
    return false;
  }
};
*/

// DOM ELEMENTS
const modalBody = document.getElementsByClassName('modal-body');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const email = document.getElementById('email');
const birthdate = document.getElementById('birthdate');
const quantity = document.getElementById('quantity');
const locations = document.getElementsByName('location');
const termsOfUse = document.getElementById('checkbox1');
const newsletter = document.getElementById('checkbox2');

// REGEX
const nameReg = /^[a-z-']+$/i;
const mailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const birthdateReg = /^[0-9]{4}[-][0-9]{2}[-][0-9]{2}$/;
const quantityReg = /^[0-9]+$/;

// SUBMIT EVENT
form.addEventListener('submit', function(e) {
  formIsValid = true;
  checkInputs();
  if (formIsValid === true) {
    e.preventDefault();
    console.log("success");
    // AFFICHER MESSAGE DE VALIDATION
    //let success = document.createElement("p");
    //document.modalBody.appendChild(success);
    //success.className = "success";
    //success.innerText = "Merci, le formulaire a bien été soumis";
  } else {
    e.preventDefault();
    console.log("error");
  }
});

// BOOLEEN QUI RENVOIE FALSE SI UNE ERREUR EST TROUVÉE DANS UN DES INPUTS
let formIsValid = true;

// FONCTION QUI AFFICHE MESSAGE D'ERREUR ET PASSE formIsValid SUR FALSE
function setError(input, msg) {
  input.closest(".formData").setAttribute("data-error", msg);
  input.closest(".formData").setAttribute("data-error-visible", "true");
  formIsValid = false;
}

// FONCTION QUI SUPPRIME MESSAGE D'ERREUR
function removeErrorMsg(input) {
  input.closest(".formData").removeAttribute("data-error");
  input.closest(".formData").removeAttribute("data-error-visible");
}

// FONCTION QUI VÉRIFIE SI TOUS LES INPUTS SONT VALIDES
function checkInputs() {
    // Vérifie la saisie du prénom
    if (nameReg.test(firstName.value) == true && firstName.value.length >= 2) {
      removeErrorMsg(firstName);
    } else if (firstName.value.length < 2) {
      setError(firstName, "Veuillez entrer 2 caractères ou plus pour le champ du nom.");
    } else if (nameReg.test(firstName.value) == false) {
      setError(firstName, "Format incorrect.");
    } 

    // Vérifie la saisie du nom
    if (nameReg.test(lastName.value) == true && lastName.value.length >= 2) {
      removeErrorMsg(lastName);
    } else if (lastName.value.length < 2) {
      setError(lastName, "Veuillez entrer 2 caractères ou plus pour le champ du nom.");
    } else if (nameReg.test(lastName.value) == false) {
      setError(lastName, "Format incorrect.");
    } 

    // Vérifie la saisie de l'email
    if (mailReg.test(email.value)) {
      removeErrorMsg(email);
    } else if (email.value === "") {
      setError(email, "Veuillez entrer une adresse email.");
    } else {
      setError(email, "Ce n'est pas une adresse email valide.");
    }

    // Vérifie la date de naissance
    if (birthdateReg.test(birthdate.value)) {
      removeErrorMsg(birthdate);
      } else {
      setError(birthdate, "Vous devez entrer votre date de naissance.");
    }

    // Vérifie le nombre de tournois
    if (quantityReg.test(quantity.value) && quantity.value != "") {
      removeErrorMsg(quantity);
    } else {
      setError(quantity, "Veuillez entrer un nombre.");
    }
  
    // Vérifie qu'une option est cochée lors de l'envoi du formulaire
    if (countChecked() == 1) {
      removeErrorMsg(document.getElementById("locations"));
    } else {
      setError(document.getElementById("locations"), "Veuillez choisir une option.");
    }
    function countChecked() {
        let locations = form.elements["location"];
        let count = 0;
        for (let i = 0; i < locations.length; i++) {
          if (locations[i].checked) {
            count++;
          }
        }
        return count;
    }

    // Vérifie que les conditions générales ont été acceptées
    if (termsOfUse.checked == true) {
      removeErrorMsg(termsOfUse);
    } else {
      setError(termsOfUse, "Vous devez accepter les conditions générales d'utilisation.");
    }
  
    // Regarde si l'utilisateur souhaite s'inscrire à la newsletter
    if (newsletter.checked == true) {
      // fonction qui inscrit l'utilisateur à la newsletter
    } 
  };
  




