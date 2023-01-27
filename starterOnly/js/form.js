/* <---------------------------------------------- const et variables --------------------------------------------------------------------> */
// const
const form = document.querySelector("form");
const modalBody = document.querySelector(".modal-body");
const usersTerms = document.getElementById("checkbox1");
const quantity = document.getElementById("quantity");
// arrays && nodelist
const formChildrens = document.querySelectorAll("form > *");
const inputs = document.querySelectorAll(".text-control");
const errors = document.querySelectorAll(".error");
const radios = document.querySelectorAll('input[type="radio"]');
const radiosAndCheckBoxesToCheck = [usersTerms, ...radios];
const inputsToCheck = [...inputs, ...radiosAndCheckBoxesToCheck];
// regexes
const regexText = /^([a-zA-Z-]+\s)*[a-zA-Z-]+$/g;
const regexQuantity = /^[0-9]+$/g;
const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
const regexBirthDate =
  /^(?:19|20)\d\d([\/.-])(?:0[1-9]|1[012])\1(?:0[1-9]|[12]\d|3[01])$/gm;
//variables
let isOneRadioChecked = false;
let potentialErrors;
let isSubmit = false;

/* <-------------------------------------------------------------------------------------------------------------------------------------------> */

/* <---------------------------------------------- Fonctions de verifications des inputs --------------------------------------------------------------------> */

//valuechhecker verifie la conformité des valeurs dans les inputs de type text, email et number
const valueChecker = (input, regex) => {
  // variables
  let value = input.value;
  let id = input.id;
  let idDataset = document.getElementById(id).dataset;
  //conditions
  if (value.length === 0) {
    errorDisplay(id, idDataset.errorempty, false);
  } else if ((value.length < 2 || value.length > 60) && isNaN(value)) {
    errorDisplay(id, idDataset.errorlength, false);
  } else if (regex && !value.match(regex)) {
    errorDisplay(id, idDataset.errorregex, false);
  } else {
    errorDisplay(id, "", true);
  }
};

//booleanChecker verifie si les inputs de type boolean sont checked
function booleanChecker(checked, id) {
  if (id === "radioContainer" && checked) {
    isOneRadioChecked = true;
  } else if (id !== "radioContainer") {
    isOneRadioChecked = false;
  }
  if (checked) {
    errorDisplay(id, "", true);
  } else if (!checked && !isOneRadioChecked) {
    errorDisplay(
      id,
      document.getElementById(id).dataset.errornotchecked,
      false
    );
  }
}

/* <-------------------------------------------------------------------------------------------------------------------------------------------> */

// fn gérant l'affichage des erreurs sur le DOM pour chaque fn de vérification
/*  tag = class ou id ou selecteur 
    message = message à afficher selon erreur ou non
    valid = boolean  // true = no error  false = error */
const errorDisplay = (tag, message, valid) => {
  //constantes
  const container = document.getElementById(tag);
  const error = document.querySelector("#" + tag + "--error");
  //condtions
  if (!valid) {
    container.classList.add("error");
    error.textContent = message;
  } else {
    if (isSubmit && valid) {
      potentialErrors--;
    }
    container.classList.remove("error");
    error.textContent = message;
  }
};

// les fn ci-dessous gerent l'affichage du message de remerciements après avoir envoyé le form

const displayThanksMessage = () => {
  formChildrens.forEach((children) => {
    children.style.display = "none";
  });
  /* créé les élements et les appointes sur le dom */
  let thanksMessage = document.createElement("span");
  thanksMessage.textContent = "Merci pour votre inscription";
  thanksMessage.classList.add("thanks-message");
  modalBody.appendChild(thanksMessage);

  let closeButton = document.createElement("button");
  closeButton.textContent = "Fermer";
  closeButton.classList.add("btn-close");
  closeButton.classList.add("close-on-click");
  modalBody.appendChild(closeButton);
};

const closeThanksMessageOnClick = () => {
  Array.from(modalClose).forEach((btn) =>
    btn.addEventListener("click", () => {
      window.location.reload();
    })
  );
};

//Cette fonction lance les fonctions de vérifications sur le ou les champs concernés
//elle est appelée dans l'eventlistner d'input et de submit
function watchInputOnAction(input) {
  switch (input.type) {
    case "text":
      valueChecker(input, regexText);
      break;
    case "email":
      valueChecker(input, regexEmail);
      break;
    case "number":
      valueChecker(input, regexQuantity);
      break;
    case "date":
      valueChecker(input, regexBirthDate);
      break;
    case "checkbox":
      booleanChecker(input.checked, input.id);
      break;
    case "radio":
      booleanChecker(input.checked, "radioContainer");
      break;
    default:
      valueChecker(input, null);
      null;
  }
}

/* -----------------------EventListener -------------------------- */

/* INPUTS ET APPLIQUE LES ERREURS SI EXISTANTES VIA WATCHINPUTONACTION */
inputsToCheck.forEach((input) => {
  input.addEventListener("input", (e) => {
    watchInputOnAction(input);
  });
});

/* SUBMIT ET APPLIQUE LES ERREURS SI EXISTANTES VIA WATCHINPUTONACTION */
form.addEventListener("submit", (e) => {
  e.preventDefault();
  // à chaque submit on reset le nombre d'erreurs potentielles à zero
  potentialErrors = inputsToCheck.length - (radios.length - 1);
  // on set sur true pour indiquer à la fn errorDisplay qu'elle est joué dans le cadre d'un submit
  isSubmit = true;
  // verifie la conformité de tous les inputs à vérifier et décrémente amountoferrors pour chaque input valide
  inputsToCheck.forEach((input) => {
    watchInputOnAction(input);
  });
  isSubmit = false;
  // verifie si au moins une erreur est présente
  if (potentialErrors === 0) {
    displayThanksMessage();
    closeThanksMessageOnClick();
  }
});

/* ---------------------------------------------------------------- */
