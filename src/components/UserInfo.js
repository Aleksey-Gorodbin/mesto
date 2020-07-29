export class UserInfo {
  constructor({selectorName, selectorPosition}){
    this._selectorName = document.querySelector(selectorName);
    this._selectorPosition = document.querySelector(selectorPosition);
  }

  getUserInfo(){
    return {
      name: this._selectorName.textContent,
      position: this._selectorPosition.textContent
    };
  }

  setUserInfo({newName, newLink}){
    this._selectorName.textContent = newName;
    this._selectorPosition.textContent = newLink;
  }
}