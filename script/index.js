let popup = document.querySelector(".popup");
console.log(popup);

let buttonEdit = document.querySelector(".profile__button-edit");
buttonEdit.addEventListener("click", function openForm() {
  popup.classList.add("popup_opened");
});

let buttonClose = document.querySelector(".popup__button-close");
buttonClose.addEventListener("click", closeForm);

function closeForm() {
  popup.classList.remove("popup_opened");
}

let nameInput = document.querySelector("#name");
let jobInput = document.querySelector("#position");
let nameText = document.querySelector(".profile__name");
let positionText = document.querySelector(".profile__position");
let formElement = document.querySelector(".popup__container");
function formSubmitHandler(evt) {
  evt.preventDefault();
  let nameInput = document.querySelector("#name");
  let jobInput = document.querySelector("#position");
  nameText.textContent = nameInput.value;
  positionText.textContent = jobInput.value;
  closeForm();
}
formElement.addEventListener("submit", formSubmitHandler);
