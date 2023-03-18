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
    this._likeButton.classList.toggle("element__like_active");
  }

  _handleTrashClick() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._cardImage = this._element.querySelector('.element__image');
    this._likeButton = this._element.querySelector('.element__like');
    this._trashButton = this._element.querySelector('.element__trash');


    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });

    this._likeButton.addEventListener('click', () => {
      this._handleImageClick();
    });

    this._trashButton.addEventListener('click', () => {
      this._handleTrashClick();
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
     
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name
    this._element.querySelector('.element__title').textContent = this._name;

    return this._element;
  }
}

export { Card };