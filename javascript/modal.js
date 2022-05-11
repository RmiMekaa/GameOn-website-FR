// eslint-disable-next-line no-unused-vars
function editNav() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const modalClose = document.querySelector(".close");
const form = document.querySelector("#form");
const closeBtn = document.getElementById("close-btn");

// Événement pour ouvrir le formulaire
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

/**
 * Ouvre le formulaire
 * @return  {void}
 */
function launchModal() {
    modalbg.style.display = "block";
}

// Inputs
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const email = document.getElementById("email");
const birthdate = document.getElementById("birthdate");
const tournaments = document.getElementById("quantity");
const locations = document.getElementsByName("location");
const termsOfUse = document.getElementById("checkbox1");

// Travail sur les dates
/**
 * Date du jour
 * @type  {Date | String}  [return description]
 */
let today = new Date();
let year = today.getFullYear();
let month = new Intl.DateTimeFormat("fr", { month: "2-digit" }).format(today);
let day = new Intl.DateTimeFormat("fr", { day: "2-digit" }).format(today);
today = year + "-" + month + "-" + day;
/**
 * Date minimum
 * @type {Date | String}
 */
let minDate = (year - 100) + "-" + month + "-" + day;
let majority = (year - 18) + "-" + month + "-" + day;

// Ajout des attributs min et max dans l'input birthdate
birthdate.setAttribute("max", today);
birthdate.setAttribute("min", minDate);

/**
 * Change le format pour un affichage cohérent dans le message d'erreur
 * @param   {Date | String}  refDate Date au format yyyy-mm-dd
 * @return  {String} Chaîne au format dd/mm/yyyy
 */
function errorDateFormat(refDate) {
    return new Date(refDate).toLocaleDateString("fr-FR");
}

/**
 *  Variable qui contrôle l'envoi du formulaire
 * 
 * Passe sur false si la fonction setError a été appelée lors de la vérification des champs et empêche la soumission du formulaire
 * @var {Boolean}
 */
let formIsValid;

// Vérification des champs
/** 
 * Passe la variable FormIsValid sur false et affiche un message d'erreur sous l'élément parent si la saisie n'est pas conforme
 * @param   {HTMLElement}  target  L'élément input ciblé
 * @param   {string}  msg  Le message d'erreur que l'on souhaite afficher
 * @return {void}
 */
function setError(target, msg) {
    target.parentElement.setAttribute("data-error", msg);
    target.parentElement.setAttribute("data-error-visible", "true");
    formIsValid = false;
}
/** 
 * Supprime le message d'erreur si elle a été corrigée
 * @param   {HTMLElement}  target  L'élément input ciblé
 * @return {void}
 */
function removeErrorMsg(target) {
    target.parentElement.removeAttribute("data-error");
    target.parentElement.removeAttribute("data-error-visible");
}
/** 
 * Parcours tous les input et vérifie qu'ils ne sont pas vides
 * @return {void} Appelle la fonction setError si un des champs est vide
 */
function checkIfEmpty() {
    document.querySelectorAll("input").forEach((input) => {
        if (input.value.length === 0) return setError(input, "Veuillez renseigner ce champ.");
    });
}
/** 
 * Vérifie les champs prénom et nom 
 *
 * 1. RegEx pour interdire chiffres et caractères spéciaux 
 * 
 * 2. On s'assure que la saisie comporte au moins deux caractères
 * 
 * @param   {HTMLElement}  target - L'élément input ciblé
 * @return {void} Appelle la fonction setError ou removeErrorMsg en fonction du résultat
 */
function checkName(target) {
    const nameReg = /^[a-z ,.'-]+$/i;
    if (target.value.length < 2) return setError(target, "Le champ doit contenir au moins 2 caractères.");
    if (!nameReg.test(target.value)) return setError(target, "Format incorrect.");
    return removeErrorMsg(target);
}
/** 
 * Vérifie la date de naissance
 *
 * 1. On s'assure que la date soit cohérente avec la methode checkValidity()
 * 
 * 2. On s'assure que l'utilisateur est majeur
 * @return {void}Appelle la fonction setError ou removeErrorMsg en fonction du résultat
 */
function checkBirthdate() {
    if (!birthdate.checkValidity()) return setError(birthdate, "Votre date de naissance doit se situer entre le " + errorDateFormat(minDate) + " et le " + errorDateFormat(today) + ".");
    if (birthdate.value >= majority) return setError(birthdate, "Vous devez être majeur pour participer à ce tournoi");
    return removeErrorMsg(birthdate);
}
/** 
 * Vérifie le champ email
 *
 * 1. On s'assure que l'adresse email est au bon format avec la methode checkValidity()
 * @return {void} Appelle la fonction setError ou removeErrorMsg en fonction du résultat
 */
function checkMail() {
    if (!email.checkValidity()) return setError(email, "Ce n'est pas une adresse email valide.");
    return removeErrorMsg(email);
}
/** 
 * Vérifie le nombre de tournois
 *
 * 1. On s'assure que la saisie soit conforme aux attributs min/max avec la méthode checkValidity() 
 * @return {void} Appelle la fonction setError ou removeErrorMsg en fonction du résultat
 */
function checkTournaments() {
    if (!tournaments.checkValidity()) return setError(tournaments, "Veuillez entrer un nombre entre 0 et 99.");
    return removeErrorMsg(tournaments);
}
/** 
 * Vérifie les conditions générales d'utilisation
 *
 * 1. On s'assure que la checkbox CGU soit cochée 
 * @return {void} Appelle la fonction setError ou removeErrorMsg en fonction du résultat
 */
function checkTermsOfUse() {
    if (!termsOfUse.checked) return setError(termsOfUse, "Vous devez accepter les conditions générales d'utilisation.");
    return removeErrorMsg(termsOfUse);
}
/** 
 * Vérifie qu'une ville est sélectionnée
 * @return {void} Appelle la fonction setError ou removeErrorMsg en fonction du résultat
 */
function checkLocation() {
    let count = 0;
    for (let i = 0; i < locations.length; i++) {
        if (locations[i].checked) {
            count++;
        }
    }
    if (count !== 1) return setError(locations[0], "Veuillez choisir une option.");
    return removeErrorMsg(locations[0]);
}

// Événements pour vérifier les champs dès la perte du focus
firstName.addEventListener("change", function () { checkName(firstName); });
lastName.addEventListener("change", function () { checkName(lastName); });
email.addEventListener("change", checkMail);
birthdate.addEventListener("blur", checkBirthdate);
tournaments.addEventListener("change", checkTournaments);
termsOfUse.addEventListener("change", checkTermsOfUse);
eventListenerForLocations(locations);

/**
 * Événement à la perte du focus pour les boutons radios
 *
 * @param   {NodeList}  locations  Les boutons radios des villes
 *
 * @return  {void}  Écoute chaque bouton radio et appelle la fonction checkLocation pour chacun d'entre eux
 */
function eventListenerForLocations(locations) {
    for (let i = 0; i < locations.length; i++) {
        locations[i].addEventListener("change", checkLocation);
    }
}

// Événement à la soumission du formulaire
form.addEventListener("submit", function (e) {
    formIsValid = true;
    checkAllInputs();
    if (!formIsValid) {
        e.preventDefault();
        console.error("Formulaire non valide");
    } else {
        e.preventDefault();
        displaySuccess();
    }
});

/**
 *  Appelle toutes les fonctions de vérification des champs
 * @return {void}
 */
function checkAllInputs() {
    checkName(firstName);
    checkName(lastName);
    checkMail();
    checkBirthdate();
    checkTournaments();
    checkLocation();
    checkTermsOfUse();
    checkIfEmpty();
}

/** 
 * Affiche un message de confirmation quand le formulaire a été soumis
 * @return {void}
*/
function displaySuccess() {
    let success = document.createElement("p");
    document.querySelector(".content").appendChild(success);
    success.className = "success";
    success.innerHTML = "Merci ! <br> Votre réservation a été reçue.";
    closeBtn.style.display = "block";
}

// Événement pour fermer le formulaire
modalClose.addEventListener("click", closeModal);
closeBtn.addEventListener("click", closeModal);

/** 
 * Ferme le formulaire
 * @return {void}
 */
function closeModal() {
    modalbg.style.display = "none";
}