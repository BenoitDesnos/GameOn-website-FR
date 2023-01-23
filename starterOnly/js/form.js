/* <---------------------------------------------- const et variables --------------------------------------------------------------------> */

const form = document.querySelector("form");
const modalBody = document.querySelector(".modal-body");
const formChildrens = document.querySelectorAll("form > *");
const inputs = document.querySelectorAll(".text-control");
const errors = document.querySelectorAll(".error");
const radios = document.querySelectorAll('input[type="radio"]');
const usersTerms = document.getElementById("checkbox1");
const quantity = document.getElementById("quantity");

const radiosAndCheckBoxesToCheck = [usersTerms, ...radios];
const inputsToCheck = [...inputs, ...radiosAndCheckBoxesToCheck];
/* const amountOfInputsToValidate = [...inputs, [...radiosAndCheckBoxesToCheck]]; */

let regexText = /^([a-zA-Z-]+\s)*[a-zA-Z-]+$/g;
let regexQuantity = /^[0-9]+$/g;
let regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
let regexBirthDate =
  /^(?:19|20)\d\d([\/.-])(?:0[1-9]|1[012])\1(?:0[1-9]|[12]\d|3[01])$/gm;

let isOneCityChecked = false;
let isSubmit = false;
let inputsValid = 0;

/* <-------------------------------------------------------------------------------------------------------------------------------------------> */

/* <---------------------------------------------- Fonctions de verifications des inputs --------------------------------------------------------------------> */

//valuechhecker verifie la conformité des valeurs dans les inputs de type text, email et number
const valueChecker = (input, regex) => {
  let value = input.value;
  let id = input.id;
  if (value.length === 0) {
    errorDisplay(
      id,
      document.querySelector(`#${id}`).dataset.errorempty,
      false
    );
  } else if (regex && !value.match(regex)) {
    errorDisplay(
      id,
      document.querySelector(`#${id}`).dataset.errorregex,
      false
    );
  } else if ((value.length < 2 || value.length > 60) && isNaN(value)) {
    errorDisplay(
      id,
      document.querySelector(`#${id}`).dataset.errorlength,
      false
    );
  } else {
    errorDisplay(id, "", true);
  }
};

//checkIfChecked verifie si les inputs de type boolean sont checked
function checkIfChecked(checked, id) {
  if (checked && id === "radioContainer") {
    isOneCityChecked = true;
  } else if (id !== "radioContainer") {
    isOneCityChecked = false;
  }
  if (checked) {
    errorDisplay(id, "", true);
  } else if (!checked && !isOneCityChecked) {
    errorDisplay(
      id,
      document.querySelector(`#${id}`).dataset.errornotchecked,
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
  const container = document.getElementById(tag);
  const error = document.querySelector("#" + tag + "--error");
  console.log(isSubmit);
  if (!valid) {
    container.classList.add("error");
    error.textContent = message;
    if (isSubmit && !valid) {
      inputsValid--;
      console.log(inputsValid + " test1");
    }
  } else {
    container.classList.remove("error");
    error.textContent = message;
    if (isSubmit && valid) {
      inputsValid++;
      console.log(inputsValid + " test2");
    }
  }
};

// les fn ci-dessous gerent l'affichage du message de remerciements après avoir envoyé le form

const displayThanksMessage = () => {
  formChildrens.forEach((children) => {
    children.style.display = "none";
  });
  let thanksMessage = document.createElement("span");
  let closeButton = document.createElement("button");

  thanksMessage.textContent = "Merci pour votre inscription";
  thanksMessage.classList.add("thanks-message");
  closeButton.textContent = "Fermer";
  closeButton.classList.add("btn-close");
  closeButton.classList.add("close-on-click");

  modalBody.appendChild(thanksMessage);
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
      checkIfChecked(input.checked, input.id);
      break;
    case "radio":
      checkIfChecked(input.checked, "radioContainer");
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
  inputsValid = 0;
  isSubmit = true;
  // verifie la conformité de tous les inputs à vérifier
  inputsToCheck.forEach((input) => {
    watchInputOnAction(input);
  });
  isSubmit = false;
  console.log(inputsValid, inputs.length);
  // verifie si au moins une erreur est présente
  if (inputsValid === 7) {
    displayThanksMessage();
    closeThanksMessageOnClick();
  }
});

/* ---------------------------------------------------------------- */
