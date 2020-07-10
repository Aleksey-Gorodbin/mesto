import { Popup } from "./Popup.js";
export class PicturePopup extends Popup {
  constructor(selectorPopup) {
    super(selectorPopup);
  }

  open(obj) {
    const popupPhoto = document.querySelector(".popup__image");
    popupPhoto.src = obj.link;
    popupPhoto.alt = `Изображение ${obj.name} не загрузилось`;
    document.querySelector(".popup__title_open-photo").textContent = obj.name;
    super.open();
  }
}
