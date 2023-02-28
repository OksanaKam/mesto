const popupImage = document.querySelector(".popup_image");
const containerImg = document.querySelector("#popup__container-img");
const placeImage = containerImg.querySelector(".popup__place-image");
const placeTitle = containerImg.querySelector(".popup__place-title");

class Card {
  constructor(data, templateSelector) {
      this._name = data.name;
      this._link = data.link;
      this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  _handleImageClick() {
    this._element.querySelector('.element__like').classList.toggle("element__like_active");
  }

  _handleTrashClick() {
    this._element.remove();
  }

  _handleOpenPopup() {
    placeImage.src = this._link;
    placeImage.alt = this._name;
    placeTitle.textContent = this._name;
    popupImage.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEscape);
  }

  _setEventListeners() {
    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._handleOpenPopup();
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
import { closeByEscape } from "./index.js";