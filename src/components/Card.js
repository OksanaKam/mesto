class Card {
  constructor(data, templateSelector, handleCardClick) {
      this._name = data.name;
      this._link = data.link;
      this._templateSelector = templateSelector;
      this._handleCardClick= handleCardClick;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);
  }

  _handleImageClick() {
    this._element.querySelector('.element__like').classList.toggle("element__like_active");
  }

  _handleTrashClick() {
    this._element.remove();
  }

  _setEventListeners() {
    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });

    this._element.querySelector('.element__like').addEventListener('click', () => {
      this._handleImageClick();
    });

    this._element.querySelector('.element__trash').addEventListener('click', () => {
      this._handleTrashClick();
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
     
    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__image').alt = this._name
    this._element.querySelector('.element__title').textContent = this._name;

    return this._element;
  }
}

export { Card };