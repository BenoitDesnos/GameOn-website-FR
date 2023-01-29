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
const modalBtn = document.querySelector(".modal-btn");
const formData = document.querySelectorAll(".formData");
const modalClose = document.getElementsByClassName("close-on-click");

// launch modal event
modalBtn.addEventListener("click", launchModal);
// Close modal event
Array.from(modalClose).forEach((btn) =>
  btn.addEventListener("click", closeModal)
);

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}
// Close modal form
function closeModal() {
  modalbg.style.display = "none";
}
