export class Popup {
  constructor(selectorPopup) {
    this._selectorPopup = document.querySelector(selectorPopup);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._pressOverlay = this._pressOverlay.bind(this);
  }
  open() {
    this._selectorPopup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
    document.addEventListener("click", this._pressOverlay);
  }

  close() {
    this._selectorPopup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
    document.removeEventListener("click", this._pressOverlay);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }
  
  setEventListeners() {
    this.buttonClose = this._selectorPopup.querySelector(".popup__button-close");
    this.buttonClose.addEventListener("click", () => {
      this.close();
    });
  }

  _pressOverlay(e) {
    if (e.target.classList.contains("popup_opened")) {
      e.target.classList.remove("popup_opened");
    }
  }
}
