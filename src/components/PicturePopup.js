import { Popup } from "./Popup.js";
export class PicturePopup extends Popup {
  constructor(selectorPopup) {
    super(selectorPopup);
  }

  open(obj) {
    const popupPhoto = this._selectorPopup.querySelector(".popup__image");
    popupPhoto.src = obj.link;
    popupPhoto.alt = `Здесь изображен ${obj.name}`;
    document.querySelector(".popup__title_open-photo").textContent = obj.name;
    super.open();
  }
  
}
