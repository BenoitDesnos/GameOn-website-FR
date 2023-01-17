/* <---------------------------------------------- const et variables --------------------------------------------------------------------> */

const form = document.querySelector("form");
const modalBody = document.querySelector(".modal-body");
const formChildrens = document.querySelectorAll("form > *");
const inputs = document.querySelectorAll(
  ".text-control" /* ~ S.checkbox-input" */
);
const errors = document.querySelectorAll(".error");
const checkBoxes = document.querySelectorAll('input[type="radio"]');
const usersTerms = document.getElementById("checkbox1");
const quantity = document.getElementById("quantity");

let isOneCityChecked = false;
let isUsersTermsAgreed = usersTerms.checked;

let regexText = /^([a-zA-Z-]+\s)*[a-zA-Z-]+$/g;
let regexQuantity = /^[0-9]+$/g;
let regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

/* <-------------------------------------------------------------------------------------------------------------------------------------------> */

/* <---------------------------------------------- Fonctions de verifications des inputs --------------------------------------------------------------------> */

/* Les fn ci-dessous verifient les values rentrées et retournent s'il y a une erreur ou non grâce à la fn errorDisplay*/

const valueChecker = (input, regex, checked) => {
  let value = input.value;
  let id = input.id;
  /*  if (!checked) {
    errorDisplay(
      id,
      document.querySelector(`#${id}`).dataset.errornotchecked,
      false
    );
  } else { */
  if (value.length === 0) {
    errorDisplay(
      id,
      document.querySelector(`#${id}`).dataset.errorempty,
      false
    );
    console.log("test1");
  } else if (regex && !value.match(regex)) {
    console.log("test2");
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
    console.log("test3");
  } else {
    errorDisplay(id, "", true);
  }
  /*  } */
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

// les fn ci-dessous gerent l'affichage du message de remerciements après avoir envoyé le form

const displayThanksMessage = () => {
  console.log(modalClose);
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

/* <---------------------------------------------------------------------------------------> */

/* <---------------------------------EventListeners---------------------------------------> */

// verifie chaque champs à chaque inputs effectués grace aux fn déclarées plus tot
// les checkboxes radio ne sont pas vérifiées ici, elles sont vérifiées dans le forEach dessous
function listenToAction(input) {
  switch (input.attributes.type.value) {
    case "text":
      valueChecker(input, regexText);
      break;
    case "email":
      valueChecker(input, regexEmail);
      break;
    case "number":
      valueChecker(input, regexQuantity);
      break;
    /*  case "checkbox":
      valueChecker(input, null, isUsersTermsAgreed);
      break;
    case "radio":
      valueChecker(input, null, isOneCityChecked);
      break; */

    default:
      valueChecker(input, null);

      null;
  }
}

inputs.forEach((input) => {
  input.addEventListener("input", (e) => {
    listenToAction(input);
  });
});

// si aucune villes n'est cochées alors passe isOneCityChecked sur true
// pas de else car impossible de décocher

checkBoxes.forEach((checkBox) => {
  checkBox.addEventListener("input", () => {
    if (!isOneCityChecked) {
      isOneCityChecked = true;
      errorDisplay("radioContainer", "", true);
    }
  });
});

//toggle les CGU sur true ou false
usersTerms.addEventListener("click", () => {
  isUsersTermsAgreed = !isUsersTermsAgreed;
  if (isUsersTermsAgreed) {
    errorDisplay("checkbox1", "", true);
  }
});

// verifie les inputs au moment de la submission
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let isErrorPresent = false;
  if (!isOneCityChecked) {
    errorDisplay("radioContainer", "prout", false);
  }
  if (!isUsersTermsAgreed) {
    errorDisplay("checkbox1", "prout2", false);
  }
  inputs.forEach((input) => {
    listenToAction(input);
  });
  errors.forEach((error) => {
    console.log(error.textContent);
    if (error.textContent.length > 0) {
      isErrorPresent = true;
    }
  });
  console.log(isErrorPresent);
  if (!isErrorPresent) {
    displayThanksMessage();
    closeThanksMessageOnClick();
  }
});
