/* <---------------------------------------------- const et variables --------------------------------------------------------------------> */


const form = document.querySelector("form");
const inputs = document.querySelectorAll(
  'input'
);
const checkBoxes = document.querySelectorAll(
  'input[type="radio"]'
);
const usersTerms = document.getElementById(
  'checkbox1'
);
const birth = document.getElementById(
  'birthdate'
);

let isOneCityChecked = false
let isUsersTermsAgreed = usersTerms.checked
let isBirthEmpty = true

let regexText = /^([a-zA-Z-]+\s)*[a-zA-Z-]+$/g;
let regexQuantity = /^[0-9]+$/g;
let regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

/* <-------------------------------------------------------------------------------------------------------------------------------------------> */

/* <---------------------------------------------- Fonctions de verifications des inputs --------------------------------------------------------------------> */

/* chaque fonction de vérification utilise en argument la value rentrée a chaque input grace à la fonction addEventListener qui les suit */

// verifie les conditions du prénom et retourne la variable seulement si conditions remplies
const nameChecker = (value, id) => {
  if ( value.length < 2 || value.length > 60) {
    errorDisplay(id, "Le Prénom/Nom doit faire entre 2 et 60 caractères");
    firstName = null;
  } else if (!value.match(regexText) ) {
    errorDisplay(
      id,
      "Le Prénom/Nom ne doit pas contenir de caractères spéciaux"
    );
    firstName = null;
  } else {
    errorDisplay(id , "", true);
    firstName = value;
  }
};

// verifie les conditions de l'email et retourne la variable seulement si conditions remplies
const emailChecker = (value) => {
  if (!value.match(regexEmail)) {
    errorDisplay("email", "Le mail n'est pas valide");
    email = null;
  } else {
    errorDisplay("email", "", true);
    email = value;
  }
};

const birthChecker = (value, id) => {
    console.log(value)
if (value === "") {
        
} else {
    errorDisplay(id, "", true)
    isBirthEmpty = false
}
};
/* // verifie les conditions de quantité et retourne la variable seulement si conditions remplies
const quantityChecker = (value) => {
  if (!value.match(regexQuantity)) {
    errorDisplay("quantity", "Le mail n'est pas valide");
    email = null;
  } else {
    errorDisplay("quantity", "", true);
    email = value;  
  }
}; */

// fn gérant l'affichage des erreurs sur le DOM pour chaque fn de vérification
/*  tag = class ou id ou selecteur 
    message = message à afficher si erreur vraie
    valid = boolean true = no error  false = error */
const errorDisplay = (tag, message, valid) => {
  
  const container = document.getElementById(tag);
  const error = document.querySelector("#" + tag + " + p");

  if (!valid) {
    container.classList.add("error");
    error.textContent = message;
  } else {
    container.classList.remove("error");
    error.textContent = message;
  }
};

/* <-------------------------------------------------------------------------------------------------------------------------------------------> */

/* <---------------------------------------------------------------EventListeners----------------------------------------------------------------> */

// lance chaque fonction de verification selon l'input que nous utilisons, nous utilisons la value rentrée en argument
inputs.forEach((input) => {
  input.addEventListener("input", (e) => {  
    console.log(e)
    switch (e.target.id) {
      case "first":
        nameChecker(e.target.value, e.target.id);
        break;     
      case "last":        
        nameChecker(e.target.value, e.target.id);      
        break;     
      case "email":
        emailChecker(e.target.value);   
        break;  
      case "radioContainer":
        console.log(e);  
        break;  
      case "checkbox1":
        console.log(e);    
        break;  
      case "birthdate":
        birthChecker(e.target.value, e.target.id)  
        break;  
        /* case "quantity":
        quantityChecker(e.target.value);
        console.log("test1")       
        break;   */       
      default:
        null;
    }
  });
  
});

checkBoxes.forEach((checkBox) => {
  checkBox.addEventListener("input", () => {  
    if (isOneCityChecked === false) {
        isOneCityChecked = true
          
    }
  });  
});
 usersTerms.addEventListener("click" , () => {
   isUsersTermsAgreed = !isUsersTermsAgreed  
 })

// envoie les données au serveur back au click sur commander
form.addEventListener("submit", (e) => { 
   
    console.log(isBirthEmpty)

    if (isBirthEmpty) {       
        errorDisplay("birthdate", "Merci de choisir une date de naissance")
        e.preventDefault();
    }  
    if (!isUsersTermsAgreed) {
        alert("Veuillez accepter les conditions générales d'utilisations !")      
        e.preventDefault();  
    }
    if (!isOneCityChecked) {
        e.preventDefault();  
        alert("Veuillez choisir un tournoi auquel participer !")      
    }      
 });
