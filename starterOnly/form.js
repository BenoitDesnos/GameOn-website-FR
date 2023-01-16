/* <---------------------------------------------- const et variables --------------------------------------------------------------------> */

const form = document.querySelector("form");
const inputs = document.querySelectorAll("input");
const checkBoxes = document.querySelectorAll('input[type="radio"]');
const usersTerms = document.getElementById("checkbox1");
const quantity = document.getElementById("quantity");

let isFirstEmpty = true;
let isLastEmpty = true;
let isEmailEmpty = true;
let isBirthEmpty = true;
let isQuantitySelected = false;
let isOneCityChecked = false;
let isUsersTermsAgreed = usersTerms.checked;

let regexText = /^([a-zA-Z-]+\s)*[a-zA-Z-]+$/g;
let regexQuantity = /^[0-9]+$/g;
let regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

/* <-------------------------------------------------------------------------------------------------------------------------------------------> */

/* <---------------------------------------------- Fonctions de verifications des inputs --------------------------------------------------------------------> */

/* Les fn ci-dessous verifient les values rentrées et retournent s'il y a une erreur ou non grâce à la fn errorDisplay*/

// nameChecker est utilisée pour les champs prénom et nom
const nameChecker = (value, id) => {
  if (value.length < 2 || value.length > 60) {
    errorDisplay(
      id,
      "Le Prénom/Nom doit faire entre 2 et 60 caractères",
      false
    );
    if (id === "first") {
      isFirstEmpty = true;
    } else {
      isLastEmpty = true;
    }
  } else if (!value.match(regexText)) {
    errorDisplay(
      id,
      "Le Prénom/Nom ne doit pas contenir de caractères spéciaux",
      false
    );
  } else {
    errorDisplay(id, "", true);
    if (id === "first") {
      isFirstEmpty = false;
    } else {
      isLastEmpty = false;
    }
  }
};

const emailChecker = (value, id) => {
  if (!value.match(regexEmail)) {
    errorDisplay(id, "Le mail n'est pas valide", false);
    isEmailEmpty = true;
  } else {
    errorDisplay(id, "", true);
    isEmailEmpty = false;
  }
};

const birthChecker = (value, id) => {
  if (value !== "") {
    errorDisplay(id, "", true);
    isBirthEmpty = false;
  } else {
    errorDisplay(id, "Merci de choisir une date de naissance", false);
    isBirthEmpty = true;
  }
};

const quantityChecker = (value, id) => {
  if (!value.match(regexQuantity)) {
    errorDisplay("quantity", "Merci de choisir un chiffre ou un nombre", false);
    isQuantitySelected = false;
  } else {
    errorDisplay(id, "", true);
    isQuantitySelected = true;
  }
};

// checkCgu verifie si l'input sur laquelle nous la jouons est coché ou non
const checkCgu = (isChecked, id) => {
  if (isChecked) {
    errorDisplay(id, "", true);
  } else {
    errorDisplay(id, "Merci d'accepter les CGU", false);
    isQuantitySelected = false;
  }
};

// fn gérant l'affichage des erreurs sur le DOM pour chaque fn de vérification
/*  tag = class ou id ou selecteur 
    message = message à afficher selon erreur ou non
    valid = boolean  // true = no error  false = error */
const errorDisplay = (tag, message, valid) => {
  const container = document.getElementById(tag);
  const error = document.querySelector("#" + tag + "--error");
  if (!valid) {
    container.classList.add("error");
    error.textContent = message;
  } else {
    container.classList.remove("error");
    error.textContent = message;
  }
};

/* <---------------------------------------------------------------------------------------> */

/* <---------------------------------EventListeners---------------------------------------> */

// verifie chaque champs à chaque inputs effectués grace aux fn déclarées plus tot
// les checkboxes radio ne sont pas vérifiées ici, elles sont vérifiées dans le forEach dessous
inputs.forEach((input) => {
  input.addEventListener("input", (e) => {
    switch (e.target.id) {
      case "first":
        nameChecker(e.target.value, e.target.id);
        break;
      case "last":
        nameChecker(e.target.value, e.target.id);
        break;
      case "email":
        emailChecker(e.target.value, e.target.id);
        break;
      case "birthdate":
        birthChecker(e.target.value, e.target.id);
        break;
      case "checkbox1":
        checkCgu(e.target.value, e.target.id);
        break;
      case "quantity":
        quantityChecker(e.target.value, e.target.id);

        break;

      default:
        null;
    }
  });
});
// si aucune villes n'est cochées alors passe isOneCityChecked sur true
// pas de else car impossible de décocher
checkBoxes.forEach((checkBox) => {
  checkBox.addEventListener("input", () => {
    if (isOneCityChecked === false) {
      isOneCityChecked = true;
      errorDisplay("radioContainer", "", true);
    }
  });
});

//toggle les CGU sur true ou false
usersTerms.addEventListener("click", () => {
  isUsersTermsAgreed = !isUsersTermsAgreed;
});

// verifie les inputs au moment de la submission
form.addEventListener("submit", (e) => {
  if (isFirstEmpty) {
    errorDisplay("first", "Merci de renseigner votre prénom", false);
    e.preventDefault();
  }
  if (isLastEmpty) {
    errorDisplay("last", "Merci de renseigner votre nom", false);
    e.preventDefault();
  }
  if (isEmailEmpty) {
    errorDisplay("email", "Merci de renseigner votre email", false);
    e.preventDefault();
  }
  if (isBirthEmpty) {
    errorDisplay("birthdate", "Merci de choisir une date de naissance", false);
    e.preventDefault();
  }
  if (!isQuantitySelected) {
    errorDisplay("quantity", "Merci de choisir un nombre", false);
    e.preventDefault();
  }
  if (!isOneCityChecked) {
    e.preventDefault();
    errorDisplay("radioContainer", "Merci de choisir une ville", false);
  }
  if (!isUsersTermsAgreed) {
    errorDisplay("checkbox1", "Merci d'accepter les CGU", false);
    e.preventDefault();
  }
  if (
    !isFirstEmpty &&
    !isLastEmpty &&
    !isEmailEmpty &&
    !isBirthEmpty &&
    isQuantitySelected &&
    isOneCityChecked &&
    isUsersTermsAgreed
  ) {
    alert("Merci ! Votre réservation a été reçue.");
  }
});
