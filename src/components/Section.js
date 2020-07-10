export class Section {
  constructor({ items, renderer }, selectorContainer) {
    this._initialArray = items;
    this._container = document.querySelector(selectorContainer);
    this.renderer = renderer;
  }
  renderItems() {
    this._initialArray.forEach((item) => this.renderer(item));
  }
  addItem(element) {
    this._container.prepend(element);
  }
}
