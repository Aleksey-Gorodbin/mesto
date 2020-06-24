function pressOverlay(e) {
  if (e.target.classList.contains("popup_opened")) {
    e.target.classList.remove("popup_opened");
  }
}

function pressEsc(evt) {
  if (evt.keyCode === 27) {
    const openedPopup = document.querySelector(".popup_opened");
    closeForm(openedPopup);
  }
}

function openForm(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", pressEsc);
  document.addEventListener("click", pressOverlay);
}

function closeForm(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", pressEsc);
  document.removeEventListener("click", pressOverlay);
}

export { openForm, closeForm };
